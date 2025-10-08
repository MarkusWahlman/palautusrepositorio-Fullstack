import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import mongoose from "mongoose";
import Book from "./models/book";
import Author from "./models/author";
import { GraphQLError } from "graphql";
import User from "./models/user";
import jwt from "jsonwebtoken";

const MONGODB_URI = "mongodb://localhost:27017/library";
const JWT_SECRET = "SECRET_KEY";

console.log("Connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) =>
    console.error("Error connecting to MongoDB:", error.message)
  );

const typeDefs = `
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int
    authorCount: Int
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book

    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author

    createUser(
      username: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token
  }
`;

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (_: any, args: { author?: string; genre?: string }) => {
      const filter: any = {};

      if (args.author) {
        const author = await Author.findOne({ name: args.author });
        if (!author) return [];
        filter.author = author._id;
      }
      if (args.genre) {
        filter.genres = { $in: [args.genre] };
      }

      return Book.find(filter).populate("author");
    },
    allAuthors: async () => Author.find({}),
    me: async (_: any, __: any, context: any) => {
      return context.currentUser;
    },
  },

  Mutation: {
    addBook: async (_: any, args: any, context: any) => {
      if (!context.currentUser) {
        throw new GraphQLError("Not authenticated", {
          extensions: { code: "UNAUTHORIZED" },
        });
      }

      try {
        let author = await Author.findOne({ name: args.author });
        if (!author) {
          author = new Author({ name: args.author });
          await author.save();
        }

        const book = new Book({
          title: args.title,
          published: args.published,
          author: author._id,
          genres: args.genres,
        });

        const savedBook = await book.save();
        return savedBook.populate("author");
      } catch (error: any) {
        if (error.name === "ValidationError") {
          throw new GraphQLError(`Validation error: ${error.message}`, {
            extensions: { code: "BAD_USER_INPUT" },
          });
        }
        throw new GraphQLError("Failed to add book", {
          extensions: { code: "INTERNAL_SERVER_ERROR" },
        });
      }
    },

    editAuthor: async (_: any, args: any, context: any) => {
      if (!context.currentUser) {
        throw new GraphQLError("Not authenticated", {
          extensions: { code: "UNAUTHORIZED" },
        });
      }

      try {
        const author = await Author.findOne({ name: args.name });
        if (!author) return null;

        author.born = args.setBornTo;
        return await author.save();
      } catch (error: any) {
        throw new GraphQLError("Failed to edit author", {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }
    },

    createUser: async (
      _: any,
      args: { username: string; favoriteGenre: string }
    ) => {
      try {
        const user = new User({
          username: args.username,
          favoriteGenre: args.favoriteGenre,
        });
        return await user.save();
      } catch (error: any) {
        throw new GraphQLError("Creating user failed", {
          extensions: { code: "BAD_USER_INPUT", error },
        });
      }
    },

    login: async (_: any, args: { username: string; password: string }) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new GraphQLError("Invalid credentials", {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      const token = jwt.sign(userForToken, JWT_SECRET);

      return { value: token };
    },
  },

  Author: {
    bookCount: async (root: any) => {
      return Book.countDocuments({ author: root.id });
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req }) => {
    const auth = req.headers.authorization;
    if (auth && auth.toLowerCase().startsWith("bearer ")) {
      const token = auth.substring(7);
      try {
        const decodedToken = jwt.verify(token, JWT_SECRET) as any;
        const currentUser = await User.findById(decodedToken.id);
        return { currentUser };
      } catch (err) {
        return {};
      }
    }
    return {};
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});

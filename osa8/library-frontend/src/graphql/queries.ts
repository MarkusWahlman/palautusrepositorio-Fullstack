import { gql } from "@apollo/client";

export const ME = gql`
  query me {
    me {
      username
      favoriteGenre
    }
  }
`;

export const ALL_BOOKS = gql`
  query AllBooks($genre: String) {
    allBooks(genre: $genre) {
      title
      author {
        name
      }
      published
      genres
    }
  }
`;

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

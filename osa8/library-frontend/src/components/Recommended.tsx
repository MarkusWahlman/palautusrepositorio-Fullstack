import { useQuery } from "@apollo/client/react";
import { ALL_BOOKS, ME } from "../graphql/queries";
import type { Book } from "./Books";

type MeResponse = {
  me: {
    favoriteGenre: string;
  };
};

const Recommended = ({ show }: { show: boolean }) => {
  const { data: meData, loading: meLoading } = useQuery<MeResponse>(ME);
  const { data: booksData, loading: booksLoading } = useQuery<{
    allBooks: Book[];
  }>(ALL_BOOKS);

  if (!show) return null;
  if (meLoading || booksLoading) return <div>loading...</div>;

  const favoriteGenre = meData?.me?.favoriteGenre;
  const books = booksData?.allBooks?.filter((b: any) =>
    b.genres.includes(favoriteGenre)
  );

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre <strong>{favoriteGenre}</strong>
      </p>

      <table>
        <thead>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
        </thead>
        <tbody>
          {books!.map((b: any) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommended;

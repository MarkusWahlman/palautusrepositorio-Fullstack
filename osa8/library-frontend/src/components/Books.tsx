import { useQuery } from "@apollo/client/react";
import { ALL_BOOKS } from "../graphql/queries";
import type { Author } from "./Authors";
import { useState } from "react";

export type Book = {
  title: string;
  author: Author;
  published: number;
  genres: string[];
};

type BooksProps = {
  show: boolean;
};

const Books = ({ show }: BooksProps) => {
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  const { loading, error, data } = useQuery<{ allBooks: Book[] }>(ALL_BOOKS, {
    variables: selectedGenre ? { genre: selectedGenre } : {},
  });

  if (!show) {
    return null;
  }

  if (loading) return <div>Loading books...</div>;
  if (error) return <div>Error fetching books: {error.message}</div>;

  const books = data?.allBooks ?? [];

  const allGenres = Array.from(new Set(books.flatMap((b) => b.genres))).sort();

  return (
    <div>
      <h2>books</h2>

      {selectedGenre ? (
        <p>
          in genre <strong>{selectedGenre}</strong>
        </p>
      ) : (
        <p>showing all genres</p>
      )}

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <button onClick={() => setSelectedGenre(null)}>all genres</button>
        {allGenres.map((g) => (
          <button key={g} onClick={() => setSelectedGenre(g)}>
            {g}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Books;

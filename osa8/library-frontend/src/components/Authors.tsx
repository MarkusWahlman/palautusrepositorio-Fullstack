import { useMutation, useQuery } from "@apollo/client/react";
import { ALL_AUTHORS } from "../graphql/queries";
import { EDIT_AUTHOR } from "../graphql/mutations";
import { useState, type FormEvent } from "react";

export type Author = {
  name: string;
  born: number | null;
  bookCount: number;
};

type AuthorsProps = {
  show: boolean;
  isLoggedIn: boolean;
};

const Authors = ({ show, isLoggedIn }: AuthorsProps) => {
  const { data, loading, error } = useQuery<{ allAuthors: Author[] }>(
    ALL_AUTHORS
  );
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const bornInt = Number(born);

    if (!name || isNaN(bornInt)) return;

    await editAuthor({
      variables: { name, setBornTo: bornInt },
    });

    setName("");
    setBorn("");
  };

  if (!show) {
    return null;
  }

  if (loading) return <p>Loading authors...</p>;
  if (error) return <p>Error fetching authors: {error.message}</p>;

  const authors = data?.allAuthors ?? [];

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born ?? ""}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {isLoggedIn && (
        <>
          <h3>Set birthyear</h3>
          <form onSubmit={submit}>
            <div>
              <select value={name} onChange={(e) => setName(e.target.value)}>
                <option value="">Select author</option>
                {authors.map((a) => (
                  <option key={a.name} value={a.name}>
                    {a.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              born{" "}
              <input
                type="number"
                value={born}
                onChange={(e) => setBorn(e.target.value)}
              />
            </div>
            <button type="submit">update author</button>
          </form>
        </>
      )}
    </div>
  );
};

export default Authors;

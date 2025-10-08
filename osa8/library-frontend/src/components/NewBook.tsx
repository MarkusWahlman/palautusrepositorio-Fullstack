import { useMutation } from "@apollo/client/react";
import { useState, type FormEvent, type ChangeEvent } from "react";
import { ADD_BOOK } from "../graphql/mutations";
import { ALL_AUTHORS, ALL_BOOKS } from "../graphql/queries";

type NewBookProps = {
  show: boolean;
};

const NewBook = ({ show }: NewBookProps) => {
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [published, setPublished] = useState<string>("");
  const [genre, setGenre] = useState<string>("");
  const [genres, setGenres] = useState<string[]>([]);

  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
  });

  if (!show) {
    return null;
  }

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const publishedInt = Number(published);

    await addBook({
      variables: { title, author, published: publishedInt, genres },
    });

    setTitle("");
    setPublished("");
    setAuthor("");
    setGenres([]);
    setGenre("");
  };

  const addGenre = () => {
    if (genre.trim() !== "") {
      setGenres([...genres, genre]);
      setGenre("");
    }
  };

  const handleInputChange =
    (setter: (value: string) => void) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      setter(event.target.value);
    };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input value={title} onChange={handleInputChange(setTitle)} />
        </div>
        <div>
          author
          <input value={author} onChange={handleInputChange(setAuthor)} />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={handleInputChange(setPublished)}
          />
        </div>
        <div>
          <input value={genre} onChange={handleInputChange(setGenre)} />
          <button type="button" onClick={addGenre}>
            add genre
          </button>
        </div>
        <div>genres: {genres.join(" ")}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default NewBook;

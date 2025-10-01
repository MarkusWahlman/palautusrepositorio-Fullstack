import { useDispatch } from "react-redux";
import { useState } from "react";
import { showNotification } from "../redux/thunks/notificationThunks";
import type { AppDispatch } from "../redux/store";
import { createNewAnecdote } from "../redux/thunks/anecdotesThunks";

const AnecdoteForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [newContent, setNewContent] = useState("");

  const createNew = (event: React.FormEvent) => {
    event.preventDefault();

    dispatch(createNewAnecdote(newContent));

    dispatch(showNotification(`you created '${newContent}'`));

    setNewContent("");
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createNew}>
        <div>
          <input
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;

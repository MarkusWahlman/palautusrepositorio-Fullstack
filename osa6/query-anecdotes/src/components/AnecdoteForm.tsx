import { useMutation, useQueryClient } from "@tanstack/react-query";
import anecdoteService from "../services/anecdotes";
import { useState } from "react";
import { useNotification } from "../hooks/useNotification";

const AnecdoteForm = () => {
  const [newContent, setNewContent] = useState("");
  const showNotification = useNotification();
  const queryClient = useQueryClient();

  const newAnecdoteMutation = useMutation({
    mutationFn: (newContent: string) =>
      anecdoteService.create({ content: newContent, votes: 0 }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
      showNotification(`anecdote ${data.content} created`, 5);
    },
    onError: (data) => {
      showNotification(`too short anecdote, must have length 5 or more`, 5);
    },
  });

  const createNew = (event: React.FormEvent) => {
    event.preventDefault();
    if (newContent.trim() === "") return;

    newAnecdoteMutation.mutate(newContent);

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

import { useSelector, useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import { voteForId } from "../redux/slices/anecdotesSlice";
import { showNotification } from "../redux/thunks/notificationThunks";
import { fetchAnecdotes, voteAnecdote } from "../redux/thunks/anecdotesThunks";
import { useEffect } from "react";

const AnecdoteList = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchAnecdotes());
  }, [dispatch]);

  const anecdotes = useSelector((state: RootState) => {
    const filter = state.filter.toLowerCase();
    return state.anecdotes.filter((a) =>
      a.content.toLowerCase().includes(filter),
    );
  });

  const vote = (id: string, currentVotes: number, content: string) => {
    dispatch(voteAnecdote({ id, currentVotes }));
    dispatch(showNotification(`you voted '${content}'`));
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}{" "}
            <button
              onClick={() =>
                vote(anecdote.id, anecdote.votes, anecdote.content)
              }
            >
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;

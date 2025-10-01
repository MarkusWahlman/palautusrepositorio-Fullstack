import { useNotification } from "../hooks/useNotification";
import anecdoteService from "../services/anecdotes";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export interface Anecdote {
  content: string;
  id: string;
  votes: number;
}

const AnecdoteList = () => {
  const queryClient = useQueryClient();

  const {
    data: anecdotes = [],
    isLoading,
    isError,
    isPending,
  } = useQuery({
    queryKey: ["anecdotes"],
    queryFn: anecdoteService.getAll,
  });

  const showNotification = useNotification();

  const voteAnecdote = async ({
    id,
    currentVotes,
  }: {
    id: string;
    currentVotes: number;
  }) => {
    return anecdoteService.update(id, { votes: currentVotes + 1 });
  };

  const voteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
      showNotification(`anecdote ${data.content} voted`, 5);
    },
  });

  const vote = (id: string, currentVotes: number, content: string) => {
    voteMutation.mutate({ id, currentVotes });
  };

  if (isLoading) return <div>Loading anecdotes...</div>;
  if (isError || isPending)
    return <div>Anecdote service not available due to problems in server</div>;

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote: Anecdote) => (
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

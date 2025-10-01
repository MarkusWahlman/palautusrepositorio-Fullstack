import axios from "axios";
import type { Anecdote } from "../components/AnecdoteList";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async (): Promise<Anecdote[]> => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newAnecdote: Omit<Anecdote, "id">) => {
  const response = await axios.post<Anecdote>(baseUrl, newAnecdote);
  return response.data;
};

const update = async (id: string, updates: Partial<Anecdote>) => {
  const response = await axios.patch<Anecdote>(`${baseUrl}/${id}`, updates);
  return response.data;
};

export default { getAll, create, update };

export { getAll };

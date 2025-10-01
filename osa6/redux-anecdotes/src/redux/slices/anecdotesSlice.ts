import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Anecdote {
  content: string;
  id: string;
  votes: number;
}

const anecdotesSlice = createSlice({
  name: "anecdotes",
  initialState: [] as Anecdote[],
  reducers: {
    voteForId(state, action: PayloadAction<string>) {
      const id = action.payload;
      const anecdote = state.find((a: Anecdote) => a.id === id);
      if (anecdote) {
        anecdote.votes += 1;
      }
      state.sort((a: Anecdote, b: Anecdote) => b.votes - a.votes);
    },
    setAnecdotes(state, action: PayloadAction<Anecdote[]>) {
      return action.payload.sort((a, b) => b.votes - a.votes);
    },
    addNewAnecdote(state: Anecdote[], action: PayloadAction<Anecdote>) {
      state.push(action.payload);
      state.sort((a, b) => b.votes - a.votes);
    },
  },
});

export const { voteForId, addNewAnecdote, setAnecdotes } =
  anecdotesSlice.actions;
export default anecdotesSlice.reducer;

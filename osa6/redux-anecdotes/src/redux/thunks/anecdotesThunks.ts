import { createAsyncThunk } from "@reduxjs/toolkit";
import anecdoteService from "../../services/anecdotes";
import {
  addNewAnecdote,
  setAnecdotes,
  voteForId,
} from "../slices/anecdotesSlice";

export const fetchAnecdotes = createAsyncThunk(
  "anecdotes/fetchAnecdotes",
  async (_, { dispatch }) => {
    return dispatch(setAnecdotes(await anecdoteService.getAll()));
  },
);

export const createNewAnecdote = createAsyncThunk(
  "anecdotes/createNewAnecdote",
  async (newContent: string, { dispatch }) => {
    const newAnecdote = await anecdoteService.create({
      content: newContent,
      votes: 0,
    });

    return dispatch(addNewAnecdote(newAnecdote));
  },
);

interface VotePayload {
  id: string;
  currentVotes: number;
}

export const voteAnecdote = createAsyncThunk(
  "anecdotes/voteAnecdote",
  async ({ id, currentVotes }: VotePayload, { dispatch }) => {
    const updatedAnecdote = await anecdoteService.update(id, {
      votes: currentVotes + 1,
    });

    return dispatch(voteForId(updatedAnecdote.id));
  },
);

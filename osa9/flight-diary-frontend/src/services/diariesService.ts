import axios, { type AxiosResponse } from "axios";
import type { Diary, NewDiary } from "../types/diary";

const API_URL = "http://localhost:3000/api/diaries";

export const getAllDiaries = async (): Promise<Diary[]> => {
  const response: AxiosResponse<Diary[]> = await axios.get(API_URL);
  return response.data;
};

export const createDiary = async (newDiary: NewDiary) => {
  const res = await axios.post<Diary>(API_URL, newDiary);
  return res.data;
};

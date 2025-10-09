import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDiary } from "../services/diariesService";
import { isAxiosError } from "axios";
import { Weather, Visibility, type NewDiary } from "../types/diary";

const DiaryForm = () => {
  const queryClient = useQueryClient();

  const [date, setDate] = useState("");
  const [weather, setWeather] = useState<Weather | "">("");
  const [visibility, setVisibility] = useState<Visibility | "">("");
  const [comment, setComment] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: (newDiary: NewDiary) => createDiary(newDiary),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["diaries"] });
      setDate("");
      setWeather("");
      setVisibility("");
      setComment("");
      setErrorMessage(null);
    },
    onError: (error: unknown) => {
      if (isAxiosError(error)) {
        const backendMessage =
          (typeof error.response?.data === "string"
            ? error.response.data
            : error.response?.data?.message) || error.message;
        setErrorMessage(backendMessage || "Failed to create diary.");
      } else if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("An unknown error occurred.");
      }
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!date || !weather || !visibility) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    const newDiary: NewDiary = { date, weather, visibility, comment };
    mutation.mutate(newDiary);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Diary</h2>

      <div>
        <label htmlFor="date">Date:</label>
        <input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>

      <fieldset>
        <legend>Weather:</legend>
        {Object.values(Weather).map((option) => (
          <label key={option}>
            <input
              type="radio"
              name="weather"
              value={option}
              checked={weather === option}
              onChange={() => setWeather(option)}
              required
            />
            {option}
          </label>
        ))}
      </fieldset>

      <fieldset>
        <legend>Visibility:</legend>
        {Object.values(Visibility).map((option) => (
          <label key={option}>
            <input
              type="radio"
              name="visibility"
              value={option}
              checked={visibility === option}
              onChange={() => setVisibility(option)}
              required
            />
            {option}
          </label>
        ))}
      </fieldset>

      <div>
        <label htmlFor="comment">Comment:</label>
        <input
          id="comment"
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment"
        />
      </div>

      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? "Saving..." : "Save Diary"}
      </button>

      {errorMessage && <p>Error: {errorMessage}</p>}
      {mutation.isSuccess && !errorMessage && <p>Diary added successfully!</p>}
    </form>
  );
};

export default DiaryForm;

import { useQuery } from "@tanstack/react-query";
import { getAllDiaries } from "../services/diariesService";

const Diaries = () => {
  const {
    isPending,
    error,
    data: diaries,
  } = useQuery({
    queryKey: ["diaries"],
    queryFn: getAllDiaries,
  });

  if (isPending) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <div>
      <ul>
        {diaries.map((diary) => {
          return (
            <li>
              <p>Date: {diary.date}</p>
              <p>Visibility: {diary.visibility}</p>
              <p>Weather: {diary.weather}</p>
              <p>Comment: {diary.comment}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Diaries;

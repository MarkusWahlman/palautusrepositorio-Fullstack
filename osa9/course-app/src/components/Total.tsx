import type { CoursePart } from "../types/course";

interface TotalProps {
  courseParts: CoursePart[];
}

export const Content = ({ courseParts }: TotalProps) => {
  const totalExercises = courseParts.reduce(
    (sum, part) => sum + part.exerciseCount,
    0
  );

  return (
    <>
      <p>Number of exercises {totalExercises}</p>
    </>
  );
};

export default Content;

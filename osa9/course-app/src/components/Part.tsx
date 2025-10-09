import type { CoursePart } from "../types/course";

interface PartProps {
  part: CoursePart;
}

const Part = ({ part }: PartProps) => {
  switch (part.kind) {
    case "basic":
      return (
        <p>
          <b>{part.name}</b> ({part.exerciseCount} exercises)
          <br />
          <i>{part.description}</i>
        </p>
      );

    case "group":
      return (
        <p>
          <b>{part.name}</b> ({part.exerciseCount} exercises)
          <br />
          Project exercises: {part.groupProjectCount}
        </p>
      );

    case "background":
      return (
        <p>
          <b>{part.name}</b> ({part.exerciseCount} exercises)
          <br />
          <i>{part.description}</i>
          <br />
          Background material:{" "}
          <a href={part.backgroundMaterial}>{part.backgroundMaterial}</a>
        </p>
      );

    case "special":
      return (
        <p>
          <b>{part.name}</b> ({part.exerciseCount} exercises)
          <br />
          <i>{part.description}</i>
          <br />
          Required skills: {part.requirements.join(", ")}
        </p>
      );

    default: {
      const exhaustiveCheck: never = part;
      throw new Error(`Unhandled course part kind: ${exhaustiveCheck}`);
    }
  }
};

export default Part;

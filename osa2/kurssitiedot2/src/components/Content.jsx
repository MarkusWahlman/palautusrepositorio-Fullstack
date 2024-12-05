import Part from "./Part"

const Content = (props) => {  return (
    <>
      {props.parts.map((part, index) => (
        <Part key={part.name} part={part.name} exercise={part.exercises} />
      ))}
    </>
  )
}

export default Content
const Total = (props) => { 
  const total = props.parts.reduce((sum, part) => sum + part.exercises, 0);

  return (
    <>
        <p>total of {total}</p>
    </>
  )
}

export default Total
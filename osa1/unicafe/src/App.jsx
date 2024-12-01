import { useState } from 'react'

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  const good = props.good
  const neutral = props.neutral
  const bad = props.bad

  const totalCount = good+neutral+bad || 0
  const totalPoints = (bad*-1)+good
  const average = totalPoints/totalCount || 0
  const positive = (good/totalCount)*100 || 0

  return (
    <>
    <h1>statistics</h1>
    <table>
    <tbody>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={totalCount} />
      <StatisticLine text="average" value={average} />
      <StatisticLine text="positive" value={positive + ' %'} />
    </tbody>
  </table>
  </>
  )
}


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={()=>{setGood(good+1)}}>
        good
      </button>
      <button onClick={()=>{setNeutral(neutral+1)}}>
        neutral
      </button>
      <button onClick={()=>{setBad(bad+1)}}>
        bad
      </button>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App
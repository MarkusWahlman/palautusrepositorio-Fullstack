import React from 'react'
import ReactDOM from 'react-dom/client'

import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const dispatchClick = (type) => {
    store.dispatch({
      type: type
    })
  }

  return (
    <div>
      <button onClick={()=>{dispatchClick("GOOD")}}>good</button> 
      <button onClick={()=>{dispatchClick("OK")}}>ok</button> 
      <button onClick={()=>{dispatchClick("BAD")}}>bad</button> 

      <button onClick={()=>{dispatchClick("ZERO")}}>reset stats</button> 
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)

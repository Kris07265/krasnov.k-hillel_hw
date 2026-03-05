import { useState } from 'react'
import Card from './components/Card.jsx'
import './App.css'

function App() {
  return (
      <>
      <Card title={'Welcome'}/>
      <Card text={'World'}/>
      <Card title={'Welcome'} text={'World'}/>
      </>
)
}

export default App

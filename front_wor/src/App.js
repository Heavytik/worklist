import React, { useState, useEffect } from 'react';
import './App.css';
import PersonTable from './components/PersonTable'
import axios from 'axios'


const App = () => {

  const [ persons, setPersons ] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:3001/api/persons')
      .then(response => {
        console.log(response)
        setPersons(response.data)
      })
  })
  
  console.log(persons)
  

  return (
    <div className="App">
      <h1>Työlista</h1>
      <PersonTable persons={persons} />
    </div>
  )
}

export default App;

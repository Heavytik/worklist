import React, { useState, useEffect } from 'react';
import './App.css';
import PersonTable from './components/PersonTable'
import axios from 'axios'

const backendBaseURL = 'localhost:3001'


const App = () => {

  const [ persons, setPersons ] = useState([])
  const [ addForName, setAddForName ] = useState('')
  const [ newTask, setNewTask ] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/api/persons')
      .then(response => {
        console.log('REQUEST...')
        setPersons(response.data)
        setAddForName(response.data[0].name)
      })
  }, [])
  
  const handleSelectChange = event => setAddForName(event.target.value)
  const handleNewTaskChange = event => setNewTask(event.target.value)
  
  const handleSubmit = event => {
    event.preventDefault()
    console.log('submit')

    const personToModify = persons.find(person => person.name === addForName)
    const id = personToModify._id
    const url = `http://localhost:3001/api/persons/${id}`
    const changedPerson = { ...personToModify, tasks: personToModify.tasks.concat(newTask)}
    setNewTask('')
    axios
      .put(url, changedPerson).then(response => {
        
        setPersons(persons.map(person => person._id !== id ? person : response.data))
      })
  }
  
  return (
    <div className="App">
      <h1>Työlista</h1>
      <PersonTable persons={persons} />
      <h2>Lisää tehtävä</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nimi:
          <select value={addForName} onChange={handleSelectChange}>
            {console.log('persons data', persons)}
            {persons.map(person => <option key={person.name} value={person.name}>{person.name}</option>)}
          </select>
        </label>
          Tehtävä: <input
            value={newTask}
            onChange={handleNewTaskChange}
          />
          <button type="submit">tallenna</button>
      </form>
    </div>
  )
}

export default App;

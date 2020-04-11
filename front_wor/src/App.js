import React, { useState, useEffect } from 'react';
import './App.css';
import PersonTable from './components/PersonTable'
import axios from 'axios'
import TaskForm from './components/TaskForm';

//const backendBaseURL = 'localhost:3001'

const App = () => {

  const [ persons, setPersons ] = useState([])
  const [ addForName, setAddForName ] = useState('')
  const [ newTask, setNewTask ] = useState('')
  const [ isUser, setIsUser ] = useState(false)
  const [ isAdmin , setIsAdmin ] = useState(false)
  const [ tryPw, setTryPw] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/api/persons')
      .then(response => {
        console.log('REQUEST...')
        setPersons(response.data)
        setAddForName(response.data[0].name)
      })
  }, [])

  const theUserWord = "hi"
  const theWord = 'whoareyou' 
  
  const handleSelectChange = event => setAddForName(event.target.value)
  const handleNewTaskChange = event => setNewTask(event.target.value)
  const handlePwChange = event => setTryPw(event.target.value)
  const handleLogOut = () => {
    setIsAdmin(false)
    setTryPw('')
  }

  const handleTaskRemove = (name, task) => () => {
    if(isAdmin) {
    const personToModify = persons.find(person => person.name === name)
    const id = personToModify._id
    const url = `http://localhost:3001/api/persons/${id}`
    const changedPerson = { ...personToModify, tasks: personToModify.tasks.filter(currentTask => currentTask !== task)}
    axios
      .put(url, changedPerson).then(response => {
        setPersons(persons.map(person => person._id !== id ? person : response.data))
      })
    }
  }
  
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

  const handlePwSubmit = event => {
    event.preventDefault()
    console.log('submit pw')
    console.log(tryPw)
    if(tryPw === theUserWord) {
      setIsUser(true)
    }
    if(tryPw === theWord) {
      setIsAdmin(true)
    }
    setTryPw('')
  }

  const taskTable = () => {
    if(isUser) {
      return(
        <PersonTable persons={persons} handleTaskRemove={handleTaskRemove}/>
      )
    } else {
      return(
        <div className="weNeedMoreSpaceUpDown">
          Sinun täytyy antaa taikaloru
        </div>
      )
    }
  }
  
  return (
    <div className="container">
      <h1 className="weNeedMoreSpaceUpDown">Työlista</h1>
      {taskTable()}
      <TaskForm
        persons={persons}
        addForName={addForName}
        newTask={newTask}
        isAdmin={isAdmin}
        handleSelectChange={handleSelectChange}
        handleNewTaskChange={handleNewTaskChange}
        handleSubmit={handleSubmit}
        tryPw={tryPw}
        handlePwChange={handlePwChange}
        handlePwSubmit={handlePwSubmit}
        handleLogOut={handleLogOut}
      />
    </div>
  )
}

export default App;

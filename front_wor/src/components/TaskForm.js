import React from 'react'
import '../App.css';
import { Form, Button } from 'react-bootstrap'


const TaskForm = ({persons, addForName, newTask, isAdmin, handleSelectChange,
    handleNewTaskChange, handleSubmit, tryPw, handlePwChange, handlePwSubmit,
    handleLogOut}) => {
  if(!isAdmin) {
    return(
      <div>
        <Form onSubmit={handlePwSubmit}>
          <Form.Label>taikaloru:</Form.Label>
          <Form.Control
            type="password"
            value={tryPw}
            onChange={handlePwChange}
          />
          <Button className="weNeedMoreSpaceUpDown" type="submit">Lue loru</Button>
        </Form>
      </div>
    )
  } else {
  return (
    <div>
      <h2>Lisää tehtävä</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
        <Form.Label>Nimi:</Form.Label>
          <select className="weNeedMoreSpace" value={addForName} onChange={handleSelectChange}>
            {console.log('persons data', persons)}
            {persons.map(person => <option key={person.name} value={person.name}>{person.name}</option>)}
          </select>
        <div>
        <Form.Label>Tehtävä:</Form.Label> 
        <Form.Control
            type="text"
            value={newTask}
            onChange={handleNewTaskChange}
          />
          </div>
          <Button className="weNeedMoreSpaceUpDown" type="submit">Lisää tehtävä</Button>
          <Button className="weNeedMoreSpace" onClick={handleLogOut}>Kirjaudu ulos</Button>
          </Form.Group>
      </Form>
    </div>
  )
  }
}

export default TaskForm
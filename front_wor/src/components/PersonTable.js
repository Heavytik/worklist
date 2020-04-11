import React from 'react'
import { Table, ListGroup } from 'react-bootstrap'

const PersonTable = ({persons, handleTaskRemove}) => {
  
  const doTaskList = (person) => person.tasks.map(task => <ListGroup.Item key={task} onClick={handleTaskRemove(person.name, task)}>{task}</ListGroup.Item>)
  const personsTask = persons.map(person => <tr key={person.name}><th>{person.name}</th><th><ListGroup>{doTaskList(person)}</ListGroup></th></tr>)

  return (
    <div>
      <Table striped>
        <tbody>
          {personsTask}
        </tbody>
      </Table>
    </div>
  )

}

export default PersonTable
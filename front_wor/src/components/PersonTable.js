import React from 'react'

const PersonTable = ({persons, handleTaskRemove}) => {
  
  const doTaskList = (person) => person.tasks.map(task => <li key={task} onClick={handleTaskRemove(person.name, task)}>{task}</li>)
  const personsTask = persons.map(person => <tr key={person.name}><th>{person.name}</th><th><ul>{doTaskList(person)}</ul></th></tr>)

  return (
    <div>
      <table>
        <tbody>
          {personsTask}
        </tbody>
      </table>
    </div>
  )

}

export default PersonTable
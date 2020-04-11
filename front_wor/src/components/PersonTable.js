import React from 'react'

const PersonTable = ({persons}) => {
  
  const doTaskList = (tasks) => tasks.map(task => <li key={task}>{task}</li>)
  const personsTask = persons.map(person => <tr key={person.name}><th>{person.name}</th><th><ul>{doTaskList(person.tasks)}</ul></th></tr>)

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
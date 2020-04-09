import React from 'react'
import Task from './Task'

const PersonTable = (props) => {

  const persons = props.persons

  return (
    <div id="table">
        <table>
        <tbody>
          {
            persons.map(person => <Task key={person.name} name={person.name} task={person.tasks[0]} />)
          }
      </tbody>
      </table>
    </div>
  )

}

export default PersonTable
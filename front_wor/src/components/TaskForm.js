import React from 'react'

const TaskForm = (props) => {
  return (
    <div>
      <h2>Lisää tehtävä</h2>
      <form>
        <label>
          <p>Nimi:</p>
          <select value={props.taskName} onChange={props.handleSelectChange}>
            {props.names.map(name => <option key={name} value={name}>{name}</option>)}
          </select>
        </label>
          <p>Tehtävä:</p> <input
            value={props.newTask}
            onChange={props.handleNewTaskChange}
          />
          <button type="submit" onSubmit={props.handleSubmit}>tallenna</button>
      </form>
    </div>
  )
}

export default TaskForm
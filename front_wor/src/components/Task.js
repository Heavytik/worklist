import React from 'react'

const Task = ({name, task}) => {

  const cellStyle = {
  	padding: 10
  }

  return(
  	<tr>
    <th style={cellStyle}>{name}</th><th style={cellStyle}>{task}</th>
    </tr>
  )

}

export default Task
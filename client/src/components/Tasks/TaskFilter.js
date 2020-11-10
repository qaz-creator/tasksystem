import React, { useContext } from 'react'
import TaskContext from '../../context/TaskContext/TaskContext'

/**
 * @author
 * @function TaskFilter
 **/

const TaskFilter = (props) => {
  const { toggleFilter } = useContext(TaskContext)
  return (
    <div className="toggle">
      <label className="switch">
        <input type="checkbox" onChange={() => toggleFilter()} />
        <span className="slider round"></span>
      </label>
      <p className="lead">Show in processing tasks only!</p>
    </div>
  )
}

export default TaskFilter

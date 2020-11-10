import React, { useContext } from 'react'
import TaskContext from '../../context/TaskContext/TaskContext'

/**
 * @author
 * @function Task
 **/
// the first task comes from property
const Task = ({ task }) => {
  const { _id, name, detail, level, iscompleted } = task
  const { removeTask, updateTask, editTask,clearEdit } = useContext(TaskContext)
  const handleRemove = () => {
    removeTask(_id)
    clearEdit()
  }
  const handleIscompleted = () => {
    updateTask({ ...task, iscompleted: !iscompleted })
  }
  return (
    <div className="guest-card">
      <div className="card-head">
        <div>
          <label className={`${iscompleted && 'confirm'}`}>
            Completed
            <i className={`fas fa-check-square ${iscompleted && 'confirm'}`}>
              <input type="checkbox" onChange={handleIscompleted} />
            </i>
          </label>
        </div>
        <div>
          <button onClick={() => editTask(task)}>
            <i className="fas fa-user-edit"></i>
          </button>
          <button onClick={handleRemove}>
            <i className="fas fa-trash-alt remove"></i>
          </button>
        </div>
      </div>
      <div className="card-body">
        <h2>{name}</h2>
        <span
          className={`badge +
            ${
              level === 'Emergency'
                ? 'red'
                : level === 'Normal'
                ? 'green'
                : 'Important'
            }`}
        >
          {level}
        </span>
        <div className="contact">
          <i className="fas fa-detail-alt" />
          <p>{detail}</p>
        </div>
      </div>
    </div>
  )
}

export default Task

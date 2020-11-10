import React, { useContext, useEffect, useState } from 'react'
import TaskContext from '../../context/TaskContext/TaskContext'

/**
 * @author
 * @function TaskForm
 **/

const TaskForm = (props) => {
  const { addTasks, editAble, updateTask, clearEdit } = useContext(TaskContext)

  const [task, setTask] = useState({
    name: '',
    detail: '',
    level: 'Normal',
  })
  useEffect(() => {
    if (editAble !== null) {
      setTask(editAble)
    } else {
      setTask({
        name: '',
        detail: '',
        level: 'Normal',
      })
    }
  }, [editAble])

  const { name, detail, level } = task
  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    })
  }
  const onsubmit = (e) => {
    e.preventDefault()
    if (editAble !== null) {
      updateTask(task)
      clearEdit()
    } else {
      addTasks(task)
      setTask({
        name: '',
        detail: '',
        level: 'Normal',
      })
    }
  }
  return (
    <div className="invite-section">
      <h1>{editAble !== null ? `Edit Task` : `Add Task`}</h1>
      <form onSubmit={onsubmit}>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={name}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="detail"
          name="detail"
          value={detail}
          onChange={handleChange}
        />
        <p className="options-label">level</p>
        <div className="options">
          <label className="container">
            Normal
            <input
              type="radio"
              name="level"
              value="Normal"
              checked={level === 'Normal'}
              onChange={handleChange}
            />
            <span className="checkmark"></span>
          </label>
          <label className="container">
            Important
            <input
              type="radio"
              name="level"
              value="Important"
              onChange={handleChange}
              checked={level === 'Important'}
            />
            <span className="checkmark"></span>
          </label>
          <label className="container">
            Emergency
            <input
              type="radio"
              name="level"
              value="Emergency"
              onChange={handleChange}
              checked={level === 'Emergency'}
            />
            <span className="checkmark"></span>
          </label>
        </div>
        <input
          type="submit"
          value={editAble !== null ? `Update Task` : `Add Task`}
          className="btn"
        />
        {editAble !== null ? (
          <input
            onClick={clearEdit}
            type="button"
            value="Cancel"
            className="btn clear"
          />
        ) : null}
      </form>
    </div>
  )
}

export default TaskForm

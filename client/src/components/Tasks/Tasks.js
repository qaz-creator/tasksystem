import React, { useContext, useEffect } from 'react'
import TaskContext from '../../context/TaskContext/TaskContext'
import Task from './Task'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import AuthContext from '../../context/AuthContext/authContext'
/**
 * @author
 * @function Tasks
 **/

const Tasks = (props) => {
  const { loading } = useContext(AuthContext)

  const { tasks, filterTask, search, getTasks } = useContext(TaskContext)
  useEffect(() => {
    getTasks()
    // eslint-disable-next-line
  }, [])

  if (tasks === null || tasks.length === 0) {
    return (
      <h3 className="no-guest">
        {loading ? 'Loading tasks...' : 'Please add a task'}
      </h3>
    )
  }

  return (
    <TransitionGroup className="guests">
      {search !== null
        ? search.map((task) => (
            <CSSTransition key={task._id} timeout={300}>
              <Task task={task} />
            </CSSTransition>
          ))
        : tasks
            .filter((task) => !filterTask || !task.iscompleted)
            .map((task) => (
              <CSSTransition key={task._id} timeout={300}>
                <Task task={task} />
              </CSSTransition>
            ))}
    </TransitionGroup>
  )
}

export default Tasks

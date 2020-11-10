import axios from 'axios'
import React, { useReducer } from 'react'
import {
  ADD_TASK,
  // ALL_GUESTS,
  CLEAR_EDIT,
  CLEAR_SEARCH,
  EDIT_TASK,
  GET_TASKS,
  REMOVE_TASK,
  SEARCH_TASK,
  TASKS_ERROR,
  TOGGLE_FILTER,
  UPDATE_TASK,
} from '../types'
import TaskContext from './TaskContext'
import TaskReducer from './TaskReducer'

/**
 * @author
 * @function TaskState
 **/

const TaskState = (props) => {
  const initialState = {
    filterTask: false,
    search: null,
    editAble: null,
    tasks: [],
    errors: null,
  }
  // change from initialState, change through useReducer dispatch, change returns to state
  const [state, dispatch] = useReducer(TaskReducer, initialState)

  // get all Guests
  // const allGuests = async () => {
  //   try {
  //     const res = await axios.get('/all')
  //     dispatch({
  //       type: ALL_GUESTS,
  //       payload: res.data,
  //     })
  //   } catch (err) {
  //     dispatch({
  //       type: TASKS_ERROR,
  //       payload: err.response.msg,
  //     })
  //   }
  // }

  // get Tasks
  const getTasks = async () => {
    try {
      const res = await axios.get('/tasks')
      dispatch({
        type: GET_TASKS,
        payload: res.data,
      })
    } catch (err) {
      dispatch({
        type: TASKS_ERROR,
        payload: err.response.msg,
      })
    }
  }

  const addTasks = async (task) => {
    const config = {
      'Content-Type': 'application/json',
    }
    try {
      const res = await axios.post('/tasks', task, config)
      dispatch({
        type: ADD_TASK,
        payload: res.data,
      })
    } catch (err) {
      dispatch({
        type: TASKS_ERROR,
        payload: err.response.msg,
      })
    }
  }

  const removeTask = async (id) => {
    try {
      await axios.delete(`/tasks/${id}`)
      dispatch({
        type: REMOVE_TASK,
        payload: id,
      })
    } catch (err) {
      dispatch({
        type: TASKS_ERROR,
        payload: err.response.msg,
      })
    }
  }

  const updateTask = async (task) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    try {
      const res = await axios.put(`/tasks/${task._id}`, task, config)
      dispatch({
        type: UPDATE_TASK,
        payload: res.data,
      })
      getTasks()
    } catch (err) {
      dispatch({
        type: TASKS_ERROR,
        payload: err.response.msg,
      })
    }
  }

  const editTask = (task) => {
    dispatch({
      type: EDIT_TASK,
      payload: task,
    })
  }
  const clearEdit = () => {
    dispatch({
      type: CLEAR_EDIT,
    })
  }

  const toggleFilter = () => {
    dispatch({
      type: TOGGLE_FILTER,
    })
  }
  const searchTask = (task) => {
    dispatch({
      type: SEARCH_TASK,
      payload: task,
    })
  }

  const clearSearch = () => {
    dispatch({
      type: CLEAR_SEARCH,
    })
  }
  return (
    <TaskContext.Provider
      value={{
        tasks: state.tasks,
        filterTask: state.filterTask,
        search: state.search,
        editAble: state.editAble,
        getTasks,
        addTasks,
        removeTask,
        updateTask,
        editTask,
        clearEdit,
        toggleFilter,
        searchTask,
        clearSearch,
      }}
    >
      {props.children}
    </TaskContext.Provider>
  )
}

export default TaskState

import React, { useContext, useRef } from 'react'
import TaskContext from '../../context/TaskContext/TaskContext'

/**
 * @author
 * @function TaskSearch
 **/

const TaskSearch = (props) => {
  const { searchTask, clearSearch } = useContext(TaskContext)
  const searchValue = useRef('')
  const handleChange = (e) => {
    // not empty, searchTask; if empty, clearSearch()
    if (searchValue.current.value !== '') {
      searchTask(e.target.value)
    } else {
      clearSearch()
    }
  }
  return (
    <div>
      <input
        ref={searchValue}
        onChange={handleChange}
        type="text"
        className="search"
        placeholder=" Search Task by name ..."
      />
      <i className="fas fa-search search-icon" />
    </div>
  )
}

export default TaskSearch

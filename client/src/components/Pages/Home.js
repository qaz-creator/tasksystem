import React, { useContext, useEffect } from 'react'
import AuthContext from '../../context/AuthContext/authContext'
import TaskFilter from '../Tasks/TaskFilter'
import TaskSearch from '../Tasks/TaskSearch'
import TaskForm from '../Tasks/TaskForm'
import CountTask from '../Tasks/TaskCounter'
import Tasks from '../Tasks/Tasks'
/**
 * @author
 * @function Home
 **/
// now we already have the token as header
const Home = (props) => {
  const { getUser } = useContext(AuthContext)
  useEffect(() => {
    getUser()
  }, [])
  // Now we have a specific user
  return (
    <div className="app-container">
      <div className="main">
        <div className="filter">
          <TaskFilter />
          <TaskSearch />
        </div>
        <TaskForm />
        <CountTask />
      </div>
      <Tasks />
    </div>
  )
}

export default Home

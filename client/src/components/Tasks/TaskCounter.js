import React, { useContext } from 'react'
import TaskContext from '../../context/TaskContext/TaskContext'

const CountTask = () => {
  const { tasks } = useContext(TaskContext)
  // total completed
  const completed = tasks.filter((task) => task.iscompleted)
  // count by level
  const countByLevel = (level) => {
    return {
      total: tasks.filter((task) => task.level === level).length,
      completed: completed.filter((task) => task.level === level).length,
    }
  }

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th>Task</th>
            <th>All</th>
            <th>Completed</th>
            <th>In Processing</th>
          </tr>
          <tr>
            <th>Normal</th>
            <td>{countByLevel('Normal').total}</td>
            <td>{countByLevel('Normal').completed}</td>
            <td>
              {countByLevel('Normal').total - countByLevel('Normal').completed}
            </td>
          </tr>
          <tr>
            <th>Important</th>
            <td>{countByLevel('Important').total}</td>
            <td>{countByLevel('Important').completed}</td>
            <td>
              {countByLevel('Important').total -
                countByLevel('Important').completed}
            </td>
          </tr>
          <tr>
            <th>Emergency</th>
            <td>{countByLevel('Emergency').total}</td>
            <td>{countByLevel('Emergency').completed}</td>
            <td>
              {countByLevel('Emergency').total -
                countByLevel('Emergency').completed}
            </td>
          </tr>
          <tr>
            <th>Total</th>
            <td>{tasks.length}</td>
            <td>{completed.length}</td>
            <td>{tasks.length - completed.length}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default CountTask

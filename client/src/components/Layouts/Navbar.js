import React, { Fragment, useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/AuthContext/authContext'

/**
 * @author
 * @function Navbar
 **/

const Navbar = (props) => {
  const { logout, clearError, userAuth, user } = useContext(AuthContext)
  const onLogout = () => {
    logout()
    clearError()
  }
  const userLinks = (
    <Fragment>
      <li>Hello, {user && user.name}</li>
      {/* <span className="sm-hide">|</span> */}
      <li>
        <a href="#!" onClick={onLogout}>
          <span className="sm-hide">Logout</span>
          <i className="fas fa-sign-out-alt"></i>
        </a>
      </li>
    </Fragment>
  )
  const authLinks = (
    <Fragment>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </Fragment>
  )
  return (
    <div className="navbar">
      <div className="logo">
        <h1>
          <i className="fas fa-tasks" />
          Task System
        </h1>
        <p>
          Made with <span>❤</span>
        </p>
      </div>
      <ul>{userAuth ? userLinks : authLinks}</ul>
    </div>
  )
}

export default Navbar

import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/AuthContext/authContext'
/**
 * @author
 * @function Login
 **/

const Login = (props) => {
  const { userAuth, errors, loginUser, clearError } = useContext(AuthContext)
  useEffect(() => {
    if (userAuth) {
      props.history.push('/')
      clearError()
    } else {
      clearError()
    }
    // eslint-disable-next-line
  }, [userAuth, props.history])

  const [user, setUser] = useState({
    email: '',
    password: '',
  })
  const { email, password } = user

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
    if (errors !== null) {
      clearError()
    }
  }

  const submit = (e) => {
    e.preventDefault()

    loginUser({ email, password })
    console.log(errors)
    clearError()
  }
  return (
    <div className="login">
      <h1>Login</h1>
      <form onSubmit={submit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <input type="submit" value="Login" className="btn" />
      </form>
      <div className="question">
        {errors !== null && (
          <button className="danger">
            {errors.msg ? errors.msg : 'errors.error[0].msg'}
            <span onClick={() => clearError()}>X</span>
          </button>
        )}
        <p>
          Dont' have an accout? <Link to="/register">Sign Up</Link>
        </p>
      </div>
    </div>
  )
}

export default Login

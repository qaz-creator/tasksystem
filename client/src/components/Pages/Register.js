import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/AuthContext/authContext'
/**
 * @author
 * @function Register
 **/

const Register = (props) => {
  const { userAuth, errors, registerUser, setError, clearError } = useContext(
    AuthContext,
  )

  useEffect(() => {
    if (userAuth) {
      props.history.push('/')
    }
  }, [userAuth])

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })
  const { name, email, password, password2 } = user

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
    clearError()
  }

  const submit = (e) => {
    e.preventDefault()
    if (password !== password2) {
      setError({ msg: "Passwords don't match" })
    } else {
      registerUser({ name, email, password })
      console.log(errors)
      clearError()
    }
  }
  return (
    <div className="register">
      <h1>Sign Up</h1>
      <form onSubmit={submit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password2"
          placeholder="Confirm Password"
          value={password2}
          onChange={handleChange}
          required
        />
        <input type="submit" value="Sign Up" className="btn" />
      </form>
      <div className="question">
        {errors !== null && (
          <button className="danger">
            {errors.msg ? errors.msg : 'ok'}
            <span onClick={() => clearError()}>X</span>
          </button>
        )}
        <p>
          Already have an accout? <Link to="/login">Sign In </Link>
        </p>
      </div>
    </div>
  )
}

export default Register

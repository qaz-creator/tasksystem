import React, { useReducer } from 'react'
import axios from 'axios'
import AuthContext from './authContext'
import AuthReducer from './authReducer'
import {
  SUCCESS_REGISTER,
  FAIL_REGISTER,
  SUCCESS_LOGIN,
  FAIL_LOGIN,
  SET_ERROR,
  CLEAR_ERROR,
  LOG_OUT,
  SET_USER,
  AUTH_ERROR,
} from '../types'
import setAuthToken from '../../utils/setAuthToken'
/**
 * @author
 * @function AuthState
 **/

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem('token'),
    loading: true,
    user: null,
    userAuth: null,
    errors: null,
  }
  const [state, dispatch] = useReducer(AuthReducer, initialState)

  // get User
  const getUser = async () => {
    if (localStorage.token) {
      // if localstorage has a token, then it will sign to the header
      setAuthToken(localStorage.token)
    }
    try {
      const res = await axios.get('/auth')
      dispatch({
        type: SET_USER,
        payload: res.data,
      })
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
        payload: err,
      })
    }
  }

  //   register user
  const registerUser = async (userData) => {
    const config = {
      header: { 'Content-type': 'application/json' },
    }

    try {
      const res = await axios.post('/register', userData, config)
      dispatch({
        type: SUCCESS_REGISTER,
        payload: res.data,
      })
      getUser()
    } catch (err) {
      dispatch({
        type: FAIL_REGISTER,
        payload: err.response.data,
      })
    }
  }

  //   login user
  const loginUser = async (userData) => {
    const config = {
      header: { 'Content-type': 'application/json' },
    }

    try {
      const res = await axios.post('/auth', userData, config)
      dispatch({
        type: SUCCESS_LOGIN,
        payload: res.data,
      })
      getUser()
    } catch (err) {
      dispatch({
        type: FAIL_LOGIN,
        payload: err.response.data,
      })
    }
  }
  // logout user
  const logout = () => {
    dispatch({
      type: LOG_OUT,
    })
  }
  const setError = (err) => {
    dispatch({
      type: SET_ERROR,
      payload: err,
    })
  }

  const clearError = (err) => {
    dispatch({
      type: CLEAR_ERROR,
    })
  }
  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        loading: state.loading,
        user: state.user,
        userAuth: state.userAuth,
        errors: state.errors,
        getUser,
        registerUser,
        loginUser,
        logout,
        setError,
        clearError,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthState

import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'
import AuthContext from '../../../context/AuthContext/authContext'

/**
 * @author
 * @function PrivateRoute
 **/
// destructure the components
const PrivateRoute = ({ component: Component, ...rest }) => {
  const { userAuth } = useContext(AuthContext)
  return (
    <Route
      {...rest}
      render={(props) =>
        !userAuth ? <Redirect to="/login" /> : <Component {...props} />
      }
    />
  )
}

export default PrivateRoute

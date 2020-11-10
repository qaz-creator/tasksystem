import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './components/Layouts/Navbar'
import Home from './components/Pages/Home'
import TaskState from './context/TaskContext/TaskState'
import Register from './components/Pages/Register'
import Login from './components/Pages/Login'
import AuthState from './context/AuthContext/authState'
import PrivateRoute from './components/Pages/routes/PrivateRoute'
import setAuthToken from './utils/setAuthToken'


if(localStorage.token){
  // if localstorage has a token, then it will sign to the header 
  setAuthToken(localStorage.token)
}
function App() {
  return (
    <AuthState>
      <TaskState>
        <Router>
          <div>
            <Navbar />
            <Switch>
              {/* <Route exact path='/all' component={All} /> */}
              <PrivateRoute exact path="/" component={Home} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
            </Switch>
          </div>
        </Router>
      </TaskState>
    </AuthState>
  )
}

export default App

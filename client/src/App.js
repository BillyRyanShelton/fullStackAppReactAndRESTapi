import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PrivateRoute from './Components/PrivateRoute';
import NotFound from './Components/NotFound';
import UserSignOut from './Components/UserSignOut';
import UserSignUp from './Components/UserSignUp';
import UserSignIn from './Components/UserSignIn';
import CourseDetail from './Components/CourseDetail';
import UpdateCourse from './Components/UpdateCourse';
import CreateCourse from './Components/CreateCourse';
import Courses from './Components/Courses';


class App extends Component {

  //state for this component is initialized
  constructor(props) {
    super(props);
    this.state = {
      userLoggedIn: '',
      username:'',
      password:'',
      first: '',
      last: ''
    };
    this.userLoggedIn = this.userLoggedIn.bind(this);
    this.userLoggedOut = this.userLoggedOut.bind(this);
  }

  //callback function used by the sign in component to log the user in
  userLoggedIn(username, password, first, last){
      this.setState({
        userLoggedIn: 'true',
        username: username,
        password: password,
        first: first,
        last: last
      });
  }

  //callback function used by the sign out component to log the user out
  userLoggedOut(){
    this.setState({
      userLoggedIn: '',
      username: '',
      password: '',
      first: '',
      last: ''
    });
  }

  //list of available routes the user may call
  //if route not available the last route is rendered, the not found route
  render() {
    return(
      <BrowserRouter>
        <Switch>
          <Route exact path='/' render={()=> <Courses userInfo={this.state}/> }/>
          <PrivateRoute exact path='/courses/create' component={CreateCourse} userInfo={this.state} />
          <PrivateRoute exact path='/courses/:id/update' component={UpdateCourse} userInfo={this.state} />
          <Route exact path='/courses/:id' render={(props)=> <CourseDetail userInfo={this.state} {...props}/> }/>
          <Route exact path='/signin' render={()=> <UserSignIn userLoggedIn={this.userLoggedIn} userInfo={this.state}/> }/>
          <Route exact path='/signup' render={()=><UserSignUp userInfo={this.state} userLoggedIn={this.userLoggedIn}/> }/>
          <Route exact path='/signout' render={()=><UserSignOut userLoggedOut={this.userLoggedOut} /> }/>
          <Route render={()=><NotFound userInfo={this.state} userLoggedOut={this.userLoggedOut} /> }/>
        </Switch>
      </BrowserRouter>
    );
  }
}
export default App



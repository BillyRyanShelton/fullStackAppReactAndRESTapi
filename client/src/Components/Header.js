import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import axios from 'axios';
import {Redirect } from 'react-router'
import ReactMarkdown from 'react-markdown'


class Header extends Component {

render() {
  //if the user is logged in via props passed down from the app component, the header is updated to show the 
  //users first name and last name along with a sign out button
  let ifLoggedIn;
  if(this.props.userInfo.userInfo.userLoggedIn !== ''){
    ifLoggedIn =  <nav><span>Welcome {this.props.userInfo.userInfo.first} {this.props.userInfo.userInfo.last}!</span><Link to="/signout">Sign Out</Link></nav>;
  } //if the user is not logged in then the signup and signin buttons are rendered 
  else{
    ifLoggedIn = <nav><a className="signup" href="/signup">Sign Up</a><a className="signin" href="/signin">Sign In</a></nav>
  }
    return(
      <div className="header">
        <div className="bounds">
          <Link to='/'><h1 className="header--logo">Courses</h1></Link>
          {ifLoggedIn}
        </div>
      </div>
    );
  }
}
export default Header
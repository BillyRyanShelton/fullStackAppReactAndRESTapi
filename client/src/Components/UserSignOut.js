import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import axios from 'axios';
import {Redirect } from 'react-router'
import ReactMarkdown from 'react-markdown'



class UserSignOut extends Component {
//the user is logged out with the call back function user logged out and redirected to the homepage
render() {
    this.props.userLoggedOut();
    return(
      <Redirect to='/'/>
    );
  }
}
export default UserSignOut
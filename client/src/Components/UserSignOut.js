import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import axios from 'axios';
import {Redirect } from 'react-router'
import ReactMarkdown from 'react-markdown'



class UserSignOut extends Component {

render() {
    this.props.userLoggedOut();
    return(
      <Redirect to='/'/>
    );
  }
}
export default UserSignOut
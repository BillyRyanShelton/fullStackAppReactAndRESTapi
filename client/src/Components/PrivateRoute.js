import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import axios from 'axios';
import {Redirect } from 'react-router'
import ReactMarkdown from 'react-markdown'

class PrivateRoute extends Component {
  render(){
    let signedIn;
    if(this.props.userInfo.userLoggedIn !== ''){
      signedIn = <this.props.component userInfo={this.props}/>
    } else{
      signedIn = <Redirect to="/signin" />
    }
    return (
     <Route> {signedIn}</Route>
    );
  }
}

export default PrivateRoute
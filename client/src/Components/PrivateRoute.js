import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import axios from 'axios';
import {Redirect } from 'react-router'
import ReactMarkdown from 'react-markdown'


//this route checks to see if a user is signed in before being able to access the link which the user clicked on
//more specifically it was used on the create course route and courses/:id/update route
class PrivateRoute extends Component {
  render(){
    let signedIn;
    //if the user is signed in they are directed to the route they intended to view
    if(this.props.userInfo.userLoggedIn !== ''){
      signedIn = <this.props.component userInfo={this.props}/>
    } //if the user is not signed in they are redirected to the sign in route
    else{
      signedIn = <Redirect to="/signin" />
    }
    return (
     <Route> {signedIn}</Route>
    );
  }
}

export default PrivateRoute
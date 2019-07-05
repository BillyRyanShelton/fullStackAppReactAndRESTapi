import React, { Component } from 'react';
import {Redirect } from 'react-router'


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
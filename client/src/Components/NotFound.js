import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import axios from 'axios';
import {Redirect } from 'react-router'
import ReactMarkdown from 'react-markdown'
import Header from './Header'



class NotFound extends Component {

render() {
    return(
      <div id="root">
        <div>
          <Header userInfo = {this.props}/>
          <hr/>
          <div class="bounds">
            <h1>Not Found</h1>
            <p>Sorry! We couldn't find the page you're looking for.</p>
          </div>
        </div>
      </div>
    );
  }
}
export default NotFound
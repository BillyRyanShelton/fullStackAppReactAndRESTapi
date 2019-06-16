// import React from 'react';
// import logo from './logo.svg';
// import './App.css';

import React, { Component } from 'react';
import { BrowserRouter, Route, NavLink, Switch } from 'react-router-dom';
import axios from 'axios';


class App extends Component {

  //State is created to handle the images from flickr's API and the topic to be searched
  constructor() {
    super();
    this.state = {
      data: ''
    }
  }
  //Images are immediately loaded to the page with the props search topic
  componentDidMount() {
    axios.get(`http://localhost:5000`).then((response) => {
      const data = response.data;
      console.log(data);
      this.setState({data});
    })
    .catch(error => {
      console.log('Error fetching and parsing data.', error);
    }); 
  }



render() {
    return(
        <div> 
          { this.state.data.message}
        </div>
    );
  }
}
export default App

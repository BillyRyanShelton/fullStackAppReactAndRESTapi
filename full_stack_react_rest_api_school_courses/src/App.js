import React, { Component } from 'react';
import { BrowserRouter, Route, NavLink, Switch } from 'react-router-dom';
import axios from 'axios';



class Courses extends Component {

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
<html lang="en">

  <head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
    <link rel="shortcut icon" href="/favicon.ico"/>
    <link href="https://fonts.googleapis.com/css?family=Work+Sans:400,500" rel="stylesheet" type="text/css"/>
    <link href="https://fonts.googleapis.com/css?family=Cousine" rel="stylesheet" type="text/css"/>
    <link href="../styles/global.css" rel="stylesheet"/>
    <title>Courses</title>
  </head>

  <body>
    <div id="root">
      <div>
        <div class="header">
          <div class="bounds">
            <h1 class="header--logo">Courses</h1>
            <nav><a class="signup" href="sign-up.html">Sign Up</a><a class="signin" href="sign-in.html">Sign In</a></nav>
          </div>
        </div>
        <hr/>
        <div class="bounds">
          <div class="grid-33"><a class="course--module course--link" href="course-detail.html">
              <h4 class="course--label">Course</h4>
              <h3 class="course--title">Build a Basic Bookcase</h3>
            </a>
          </div>
          <div class="grid-33"><a class="course--module course--add--module" href="create-course.html">
              <h3 class="course--add--title"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                  viewBox="0 0 13 13" class="add">
                  <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                </svg>New Course</h3>
            </a></div>
        </div>
      </div>
    </div>
  </body>

</html>
    );
  }
}
// export default App

class App extends Component {
  render() {
    return(
      <BrowserRouter>
        <Switch>
          <Route exact path='/' render={() => <Courses/>}/>
        </Switch>
      </BrowserRouter>
    );
  }
}
export default App

// class App extends Component {

//   //State is created to handle the images from flickr's API and the topic to be searched
//   constructor() {
//     super();
//     this.state = {
//       data: ''
//     }
//   }
//   //Images are immediately loaded to the page with the props search topic
//   componentDidMount() {
//     axios.get(`http://localhost:5000`).then((response) => {
//       const data = response.data;
//       console.log(data);
//       this.setState({data});
//     })
//     .catch(error => {
//       console.log('Error fetching and parsing data.', error);
//     }); 
//   }

// render() {
//     return(
//         <div> 
//           { this.state.data.message}
//         </div>
//     );
//   }
// }
// export default App

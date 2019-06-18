import React, { Component } from 'react';
import { BrowserRouter, Route, NavLink, Switch } from 'react-router-dom';
import axios from 'axios';



class UserSignOut extends Component {

render() {
    return(
      <div>
      </div>
    );
  }
}
// export default App

class UserSignUp extends Component {

render() {
    return(
      <div>
      </div>
    );
  }
}
// export default App

class UserSignIn extends Component {

render() {
    return(
      <div>
      </div>
    );
  }
}
// export default App

class CourseDetail extends Component {


  // //Images are immediately loaded to the page with the props search topic
  // componentDidMount() {
  //   axios.get(`http://localhost:5000/api/courses`).then((response) => {
  //     const data = response.data.courses;
  //     console.log(data);
  //     this.setState({data});
  //   })
  //   .catch(error => {
  //     console.log('Error fetching and parsing data.', error);
  //   }); 
  // }

render() {
    return(
      <div>
      </div>
    );
  }
}
// // export default App

class UpdateCourse extends Component {

render() {
    return(
      <div>
      </div>
    );
  }
}
// export default App

class CreateCourse extends Component {

render() {
    return(
      <div> 
      <h1>hello</h1>
      </div>
    );
  }
}
// export default App

class Courses extends Component {

  constructor() {
    super();
    this.state = {
      data: ''
    }
  }
  //Images are immediately loaded to the page with the props search topic
  componentDidMount() {
    axios.get(`http://localhost:5000/api/courses`).then((response) => {
      const data = response.data.courses;
      console.log(data);
      this.setState({data});
    })
    .catch(error => {
      console.log('Error fetching and parsing data.', error);
    }); 
  }


render() {

      //If courses are returned they are stored
    let data = this.state.data;
    let courses;
    if(data.length > 0) {
      courses = data.map( (course) => 
        <div class="grid-33"><a class="course--module course--link" href={'/courses/' + course.id}>
            <h4 class="course--label">Course</h4>
            <h3 class="course--title">{course.title}</h3>
          </a>
        </div>
      );
    } //If no images are in the array then a Not Found message is displayed to the DOM 
    else {
      courses = <h1 className="not-found"> Not Found </h1>
    }

    return(
      <html lang="en">

        <head>
          <meta charset="utf-8"/>
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
          <link rel="shortcut icon" href="/favicon.ico"/>
          <link href="https://fonts.googleapis.com/css?family=Work+Sans:400,500" rel="stylesheet" type="text/css"/>
          <link href="https://fonts.googleapis.com/css?family=Cousine" rel="stylesheet" type="text/css"/>
          <link href="App.css" rel="stylesheet"/>
          <title>Courses</title>
        </head>

        <body>
          <div id="root">
            <div>
              <Header/>
              <hr/>
              <div class="bounds">
                {courses}
                <div class="grid-33"><a class="course--module course--add--module" href='/courses/create'>
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


//need to add when a user is signed in for the header component
class Header extends Component {

render() {
    return(
      <div class="header">
        <div class="bounds">
          <h1 class="header--logo">Courses</h1>
          <nav><a class="signup" href="sign-up.html">Sign Up</a><a class="signin" href="sign-in.html">Sign In</a></nav>
        </div>
      </div>
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
          <Route exact path='/courses/create' render={() => <CreateCourse/>}/>
          <Route exact path='/courses/:id/update' render={() => <UpdateCourse/>}/>
          <Route exact path='/courses/:id' render={() => <CourseDetail/>}/>
          <Route exact path='/signin' render={() => <UserSignIn/>}/>
          <Route exact path='/signup' render={() => <UserSignUp/>}/>
          <Route exact path='/signout' render={() => <UserSignOut/>}/>
        </Switch>
      </BrowserRouter>
    );
  }
}
export default App



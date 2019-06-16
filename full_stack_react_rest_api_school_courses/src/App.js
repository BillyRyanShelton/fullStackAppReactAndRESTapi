import React, { Component } from 'react';
import { BrowserRouter, Route, NavLink, Switch } from 'react-router-dom';
import axios from 'axios';



// class CourseDetail extends Component {


//   // //Images are immediately loaded to the page with the props search topic
//   // componentDidMount() {
//   //   axios.get(`http://localhost:5000/api/courses`).then((response) => {
//   //     const data = response.data.courses;
//   //     console.log(data);
//   //     this.setState({data});
//   //   })
//   //   .catch(error => {
//   //     console.log('Error fetching and parsing data.', error);
//   //   }); 
//   // }

// render() {
//     return(

//     );
//   }
// }
// // export default App



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
          <div class="grid-33"><a class="course--module course--link" href="course-detail.html">
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
          <title>Courses</title>
        </head>

        <body>
          <div id="root">
            <div>
              <Header/>
              <hr/>
              <div class="bounds">
                {courses}
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

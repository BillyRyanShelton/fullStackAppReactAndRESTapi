import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
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

  constructor() {
    super();
    this.state = {
      courseData: ''
    }
  }

  //course detail is retrived from the database
  componentDidMount() {
    const id = this.props.match.params.id;
    console.log(id);

    axios.get(`http://localhost:5000/api/courses/${id}`).then((response) => {
      const courseData = response.data.course;
      console.log(courseData);
      this.setState({courseData});
    })
    .catch(error => {
      console.log('Error fetching and parsing data.', error);
    }); 
  }

render() {
  let courseData = this.state.courseData;
    return(
      <div id="root">
        <div>
          <Header/>
          <hr/>
          <div>
            <div className="actions--bar">
              <div className="bounds">
                <div className="grid-100">
                  <span>
                    <Link to="update-course.html" className="button">Update Course</Link>
                    <a className="button" href="#">Delete Course</a></span>
                    <Link to="index.html" className="button button-secondary">Return to List</Link>
                </div>
              </div>
            </div>
            <div className="bounds course--detail">
              <div className="grid-66">
                <div className="course--header">
                  <h4 className="course--label">Course</h4>
                  <h3 className="course--title">{courseData.title}</h3>
                  <p>User Id {courseData.userId}</p>
                </div>
                <div className="course--description">
                  <p>High-end furniture projects are great to dream about. But unless you have a well-equipped shop and some serious woodworking experience to draw on, it can be difficult to turn the dream into a reality.</p>
                  <p>Not every piece of furniture needs to be a museum showpiece, though. Often a simple design does the job just as well and the experience gained in completing it goes a long way toward making the next project even better.</p>
                  <p>Our pine bookcase, for example, features simple construction and it's designed to be built with basic woodworking tools. Yet, the finished project is a worthy and useful addition to any room of the house. While it's meant to rest on the floor, you can convert the bookcase to a wall-mounted storage unit by leaving off the baseboard. You can secure the cabinet to the wall by screwing through the cabinet cleats into the wall studs.</p>
                  <p>We made the case out of materials available at most building-supply dealers and lumberyards, including 1/2 x 3/4-in. parting strip, 1 x 2, 1 x 4 and 1 x 10 common pine and 1/4-in.-thick lauan plywood. Assembly is quick and easy with glue and nails, and when you're done with construction you have the option of a painted or clear finish.</p>
                  <p>As for basic tools, you'll need a portable circular saw, hammer, block plane, combination square, tape measure, metal rule, two clamps, nail set and putty knife. Other supplies include glue, nails, sandpaper, wood filler and varnish or paint and shellac.</p>
                  <p>The specifications that follow will produce a bookcase with overall dimensions of 10 3/4 in. deep x 34 in. wide x 48 in. tall. While the depth of the case is directly tied to the 1 x 10 stock, you can vary the height, width and shelf spacing to suit your needs. Keep in mind, though, that extending the width of the cabinet may require the addition of central shelf supports.</p>
                </div>
              </div>
              <div className="grid-25 grid-right">
                <div className="course--stats">
                  <ul className="course--stats--list">
                    <li className="course--stats--list--item">
                      <h4>Estimated Time</h4>
                      <h3>14 hours</h3>
                    </li>
                    <li className="course--stats--list--item">
                      <h4>Materials Needed</h4>
                      <ul>
                        <li>1/2 x 3/4 inch parting strip</li>
                        <li>1 x 2 common pine</li>
                        <li>1 x 4 common pine</li>
                        <li>1 x 10 common pine</li>
                        <li>1/4 inch thick lauan plywood</li>
                        <li>Finishing Nails</li>
                        <li>Sandpaper</li>
                        <li>Wood Glue</li>
                        <li>Wood Filler</li>
                        <li>Minwax Oil Based Polyurethane</li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
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
    axios.get('http://localhost:5000/api/courses').then((response) => {
      const data = response.data.courses;
      //console.log(data);
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
        <div className="grid-33" key={course.id}>
          <Link to={'/courses/' + course.id} className="course--module course--link">
            <h4 className="course--label">Course</h4>
            <h3 className="course--title">{course.title}</h3>
          </Link>
        </div>
      );
    } //If no images are in the array then a Not Found message is displayed to the DOM 
    else {
      courses = <h1 className="not-found"> Not Found </h1>
    }

    return(
      <div id="root">
        <div>
          <Header/>
          <hr/>
          <div className="bounds">
            {courses}
            <div className="grid-33">
              <Link to='/courses/create' className="course--module course--add--module">
                <h3 className="course--add--title"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                    viewBox="0 0 13 13" className="add">
                    <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                  </svg>New Course</h3>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
// export default App








//need to add when a user is signed in for the header component
class Header extends Component {

render() {
    return(
      <div className="header">
        <div className="bounds">
          <h1 className="header--logo">Courses</h1>
          <nav><a className="signup" href="sign-up.html">Sign Up</a><a className="signin" href="sign-in.html">Sign In</a></nav>
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
          <Route exact path='/' component={Courses}/>
          <Route exact path='/courses/create' component={CreateCourse}/>
          <Route exact path='/courses/:id/update' component={UpdateCourse}/>
          <Route exact path='/courses/:id' component = {CourseDetail}/>
          <Route exact path='/signin' component={UserSignIn}/>
          <Route exact path='/signup' component={UserSignUp}/>
          <Route exact path='/signout' component={UserSignOut}/>
        </Switch>
      </BrowserRouter>
    );
  }
}
export default App



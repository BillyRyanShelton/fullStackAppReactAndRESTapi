import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Header from './Header'


class Courses extends Component {

  //state for this component is initialized
  constructor() {
    super();
    this.state = {
      data: ''
    }
  }
  //a call is made to the api to load all of the present courses
  componentDidMount() {
    axios.get('http://localhost:5000/api/courses').then((response) => {
      const data = response.data.courses;
      this.setState({data});
    })
    .catch(error => {
      console.log('Error fetching and parsing data.', error);
    }); 
  }


  render() {
      //if the courses are available they are displayed
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
      } //if no courses are in the array then a Not Found message is displayed
      else {
        courses = <h1 className="not-found"> Not Found </h1>
      }

      return(
        <div id="root">
          <div>
            <Header userInfo = {this.props}/>
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
export default Courses
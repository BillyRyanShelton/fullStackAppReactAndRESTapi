import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {Redirect } from 'react-router'
import ReactMarkdown from 'react-markdown'
import Header from './Header'

class CourseDetail extends Component {

  //state for this component is initialized
  constructor(props) {
    super(props);
    this.state = {
      courseData: '',
      name: '',
      title: '',
      estimatedTime:'',
      materials:'',
      id: '',
      userId:'',
      userEmail:'',
      isCourseDeleted: ''
    };
    this.changeCourse = this.changeCourse.bind(this);
    this.deleteCourse = this.deleteCourse.bind(this);
  }

  //when the page is loaded, a request is made to the api for the course data and the state is changed
  //to reflect that data
  componentDidMount() {
    const id = this.props.match.params.id;

   //course information is retrieved
    axios.get(`http://localhost:5000/api/courses/${id}`).then((response) => {
      const courseData = response.data.course;
      this.setState({
        courseData: courseData,
        name: courseData.User.firstName + ' ' + courseData.User.lastName,
        title:courseData.title,
        description:courseData.description,
        estimatedTime: courseData.estimatedTime,
        materials: courseData.materialsNeeded,
        id: courseData.id,
        userId: courseData.userId,
        userEmail: courseData.User.emailAddress
      });
    })
    .catch(error => {
      console.log('Error fetching and parsing data.', error);
    }); 
  }

  changeCourse(){
    //if the state of isCourseDeleted is true, then the course was deleted and the use is redirected to the homepage
    if(this.state.isCourseDeleted ==='true'){
        return(
          <Redirect to='/'/>
        );
    } //if the username passed down via props matches the username from the API, then the user owns the course
      //so the delete course and update course buttons are rendered
    else if(this.props.userInfo.username === this.state.userEmail){
      return (
        <span>
          <Link to={'/courses/' + this.state.id + '/update'} className="button">Update Course</Link>
          <button onClick = {this.deleteCourse} className="button">Delete Course</button>
        </span>
      );
    } 
  }

  //if the delete course button is clicked, a call is made to the API to delete the course and the 
  //state of isCourseDeleted is set to true
  deleteCourse(){
    var result = window.confirm("Warning!  Are you sure you want to delete this course?");
    if (result) {
      axios.delete(`http://localhost:5000/api/courses/${this.state.id}`, {
        auth: {
          username: this.props.userInfo.username,
          password: this.props.userInfo.password,
        }
      })
      .then(()=>{
        this.setState({isCourseDeleted:'true'})
      });
    } 
  }

  render() {
    return(
      <div id="root">
        <div>
          <Header userInfo = {this.props}/>
          <hr/>
          <div>
            <div className="actions--bar">
              <div className="bounds">
                <div className="grid-100">
                    {this.changeCourse()}
                    <Link to="/" className="button button-secondary">Return to List</Link>
                </div>
              </div>
            </div>
            <div className="bounds course--detail">
              <div className="grid-66">
                <div className="course--header">
                  <h4 className="course--label">Course</h4>
                  <h3 className="course--title">{this.state.title}</h3>
                  <p>By: {this.state.name}</p>
                </div>
                <div className="course--description">
                  <ReactMarkdown source={this.state.description}/>
                </div>
              </div>
              <div className="grid-25 grid-right">
                <div className="course--stats">
                  <ul className="course--stats--list">
                    <li className="course--stats--list--item">
                      <h4>Estimated Time</h4>
                      <h3>{this.state.estimatedTime}</h3>
                    </li>
                    <li className="course--stats--list--item">
                      <h4>Materials Needed</h4>
                      
                        <ReactMarkdown source={this.state.materials}/>
                      
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
export default CourseDetail
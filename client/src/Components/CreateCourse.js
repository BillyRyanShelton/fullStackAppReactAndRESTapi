import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {Redirect } from 'react-router'
import Header from './Header'


class CreateCourse extends Component {

  //state for this component is initialized
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      estimatedTime:'',
      materialsNeeded:'',
      id: '',
      updated:'',
      message: ''
    }

    this.handleInput = this.handleInput.bind(this);
    this.displayErrors = this.displayErrors.bind(this);
  }

  //when onChange events are triggered, this function allows the set to be changed 
  //according to the target name and target value
  handleInput(e){
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
  } 

  //this function makes a request to the API to create a course.  The username and password are required along
  //with the course data.  If title or description are missing, validation errors are thrown
  createCourse(e){
    e.preventDefault();
    axios({
      method:'post',
      url: `http://localhost:5000/api/courses`,
      auth: {
        username: this.props.userInfo.userInfo.username,
        password: this.props.userInfo.userInfo.password
      },
      data:{
        title: this.state.title,
        description: this.state.description,
        estimatedTime: this.state.estimatedTime,
        materialsNeeded: this.state.materialsNeeded
      }
    })
    .then((response)=>{
      this.setState({updated: 'true'});
    })
    .catch(error => {
      console.log(error.response.data);
      this.setState({
        updated: 'false',
        message: error.response.data.error
        });
        console.log('Error fetching and parsing data.', error);
    }); 
  }


  displayErrors(){
    //once a course is successfully created, the user is redirected to the course detail page
    if(this.state.updated === 'true'){
      this.setState({updated: ''});
      return <Redirect to='/'/>
    } //if the course creation was unsuccessful, validation errors are displayed
    else if(this.state.updated === 'false'){
      let errors = this.state.message.split(',');
      let parsedErrors = errors.map((error,i)=> <li key={`createCourseErr-${i}`}>{error}</li> );
      console.log(errors);
      return(
        <div className='validation-errors'>
          <ul>
            {parsedErrors}
          </ul>
        </div>
      );    
    }
  }

  render() {
      return(
        <div id="root">
          <div>
            <Header userInfo = {this.props.userInfo}/>
            <hr />
            <div className="bounds course--detail">
              <h1>Create Course</h1>
              <div>
                <div>
                {this.displayErrors()}
                </div>
                <form onSubmit={(e)=>{this.createCourse(e)}}>
                  <div className="grid-66">
                    <div className="course--header">
                      <h4 className="course--label">Course</h4>
                      <div><input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..." onChange={this.handleInput}/></div>
                      <p>By {this.props.userInfo.userInfo.first} {this.props.userInfo.userInfo.last}</p>
                    </div>
                    <div className="course--description">
                      <div><textarea id="description" name="description" className="" placeholder="Course description..." onChange={this.handleInput}/></div>
                    </div>
                  </div>
                  <div className="grid-25 grid-right">
                    <div className="course--stats">
                      <ul className="course--stats--list">
                        <li className="course--stats--list--item">
                          <h4>Estimated Time</h4>
                          <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" placeholder="Hours" onChange={this.handleInput}/></div>
                        </li>
                        <li className="course--stats--list--item">
                          <h4>Materials Needed</h4>
                          <div><textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..." onChange={this.handleInput} /></div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="grid-100 pad-bottom"><button className="button" type="submit">Create Course</button><Link to='/'><button className="button button-secondary">Cancel</button></Link></div>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
    }
}
export default CreateCourse
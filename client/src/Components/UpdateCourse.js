import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import axios from 'axios';
import {Redirect } from 'react-router'
import ReactMarkdown from 'react-markdown'
import Header from './Header'



class UpdateCourse extends Component {

  //state for this component is initialized
  constructor(props) {
    super(props);
    this.state = {
      courseData: '',
      name: '',
      title: '',
      description: '',
      estimatedTime:'',
      materialsNeeded:'',
      id: '',
      updated:'',
      message:''
    }
    // this.handleChangeDescription = this.handleChangeDescription.bind(this);
    // this.handleChangeMaterials = this.handleChangeMaterials.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.updateCourseData = this.updateCourseData.bind(this);
    this.updateRedirect = this.updateRedirect.bind(this);
  }

  //course detail is retrived from the database
  componentDidMount() {
    const id = this.props.userInfo.computedMatch.params.id;
    //console.log(id);

    axios.get(`http://localhost:5000/api/courses/${id}`).then((response) => {
      const courseData = response.data.course;
      //console.log(courseData);
      this.setState({
        courseData: courseData,
        name: courseData.User.firstName + ' ' + courseData.User.lastName,
        title:courseData.title,
        description:courseData.description,
        estimatedTime: courseData.estimatedTime,
        materialsNeeded: courseData.materialsNeeded,
        id: courseData.id
      });
    })
    .catch(error => {
      console.log('Error fetching and parsing data.', error);
    }); 
  }

  handleInput(e){
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
  } 

  updateCourseData(e){
    //console.log(this.props.userInfo.userInfo.password);
    e.preventDefault();
    axios({
      method:'put',
      url: `http://localhost:5000/api/courses/${this.state.id}`,
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
      console.log(error.response);
      this.setState({
        updated: 'false',
        message: error.response.data.error
        });
        console.log('Error fetching and parsing data.', error);
    }); 
  }


    updateRedirect(){
    if(this.state.updated === 'true'){
      this.setState({updated: ''});
      return <Redirect to={'/courses/'+ this.props.userInfo.computedMatch.params.id}/>
    } else if(this.state.updated === 'false'){
      let errors = this.state.message.split(',');
      let parsedErrors = errors.map((error,i)=> <li key={`updateErr-${i}`}>{error}</li> );
      console.log(parsedErrors);
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
              <h1>Update Course</h1>
              <div>
                {this.updateRedirect()}
                <form onSubmit={this.updateCourseData}>
                  <div className="grid-66">
                    <div className="course--header">
                      <h4 className="course--label">Course</h4>
                      <div><input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..." value={this.state.title} onChange={this.handleInput} /></div>
                      <p>By: {this.state.name}</p>
                    </div>
                    <div className="course--description">
                      <div><textarea id="description" name="description" className="" placeholder="Course description..." value={this.state.description} onChange={this.handleInput}/></div>
                    </div>
                  </div>
                  <div className="grid-25 grid-right">
                    <div className="course--stats">
                      <ul className="course--stats--list">
                        <li className="course--stats--list--item">
                          <h4>Estimated Time</h4>
                          <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" placeholder="Hours" value={this.state.estimatedTime} onChange={this.handleInput}/></div>
                        </li>
                        <li className="course--stats--list--item">
                          <h4>Materials Needed</h4>
                          <div><textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..." value={this.state.materialsNeeded} onChange={this.handleInput}/></div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="grid-100 pad-bottom"><button className="button" type="submit">Update Course</button><Link to={"/courses/" + this.props.userInfo.computedMatch.params.id}><button className="button button-secondary">Cancel</button></Link></div>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
    }
}
export default UpdateCourse
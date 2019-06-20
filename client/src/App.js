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
      <div id="root">
        <div>
          <Header/>
          <hr/>
          <div className="bounds">
            <div className="grid-33 centered signin">
              <h1>Sign Up</h1>
              <div>
                <form>
                  <div><input id="firstName" name="firstName" type="text" className="" placeholder="First Name" value=""/></div>
                  <div><input id="lastName" name="lastName" type="text" className="" placeholder="Last Name" value=""/></div>
                  <div><input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" value=""/></div>
                  <div><input id="password" name="password" type="password" className="" placeholder="Password" value=""/></div>
                  <div><input id="confirmPassword" name="confirmPassword" type="password" className="" placeholder="Confirm Password"
                      value=""/></div>
                  <div class="grid-100 pad-bottom"><button className="button" type="submit">Sign Up</button><Link to='/'><button class="button button-secondary">Cancel</button></Link></div>
                </form>
              </div>
              <p>&nbsp;</p>
              <p>Already have a user account? <a href="/signin">Click here</a> to sign in!</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
// export default App












class UserSignIn extends Component {

render() {
    return(
      <div id="root">
          <div>
            <Header/>
            <hr/>
            <div className="bounds">
              <div className="grid-33 centered signin">
                <h1>Sign In</h1>
                <div>
                  <form>
                    <div><input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" /></div>
                    <div><input id="password" name="password" type="password" className="" placeholder="Password" /></div>
                    <div className="grid-100 pad-bottom"><button className="button" type="submit">Sign In</button>
                    <Link to='/'><button className="button button-secondary">Cancel</button></Link></div>
                  </form>
                </div>
                <p>&nbsp;</p>
                <p>Don't have a user account? <a href="/signup">Click here</a> to sign up!</p>
              </div>
            </div>
          </div>
        </div>
    );
  }
}
// export default App











class CourseDetail extends Component {

  constructor() {
    super();
    this.state = {
      courseData: '',
      name: '',
      title: '',
      estimatedTime:'',
      materials:''
    }
  }

  //course detail is retrived from the database
  componentDidMount() {
    const id = this.props.match.params.id;
    //console.log(id);

    axios.get(`http://localhost:5000/api/courses/${id}`).then((response) => {
      const courseData = response.data.course;
      console.log(courseData);
      this.setState({
        courseData: courseData,
        name: courseData.User.firstName + ' ' + courseData.User.lastName,
        title:courseData.title,
        description:courseData.description,
        estimatedTime: courseData.estimatedTime,
        materials: courseData.materialsNeeded,
        id: courseData.id
      });
    })
    .catch(error => {
      console.log('Error fetching and parsing data.', error);
    }); 
  }

render() {
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
                    <Link to={'/courses/' + this.state.id + '/update'} className="button">Update Course</Link>
                    <a className="button" href="#">Delete Course</a></span>
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
                  <p>{this.state.description}</p>
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
                      <ul>
                        <li>{this.state.materials}</li>
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

  constructor() {
    super();
    this.state = {
      courseData: '',
      name: '',
      title: '',
      description: '',
      estimatedTime:'',
      materials:'',
      id: ''
    }
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.handleChangeMaterials = this.handleChangeMaterials.bind(this);
  }

  //course detail is retrived from the database
  componentDidMount() {
    const id = this.props.match.params.id;
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
        materials: courseData.materialsNeeded,
        id: courseData.id
      });
    })
    .catch(error => {
      console.log('Error fetching and parsing data.', error);
    }); 
  }

  handleChangeDescription(e){
    this.setState({description: e.target.value});
  }
  handleChangeMaterials(e){
    this.setState({materials: e.target.value});
  }

render() {
    return(
      <div id="root">
        <div>
          <Header/>
          <hr />
          <div className="bounds course--detail">
            <h1>Update Course</h1>
            <div>
              <form>
                <div className="grid-66">
                  <div className="course--header">
                    <h4 className="course--label">Course</h4>
                    <div><input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..." defaultValue={this.state.title} /></div>
                    <p>By: {this.state.name}</p>
                  </div>
                  <div className="course--description">
                    <div><textarea id="description" name="description" className="" placeholder="Course description..." value={this.state.description} onChange={this.handleChangeDescription}/></div>
                  </div>
                </div>
                <div className="grid-25 grid-right">
                  <div className="course--stats">
                    <ul className="course--stats--list">
                      <li className="course--stats--list--item">
                        <h4>Estimated Time</h4>
                        <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" placeholder="Hours" defaultValue={this.state.estimatedTime} /></div>
                      </li>
                      <li className="course--stats--list--item">
                        <h4>Materials Needed</h4>
                        <div><textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..." value={this.state.materials} onChange={this.handleChangeMaterials} /></div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="grid-100 pad-bottom"><button className="button" type="submit">Update Course</button><Link to={"/courses/" + this.props.match.params.id}><button className="button button-secondary">Cancel</button></Link></div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
// export default App









class CreateCourse extends Component {

render() {
    return(
      <div id="root">
        <div>
          <Header/>
          <hr />
          <div className="bounds course--detail">
            <h1>Create Course</h1>
            <div>
              <div>
                <h2 className="validation--errors--label">Validation errors</h2>
                <div className="validation-errors">
                  <ul>
                    <li>Please provide a value for "Title"</li>
                    <li>Please provide a value for "Description"</li>
                  </ul>
                </div>
              </div>
              <form>
                <div className="grid-66">
                  <div className="course--header">
                    <h4 className="course--label">Course</h4>
                    <div><input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..." /></div>
                    <p>By Joe Smith</p>
                  </div>
                  <div className="course--description">
                    <div><textarea id="description" name="description" className="" placeholder="Course description..." defaultValue={""} /></div>
                  </div>
                </div>
                <div className="grid-25 grid-right">
                  <div className="course--stats">
                    <ul className="course--stats--list">
                      <li className="course--stats--list--item">
                        <h4>Estimated Time</h4>
                        <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" placeholder="Hours"/></div>
                      </li>
                      <li className="course--stats--list--item">
                        <h4>Materials Needed</h4>
                        <div><textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..." defaultValue={""} /></div>
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
          <nav><a className="signup" href="/signup">Sign Up</a><a className="signin" href="/signin">Sign In</a></nav>
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



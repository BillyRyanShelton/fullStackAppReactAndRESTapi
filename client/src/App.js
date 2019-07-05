import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import axios from 'axios';
import {Redirect } from 'react-router'



class PrivateRoute extends Component {
  render(){
    let signedIn;
    console.log(this.props);
    if(this.props.userInfo.userLoggedIn != ''){
      signedIn = <this.props.component userInfo={this.props}/>
    } else{
      signedIn = <Redirect to="/signin" />
    }
    return (
     <Route> {signedIn}</Route>
    );
  }
}





class NotFound extends Component {

render() {
    return(
      <div id="root">
        <div>
          <Header userInfo = {this.props}/>
          <hr/>
          <div class="bounds">
            <h1>Not Found</h1>
            <p>Sorry! We couldn't find the page you're looking for.</p>
          </div>
        </div>
      </div>
    );
  }
}
// export default App




class Forbidden extends Component {

render() {
    return(
      <div id="root">
        <div>
          <Header userInfo = {this.props}/>
          <hr/>
          <div class="bounds">
            <h1>Forbidden</h1>
            <p>Oh oh! You can't access this page.</p>
          </div>
        </div>
      </div>
    );
  }
}
// export default App



class Error extends Component {

render() {
    return(
      <div id="root">
        <div>
          <Header userInfo = {this.props}/>
          <hr/>
          <div class="bounds">
            <h1>Error</h1>
            <p>Sorry! We just encountered an unexpected error.</p>
          </div>
        </div>
      </div>
    );
  }
}
// export default App




class UserSignOut extends Component {
  constructor(props){
    super(props);
  }

render() {
    this.props.userLoggedOut();
    return(
      <Redirect to='/'/>
    );
  }
}
// export default App



class UserSignUp extends Component {
  //make state to manage data

  constructor(props){
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      emailAddress:'',
      password:'',
      confirmPassword:'',
      userCreated:'',
      message:''
    };
    this.handleInput = this.handleInput.bind(this);
    this.signUp = this.signUp.bind(this);
    this.submitRedirectSignUp = this.submitRedirectSignUp.bind(this);
    
  }


  signUp(e,first, last, email, password, confirmPassword){
    e.preventDefault();

    //The passwords are checked to see if they match before making a call to the API
    if(password !== confirmPassword){
      this.setState({
        userCreated: false,
        message: 'The passwords do not match.'
      });
      return;
    }

    //A request is made to the API with the user sign up info
    axios.post('http://localhost:5000/api/users', {
      firstName: first,
      lastName: last,
      emailAddress: email,
      password: password,
      confirmPassword: confirmPassword
    })
    .then((response)=>{
      console.log(response);
      //If the API returns a 201 the user has been created
      this.props.userLoggedIn(this.state.emailAddress, this.state.password, this.state.firstName, this.state.lastName);
      this.setState({userCreated: true});
    })
    .catch((error) => {
      console.log(error.response.data.message);
      //If the API returns an error the userCreated state is changed to false and an error is displayed
      this.setState({
        userCreated: false,
        message: error.response.data.message
      });
      console.log('Error fetching and parsing data.', error);
    }); 
  }

  //as user types in data the state is changed automatically
  handleInput(e){
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
  } 

  //if successful then the user signed in auth state data is updated and the user is signed in and redirected to the home page
  submitRedirectSignUp(){
    if(this.state.userCreated === true){
      //redirect to home page
      return <Redirect to='/'/>
    } //if user creation failed, the error is displayed
    else if(this.state.userCreated === false){
      let errors = this.state.message.split(',');
      let parsedErrors = errors.map((error,i)=> <li key={`signinErr-${i}`}>{error}</li> );
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
            <Header userInfo = {this.props}/>
            <hr/>
            <div className="bounds">
              <div className="grid-33 centered signin">
                <h1>Sign Up</h1>
                <div>
                  {this.submitRedirectSignUp()}
                  <form onSubmit={(e)=>{this.signUp(e,this.state.firstName, this.state.lastName, this.state.emailAddress, this.state.password, this.state.confirmPassword)}}>
                    <div><input id="firstName" name="firstName" type="text" className="" placeholder="First Name" onChange={(e) => this.handleInput(e)}/></div>
                    <div><input id="lastName" name="lastName" type="text" className="" placeholder="Last Name" onChange={(e) => this.handleInput(e)}/></div>
                    <div><input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" onChange={(e) => this.handleInput(e)}/></div>
                    <div><input id="password" name="password" type="password" className="" placeholder="Password" onChange={(e) => this.handleInput(e)}/></div>
                    <div><input id="confirmPassword" name="confirmPassword" type="password" className="" placeholder="Confirm Password" onChange={(e) => this.handleInput(e)}/></div>
                    <div className="grid-100 pad-bottom"><button className="button" type="submit">Sign Up</button><Link to='/'><button className="button button-secondary">Cancel</button></Link></div>
                  </form>
                </div>
                <p>&nbsp;</p>
                <p>Already have a user account? <Link to="/signin">Click here</Link> to sign in!</p>
              </div>
            </div>
          </div>
        </div>
      );
  }
}
// export default App










class UserSignIn extends Component {

  constructor(props){
    super(props);
    this.state = {
      emailAddress: '',
      password: '',
      isAuth:''
    };
    this.handleInput = this.handleInput.bind(this);
    this.signIn = this.signIn.bind(this);
    this.submitRedirect = this.submitRedirect.bind(this);
    
  }

  submitRedirect(){
    if(this.state.isAuth === 'true'){
      return <Redirect to='/'/>
    } else if(this.state.isAuth === 'false') {
      return( 
        <div className='validation-errors'>
          <ul>
            <li>Invalid Username or Password</li>
          </ul>
        </div>
      );
    }
  }

  signIn(e,email, password){
    e.preventDefault();
    axios.get('http://localhost:5000/api/users', {
      auth: {
        username: email,
        password: password,
      }
    })
    .then((response)=>{
      console.log(response);
      this.props.userLoggedIn(response.data.emailAddress, response.data.password, response.data.firstName, response.data.lastName);
      this.setState({isAuth: 'true'});
    })
    .catch(error => {
      this.setState({isAuth: 'false'})
        console.log('Error fetching and parsing data.', error);
    }); 
  }

  handleInput(e){
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
  } 

  render() {

    return(
      <div id="root">
          <div>
            <Header userInfo = {this.props}/>
            <hr/>
            <div className="bounds">
              <div className="grid-33 centered signin">
                <h1>Sign In</h1>
                <div>
                {this.submitRedirect()}
                  <form onSubmit={(e)=>{this.signIn(e,this.state.emailAddress, this.state.password) }}>
                    <div><input id="emailAddress" name="emailAddress" type="text" className='' placeholder="Email Address" defaultValue=''  onChange={(e) => this.handleInput(e)}/></div>
                    <div><input id="password" name="password" type="password" className='' placeholder="Password" defaultValue=''  onChange={(e) => this.handleInput(e)}/></div>
                    <div className="grid-100 pad-bottom"><button className="button" type="submit" >Sign In</button><Link to='/'><button className="button button-secondary">Cancel</button></Link></div>
                  </form>
                </div>
                <p>&nbsp;</p>
                <p>Don't have a user account? <Link to="/signup">Click here</Link> to sign up!</p>
              </div>
            </div>
          </div>
        </div>
    );
  }
}
// export default App











class CourseDetail extends Component {

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


  componentDidMount() {
    const id = this.props.match.params.id;
   //console.log(id);

   //course information is retrieved
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
    if(this.state.isCourseDeleted ==='true'){
        return(
          <Redirect to='/'/>
        );
    }
    else if(this.props.userInfo.username === this.state.userEmail){
      return (
        <span>
          <Link to={'/courses/' + this.state.id + '/update'} className="button">Update Course</Link>
          <a onClick = {this.deleteCourse} className="button">Delete Course</a>
        </span>
      );
    } 
  }

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


  // updateRedirect(){
  //   if(this.state.updated === 'true'){
  //     this.setState({updated: ''});
  //     return <Redirect to={'/courses/'+ this.props.userInfo.computedMatch.params.id}/>
  //   } else if(this.state.updated === 'false'){
      
  //     //let parsedErrors = errors.map((error, i)=> <li key={`updateErr-${i}`}>{error}</li> );
  //     return(
  //       <div className='validation-errors'>
  //         <ul>
  //           <li>{'Please provide a value for Title and Description'}</li>
  //         </ul>
  //       </div>
  //     );
  //   }
  // }

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
// export default App









class CreateCourse extends Component {

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
    // this.updateCourseData = this.updateCourseData.bind(this);
    // this.updateRedirect = this.updateRedirect.bind(this);
  }

  handleInput(e){
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
  } 

  createCourse(e){
    //console.log(this.props.userInfo.userInfo.password);
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
    if(this.state.updated === 'true'){
      this.setState({updated: ''});
      return <Redirect to='/'/>
    } else if(this.state.updated === 'false'){
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
            <Header userInfo = {this.props}/>
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
// export default App








//need to add when a user is signed in for the header component
class Header extends Component {

render() {
  //console.log(this.props.userInfo.userInfo);
  let ifLoggedIn;
  if(this.props.userInfo.userInfo.userLoggedIn != ''){
    ifLoggedIn =  <nav><span>Welcome {this.props.userInfo.userInfo.first} {this.props.userInfo.userInfo.last}!</span><Link to="/signout">Sign Out</Link></nav>;
  } else{
    ifLoggedIn = <nav><a className="signup" href="/signup">Sign Up</a><a className="signin" href="/signin">Sign In</a></nav>
  }
    return(
      <div className="header">
        <div className="bounds">
          <Link to='/'><h1 className="header--logo">Courses</h1></Link>
          {ifLoggedIn}
        </div>
      </div>
    );
  }
}
// export default App









class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userLoggedIn: '',
      username:'',
      password:'',
      first: '',
      last: ''
    };
    this.userLoggedIn = this.userLoggedIn.bind(this);
    this.userLoggedOut = this.userLoggedOut.bind(this);
  }

  userLoggedIn(username, password, first, last){
      this.setState({
        userLoggedIn: 'true',
        username: username,
        password: password,
        first: first,
        last: last
      });
  }

    userLoggedOut(){
      this.setState({
        userLoggedIn: '',
        username: '',
        password: '',
        first: '',
        last: ''
      });
  }

 //onSearch={this.performSearch}

 //<Route exact path='/courses/create' render={()=> <CreateCourse userInfo={this.state}/> }/>
 //<Route exact path='/courses/:id/update' render={()=> <UpdateCourse userInfo={this.state}/> }/>
 //<Route exact path='/courses/:id/update' render={(props)=> <UpdateCourse userInfo={this.state} {...props}/> }/>
 //<PrivateRoute exact path='/courses/:id/update' component={UpdateCourse} userInfo={this.state} />
  render() {
    return(
      <BrowserRouter>
        <Switch>
          <Route exact path='/' render={()=> <Courses userInfo={this.state}/> }/>
          <PrivateRoute exact path='/courses/create' component={CreateCourse} userInfo={this.state} />
          <PrivateRoute exact path='/courses/:id/update' component={UpdateCourse} userInfo={this.state} />
          <Route exact path='/courses/:id' render={(props)=> <CourseDetail userInfo={this.state} {...props}/> }/>
          <Route exact path='/signin' render={()=> <UserSignIn userLoggedIn={this.userLoggedIn} userInfo={this.state}/> }/>
          <Route exact path='/signup' render={()=><UserSignUp userInfo={this.state} userLoggedIn={this.userLoggedIn}/> }/>
          <Route exact path='/signout' render={()=><UserSignOut userLoggedOut={this.userLoggedOut} /> }/>
        </Switch>
      </BrowserRouter>
    );
  }
}
export default App



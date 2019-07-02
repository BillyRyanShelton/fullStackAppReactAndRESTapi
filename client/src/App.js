import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import axios from 'axios';
import {Redirect } from 'react-router'


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
      //If the API returns a 201 the user has been created
      this.props.userLoggedIn(this.state.firstName, this.state.lastName, this.state.emailAddress, this.state.password);
      this.setState({userCreated: true});
    })
    .catch(error => {
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
      //sign in user 

      //redirect to home page
      return <Redirect to='/'/>

    } else if(this.state.userCreated === false){
        return(
          <div className='validation-errors'>
            <ul>
              <li>{this.state.message}</li>
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
      this.props.userLoggedIn(response.data.username, response.data.password, response.data.firstName, response.data.lastName);
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
    console.log(id);

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
            <Header userInfo = {this.props}/>
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
            <Header userInfo = {this.props}/>
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
            <Header userInfo = {this.props}/>
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
  render() {
    return(
      <BrowserRouter>
        <Switch>
          <Route exact path='/' render={()=> <Courses userInfo={this.state}/> }/>
          <Route exact path='/courses/create' render={()=> <CreateCourse userInfo={this.state}/> }/>
          <Route exact path='/courses/:id/update' render={()=> <UpdateCourse userInfo={this.state}/> }/>
          <Route exact path='/courses/:id' render={(props)=> <CourseDetail userInfo={this.state} {...props}/> }/>
          <Route exact path='/signin' render={()=> <UserSignIn userLoggedIn={this.userLoggedIn} userInfo={this.state}/> }/>
          <Route exact path='/signup' render={()=><UserSignUp userInfo={this.state}/> }/>
          <Route exact path='/signout' render={()=><UserSignOut userLoggedOut={this.userLoggedOut} /> }/>
        </Switch>
      </BrowserRouter>
    );
  }
}
export default App



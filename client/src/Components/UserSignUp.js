import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import axios from 'axios';
import {Redirect } from 'react-router'
import ReactMarkdown from 'react-markdown'
import Header from './Header'


class UserSignUp extends Component {

  //state for this component is initialized
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
      this.props.userLoggedIn(this.state.emailAddress, this.state.password, this.state.firstName, this.state.lastName);
      this.setState({userCreated: true});
    })
    .catch((error) => {
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
export default UserSignUp
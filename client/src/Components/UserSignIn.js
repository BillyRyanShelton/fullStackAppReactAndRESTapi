import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import axios from 'axios';
import {Redirect } from 'react-router'
import ReactMarkdown from 'react-markdown'
import Header from './Header'


class UserSignIn extends Component {

  //state for this component is initialized
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

  //once the user is logged in they are redirected to the home page
  submitRedirect(){
    if(this.state.isAuth === 'true'){
      return <Redirect to='/'/>
    } //if user sign in is unsuccessful, validation errors are displayed 
    else if(this.state.isAuth === 'false') {
      return( 
        <div className='validation-errors'>
          <ul>
            <li>Invalid Username or Password</li>
          </ul>
        </div>
      );
    }
  }

  //a request is made to the api to sign the user in with props passed down from the app component. If errors
  //are returned then they are displayed for the user to correct
  signIn(e,email, password){
    e.preventDefault();
    axios.get('http://localhost:5000/api/users', {
      auth: {
        username: email,
        password: password,
      }
    })
    .then((response)=>{
      this.props.userLoggedIn(response.data.emailAddress, response.data.password, response.data.firstName, response.data.lastName);
      this.setState({isAuth: 'true'});
    })
    .catch(error => {
      this.setState({isAuth: 'false'})
        console.log('Error fetching and parsing data.', error);
    }); 
  }

  //when onChange events are triggered, this function allows the set to be changed 
  //according to the target name and target value
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
export default UserSignIn
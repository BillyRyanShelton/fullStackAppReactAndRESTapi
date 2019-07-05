import React, { Component } from 'react';
import Header from './Header'


//if not route is found, by default this component is displayed informing the user of the issue
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
export default NotFound
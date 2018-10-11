import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import Home from './App.jsx';
import Services from './Services.jsx';
import TestPage from './AppTest.jsx';

class App extends Component {
    render() {

      return(
        <div>
          <Router>
            <div>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/services">Manage Services</Link></li>
                <li><Link to="/testpage">Test Page</Link></li>
              </ul>

              <hr/>

              <Route exact path="/" component={Home}/>
              <Route path="/services" component={Services}/>
              <Route path="/testpage" component={TestPage}/>
            </div>
          </Router>
        </div>
      );
    }
}

export default hot(module)(App);

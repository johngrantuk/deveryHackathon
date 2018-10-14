import React, { Component } from 'react';
import { Navbar, Nav, NavItem} from 'react-bootstrap';
import { hot } from 'react-hot-loader';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import Home from './Cars.jsx';
import Services from './Services.jsx';
import Explorer from './Explorer.jsx';

class App extends Component {
    render() {

      return(
        <div>
          <Router>
            <div>

              <Navbar>
                <Navbar.Header>
                  <Navbar.Brand>
                    Auto Tracker
                  </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                  <NavItem eventKey={1} href="#" to="/">
                    <Link to="/">Cars</Link>
                  </NavItem>
                  <NavItem eventKey={2} href="#">
                    <Link to="/services">Manage Services</Link>
                  </NavItem>
                  <NavItem eventKey={3} href="#">
                    <Link to="/explorer">Explorer</Link>
                  </NavItem>
                </Nav>
              </Navbar>


              <hr/>

              <Route exact path="/" component={Home}/>
              <Route path="/services" component={Services}/>
              <Route path="/explorer" component={Explorer}/>
            </div>
          </Router>
        </div>
      );
    }
}

export default hot(module)(App);

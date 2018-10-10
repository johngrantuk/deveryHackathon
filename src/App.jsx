import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap';
import { hot } from 'react-hot-loader';
import AddUser from './AddUser';
import CarList from './CarList';
import ServiceList from './ServiceList';

const devery = require('@devery/devery');
const dbHelper = require('./libs/orbitHelper');

const DeveryRegistry = devery.DeveryRegistry;
const deveryRegistryClient = new DeveryRegistry();

class App extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      account: 'Please sign in to MetaMask to manage your vehicles.',
      cars: []
    };
  }

  componentWillMount() {
    setInterval(() => this.checkMetaMask(), 1000);

    this.getCars();
  }

  checkMetaMask() {
    // Checks for active MetaMask account info.
    if(web3.eth.accounts[0] === undefined){
      this.setState({
        account: 'Please sign in to MetaMask to manage your vehicles.',
      });
      return;
    }
    if (web3.eth.accounts[0] !== this.state.account) {
      this.setState({
        account: web3.eth.accounts[0],
      });
    }
  }

  async getCars() {
    let cars = await dbHelper.LoadCars();

    this.setState({cars: cars});
  }

  render() {
    return (
      <div>
        <Jumbotron>
          <div>
            <h1>Auto Tracker</h1>
            <p>User Account: {this.state.account}</p>
            <AddUser account={this.state.account} deveryRegistryClient={deveryRegistryClient}/>
          </div>
        </Jumbotron>

        <CarList cars={this.state.cars}/>
      </div>
    );
  }
}

export default hot(module)(App);

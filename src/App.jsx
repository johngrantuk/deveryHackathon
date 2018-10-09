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
      info: '',
      appAddress: '0xf8b908e7DBb3a0f2581aa8F1962f9360e10DC059',
      appName: 'Not Loaded',
      account: 'Please sign in to MetaMask',
      cars: [],
      services: []
    };
  }

  componentWillMount() {
    setInterval(() => this.checkMetaMask(), 1000);

    this.getApp();

    this.getCars();

    this.getServices();
  }

  checkMetaMask() {
    // Checks for active MetaMask account info.
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

  async getServices() {
    let services = await dbHelper.LoadServices();

    this.setState({services: services});
  }

  async getApp() {

    const app = await deveryRegistryClient.getApp(this.state.appAddress);
    if (app.active) {
      this.setState({ appName: app.appName });
    } else {
      this.setState({ appName: "AutoApp doesn't exist. Creating..." });
      this.createApp();
    }
  }

  async createApp() {
    try {
      const transaction = await deveryRegistryClient.addApp(
        'AutoApp',
        this.state.appAddress,
        0,
      );
      await deveryRegistryClient.permissionMarker(this.state.appAddress, true);
    } catch (err) {
      console.log(err);
      if (err.message.indexOf('User denied')) {
        console.log('The user denied the transaction');
        this.setState({ appName: 'The user denied the transaction' });
      }
    }
  }

  render() {
    return (
      <div>
        <Jumbotron>
          <div>
            <h1>Auto Tracker</h1>
            <p>User Account: {this.state.account}</p>
            <p>App: {this.state.appName}</p>
            <AddUser account={this.state.account} deveryRegistryClient={deveryRegistryClient}/>
          </div>
        </Jumbotron>

        <CarList cars={this.state.cars}/>
        <hr></hr>
        <ServiceList services={this.state.services}/>
      </div>
    );
  }
}

export default hot(module)(App);

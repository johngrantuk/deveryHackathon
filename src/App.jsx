import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap';
import { hot } from 'react-hot-loader';
import AddUser from './AddUser';
import CarList from './CarList';
import ServiceList from './ServiceList';
import { css } from 'react-emotion';
import { PropagateLoader} from 'react-spinners';

const devery = require('@devery/devery');
const dbHelper = require('./libs/orbitHelper');

const DeveryRegistry = devery.DeveryRegistry;
const deveryRegistryClient = new DeveryRegistry();

const override = css`
    margin: 0 auto;
    width: 0%;
`;

class App extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      account: 'Please sign in to MetaMask to manage your vehicles.',
      cars: [],
      loading: true
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

    this.setState({loading: false});
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

        <div className='sweet-loading'>
          <PropagateLoader
            className={override}
            sizeUnit={"px"}
            size={15}
            marginUnit={"px"}
            margin={10}
            loading={this.state.loading}
          />
        </div>

        <CarList cars={this.state.cars}/>
      </div>
    );
  }
}

export default hot(module)(App);

import React from 'react';
import {Col, Panel } from 'react-bootstrap';
import Admin from './Admin';
import AdminBrand from './AdminBrand';

const devery = require('@devery/devery');

const DeveryRegistry = devery.DeveryRegistry;
const deveryRegistryClient = new DeveryRegistry();

const dbHelper = require('./libs/orbitHelper');

export default class Services extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      account: "Please Login",
      appName: 'Waiting To Load',
      appAccount: 'Waiting To Load',
      appAddress: '0xf8b908e7DBb3a0f2581aa8F1962f9360e10DC059',
      brandInfo: {brandName: 'No Brand'},
      brandProducts: [],
      cars: []
    }

    setInterval(() => this.checkMetaMask(), 1000);

    this.getAppDetails();

    this.getCars();
  }

  checkMetaMask() {
    // Checks for active MetaMask account info.
    if (web3.eth.accounts[0] !== this.state.account) {
      this.setState({
        account: web3.eth.accounts[0],
      });

      this.getBrandInfo();
    }
  }

  async getBrandInfo() {
    console.log('Getting brand info: ' + this.state.account);
    const brand = await deveryRegistryClient.getBrand(this.state.account);
    if (!brand.active) {
      console.log('No brand');
      this.setState({brandInfo: {brandName: 'No Brand'}});
    } else {
      console.log(brand);
      this.setState({ brandInfo: brand });

      console.log('Getting Brand Products');

      let products = await dbHelper.LoadBrandProducts(this.state.account);
      this.setState({brandProducts: products});
    }
  }

  async getAppDetails() {

    const app = await deveryRegistryClient.getApp(this.state.appAddress);
    if (app.active) {
      this.setState({
        appName: app.appName,
        appAccount: app.appAccount
      });
    }
  }

  async getCars() {
    let cars = await dbHelper.LoadCars();

    this.setState({cars: cars});
  }

  render() {

    let servicePage;
    if (this.state.account.toLowerCase() == this.state.appAccount.toLowerCase()) {
      servicePage = (
        <div>
          <h4>Your Account: {this.state.account}</h4>
          <Admin></Admin>
        </div>);
    }else if(this.state.brandInfo.brandName != 'No Brand'){
      servicePage = (
        <div>
          <AdminBrand
          brandInfo={this.state.brandInfo}
          products={this.state.brandProducts}
          account={this.state.account}
          cars={this.state.cars}
          />
        </div>);
    }else{
      servicePage = (
        <div>
        <h2>You Are Not A Registered Service Brand</h2>
        <h3>Please Get App Owner To Add You</h3>
        <h4>Your Account: {this.state.account}</h4>
        <h4>App Owner: {this.state.appAccount}</h4>
        </div>
      );
    }

    return(
    <div>
      {servicePage}
    </div>
    );
  }
}

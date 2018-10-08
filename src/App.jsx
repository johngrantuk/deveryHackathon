import React, { Component } from 'react';
import {
  Jumbotron,
  FormGroup,
  ControlLabel,
  Button,
  FormControl,
} from 'react-bootstrap';
import { hot } from 'react-hot-loader';
import AddUser from './AddUser';
const dbHelper = require('./libs/orbitHelper');
const devery = require('@devery/devery');
const DeveryRegistry = devery.DeveryRegistry;
const deveryRegistryClient = new DeveryRegistry();

class App extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleInfoChange = this.handleInfoChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleProduct = this.handleProduct.bind(this);
    this.handleMark = this.handleMark.bind(this);

    this.state = {
      info: '',
      appAddress: '0xf8b908e7DBb3a0f2581aa8F1962f9360e10DC059',
      appName: 'Not Loaded',
      brandAddr: '0xf8b908e7DBb3a0f2581aa8F1962f9360e10DC059',
      brandName: 'Not Loaded',
      productAddress: '0x2a6aa0af60f753e020030d5fe7cf1a6da3de9a81',
      productName: 'Not Loaded',
      itemAddress: '0xC8687a943EbB697beB5c5172d4DDcDDD3f7CA173',
      itemProductAccount: '',
      itemBrandAccount: '',
      itemAppAccount: '',
      noApps: '0',
      account: 'Please sign in to MetaMask'
    };
    // console.log(devery.Utils.getRandomAddress());

    setInterval(() => this.checkMetaMask(), 1000);
  }

  checkMetaMask() {
    // Checks for active MetaMask account info.
    if (web3.eth.accounts[0] !== this.state.account) {
      this.setState({
        account: web3.eth.accounts[0]
      });
    }
  }

  handleInfoChange(e) {
    this.setState({ info: e.target.value });
  }

  handleSubmit() {
    this.getBrand();
    dbHelper.LoadUsersCar(this.state.account);
  }

  handleProduct() {
    this.getProduct();
  }

  handleMark() {
    this.markItem();
  }

  async getApp() {
    const noApps = await deveryRegistryClient.appAccountsLength();
    this.setState({ noApps });

    const app = await deveryRegistryClient.getApp(this.state.appAddress);
    if (app.active) {
      this.setState({ appName: app.appName });
    } else {
      this.setState({ appName: "AutoApp doesn't exist. Creating..." });
      this.createApp();
    }

    this.checkItemMarker();
  }

  async createApp() {
    try {
      const transaction = await deveryRegistryClient.addApp(
        'AutoApp',
        '0xf8b908e7DBb3a0f2581aa8F1962f9360e10DC059',
        5,
      );
      await deveryRegistryClient.permissionMarker(this.state.appAddress, true);
      // console.log('transaction address',transaction.hash);
    } catch (err) {
      console.log(err);
      if (err.message.indexOf('User denied')) {
        console.log('The user denied the transaction');
        this.setState({ appName: 'The user denied the transaction' });
      }
    }
  }

  async getBrand() {
    const brand = await deveryRegistryClient.getBrand(this.state.brandAddr);
    if (!brand.active) {
      this.setState({ brandName: 'Creating brand, waiting for approval...' });
      transaction = await deveryRegistryClient.addBrand(
        '0xf8b908e7DBb3a0f2581aa8F1962f9360e10DC059',
        'Garage Brand',
      );
    } else {
      this.setState({ brandName: brand.brandName });
    }
  }

  async getProduct() {
    const product = await deveryRegistryClient.getProduct(
      this.state.productAddress,
    );
    if (product.active) {
      console.log('Product Details:');
      console.log(product.details);
      this.setState({ productName: product.description });
    } else {
      this.setState({
        productName: 'Creating Product, waiting for approval...',
      });
      const transaction = await deveryRegistryClient.addProduct(
        proAddress,
        'MOT',
        'Accredited: 7823B12AE',
        1999,
        'Kirknewton',
      );
      // console.log('transaction address',transaction.hash);
    }
  }

  async checkItemMarker() {
    const item = await deveryRegistryClient.check(this.state.productAddress);
    this.setState({
      itemProductAccount: item.productAccount,
      itemBrandAccount: item.brandAccount,
      itemAppAccount: item.itemAppAccount,
    });
  }

  async markItem() {
    const hash = await deveryRegistryClient.addressHash(
      this.state.productAddress
    );

    console.log(this.state.productAddress, hash)
    await deveryRegistryClient.mark(this.state.productAddress, hash);
    this.checkItemMarker();
  }

  async checkItemMarkero() {
    const item = await deveryRegistryClient.check(this.state.itemAddress);
    this.setState({
      itemProductAccount: item.productAccount,
      itemBrandAccount: item.brandAccount,
      itemAppAccount: item.itemAppAccount,
    });
  }

  render() {
    return (
      <div>
        <Jumbotron>
          <div>
            <h1>Auto Tracker</h1>
            <p>User Account: {this.state.account}</p>
            <p>No Apps: {this.state.noApps}</p>
            <p>App: {this.state.appName}</p>
            <AddUser
              account={this.state.account}
              />
          </div>
        </Jumbotron>

        <FormGroup controlId="formControlsTextarea">
          <ControlLabel>Brand: {this.state.brandName}</ControlLabel>
          <FormControl
            componentClass="textarea"
            value={this.state.info}
            placeholder="e.g. I saw this in Scotland in July."
            onChange={this.handleInfoChange}
          />
          <Button bsStyle="primary" onClick={this.handleSubmit}>
            Get/Add Brand
          </Button>
        </FormGroup>

        <FormGroup controlId="formControlProduct">
          <ControlLabel>Product: {this.state.productName}</ControlLabel>
          <FormControl
            componentClass="textarea"
            value={this.state.info}
            placeholder="e.g. I saw this in Scotland in July."
            onChange={this.handleInfoChange}
          />
          <Button bsStyle="primary" onClick={this.handleProduct}>
            Get/Add Product
          </Button>
        </FormGroup>

        <FormGroup controlId="formControlItem">
          <p>Item Address: {this.state.itemAddress}</p>
          <p>itemProductAccount: {this.state.itemProductAccount}</p>
          <p>itemBrandAccount: {this.state.itemBrandAccount}</p>
          <p>itemAppAccount: {this.state.itemAppAccount}</p>

          <Button bsStyle="primary" onClick={this.handleMark}>
            Mark Item
          </Button>
        </FormGroup>
      </div>
    );
  }
}

export default hot(module)(App);

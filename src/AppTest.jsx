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

const devery = require('@devery/devery');
const dbHelper = require('./libs/orbitHelper');

const DeveryRegistry = devery.DeveryRegistry;
const deveryRegistryClient = new DeveryRegistry();

class App extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleInfoChange = this.handleInfoChange.bind(this);
    this.handleProduct = this.handleProduct.bind(this);
    this.handleMark = this.handleMark.bind(this);
    this.handleGenerateItem = this.handleGenerateItem.bind(this);
    this.handleCheckItem = this.handleCheckItem.bind(this);
    this.handleGetBrand = this.handleGetBrand.bind(this);
    this.handleBrandAddrChange = this.handleBrandAddrChange.bind(this);
    this.handleAddBrandAddrChange = this.handleAddBrandAddrChange.bind(this);
    this.handleAddBrandNameChange = this.handleAddBrandNameChange.bind(this);
    this.handleAddBrand = this.handleAddBrand.bind(this);

    this.handleGetProduct = this.handleGetProduct.bind(this);
    this.handleProductAddrChange = this.handleProductAddrChange.bind(this);
    this.handleAddProductAddrChange = this.handleAddProductAddrChange.bind(this);
    this.handleAddProductNameChange = this.handleAddProductNameChange.bind(this);
    this.handleAddProduct = this.handleAddProduct.bind(this);

    this.state = {
      info: '',
      appAddress: '0xf8b908e7DBb3a0f2581aa8F1962f9360e10DC059',
      appName: 'Not Loaded',
      brandAddr: '0xf8b908e7DBb3a0f2581aa8F1962f9360e10DC059',
      brandName: 'Not Loaded',
      productAddress: '0x2a6aa0af60f753e020030d5fe7cf1a6da3de9a81',
      productName: 'Not Loaded',
      itemAddress: '',
      itemProductAccount: '',
      itemBrandAccount: '',
      itemAppAccount: '',
      noApps: '0',
      account: 'Please sign in to MetaMask',
      checkBrandAddr: '',
      brandInfo: ''
    };
    // console.log(devery.Utils.getRandomAddress());

    // this.getApp();
    setInterval(() => this.checkMetaMask(), 1000);

    this.checkItemMarker();
  }

  checkMetaMask() {
    // Checks for active MetaMask account info.
    if (web3.eth.accounts[0] !== this.state.account) {
      this.setState({
        account: web3.eth.accounts[0],
      });
    }
  }

  handleBrandAddrChange(e){
    this.setState({checkBrandAddr: e.target.value});
  }

  handleAddBrandAddrChange(e){
    this.setState({addBrandAddr: e.target.value});
  }

  handleAddBrandNameChange(e){
    this.setState({addBrandName: e.target.value});
  }

  handleAddBrand(){
    this.addBrand(this.state.addBrandAddr, this.state.addBrandName);
  }

  handleGetBrand(){
    this.getBrand();
  }

  handleProductAddrChange(e){
    this.setState({checkProductAddr: e.target.value})
  }

  handleAddProductAddrChange(e){
    this.setState({addProductAddr: e.target.value});
  }

  handleAddProductNameChange(e){
    this.setState({addProductName: e.target.value});
  }

  handleAddProduct(){
    this.addProduct(this.state.addProductAddr, this.state.addProductName);
  }

  handleGetProduct(){
    this.getProduct();
  }

  handleInfoChange(e) {
    this.setState({ info: e.target.value });
  }

  handleProduct() {
    this.getProduct();
  }

  handleMark() {
    this.markItem();
  }

  handleGenerateItem() {
    this.setState({itemAddress: devery.Utils.getRandomAddress() });
  }

  handleCheckItem() {
    this.checkItemMarker();
  }

  async getApp() {
    const noApps = await deveryRegistryClient.appAccountsLength();
    this.setState({ noApps });

    const app = await deveryRegistryClient.getApp(this.state.appAddress);
    if (app.active) {
      this.setState({ appName: app.appName });
      let transaction = await deveryRegistryClient.updateApp("AutoApp", this.state.appAddress, 0, true);
      await deveryRegistryClient.permissionMarker(this.state.appAddress, true);
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
        this.state.appAddress,
        0,
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
    console.log('Getting brand info: ' + this.state.checkBrandAddr);
    const brand = await deveryRegistryClient.getBrand(this.state.checkBrandAddr);
    if (!brand.active) {
      console.log('No brand');
      this.setState({ brandInfo: 'No Brand' });
    } else {
      console.log(brand);
      this.setState({ brandInfo: brand });
    }
  }

  async addBrand(Addr, Name){
    console.log('Adding Brand: ' + Addr + ', ' + Name);
    try {
      const brand = await deveryRegistryClient.addBrand(Addr, Name);
    }
    catch (err) {
      console.log(err);
    }
  }

  async getProduct() {
    console.log('Getting Product info: ' + this.state.checkProductAddr);
    const Product = await deveryRegistryClient.getProduct(this.state.checkProductAddr);
    if (!Product.active) {
      console.log('No Product');
      this.setState({ productInfo: 'No product' });
    } else {
      console.log(Product);
      this.setState({ productInfo: Product });
    }
  }

  async addProduct(Addr, Name){
    console.log('Adding product: ' + Addr + ', ' + Name);
    try {
      const product = await deveryRegistryClient.addProduct(
        Addr,
        Name,
        'Accredited: 7823B12AE',
        1999,
        'Kirknewton')
    }
    catch (err) {
      console.log(err);
    }
  }

  async checkItemMarker() {
    console.log('Checking Item: ' + this.state.itemAddress)
    const item = await deveryRegistryClient.check(this.state.itemAddress);
    this.setState({
      itemProductAccount: item.productAccount,
      itemBrandAccount: item.brandAccount,
      itemAppAccount: item.appAccount,
    });
  }

  async markItem() {
    const hash = await deveryRegistryClient.addressHash(
      this.state.itemAddress,
    );

    console.log(this.state.productAddress, hash);
    await deveryRegistryClient.mark(this.state.productAddress, hash);
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
            <AddUser account={this.state.account} />
          </div>
        </Jumbotron>

        <FormGroup controlId="formControlsTextarea">
          <ControlLabel>Get Brand Info:</ControlLabel>
          <FormControl
            type="text"
            placeholder="Brand Address"
            onChange={this.handleBrandAddrChange}
          />
          <FormControl
            componentClass="textarea"
            value={this.state.brandInfo}
          />
          <Button bsStyle="primary" onClick={this.handleGetBrand}>Get Brand Info</Button>

          <FormControl
            type="text"
            placeholder="Brand Address"
            onChange={this.handleAddBrandAddrChange}
          />
          <FormControl
            type="text"
            placeholder="Brand Name"
            onChange={this.handleAddBrandNameChange}
          />
        <Button bsStyle="primary" onClick={this.handleAddBrand}>Add Brand</Button>
        </FormGroup>

        <FormGroup controlId="formControlsTextarea">
          <ControlLabel>Get Product Info:</ControlLabel>
          <FormControl
            type="text"
            placeholder="Product Address"
            onChange={this.handleProductAddrChange}
          />
          <FormControl
            componentClass="textarea"
            value={this.state.productInfo}
          />
        <Button bsStyle="primary" onClick={this.handleGetProduct}>Get Product Info</Button>

          <FormControl
            type="text"
            placeholder="Product Address"
            onChange={this.handleAddProductAddrChange}
          />
          <FormControl
            type="text"
            placeholder="Product Name"
            onChange={this.handleAddProductNameChange}
          />
        <Button bsStyle="primary" onClick={this.handleAddProduct}>Add Product</Button>
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

        <FormGroup controlId="formControlMark">
          <ControlLabel>Product Address: </ControlLabel>
          <FormControl type="text" value={this.state.productAddress} readOnly/>
          <FormControl type="text" value={this.state.itemAddress} readOnly/>
          <Button bsStyle="primary" onClick={this.handleGenerateItem}>Generate Item</Button>
          <Button bsStyle="primary" onClick={this.handleMark}>Mark Item</Button>
        </FormGroup>

        <FormGroup controlId="formControlItem">
          <p>Item Address: {this.state.itemAddress}</p>
          <p>itemProductAccount: {this.state.itemProductAccount}</p>
          <p>itemBrandAccount: {this.state.itemBrandAccount}</p>
          <p>itemAppAccount: {this.state.itemAppAccount}</p>

          <Button bsStyle="primary" onClick={this.handleCheckItem}>
            Check Item
          </Button>
        </FormGroup>
      </div>
    );
  }
}

export default hot(module)(App);

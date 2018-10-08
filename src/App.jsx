import React, { Component } from 'react';
import { Jumbotron, FormGroup, ControlLabel, Button, FormControl } from 'react-bootstrap';
import { hot } from 'react-hot-loader';

const devery = require('@devery/devery');

const DeveryRegistry = devery.DeveryRegistry;

let deveryRegistryClient = new DeveryRegistry();

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
      productAddress:'0x2a6aa0af60f753e020030d5fe7cf1a6da3de9a81',
      productName: 'Not Loaded',
      itemAddress: '0xC8687a943EbB697beB5c5172d4DDcDDD3f7CA173',
      itemProductAccount: '',
      itemBrandAccount: '',
      itemAppAccount: '',
      noApps: '0'
    };
    //console.log(devery.Utils.getRandomAddress());
    this.getApp();
  }

  handleInfoChange(e) {
    this.setState({ info: e.target.value });
  }

  handleSubmit() {
    //console.log(this.state.info);
    this.getBrand();
  }

  handleProduct() {
    //console.log(this.state.info);
    this.getProduct();
  }

  handleMark() {
    //console.log(this.state.info);
    this.markItem();
  }

  async getApp(){
    let noApps = await deveryRegistryClient.appAccountsLength();
    this.setState({noApps: noApps});

     let app = await deveryRegistryClient.getApp(this.state.appAddress);
     if(app.active){
       this.setState({appName: app.appName});
     }
     else{
       this.setState({appName: "AutoApp doesn't exist. Creating..."});
       this.createApp();
     }


     this.checkItemMarker();
  }

  async createApp(){
    try{
      let transaction = await deveryRegistryClient.addApp("AutoApp","0xf8b908e7DBb3a0f2581aa8F1962f9360e10DC059",5);
      await deveryRegistryClient.permissionMarker(this.state.appAddress, true);
      // console.log('transaction address',transaction.hash);
    }
    catch(err){
      console.log(err)
      if(err.message.indexOf('User denied')){
        console.log('The user denied the transaction');
        this.setState({appName: 'The user denied the transaction'});
      }
    }
  }

  async getBrand(){
     let brand = await deveryRegistryClient.getBrand(this.state.brandAddr)
     if(!brand.active){
       this.setState({brandName: 'Creating brand, waiting for approval...'});
       transaction = await deveryRegistryClient.addBrand("0xf8b908e7DBb3a0f2581aa8F1962f9360e10DC059","Garage Brand");
       return;
     }else{
       this.setState({brandName: brand.brandName});
     }
  }

  async getProduct(){
    let product = await deveryRegistryClient.getProduct(this.state.productAddress)
    if(product.active){
      console.log('Product Details:')
      console.log(product.details);
      this.setState({productName: product.description});
    }else{
      this.setState({productName: 'Creating Product, waiting for approval...'});
      let transaction = await deveryRegistryClient.addProduct(proAddress,'MOT','Accredited: 7823B12AE',1999,'Kirknewton')
      // console.log('transaction address',transaction.hash);
    }
  }

  async checkItemMarker(){
    let item = await deveryRegistryClient.check(this.state.productAddress);
    this.setState({
      itemProductAccount: item.productAccount,
      itemBrandAccount: item.brandAccount,
      itemAppAccount: item.itemAppAccount
    });
  }

  async markItem(){
    const hash = await deveryRegistryClient.addressHash(this.state.productAddress);
    await deveryRegistryClient.mark(this.state.productAddress, hash);
    this.checkItemMarker();
  }

  async checkItemMarkero(){
    let item = await deveryRegistryClient.check(this.state.itemAddress);
    this.setState({
      itemProductAccount: item.productAccount,
      itemBrandAccount: item.brandAccount,
      itemAppAccount: item.itemAppAccount
    });
  }

  async markItemo(){
    const hash = await deveryRegistryClient.addressHash(this.state.productAddress);
    await deveryRegistryClient.mark(this.state.productAddress, hash);
    this.checkItemMarker();
  }


  render() {
    return (
      <div>
        <Jumbotron>
          <div>
            <h1>What Is It?</h1>
            <p>No Apps: {this.state.noApps}</p>
            <p>App: {this.state.appName}</p>
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
          <Button bsStyle="primary"  onClick={this.handleSubmit}>Get/Add Brand</Button>
        </FormGroup>

        <FormGroup controlId="formControlProduct">
          <ControlLabel>Product: {this.state.productName}</ControlLabel>
          <FormControl
            componentClass="textarea"
            value={this.state.info}
            placeholder="e.g. I saw this in Scotland in July."
            onChange={this.handleInfoChange}
          />
        <Button bsStyle="primary"  onClick={this.handleProduct}>Get/Add Product</Button>
        </FormGroup>

        <FormGroup controlId="formControlItem">
          <ControlLabel>Item Address: {this.state.itemAddress}</ControlLabel>
          <ControlLabel>itemProductAccount: {this.state.itemProductAccount}</ControlLabel>
          <ControlLabel>itemBrandAccount: {this.state.itemBrandAccount}</ControlLabel>
          <ControlLabel>itemAppAccount: {this.state.itemAppAccount}</ControlLabel>

          <Button bsStyle="primary"  onClick={this.handleMark}>Mark Item</Button>
        </FormGroup>


      </div>
    );
  }

}

export default hot(module)(App);

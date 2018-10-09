import React from 'react';
import {
  Button,
  Modal,
  ButtonToolbar,
  ToggleButtonGroup,
  ToggleButton,
  FormGroup,
  ControlLabel,
  FormControl,
} from 'react-bootstrap';
import { Checkbox } from 'react-bootstrap';
import uuid from 'uuid';

const dbHelper = require('./libs/orbitHelper');

const devery = require('@devery/devery');

export default class AddUser extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleModelChange = this.handleModelChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleYearChange = this.handleYearChange.bind(this);
    this.handleSaleChange = this.handleSaleChange.bind(this);
    this.handleCompanyNameChange = this.handleCompanyNameChange.bind(this);
    this.handleServiceTypeChange = this.handleServiceTypeChange.bind(this);
    this.handleAddService = this.handleAddService.bind(this);
    this.handleCreateService = this.handleCreateService.bind(this);

    this.state = {
      show: false,
      carOwner: true,
      isForSale: false,
      services: []
    };
  }


  handleCreateService(){
    const service = {
      _id: uuid.v4(),
      owner: this.props.account,
      name: this.state.companyName,
      services: this.state.services
    }

    this.AddService(service);
  }

  async AddService(Service) {
    let address = devery.Utils.getRandomAddress();
    console.log('Adding Service Brand: ' + address + ': ' + Service.name);
    await this.props.deveryRegistryClient.addBrand(address, Service.name);

    var arrayLength = Service.services.length;
    for (var i = 0; i < arrayLength; i++) {
      let service = Service.services[i];
      console.log('Adding Service Product: ' + service.address + ', ' + service.serviceType + ', ' + Service.owner + ', ' + '2018, ' + Service.name);
      await this.props.deveryRegistryClient.addProduct(service.address, service.serviceType, Service.owner, 2018, Service.name);
    }

    console.log('Saving Service to db...')
    await dbHelper.saveService(service);
    console.log('DONE');
  }

  async AddServiceProduct(Owner, Name, ServiceProduct) {
    console.log('Adding Service Product: ' + service.address + ', ' + service.serviceType + ', ' + Owner + ', ' + '2018, ' + Name);
    await this.props.deveryRegistryClient.addProduct(service.address, service.serviceType, Owner, 2018, Name);
  }

  handleAddService(){
    let services = this.state.services;
    let address = devery.Utils.getRandomAddress();
    services.push({
      serviceType: this.state.serviceType,
      address: address
    });

    this.setState({services: services});
  }

  handleServiceTypeChange(e){
    this.setState({serviceType: e.target.value });
  }

  handleCompanyNameChange(e){
    this.setState({companyName: e.target.value });
  }

  handleSaleChange(e) {
    console.log('start' + this.state.isForSale);
    const value = !this.state.isForSale;
    this.setState({ isForSale: value });
    console.log(this.state.isForSale);
  }

  handleYearChange(e) {
    this.setState({ year: e.target.value });
  }

  handleTypeChange(e) {
    this.setState({ type: e.target.value });
  }

  handleModelChange(e) {
    this.setState({ model: e.target.value });
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    //this.checkBrand()
    this.setState({ show: true });
  }

  async checkBrand() {
    console.log('Checking brand: ' + this.props.account);
    const brand = await this.props.deveryRegistryClient.getBrand(this.props.account);

    console.log(brand);
    if (brand.active) {
      this.setState({ isBrandActive: true });
      this.setState({ brandName: brand.brandName});
    } else {
      this.setState({ isBrandActive: false });
    }
  }

  handleCreate() {
    // console.log(this.state.info);

    const car = {
      _id: uuid.v4(),
      owner: this.props.account,
      type: this.state.type,
      model: this.state.model,
      year: this.state.year,
      picHash:
        'https://s-media-cache-ak0.pinimg.com/736x/4a/ed/fa/4aedfa93b3c8785d55fd20362a1480d4.jpg',
      isSelling: this.state.isForSale,
      created: new Date(),
    };

    console.log('Saving Car: ');
    console.log(car);
    dbHelper.saveCar(car);
  }

  handleChange(e) {
    // console.log(e)
    if (e == 1) {
      this.setState({ carOwner: true });
    } else {
      this.setState({ carOwner: false });
    }
  }

  render() {
    let signUp;
    if (this.state.carOwner) {
      signUp = (
        <div>
          <h3>CAR</h3>
          <FormGroup controlId="formControlsCar">
            <ControlLabel>Your Account:</ControlLabel>
            <FormControl type="text" value={this.props.account} readOnly />
            <ControlLabel>Model:</ControlLabel>
            <FormControl
              type="text"
              placeholder="e.g. AUDI"
              onChange={this.handleModelChange}
            />
            <ControlLabel>Type:</ControlLabel>
            <FormControl
              type="text"
              placeholder="e.g. A1"
              onChange={this.handleTypeChange}
            />
            <ControlLabel>Year:</ControlLabel>
            <FormControl
              type="text"
              placeholder="e.g. 2017"
              onChange={this.handleYearChange}
            />
            <Checkbox onChange={this.handleSaleChange}>For Sale?</Checkbox>

            <Button bsStyle="primary" onClick={this.handleCreate}>
              CREATE
            </Button>
          </FormGroup>
        </div>
      );
    } else {
      if(this.state.isBrandActive){
        signUp = (
        <div>
          <h3>You already have a service company setup: {this.state.brandName}</h3>
          <h3>Please use another account.</h3>
        </div>
      );
      }else{
        signUp = (
          <div>
            <h3>SERVICE</h3>
            <FormGroup controlId="formControlsService">
              <ControlLabel>Your Account:</ControlLabel>
              <FormControl type="text" value={this.props.account} readOnly />
              <ControlLabel>Company Name:</ControlLabel>
              <FormControl
                type="text"
                placeholder="e.g. Local Garage"
                onChange={this.handleCompanyNameChange}
              />
              <ControlLabel>Service Type:</ControlLabel>
              <FormControl
                type="text"
                placeholder="e.g. Car Service"
                onChange={this.handleServiceTypeChange}
              />

              <Button bsStyle="primary" onClick={this.handleAddService}>ADD SERVICE</Button>

              <h3>Services (You Can Add More Later)</h3>
              {this.state.services.map(service =>
                  <p key={uuid.v4()}>{service.serviceType}</p>
              )}
              <Button bsStyle="primary" onClick={this.handleCreateService}>CREATE</Button>
            </FormGroup>
          </div>
        );
      }
    }

    return (
      <div>
        <Button bsStyle="primary" bsSize="large" onClick={this.handleShow}>
          SIGN UP
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Sign Up</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ButtonToolbar>
              <ToggleButtonGroup
                type="radio"
                name="options"
                defaultValue={1}
                onChange={this.handleChange}
              >
                <ToggleButton value={1}>CAR OWNER</ToggleButton>
                <ToggleButton value={2}>SERVICE OWNER</ToggleButton>
              </ToggleButtonGroup>
            </ButtonToolbar>

            {signUp}
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

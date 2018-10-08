import React from 'react';
import {Button, Modal, ButtonToolbar, ToggleButtonGroup, ToggleButton, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import {Checkbox } from 'react-bootstrap';
import uuid from 'uuid';
const dbHelper = require('./libs/orbitHelper');

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

    this.state = {
      show: false,
      carOwner: true,
      isForSale: false
    };
  }

  handleSaleChange(e) {
    console.log('start'+this.state.isForSale);
    let value = !this.state.isForSale;
    this.setState({isForSale: value});
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
    this.setState({ show: true });
  }

  handleCreate() {
    // console.log(this.state.info);

    let car = {
      _id: uuid.v4(),
      owner: this.props.account,
      type: this.state.type,
      model: this.state.model,
      year: this.state.year,
      picHash: 'https://s-media-cache-ak0.pinimg.com/736x/4a/ed/fa/4aedfa93b3c8785d55fd20362a1480d4.jpg',
      isSelling: this.state.isForSale,
      created: new Date() }

    console.log('Saving Car: ');
    console.log(car);
    dbHelper.saveCar(car);
  }

  handleChange(e) {
    // console.log(e)
    if(e == 1 ){
      this.setState({ carOwner: true });
    }else {
      this.setState({ carOwner: false });
    }
  }

  render() {

    let signUp;
    if(this.state.carOwner){
      signUp =
              <div>
              <h3>CAR</h3>
              <FormGroup controlId="formControlsCar">
                <ControlLabel>Your Account:</ControlLabel>
                <FormControl type="text" value={this.props.account} readOnly/>
                <ControlLabel>Model:</ControlLabel>
                <FormControl type="text" placeholder="e.g. AUDI" onChange={this.handleModelChange}/>
                <ControlLabel>Type:</ControlLabel>
                <FormControl type="text" placeholder="e.g. A1" onChange={this.handleTypeChange}/>
                <ControlLabel>Year:</ControlLabel>
                <FormControl type="text" placeholder="e.g. 2017" onChange={this.handleYearChange}/>
                <Checkbox onChange={this.handleSaleChange}>For Sale?</Checkbox>

                <Button bsStyle="primary" onClick={this.handleCreate}>
                  CREATE
                </Button>
              </FormGroup>
              </div>
    }else{
      signUp = <h3>SERVICE</h3>
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
                <ToggleButtonGroup type="radio" name="options" defaultValue={1}
                  onChange={this.handleChange}>
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

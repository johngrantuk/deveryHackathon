import React from 'react';
import {
  Button,
  Modal,
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
    this.handleCreate = this.handleCreate.bind(this);
    this.handleModelChange = this.handleModelChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleYearChange = this.handleYearChange.bind(this);
    this.handleSaleChange = this.handleSaleChange.bind(this);
    this.handlePicLinkChange = this.handlePicLinkChange.bind(this);

    this.state = {
      show: false,
      isForSale: false,
      pickLink: 'https://s-media-cache-ak0.pinimg.com/736x/4a/ed/fa/4aedfa93b3c8785d55fd20362a1480d4.jpg'
    };
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
    this.setState({ show: true });
  }

  handlePicLinkChange(e){
    this.setState({pickLink: e.target.value});
  }

  handleCreate() {
    // console.log(this.state.info);

    const car = {
      _id: uuid.v4(),
      owner: this.props.account,
      type: this.state.type,
      model: this.state.model,
      year: this.state.year,
      picHash: this.state.pickLink,
      isSelling: this.state.isForSale,
      created: new Date(),
    };

    console.log('Saving Car: ');
    console.log(car);
    dbHelper.saveCar(car);

    // NEED TO ADD AS PRODUCT
    // CLOSE MODAL AND UPDATE GUI
  }

  render() {
    return (
      <div>
        <Button bsStyle="primary" bsSize="large" onClick={this.handleShow}>
          ADD YOUR CAR
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Your Car</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
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
                <ControlLabel>Picture Link:</ControlLabel>
                <FormControl
                  type="text"
                  onChange={this.handlePicLinkChange}
                  placeholder="Can Leave Blank (But it's boring :D)"
                />
                <Checkbox onChange={this.handleSaleChange}>For Sale?</Checkbox>

                <Button bsStyle="primary" onClick={this.handleCreate}>
                  CREATE
                </Button>
              </FormGroup>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

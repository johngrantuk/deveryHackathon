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
import { css } from 'react-emotion';
import { PropagateLoader } from 'react-spinners';

const dbHelper = require('./libs/orbitHelper');

const devery = require('@devery/devery');

const override = css`
    margin: 0 auto;
    width: 0%;
`;

export default class AddUser extends React.Component {
  /**
  Component used to add a new user car.
  Saves to 'cars' db.
  **/
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
      pickLink: 'https://s-media-cache-ak0.pinimg.com/736x/4a/ed/fa/4aedfa93b3c8785d55fd20362a1480d4.jpg',
      loading: false
    };
  }

  handleSaleChange(e) {
    // Handles change of for sale in GUI.
    console.log('start' + this.state.isForSale);
    const value = !this.state.isForSale;
    this.setState({ isForSale: value });
    console.log(this.state.isForSale);
  }

  handleYearChange(e) {
    // Handles change of year in GUI.
    this.setState({ year: e.target.value });
  }

  handleTypeChange(e) {
    // Handles change of for type in GUI.
    this.setState({ type: e.target.value });
  }

  handleModelChange(e) {
    // Handles change of for model in GUI.
    this.setState({ model: e.target.value });
  }

  handleClose() {
    // Handles modal close.
    this.setState({ show: false });
  }

  handleShow() {
    // Handles modal open.
    this.setState({ show: true });
  }

  handlePicLinkChange(e){
    // Handles change of pic link in GUI.
    this.setState({pickLink: e.target.value});
  }

  handleCreate() {
    // Creates new car record in cars db.

    const car = {
      _id: uuid.v4(),
      owner: this.props.account,
      type: this.state.type,
      model: this.state.model,
      year: this.state.year,
      picHash: this.state.pickLink,
      isSelling: this.state.isForSale,
      created: new Date()
    };

    console.log('Saving Car: ');
    console.log(car);

    this.SaveCar(car);
    // COULD ADD AS PRODUCT ON BLOCKCHAIN IN FUTURE?
  }

  async SaveCar(Car){
    this.setState({loading: true});
    await dbHelper.saveCar(Car);              // Saves record to OrbitDB.
    this.setState({loading: false});
    this.setState({ show: false });
    this.props.addCar(Car);
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
              </FormGroup>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

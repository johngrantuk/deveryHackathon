import React from 'react';
import {Button, Modal, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import uuid from 'uuid';

const dbHelper = require('./libs/orbitHelper');
const devery = require('@devery/devery');


const DeveryRegistry = devery.DeveryRegistry;
const deveryRegistryClient = new DeveryRegistry();

export default class MarkModal extends React.Component {

  constructor(props, context){
    super(props, context);

    this.handleMark = this.handleMark.bind(this);

    this.state = {
      selectedCarId: null
    }
  }

  handleMark(){
    if(this.state.selectedCarId == null){
      console.log('No Car Selected.')
    }else{

      let newItemAddress = devery.Utils.getRandomAddress();

      const newItem = {
        _id: uuid.v4(),
        address: newItemAddress,
        brand: this.props.brandAccount,
        productId: this.props.product._id,
        carId: this.state.selectedCarId,
        date: new Date()
      };

      this.markItem(this.props.product.address, newItemAddress, newItem);
    }
  }

  async markItem(ProductAddress, ItemAddress, NewItem) {
    console.log('Marking Item: ' + ItemAddress);

    const hash = await deveryRegistryClient.addressHash(ItemAddress);
    console.log('Item Hash: ' + hash);
    console.log('Product Address: ' + ProductAddress);
    await deveryRegistryClient.mark(ProductAddress, hash);

    console.log('Marked on chain. Saving Item To item Db:');
    console.log(NewItem);
    await dbHelper.saveRecord('items', NewItem);
    console.log('Ok');
  }

  yourChangeHandler(event){
    this.setState({selectedCarId: event.target.value});
  }

  render() {

    const cars = this.props.cars;

    return (
      <Modal show={this.props.show} onHide={this.props.hide}>
        <Modal.Header closeButton>
          <Modal.Title>Mark A {this.props.product.name} Job</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup controlId="formControlsSelectMultiple">
            <ControlLabel>Select The Vehicle</ControlLabel>
            <FormControl componentClass="select" placeholder="select" onChange={this.yourChangeHandler.bind(this)}>
              {cars.map(car =>
                <option key={car._id} value={car._id}>{car.model} {car.type}</option>
              )}

            </FormControl>

            <Button bsStyle="primary" onClick={this.handleMark}>MARK</Button>
          </FormGroup>

        </Modal.Body>
      </Modal>
    );
  }
}

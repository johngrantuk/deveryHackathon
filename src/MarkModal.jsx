import React from 'react';
import {Button, Modal, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

export default class MarkModal extends React.Component {

  yourChangeHandler(event){
    console.log(event.target.value)
  }

  render() {

    const cars = this.props.cars;

    return (
      <Modal show={this.props.show} onHide={this.props.hide}>
        <Modal.Header closeButton>
          <Modal.Title>Item Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3>Owner:</h3>

          <FormGroup controlId="formControlsSelectMultiple">
            <ControlLabel>Multiple select</ControlLabel>
            <FormControl componentClass="select" placeholder="select" onChange={this.yourChangeHandler.bind(this)}>
              {cars.map(car =>
                <option value={car._id}>{car.model} {car.type}</option>
              )}

            </FormControl>
          </FormGroup>

        </Modal.Body>
      </Modal>
    );
  }
}

import React from 'react';
import {Button, Modal } from 'react-bootstrap';

export default class MarkModal extends React.Component {
  render() {

    return (
      <Modal show={this.props.show} onHide={this.props.hide}>
        <Modal.Header closeButton>
          <Modal.Title>Item Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3>Owner:</h3>

        </Modal.Body>
      </Modal>
    );
  }
}

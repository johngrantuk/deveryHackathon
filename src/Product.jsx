import React from 'react';
import {Col, Panel, Button } from 'react-bootstrap';
import MarkModal from './MarkModal';

export default class Product extends React.Component {

  constructor(props, context){
    super(props, context);

    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false
    }

    this.handleMark = this.handleMark.bind(this);
  }

  handleMark(){
    this.setState({ show: true });
  }

  handleClose() {
    this.setState({ show: false });
  }

  render() {

    return(
      <div>
        <Col sm={6} md={4} lg={3}>
          <Panel>
            <Panel.Heading>
              <Panel.Title componentClass="h3">{this.props.product.name}</Panel.Title>
            </Panel.Heading>
            <Panel.Body>
              <strong></strong> <span>{this.props.product.detail}</span><br/>
              <strong>Year: </strong> <span>{this.props.product.year}</span><br/>
              <strong>Origin:</strong> <span>{this.props.product.origin}</span><br/>
              <Button bsStyle="primary" onClick={this.handleMark}>
                MARK A JOB
              </Button>
            </Panel.Body>
          </Panel>
        </Col>

        <MarkModal
          show={this.state.show}
          hide={this.handleClose}
          cars={this.props.cars}
          product={this.props.product}
          brandAccount={this.props.brandAccount}
          ></MarkModal>
      </div>
    );
  }
}

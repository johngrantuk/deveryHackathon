import React from 'react';
import {Col, Panel } from 'react-bootstrap';

export default class Car extends React.Component {

    render() {

      return(
        <div>
          <Col sm={6} md={4} lg={3}>
            <Panel>
              <Panel.Heading>
                <Panel.Title componentClass="h3">{this.props.carInfo.year}: {this.props.carInfo.model} {this.props.carInfo.type}</Panel.Title>
              </Panel.Heading>
              <Panel.Body>
                <img role="presentation" style={{"width" : "100%"}} src={this.props.carInfo.picHash}/>
                <br/><br/>
                <strong>Selling: </strong> <span>{this.props.carInfo.isSelling}</span><br/>

              </Panel.Body>
            </Panel>
          </Col>
        </div>
      );
    }
}

import React from 'react';
import {Col, Panel } from 'react-bootstrap';

export default class Car extends React.Component {

    render() {

      return(
        <div>
          <Col sm={6} md={4} lg={3}>
            <Panel>
              <Panel.Heading>
                <Panel.Title componentClass="h3">CAR{this.props.carInfo.model}: {this.props.carInfo.year}</Panel.Title>
              </Panel.Heading>
              <Panel.Body>
                <img role="presentation" style={{"width" : "100%"}} src={this.props.carInfo.picLink}/>
                <br/><br/>
                <strong>Owner: </strong> <span>{this.props.carInfo.owner}</span><br/>
                <strong>Bounty: </strong> <span>{this.props.carInfo.bountyEth}Eth</span><br/>
                <strong>Info:</strong> <span>{this.props.carInfo.info}</span><br/>
                <strong>Answers:</strong> <span>{this.props.carInfo.noAnswers}</span><br/>
              </Panel.Body>
            </Panel>
          </Col>
        </div>
      );
    }
}

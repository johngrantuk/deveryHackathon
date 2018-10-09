import React from 'react';
import {Col, Panel } from 'react-bootstrap';

export default class Service extends React.Component {

    render() {

      return(
        <div>
          <Col sm={6} md={4} lg={3}>
            <Panel>
              <Panel.Heading>
                <Panel.Title componentClass="h3">{this.props.serviceInfo.name}:</Panel.Title>
              </Panel.Heading>
              <Panel.Body>
                <br/><br/>
                <strong>Owner: </strong> <span></span><br/>

              </Panel.Body>
            </Panel>
          </Col>
        </div>
      );
    }
}

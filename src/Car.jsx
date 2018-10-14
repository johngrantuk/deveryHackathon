import React from 'react';
import {Col, Panel, Button} from 'react-bootstrap';
import CarHistoryModal from './CarHistoryModal';

export default class Car extends React.Component {
  /**
  Shows information for individual car.
  **/
  constructor(props, context) {
    super(props, context);

    this.handleViewHistory = this.handleViewHistory.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
      isForSale: false,
      pickLink: 'https://s-media-cache-ak0.pinimg.com/736x/4a/ed/fa/4aedfa93b3c8785d55fd20362a1480d4.jpg'
    };
  }

  handleViewHistory(){
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
              <Panel.Title componentClass="h3">{this.props.carInfo.year}: {this.props.carInfo.model} {this.props.carInfo.type}</Panel.Title>
            </Panel.Heading>
            <Panel.Body>
              <img role="presentation" style={{"width" : "100%"}} src={this.props.carInfo.picHash}/>
              <br/><br/>
              <hr></hr>
              <Button bsStyle="primary" onClick={this.handleViewHistory}>View History</Button>
            </Panel.Body>
          </Panel>
        </Col>

        <CarHistoryModal
          show={this.state.show}
          car={this.props.carInfo}
          hide={this.handleClose}
          ></CarHistoryModal>
      </div>
    );
  }
}

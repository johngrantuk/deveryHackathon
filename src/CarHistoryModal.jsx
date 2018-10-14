import React from 'react';
import {Button, Modal, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import uuid from 'uuid';
import { css } from 'react-emotion';
import { PropagateLoader, MoonLoader } from 'react-spinners';

const override = css`
    margin: 0 auto;
    width: 0%;
`;

const dbHelper = require('./libs/orbitHelper');
const devery = require('@devery/devery');


const DeveryRegistry = devery.DeveryRegistry;
const deveryRegistryClient = new DeveryRegistry();

export default class CarHistoryModal extends React.Component {
  /*
  Loads and displays marked history for individual car.
  */
  constructor(props, context){
    super(props, context);

    // this.handleMark = this.handleMark.bind(this);

    this.state = {
      items: [],
      loading: true
    }
  }

  async loadItems(){
    console.log('Loading Items...')
    let items = await dbHelper.LoadCarItems(this.props.car._id);
    this.setState({items: items});
    this.setState({loading: false});
    console.log(items)

  }

  modalLoaded(){
    this.loadItems();
  }

  render() {

    const items = this.state.items;

    const style = { display: this.state.loading};

    return (
      <Modal show={this.props.show} onHide={this.props.hide} onEntered={this.modalLoaded.bind(this)}>
        <Modal.Header closeButton>
          <Modal.Title>{this.props.car.year}: {this.props.car.model} {this.props.car.type} History</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img role="presentation" style={{"width" : "100%"}} src={this.props.car.picHash}/>

          <hr></hr>

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

          <div>
            {items.map(item => {
              return(
                <div key={item._id}>
                  <h4>{item.date}: {item.brandName} - {item.productName}, {item.productDetail}</h4>
                  <h5>Check Item Addr: {item.address}</h5>
                </div>
              )
            }

            )}
          </div>

        </Modal.Body>
      </Modal>
    );
  }
}

import React from 'react';
import {Button, Modal, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import uuid from 'uuid';
import { css } from 'react-emotion';
import { PropagateLoader} from 'react-spinners';


const override = css`
    margin: 0 auto;
    width: 0%;
`;

const dbHelper = require('./libs/orbitHelper');
const devery = require('@devery/devery');


const DeveryRegistry = devery.DeveryRegistry;
const deveryRegistryClient = new DeveryRegistry();

export default class MarkModal extends React.Component {

  constructor(props, context){
    super(props, context);

    this.handleMark = this.handleMark.bind(this);

    this.state = {
      selectedCarId: null,
      cars: [],
      loading: true,
      marking: false
    }
  }

  modalLoaded(){
    this.getCars();
  }

  async getCars() {
    let cars = await dbHelper.LoadCars();
    this.setState({cars: cars});
    this.setState({loading: false});
  }

  handleMark(){
    if(this.state.selectedCarId == null){
      console.log('No Car Selected.')
    }else{

      let newItemAddress = devery.Utils.getRandomAddress();

      const newItem = {
        _id: uuid.v4(),
        address: newItemAddress,
        brandAddress: this.props.brandInfo.brandAccount,
        brandName: this.props.brandInfo.brandName,
        productId: this.props.product._id,
        productName: this.props.product.name,
        productDetail: this.props.product.detail,
        carId: this.state.selectedCarId,
        date: new Date()
      };

      this.markItem(this.props.product.address, newItemAddress, newItem);
    }
  }

  async markItem(ProductAddress, ItemAddress, NewItem) {
    this.setState({marking: true});
    console.log('Marking Item: ' + ItemAddress);

    const hash = await deveryRegistryClient.addressHash(ItemAddress);
    console.log('Item Hash: ' + hash);
    console.log('Product Address: ' + ProductAddress);
    await deveryRegistryClient.mark(ProductAddress, hash);

    console.log('Marked on chain. Saving Item To item Db:');
    console.log(NewItem);
    await dbHelper.saveRecord('items', NewItem);
    console.log('Ok');
    this.props.hide();
    this.setState({marking: false});
  }

  yourChangeHandler(event){
    this.setState({selectedCarId: event.target.value});
  }

  render() {

    const cars = this.state.cars;

    return (
      <Modal show={this.props.show} onHide={this.props.hide} onEntered={this.modalLoaded.bind(this)}>
        <Modal.Header closeButton>
          <Modal.Title>Mark A {this.props.product.name} Job</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup controlId="formControlsSelectMultiple">
            <ControlLabel>Select The Vehicle</ControlLabel>

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
            <FormControl componentClass="select" placeholder="select" onChange={this.yourChangeHandler.bind(this)}>
              {cars.map(car =>
                <option key={car._id} value={car._id}>{car.model} {car.type}</option>
              )}

            </FormControl>

            <Button bsStyle="primary" onClick={this.handleMark}>MARK</Button>

            <div className='sweet-loading'>
              <PropagateLoader
                className={override}
                sizeUnit={"px"}
                size={15}
                marginUnit={"px"}
                margin={10}
                loading={this.state.marking}
              />
            </div>
          </FormGroup>

        </Modal.Body>
      </Modal>
    );
  }
}

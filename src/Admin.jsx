import React from 'react';
import {
  FormGroup,
  ControlLabel,
  Button,
  FormControl,
} from 'react-bootstrap';
import uuid from 'uuid';

const dbHelper = require('./libs/orbitHelper');
const devery = require('@devery/devery');

const DeveryRegistry = devery.DeveryRegistry;
const deveryRegistryClient = new DeveryRegistry();

export default class Admin extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.handleAddBrandAddrChange = this.handleAddBrandAddrChange.bind(this);
    this.handleAddBrandNameChange = this.handleAddBrandNameChange.bind(this);
    this.handleAddBrand = this.handleAddBrand.bind(this);

    this.state = {
      brands: []
    };
  }

  componentWillMount() {
    this.getBrands();
  }

  handleAddBrandAddrChange(e){
    this.setState({addBrandAddr: e.target.value});
  }

  handleAddBrandNameChange(e){
    this.setState({addBrandName: e.target.value});
  }

  handleAddBrand(){
    this.addBrand(this.state.addBrandAddr, this.state.addBrandName);
  }

  async addBrand(Addr, Name){
    console.log('Adding Brand: ' + Addr + ', ' + Name);

    try {
      const newbrand = {
        _id: uuid.v4(),
        address: Addr,
        name: Name
      };

      const brand = await deveryRegistryClient.addBrand(Addr, Name);
      await dbHelper.saveRecord('brands', newbrand);
    }
    catch (err) {
      console.log(err);
    }
  }

  async getBrands() {
    let brands = await dbHelper.LoadBrands();

    this.setState({brands: brands});
  }

    render() {

      return(
        <div>
          <h1>ADMIN</h1>
          <FormGroup controlId="formControlsTextarea">
            <ControlLabel>Brand Address:</ControlLabel>
            <FormControl
              type="text"
              placeholder="Best To Make A MetaMask Addr"
              onChange={this.handleAddBrandAddrChange}
            />
            <ControlLabel>Brand Name:</ControlLabel>
            <FormControl
              type="text"
              placeholder="i.e. A Garage"
              onChange={this.handleAddBrandNameChange}
            />
          <p/>
          <Button bsStyle="primary" onClick={this.handleAddBrand}>Add Brand</Button>
          </FormGroup>

          <hr></hr>
          {this.state.brands.map(brand =>
            <p key={brand._id}>{brand.name}: {brand.address}</p>
          )}
        </div>
      );
    }
}

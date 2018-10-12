import React from 'react';
import {
  FormGroup,
  ControlLabel,
  Button,
  FormControl,
} from 'react-bootstrap';
import uuid from 'uuid';
import ProductList from './ProductList';
import { css } from 'react-emotion';
import { PropagateLoader} from 'react-spinners';


const dbHelper = require('./libs/orbitHelper');
const devery = require('@devery/devery');

const DeveryRegistry = devery.DeveryRegistry;
const deveryRegistryClient = new DeveryRegistry();

const override = css`
    margin: 0 auto;
    width: 0%;
`;


export default class AdminBrand extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDetailChange = this.handleDetailChange.bind(this);
    this.handleYearChange = this.handleYearChange.bind(this);
    this.handleOriginChange = this.handleOriginChange.bind(this);
    this.handleAddProduct = this.handleAddProduct.bind(this);

    this.state = {
      loading: true,
      products: []
    };
  }

  componentWillMount() {
    this.getProducts();
  }

  async getProducts(){
    let products = await dbHelper.LoadBrandProducts(this.props.account);
    this.setState({products: products});
    this.setState({loading: false});
  }

  handleNameChange(e){
    this.setState({name: e.target.value});
  }

  handleDetailChange(e){
    this.setState({detail: e.target.value});
  }

  handleYearChange(e){
    this.setState({year: e.target.value});
  }

  handleOriginChange(e){
    this.setState({origin: e.target.value});
  }

  handleAddProduct(){
    // Save to blockchain
    // Save to db

    let newProductAddress = devery.Utils.getRandomAddress();

    const newProduct = {
      _id: uuid.v4(),
      address: newProductAddress,
      brand: this.props.account,
      name: this.state.name,
      detail: this.state.detail,
      year: this.state.year,
      origin: this.state.origin
    };

    console.log(newProduct);

    this.addProduct(newProduct);
  }

  async addProduct(Product){
    try {
      const transaction = await deveryRegistryClient.addProduct(
        Product.address,
        Product.name,
        Product.detail,
        parseInt(Product.year),
        Product.origin);

      await dbHelper.saveRecord('products', Product);

      // NEED TO REFRESH GUI HERE IDEALLY WITHOUT A RELOAD
    }
    catch (err) {
      console.log(err);
    }
  }

  render() {

    return(
      <div>
        <h1>Admin - {this.props.brandInfo.brandName}</h1>
        <h4>Your Account: {this.props.account}</h4>
        <p></p>

        <hr></hr>
        <h2>Your Products</h2>
        <br/><br/>
        <div>
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

          <ProductList products={this.state.products} cars={this.props.cars} brandInfo={this.props.brandInfo}/>
        </div>

        <hr></hr>

        <FormGroup controlId="formControlsTextarea">
          <h2>Add New Product</h2>

          <ControlLabel>Product Name:</ControlLabel>
          <FormControl type="text" placeholder="i.e. Yearly Service" onChange={this.handleNameChange} />

          <ControlLabel>Product Details:</ControlLabel>
          <FormControl type="text" placeholder="i.e. Full annual service" onChange={this.handleDetailChange} />

          <ControlLabel>Year:</ControlLabel>
          <FormControl type="text" placeholder="i.e. 2018" onChange={this.handleYearChange} />

          <ControlLabel>Origin:</ControlLabel>
          <FormControl type="text" placeholder="i.e. Garage" onChange={this.handleOriginChange} />

          <p/>
          <Button bsStyle="primary" onClick={this.handleAddProduct}>Add Product</Button>
        </FormGroup>

      </div>
    );
  }
}

import React from 'react';
import Product from './Product';

export default class ProductList extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const products = this.props.products;

    return (
      <div>
        {products.map(product =>
          <Product
            key={product._id}
            product={product}
            />
        )}
      </div>
    );
  }
}

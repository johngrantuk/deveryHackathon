import React from 'react';
import Car from './Car';

export default class CarList extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const cars = this.props.cars;

    return (
      <div>
        {cars.map(car =>
          <Car
            key={car._id}
            carInfo={car}
            />
        )}
      </div>
    );
  }
}

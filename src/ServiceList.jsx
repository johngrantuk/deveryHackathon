import React from 'react';
import Service from './Service';

export default class ServiceList extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const services = this.props.services;

    return (
      <div>
        {services.map(service =>
          <Service
            key={service._id}
            serviceInfo={service}
            />
        )}
      </div>
    );
  }
}

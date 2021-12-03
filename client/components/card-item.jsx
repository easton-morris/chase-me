import React from 'react';

export default class CardItem extends React.Component {

  componentDidMount() {

  }

  render() {
    return (
      <div className="col">
        <div className="container">
          <div className="card shadow-sm">
            <div className="card-body">
              <p>Card Info to Go Here</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

import React from 'react';

export default class CardItem extends React.Component {

  componentDidMount() {

  }

  render() {
    return (
      <div className="col">
        <div className="container">
          <div className="cardItem shadow-sm">
            <div className="card-bg">
              <p>Card Info to Go Here</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

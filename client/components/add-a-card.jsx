import React from 'react';

export default class AddACard extends React.Component {

  componentDidMount() {

  }

  render() {
    return (
      <div className="col">
        <div className="container">
          <div className="cardItem shadow-sm">
            <div className="card-bg">
              <div className="circle-bg">
                <p>&plus;</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

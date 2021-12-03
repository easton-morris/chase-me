import React from 'react';

export default class AddACard extends React.Component {

  componentDidMount() {

  }

  render() {
    return (
      <div className="col-2">
        <div className="container">
          <div className="card shadow-sm">
            <div className="card-body">
              <button type="button" className="btn btn-outline-dark">Add a Card</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

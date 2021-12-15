import React from 'react';

export default class AddACard extends React.Component {

  render() {
    return (
      <div className="col-3">
        <div className="container">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <button type="button" className="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#searchModal">Add a Card</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

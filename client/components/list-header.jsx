import React from 'react';

function DeleteButton() {

}

export default class ListHeader extends React.Component {

  render() {
    return (
      <>
      <div className="container">
        <div className="row">
          <div className="col-auto">
            <DeleteButton />
          </div>
        </div>
      </div>
      </>
    );
  }
}

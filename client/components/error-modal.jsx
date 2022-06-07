import React from 'react';

export default class ErrorModal extends React.Component {

  render() {
    return (
      <>
        <div className="modal fade" id="errorModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="errorModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h2 className="modal-title" id="errorModalLabel">Error!</h2>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                {this.props.errText}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

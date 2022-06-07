import React from 'react';

export default class DeleteOptions extends React.Component {
  constructor(props) {
    super(props);

    this.ConfirmDeleteCardsModal = this.ConfirmDeleteCardsModal.bind(this);
    this.ConfirmDeleteListModal = this.ConfirmDeleteListModal.bind(this);
    this.delCardsHandler = this.delCardsHandler.bind(this);
    this.delListHandler = this.delListHandler.bind(this);

  }

  delCardsHandler(event) {

  }

  delListHandler(event) {

  }

  ConfirmDeleteCardsModal() {
    return (
    <>
      <div className="modal fade" id="confirmDelCardsModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="confirmDelCardsModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title" id="confirmDelCardsModalLabel">Confirm Delete?</h2>
            </div>
            <div className="modal-body">
              <p>Delete all cards?</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Refuse</button>
              <button onClick={this.delCardsHandler} type="button" className="btn btn-primary" data-bs-dismiss="modal">Confirm</button>
            </div>
          </div>
        </div>
      </div>
    </>
    );
  }

  ConfirmDeleteListModal() {
    return (
      <>
      <div className="modal fade" id="confirmDelListModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="confirmDelListModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title" id="confirmDelListModalLabel">Confirm Delete?</h2>
            </div>
            <div className="modal-body">
              <p>Delete list?</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Refuse</button>
              <button onClick={this.delListHandler} type="button" className="btn btn-primary" data-bs-dismiss="modal">Confirm</button>
            </div>
          </div>
        </div>
      </div>
      </>
    );
  }

  render() {
    return (
      <div className="col-8">
        <div className="container">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <button type="button" className="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#confirmDelCardsModal">Delete All Cards</button>
              <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#confirmDelListModal">Delete List</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

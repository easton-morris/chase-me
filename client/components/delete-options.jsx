import React from 'react';

export default class DeleteOptions extends React.Component {
  constructor(props) {
    super(props);

    this.delCardsHandler = this.delCardsHandler.bind(this);
    this.delListHandler = this.delListHandler.bind(this);
    this.ConfirmDeleteCardsModal = this.ConfirmDeleteCardsModal.bind(this);
    this.ConfirmDeleteListModal = this.ConfirmDeleteListModal.bind(this);

  }

  delCardsHandler(event) {
    const currUser = JSON.parse(window.localStorage.getItem('currentUser'));
    fetch(`/api/cardLists/all/${this.props.activeList}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': currUser.token
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Something went wrong.');
        } else {
          return res.json();
        }
      })
      .then(newListInfo => {
        this.props.resetList();
      })
      .catch(err => console.error(err));
  }

  delListHandler(event) {
    const currUser = JSON.parse(window.localStorage.getItem('currentUser'));
    fetch(`/api/cardLists/all/${this.props.activeList}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': currUser.token
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Something went wrong.');
        } else {
          return res.json();
        }
      })
      .then(res => {
        fetch(`/api/lists/${this.props.activeList}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': currUser.token
          }
        })
          .then(res => {
            if (!res.ok) {
              throw new Error('Something went wrong.');
            } else {
              window.location.href = '#';
              return res.json();
            }
          })
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));
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
      <>
        <this.ConfirmDeleteCardsModal/>
        <this.ConfirmDeleteListModal/>
        <div className="col-md-4">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <div className='btn-group'>
                <button type="button" className="btn btn-outline-warning" data-bs-toggle="modal" data-bs-target="#confirmDelCardsModal">Delete All Cards</button>
                <button type="button" className="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#confirmDelListModal">Delete List</button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

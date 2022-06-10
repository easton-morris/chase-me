import React from 'react';

export default class NewListModal extends React.Component {
  constructor(props) {
    super(props);

    this.newListHandler = this.newListHandler.bind(this);
    this.buttonEnableHandler = this.buttonEnableHandler.bind(this);

    this.state = {
      errText: ''
    };

  }

  buttonEnableHandler(event) {
    if (document.getElementById('newListName').value !== '') {
      document.getElementById('createListBtn').removeAttribute('disabled');
    } else {
      document.getElementById('createListBtn').setAttribute('disabled', '');
    }
  }

  newListHandler(event) {

    const $newListName = document.getElementById('newListName').value;
    const currUserId = this.props.userId;
    let newListId = 7;

    const currUser = JSON.parse(window.localStorage.getItem('currentUser'));
    const userToken = currUser.token;
    if (!currUserId) {
      this.setState({
        errText: 'User not logged in!'
      });
    } else {
      fetch('/api/lists/new-list', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': userToken
        },
        body: JSON.stringify({
          userId: currUserId,
          listName: $newListName
        })
      })
        .then(res => {
          if (!res.ok) {
            throw new Error('Something went wrong.');
          } else {
            return res.json();
          }
        })
        .then(newListInfo => {
          newListId = newListInfo.listId;
          document.getElementById('newListName').value = '';

          window.location.href = `#mylists?userId=${this.props.userId}&listId=${newListId}`;
        })
        .catch(err => console.error(err));
    }

    event.preventDefault();

  }

  render() {
    return (
      <>
        <div className="modal fade" id="newListModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="newListModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h2 className="modal-title" id="newListModalLabel">Add Info For New List</h2>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <form onSubmit={this.newListHandler}>
                <div className="modal-body">
                  <label htmlFor="newListName" className="form-label">List Name</label>
                  <input onChange={this.buttonEnableHandler} type="text" className="form-control" id="newListName" required></input>
                  <div className="invalid-feedback">
                    Please enter a List Name.
                  </div>
                </div>
                <div className='modal-footer'>
                  <button id="createListBtn" type="submit" className="btn btn-primary" data-bs-dismiss="modal" disabled>Create List</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}

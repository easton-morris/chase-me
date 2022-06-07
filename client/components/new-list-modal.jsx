import React from 'react';
import ErrorModal from './error-modal';

export default class NewListModal extends React.Component {
  constructor(props) {
    super(props);

    this.newListHandler = this.newListHandler.bind(this);

    this.state = {
      errText: ''
    };

  }

  newListHandler(event) {

    const $newListName = document.getElementById('newListName').value;
    const currUserId = this.props.userId;
    let newListId = 7;

    if (!currUserId) {
      this.setState({
        errText: 'User not logged in!'
      });
      // $('#errorModal').modal('toggle');
    } else {
      fetch('/api/lists/new-list', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
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
          document.getElementById('newListModal').className = 'modal fade';
          document.getElementsByClassName('modal-backdrop fade show')[0].className = 'modal-backdrop fade';

          window.location.href = `#mylists?listId=${newListId}`;
        })
        .catch(err => console.error(err));
    }

    event.preventDefault();

  }

  render() {
    return (
      <>
        <ErrorModal errText={this.state.errText} />
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
                  <input type="text" className="form-control" id="newListName" required></input>
                  <div className="invalid-feedback">
                    Please enter a List Name.
                  </div>
                </div>
                <div className='modal-footer'>
                  <button type="submit" className="btn btn-primary">Create List</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}

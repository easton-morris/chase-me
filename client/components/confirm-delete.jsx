import React from 'react';

export default class ConfirmDelete extends React.Component {
  constructor(props) {
    super(props);

    this.confirmDel = this.confirmDelHandler.bind(this);

    this.state = {
      cardName: '',
      cardId: ''
    };

  }

  confirmDelHandler(event) {
    const listId = 2;
    fetch(`api/cardLists/${listId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        cardId: this.state.cardId
      })
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Something went wrong.');
        } else {
          const card = this.state.cardId;
          this.props.removeCardFromList(card);
          this.setState({
            cardId: null,
            cardName: null
          });
        }
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <>
        <div className="modal fade" id="confirmDelModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="confirmDelModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h2 className="modal-title" id="searchModalLabel">Confirm Delete?</h2>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <p>`Delete ${this.props.cardName}`</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Confirm</button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

import React from 'react';

export default class ConfirmDelete extends React.Component {
  constructor(props) {
    super(props);

    this.confirmDelHandler = this.confirmDelHandler.bind(this);
    this.refuseDelHandler = this.refuseDelHandler.bind(this);

    this.state = {
      cardToRemove: null
    };

  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps && this.props.card !== null) {
      this.setState({
        cardToRemove: this.props.card
      });
    }
  }

  confirmDelHandler(event) {
    const currUser = JSON.parse(window.localStorage.getItem('currentUser'));
    const userToken = currUser.token;
    const listId = 2;
    fetch(`/api/cardLists/${listId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': userToken
      },
      body: JSON.stringify({
        cardId: this.state.cardToRemove.cardId
      })
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Something went wrong.');
        } else {
          const card = this.state.cardToRemove;
          this.props.removeCardFromList(card);
          this.setState({
            cardToRemove: null
          });
        }
      })
      .catch(err => console.error(err));
  }

  refuseDelHandler(event) {
    this.props.closeConf();
  }

  render() {
    return (
      <>
        <div className="modal fade" id="confirmDelModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="confirmDelModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h2 className="modal-title" id="confirmDelModalLabel">Confirm Delete?</h2>
              </div>
              <div className="modal-body">
                <p>Delete ({!this.props.card ? '' : this.props.card.cardId}) &quot;{!this.props.card ? '' : this.props.card.cardName}&quot;?</p>
              </div>
              <div className="modal-footer">
                <button onClick={this.refuseDelHandler} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Refuse</button>
                <button onClick={this.confirmDelHandler} type="button" className="btn btn-primary" data-bs-dismiss="modal">Confirm</button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

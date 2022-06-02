import React from 'react';

export default class ConfirmDelete extends React.Component {
  constructor(props) {
    super(props);

    this.confirmDel = this.confirmDelHandler.bind(this);
    this.refuseDelHandler = this.refuseDelHandler.bind(this);

    this.state = {
      cardName: null,
      cardToRemove: null
    };

  }

  // componentDidUpdate(prevProps) {
  //   if (this.props !== prevProps && this.props.card !== null) {
  //     this.setState({
  //       cardName: this.props.card.cardName,
  //       cardToRemove: this.props.card
  //     });
  //   }
  // }

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
          const card = this.state.cardToRemove;
          this.props.removeCardFromList(card);
          this.setState({
            cardId: null,
            cardName: null
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
                <p>`Delete ${this.props.cardName}?`</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Refuse</button>
                <button type="button" className="btn btn-primary">Confirm</button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

import React from 'react';

export default class CardItems extends React.Component {
  constructor(props) {
    super(props);

    this.removeHandler = this.removeHandler.bind(this);
    this.CardItem = this.CardItem.bind(this);
    this.CardItemsBody = this.CardItemsBody.bind(this);

    this.state = {
      cardToRemove: null
    };
  }

  removeHandler(obj) {
    this.props.selCardToRemove(obj);
  }

  CardItem(props) {
    const obj = props.fullCard;
    return (
      <div className="col-md-4">
        <div className="container">
          <div className="card shadow-sm">
            <h4 className="card-title">{props.cardName}</h4>
            <h5 className="card-subtitle mb-2 text-muted">{props.setName}</h5>
            <img className="img-thumbnail" src={props.cardImg} alt={props.cardName} />
            <div className="card-body">
              <p className="card-text"><strong>Card ID:</strong> {props.cardId}</p>
            </div>
            <div className="card-footer">
              <div className="row">
                <div className="col-sm-4">
                  <button onClick={() => this.removeHandler(obj)} className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#confirmDelModal">Remove</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  CardItemsBody() {
    const cardList = this.props.list;
    const cardItems = cardList.map(card => {
      return <this.CardItem key={card.cardId} cardId={card.cardId} cardName={card.cardName} setName={card.setName} cardImg={card.largePic} fullCard={card} flavorText="missing" />;
    }
    );
    return (
      <>
      {cardItems}
      </>
    );
  }

  render() {
    if (this.props.list.length > 0) {
      return (
            <this.CardItemsBody />
      );
    } else {
      return null;
    }
  }
}

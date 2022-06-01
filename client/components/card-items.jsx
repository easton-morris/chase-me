import React from 'react';

export default class CardItems extends React.Component {
  constructor(props) {
    super(props);

    this.removeHandler = this.removeHandler.bind(this);
    this.featureHandler = this.featureHandler.bind(this);
    this.CardItem = this.CardItem.bind(this);
    this.CardItemsBody = this.CardItemsBody.bind(this);

    this.state = {
      featured: false,
      cardName: ''
    };
  }

  removeHandler(event) {
    // console.log('currtar', event.currentTarget);
    // console.log('tar', event.target);
    // this.props.removeCardFromList(cardId);
  }

  featureHandler() {

  }

  CardItem(props) {
    return (
      <div className="col-4">
        <div className="container">
          <div className="card shadow-sm">
            <h4 className="card-title">{props.cardName}</h4>
            <h5 className="card-subtitle mb-2 text-muted">{props.setName}</h5>
            <img className="img-thumbnail" src={props.cardImg} alt={props.cardName} />
            <div onClick={this.removeHandler} className="card-body">
              <p className="card-text">{props.cardId}</p>
              <div className="row">
                <div className="btn-group">
                  <button onClick={this.featureHandler} className="btn btn-warning">Feature</button>
                  <button onClick={this.removeHandler} className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#confirmDelModal">Remove</button>
                </div>
              </div>
            </div>
            <div className="card-footer">
            </div>
          </div>
        </div>
      </div>
    );
  }

  CardItemsBody() {
    const cardList = this.props.list;
    const cardItems = cardList.map(card => {
      return <this.CardItem key={card.cardId} cardId={card.cardId} cardName={card.cardName} setName={card.setName} cardImg={card.largePic} flavorText="missing" />;
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
        <div className="container">
          <div className="row g-4">
            <this.CardItemsBody />
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

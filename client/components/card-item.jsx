import React from 'react';

export default class CardItem extends React.Component {
  constructor(props) {
    super(props);

    this.removeHandler = this.removeHandler.bind(this);
    this.featureHandler = this.featureHandler.bind(this);

    this.state = {
      featured: false
    };
  }

  removeHandler() {

  }

  featureHandler() {

  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="col-3">
        <div className="container">
          <div className="card shadow-sm">
            <h4 className="card-title">{this.props.cardName}</h4>
            <h5 className="card-subtitle mb-2 text-muted">{this.props.setName}</h5>
            <img src={this.props.cardImg} alt={this.props.cardName} />
            <div className="card-body">
              <p className="card-text">{this.props.flavorText}</p>
              <div className="row">
                <div className="btn-group">
                  <button className="btn btn-warning">Feature</button>
                  <button className="btn btn-danger">Remove</button>
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
}

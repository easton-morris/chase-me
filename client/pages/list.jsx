import React from 'react';
import AddACard from '../components/add-a-card';
import SearchModal from '../components/search-modal';
import CardItems from '../components/card-items';

export default class List extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listId: 2,
      list: []
    };

    this.addCardToList = this.addCardToList.bind(this);
    this.removeCardFromList = this.removeCardFromList.bind(this);
  }

  addCardToList(card) {
    this.setState({
      list: [...this.state.list, card]
    });
  }

  removeCardFromList(card) {
    const newList = [...this.state.list];
    const targetCard = newList.find(element => element.cardId === card.cardId);
    newList.splice(targetCard, 1);
    this.setState({
      list: newList
    });
  }

  componentDidMount() {
    const activeList = [];
    fetch(`/api/lists/${this.state.listId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Something went wrong.');
        } else {
          return res.json();
        }
      })
      .then(cardList => {
        for (let ii = 0; ii < cardList.length; ii++) {
          activeList.push(cardList[ii].cardId);
        }
        return activeList;
      })
      .then(list => {
        const currList = list;
        const renderList = [];
        for (let ii = 0; ii < currList.length; ii++) {
          fetch(`/api/cards/${currList[ii]}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          })
            .then(res => {
              return res.json();
            })
            .then(cardRes => {
              renderList.push(cardRes);
              this.setState({
                list: renderList
              });
            })
            .catch(err => console.error(err));
        }
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div className="container">
            <AddACard />
            <SearchModal addCardToList={this.addCardToList} />
            <CardItems removeCardFromList={this.removeCardFromList} list={this.state.list} />
      </div>
    );
  }
}

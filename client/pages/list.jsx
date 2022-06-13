import React from 'react';
import AddACard from '../components/add-a-card';
import SearchModal from '../components/search-modal';
import CardItems from '../components/card-items';
import ConfirmDelete from '../components/confirm-delete';
import DeleteOptions from '../components/delete-options';

export default class List extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listId: this.props.activeListId,
      list: [],
      cardToRemove: null,
      loadStatus: null
    };

    this.addCardToList = this.addCardToList.bind(this);
    this.removeCardFromList = this.removeCardFromList.bind(this);
    this.selectCardToRemove = this.selectCardToRemove.bind(this);
    this.closeConfirmation = this.closeConfirmation.bind(this);
    this.resetList = this.resetList.bind(this);
    this.dupeFail = this.dupeFail.bind(this);
  }

  // updates the page to show the duplicate card failure  message //

  dupeFail() {
    const $dupeWarn = document.getElementById('dupeWarn');
    $dupeWarn.className = 'alert alert-warning';
  }

  // resets the list after full card deletion and sets the page to load empty list //

  resetList() {
    this.setState({
      list: [],
      loadStatus: 204
    });
  }

  // receives the card from the card items that the user wants to remove for holding in state //

  selectCardToRemove(card) {
    this.setState({
      cardToRemove: card
    });
  }

  // resets the card that would have been removed to null if the deletion is canceled //

  closeConfirmation() {
    this.setState({
      cardToRemove: null
    });
  }

  // receives the card from the search modal that the user chose and adds it to the page's list along with updating the page to list loaded status //

  addCardToList(card) {
    const newList = [...this.state.list, card];
    newList.sort(function (a, b) {
      const nameA = a.cardName.toUpperCase();
      const nameB = b.cardName.toUpperCase();

      if (nameA < nameB) {
        return -1;
      } else
      if (nameA > nameB) {
        return 1;
      } else {
        return 0;
      }
    });
    this.setState({
      list: newList,
      loadStatus: 200
    });
  }

  // receives the card that the user wanted to remove and removes it from the live list, returning the shorter list and updating load status correspondingly //

  removeCardFromList(card) {
    const newList = [...this.state.list];
    const targetCard = newList.findIndex(element => element.cardId === card.cardId);
    newList.splice(targetCard, 1);
    this.setState({
      list: newList,
      loadStatus: (newList.length === 0) ? 204 : 200
    });
  }

  componentDidMount() {
    const currUser = JSON.parse(window.localStorage.getItem('currentUser'));
    const activeList = [];
    fetch(`/api/cardLists/${this.state.listId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': currUser.token
      }
    })
      .then(res => {
        if (!res.ok) {
          this.setState({
            loadStatus: 500
          });
          throw new Error('Something went wrong.');
        } else if (res.status === 204) {
          this.setState({
            list: []
          });
          return [];
        } else {
          this.setState({
            loadStatus: 200
          });
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
              'Content-Type': 'application/json',
              'x-access-token': currUser.token
            }
          })
            .then(res => {
              return res.json();
            })
            .then(cardRes => {
              renderList.push(cardRes);
              renderList.sort(function (a, b) {
                const nameA = a.cardName.toUpperCase();
                const nameB = b.cardName.toUpperCase();

                if (nameA < nameB) {
                  return -1;
                } else
                if (nameA > nameB) {
                  return 1;
                } else {
                  return 0;
                }
              });
              this.setState({
                list: renderList,
                loadStatus: 200
              });
            })
            .catch(err => console.error(err));
        }
      })
      .catch(err => console.error(err));
  }

  componentDidUpdate(prevProps, prevState) {
    const $dupeWarn = document.getElementById('dupeWarn');
    $dupeWarn.className = 'alert alert-warning d-none';

    const currUser = JSON.parse(window.localStorage.getItem('currentUser'));
    if (prevState.loadStatus !== null && prevProps !== this.props) {
      this.setState({
        loadStatus: null,
        listId: this.props.activeListId
      });
    } else if (this.state.loadStatus === null) {

      const activeList = [];
      fetch(`/api/cardLists/${this.props.activeListId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': currUser.token
        }
      })
        .then(res => {
          if (!res.ok) {
            this.setState({
              loadStatus: 500
            });
            throw new Error('Something went wrong.');
          } else if (res.status === 204) {
            this.setState({
              list: [],
              loadStatus: 204
            });
            return [];
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
                'Content-Type': 'application/json',
                'x-access-token': currUser.token
              }
            })
              .then(res => {
                return res.json();
              })
              .then(cardRes => {
                renderList.push(cardRes);
                renderList.sort(function (a, b) {
                  const nameA = a.cardName.toUpperCase();
                  const nameB = b.cardName.toUpperCase();

                  if (nameA < nameB) {
                    return -1;
                  } else
                  if (nameA > nameB) {
                    return 1;
                  } else {
                    return 0;
                  }
                });
                this.setState({
                  list: renderList,
                  loadStatus: 200
                });
              })
              .catch(err => console.error(err));
          }
        })
        .catch(err => console.error(err));
    }
  }

  render() {
    if (this.state.loadStatus === null) {
      return (
        <>
          <SearchModal activeList={this.state.listId} addCardToList={this.addCardToList} />
          <ConfirmDelete activeList={this.state.listId} card={this.state.cardToRemove} closeConf={this.closeConfirmation} removeCardFromList={this.removeCardFromList} />
          <div className="container">
            <div className="row g-4 justify-content-center">
              <h1 className='overflow-hidden'>{this.props.listName}</h1>
            </div>
            <hr />
            <div className="row g-4">
              <AddACard />
              <DeleteOptions activeList={this.state.listId} resetList={this.resetList} />
            </div>
            <hr />
            <div id='dupeWarn' className="alert alert-warning d-none" role="alert">
              Cannot add duplicate card.
            </div>
            <div className="row g-4 justify-content-md-center">
              <div className="spinner-border text-dark" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        </>
      );
    } else if (this.state.loadStatus === 204) {
      return (
        <>
          <SearchModal activeList={this.state.listId} addCardToList={this.addCardToList} />
          <ConfirmDelete activeList={this.state.listId} card={this.state.cardToRemove} closeConf={this.closeConfirmation} removeCardFromList={this.removeCardFromList} />
          <div className="container">
            <div className="row g-4 justify-content-center">
              <h1 className='overflow-hidden'>{this.props.listName}</h1>
            </div>
            <hr />
            <div className="row g-4">
              <AddACard />
              <DeleteOptions activeList={this.state.listId} resetList={this.resetList} />
            </div>
            <hr />
            <div id='dupeWarn' className="alert alert-warning d-none" role="alert">
              Cannot add duplicate card.
            </div>
            <div className="row g-4">
              <h3>This list is empty.</h3>
            </div>
          </div>
        </>
      );
    } else if (this.state.loadStatus === 500) {
      return (
        <>
          <SearchModal activeList={this.state.listId} addCardToList={this.addCardToList} />
          <ConfirmDelete activeList={this.state.listId} card={this.state.cardToRemove} closeConf={this.closeConfirmation} removeCardFromList={this.removeCardFromList} />
          <div className="container">
            <div className="row g-4 justify-content-center">
              <h1 className='overflow-hidden'>{this.props.listName}</h1>
            </div>
            <hr />
            <div className="row g-4">
              <AddACard />
              <DeleteOptions activeList={this.state.listId} resetList={this.resetList} />
            </div>
            <hr />
            <div id='dupeWarn' className="alert alert-warning d-none" role="alert">
              Cannot add duplicate card.
            </div>
            <div className="row g-4">
              <h3>Something went wrong.</h3>
            </div>
          </div>
        </>
      );
    } else if (this.state.loadStatus === 200) {
      return (
        <>
          <SearchModal dupeFail={this.dupeFail} activeList={this.state.listId} addCardToList={this.addCardToList} />
          <ConfirmDelete activeList={this.state.listId} card={this.state.cardToRemove} closeConf={this.closeConfirmation} removeCardFromList={this.removeCardFromList} />
          <div className="container">
            <div className="row g-4 justify-content-center">
              <h1 className='overflow-hidden'>{this.props.listName}</h1>
            </div>
            <hr />
            <div className="row g-4">
              <AddACard />
              <DeleteOptions activeList={this.state.listId} resetList={this.resetList} />
            </div>
            <hr />
            <div id='dupeWarn' className="alert alert-warning d-none" role="alert">
              Cannot add duplicate card.
            </div>
            <div className="row g-4">
              <CardItems selCardToRemove={this.selectCardToRemove} list={this.state.list} />
            </div>
          </div>
        </>
      );
    }
  }
}

import React from 'react';
import pokemon from 'pokemontcgsdk';

pokemon.configure({ apiKey: process.env.PKMN_APIKEY });

export default class SearchModal extends React.Component {
  constructor(props) {
    super(props);

    this.SearchDatalist = this.SearchDatalist.bind(this);
    this.SearchModalItem = this.SearchModalItem.bind(this);
    this.SearchResultsBody = this.SearchResultsBody.bind(this);
    this.DatalistItem = this.DatalistItem.bind(this);
    this.searchHandler = this.searchHandler.bind(this);
    this.addCardHandler = this.addCardHandler.bind(this);
    this.cardSelectHandler = this.cardSelectHandler.bind(this);

    this.state = {
      pokeList: [],
      nameList: [],
      searchValue: '',
      cardToAdd: null,
      cardToAddId: null
    };

  }

  // takes the id selected by the user and adds the id and card to the state for passing to the list component //

  cardSelectHandler(event) {
    const currUser = JSON.parse(window.localStorage.getItem('currentUser'));
    const $thList = document.querySelectorAll('th');
    for (let jj = 0; jj < $thList.length; jj++) {
      $thList[jj].className = '';
    }
    if (event.target.className !== 'table-info') {
      event.target.className = 'table-info';
    }
    fetch(`/api/cards/${event.target.textContent}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': currUser.token
      }
    })
      .then(result => {
        return result.json();
      })
      .then(cardRes => {
        this.setState({
          cardToAddId: cardRes.cardId,
          cardToAdd: cardRes
        });
      })
      .catch(err => console.error(err));
  }

  DatalistItem(props) {
    return <option value={props.value} />;
  }

  SearchModalItem(props) {
    return (
      <tr>
        <th scope="row" onClick={this.cardSelectHandler}>{props.value.id}</th>
        <td>{props.value.set.name}</td>
        <td>{props.value.name}</td>
      </tr>
    );
  }

  SearchDatalist() {
    const nameList = this.state.nameList;
    const listItems = nameList.map((pokeName, index) =>
      <this.DatalistItem key={index} value={pokeName} />
    );
    return (
      <datalist id="nameList">
        {listItems}
      </datalist>
    );
  }

  SearchResultsBody() {
    const pokeList = this.state.pokeList;
    const listItems = pokeList.map(pokeCard =>
      <this.SearchModalItem key={pokeCard.id} value={pokeCard} />
    );

    return (
        <tbody>
          {listItems}
        </tbody>
    );
  }

  // takes the card selected by the user previously and adds it to the list on the page and to the database when the button is clicked, then resets the state //

  addCardHandler(event) {
    const currUser = JSON.parse(window.localStorage.getItem('currentUser'));
    const listId = this.props.activeList;
    fetch(`/api/cardLists/${listId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': currUser.token
      },
      body: JSON.stringify({
        cardId: this.state.cardToAdd.cardId
      })
    })
      .then(res => {
        if (!res.ok) {
          this.props.dupeFail();
          const $thList = document.querySelectorAll('th');
          for (let jj = 0; jj < $thList.length; jj++) {
            $thList[jj].className = '';
          }
          throw new Error('Something went wrong.');
        } else {
          const card = this.state.cardToAdd;
          this.props.addCardToList(card);
          const $thList = document.querySelectorAll('th');
          for (let jj = 0; jj < $thList.length; jj++) {
            $thList[jj].className = '';
          }
          this.setState({
            cardToAdd: null,
            cardToAddId: null
          });
        }
      })
      .catch(err => console.error(err));

  }

  // updates the displayed card data when the user submits a valid query //

  searchHandler(event) {
    const $pokeSearch = document.getElementById('cardSearch');
    const rawValue = $pokeSearch.value.replaceAll(' ', '');
    if ($pokeSearch.value !== this.state.searchValue && $pokeSearch.value !== '' && rawValue !== '') {
      pokemon.card.all({ q: `name:"${$pokeSearch.value}"` })
        .then(result => {
          this.setState({
            pokeList: result,
            searchValue: $pokeSearch.value
          });
        });
    }
    event.preventDefault();
  }

  componentDidMount() {
    const currUser = JSON.parse(window.localStorage.getItem('currentUser'));
    fetch('/api/cards/names', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': currUser.token
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Something went wrong.');
        } else {
          return res.json();
        }
      })
      .then(nameList => {
        return this.setState({
          nameList
        });
      })
      .catch(err => console.error(err));

    fetch('/api/cards/sample/10', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': currUser.token
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Something went wrong.');
        } else {
          return res.json();
        }
      })
      .then(pokeList => {
        return this.setState({
          pokeList
        });
      })
      .catch(err => console.error(err));
  }

  componentDidUpdate(prevProps, prevState) {
    const $noMatchWarn = document.getElementById('noMatchWarn');

    if (this.state.pokeList.length === 0) {
      $noMatchWarn.className = 'alert alert-danger';
    } else {
      $noMatchWarn.className = 'alert alert-danger d-none';
    }
  }

  render() {
    return (
      <>
      <div className="modal fade" id="searchModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="searchModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title" id="searchModalLabel">Find a Card</h2>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="search-header">
                <div className="search-text">
                  <h4>Search by Card Name</h4>
                  <div className="search-area">
                    <form action="" onSubmit={this.searchHandler}>
                        <label htmlFor="cardSearch" className="form-label">...then click on an ID and click &#34;Add Card&#34;</label>
                      <div className="row">
                        <div className="col-auto">
                          <input className="form-control" list="nameList" id="cardSearch" placeholder="ex: Jolteon"/>
                            <div id="noMatchWarn" className='alert alert-danger d-none'>
                              No matching card names.
                            </div>
                          <this.SearchDatalist />
                        </div>
                        <div className="col-auto">
                          <button type="submit" id="pokeSearchBtn" className="btn btn-primary">Search</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="results-table">
                <table className="table table-hover table-striped">
                  <thead>
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Set</th>
                      <th scope="col">Card Name</th>
                    </tr>
                  </thead>
                  <this.SearchResultsBody />
                </table>
              </div>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button onClick={this.addCardHandler} id='addCardBtn' type="button" className="btn btn-primary" data-bs-dismiss="modal">Add Card</button>
            </div>
          </div>
        </div>
      </div>
      </>
    );
  }
}

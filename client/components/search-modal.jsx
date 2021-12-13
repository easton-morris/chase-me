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

    this.state = {
      pokeList: [],
      nameList: [],
      searchValue: 'Jolteon'
    };

  }

  DatalistItem(props) {
    return <option value={props.value} />;
  }

  SearchModalItem(props) {
    return (
      <tr>
        <th scope="row">{props.value.id}</th>
        <td>{props.value.set.name}</td>
        <td>{props.value.name}</td>
      </tr>
    );
  }

  SearchDatalist() {
    const pokeList = this.state.pokeList;
    const listItems = pokeList.map(pokeCard =>
      <this.DatalistItem key={pokeCard.id} value={pokeCard.name} />
    );
    return (
      <datalist id="pokeList">
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

  addCardHandler() {

  }

  searchHandler(event) {
    const $pokeSearch = document.getElementById('cardSearch');
    if ($pokeSearch.value !== this.state.searchValue) {
      pokemon.card.all({ q: `name:${$pokeSearch.value}*` })
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
    pokemon.card.all({ q: 'name:jolteon' })
      .then(result => {
        this.setState({
          pokeList: result
        });
      });

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
                  <h4>Search by Name</h4>
                  <div className="search-area">
                    <form action="" onSubmit={this.searchHandler}>
                      <label htmlFor="cardSearch" className="form-label">Card Search</label>
                      <div className="row">
                        <div className="col-auto">
                          <input className="form-control" list="pokeList" id="cardSearch" placeholder="Jolteon"/>
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
                <table className="table table-striped">
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
                <button type="button" className="btn btn-primary">Add Card</button>
            </div>
          </div>
        </div>
      </div>
      </>
    );
  }
}

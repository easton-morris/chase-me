import React from 'react';

export default class SearchModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pokeList: []
    };
  }

  DatalistItem() {
    return <option value={this.props.value}></option>;
  }

  SearchModalItem() {
    return (
    <>
      <tr>
        <td>{this.props.set.name}</td>
        <td>{this.props.id}</td>
        <td>{this.props.name}</td>
      </tr>
    </>
    );
  }

  SearchList() {
    const pokeList = this.state.pokeList;
    const listItems = pokeList.map(pokeCard =>
      <this.DatalistItem key={pokeList.id} value={pokeCard.name} />
    );
    return (
      <datalist id="pokeList">
        {listItems}
      </datalist>
    );
  }

  componentDidMount() {

  }

  addCardHandler() {

  }

  onSearchChangeHandler() {

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
                    <label htmlFor="cardSearch" className="form-label">Card Search</label>
                    <input className="form-control" list="pokeList" id="cardSearch" placeholder="example: Jolteon"/>
                    <this.SearchList />
                      [/**datalist goes here */]
                  </div>
                </div>
              </div>
              <div className="results-table">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Set</th>
                      <th scope="col">#</th>
                      <th scope="col">Card Name</th>
                    </tr>
                  </thead>
                  [/** body goes here */]
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

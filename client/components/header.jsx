import React from 'react';

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.UserListsItem = this.UserListsItem.bind(this);
    this.UserLists = this.UserListsItem.bind(this);

    this.state = {
      loggedIn: 1,
      lists: []
    };
  }

  UserListsItem(props) {
    return (
      <li>
        <a href="#mylists">{props.value}</a>
      </li>
    );
  }

  UserLists(props) {
    const usersCardLists = this.state.lists;
    const usersCardListsItems = usersCardLists.map((listName, listId) =>
      <this.UserListsItem key={listId} value={listName} />
    );
    return (
      <ul className="dropdown-menu" aria-labelledby="listsDropdown">
        {usersCardListsItems}
        <li><a href="#mylists">+New List</a></li>
      </ul>
    );
  }

  componentDidMount() {
    if (this.state.loggedIn) {
      fetch(`/api/lists/${this.state.loggedIn}`, {
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
        .then(usersLists => {
          return this.setState({
            lists: usersLists
          });
        })
        .catch(err => console.error(err));
    }
  }

  render() {
    return (
      <header className="mb-5">
        <nav className="navbar navbar-expand-sm navbar-light bg-nav">
          <div className="container-fluid">
            <a href="#" className="navbar-brand">
              <img src="../favicon.ico" alt="Chase.me Icon" width="30" height="30" />Chase.me
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarToggler">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item dropdown">
                  <a href="#mylists" className="nav-link dropdown-toggle" id="listsDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">My Lists</a>
                  <this.UserLists />
                </li>
                <li className="nav-item">
                  <a href="#info" className="nav-link">Info</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}

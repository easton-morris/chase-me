import React from 'react';
import NewListModal from './new-list-modal';

const userToken = JSON.parse(window.localStorage.getItem('currentUser')).token;
export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.UserListsItem = this.UserListsItem.bind(this);
    this.UserLists = this.UserLists.bind(this);

    this.state = {
      loggedIn: this.props.activeUser,
      lists: []
    };
  }

  UserListsItem(props) {
    return (
      <li>
        <a className='dropdown-item' href={`#mylists?userId=${this.state.loggedIn}&listId=${props.value.listId}`}>{props.value.listName}</a>
      </li>
    );
  }

  UserLists(props) {
    const usersCardLists = this.state.lists;
    const usersCardListsItems = usersCardLists.map(list =>
      <this.UserListsItem key={list.listId} value={list} />
    );
    return (
      <ul className="dropdown-menu" aria-labelledby="listsDropdown">
        {usersCardListsItems}
        <li><hr className="dropdown-divider"></hr></li>
        <li><button data-bs-toggle="modal" data-bs-target="#newListModal" className="btn-sm btn-outline-dark">+New List</button></li>
      </ul>
    );
  }

  componentDidMount() {
    if (this.state.loggedIn) {
      fetch(`/api/lists/${this.state.loggedIn}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': userToken
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

  componentDidUpdate(prevProps, prevState) {

    if (this.props.activeUser) {
      fetch(`/api/lists/${this.props.activeUser}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': userToken
        }
      })
        .then(res => {
          if (!res.ok) {
            if (res !== prevState.lists && prevProps !== this.props) {
              this.setState({
                lists: [],
                loggedIn: this.props.activeUser
              });
            }
            throw new Error('Something went wrong.');
          } else {
            return res.json();
          }
        })
        .then(res => {
          if (res !== prevState.lists && prevProps !== this.props) {
            this.setState({
              lists: res,
              loggedIn: this.props.activeUser
            });
          }
        })
        .catch(err => console.error(err));
    }

  }

  render() {
    return (
      <header className="mb-5">
        <NewListModal userId={this.state.loggedIn} />
        <nav className="navbar navbar-expand-sm navbar-light bg-nav">
          <div className="container-fluid">
            <a href={`#?userId=${this.state.loggedIn}`} className="navbar-brand">
              <img src="../favicon.ico" alt="Chase.me Icon" width="30" height="30" />Chase.me
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarToggler">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item dropdown">
                  <a className={this.state.loggedIn ? 'nav-link dropdown-toggle' : 'nav-link dropdown-toggle d-none'} id="listsDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">My Lists</a>
                  <this.UserLists />
                </li>
                <li className="nav-item">
                  <a href={`#info?userId=${this.state.loggedIn}`} className="nav-link">Info</a>
                </li>
                <li className={this.state.loggedIn ? 'nav-item ' : 'nav-item d-none'}>
                  <a onClick={() => this.props.updateUser(null)} href={`#?userId=${null}`} className="nav-link">Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}

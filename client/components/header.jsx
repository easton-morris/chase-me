import React from 'react';
import NewListModal from './new-list-modal';
export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.UserListsItem = this.UserListsItem.bind(this);
    this.UserLists = this.UserLists.bind(this);

    this.state = {
      lists: []
    };
  }

  UserListsItem(props) {
    return (
      <li>
        <a className='dropdown-item' href={`#mylists?listId=${props.value.listId}`}>{props.value.listName}</a>
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
    const currUser = JSON.parse(window.localStorage.getItem('currentUser'));
    if (currUser) {
      fetch(`/api/lists/${currUser.user.userId}`, {
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
        .then(usersLists => {
          return this.setState({
            lists: usersLists
          });
        })
        .catch(err => console.error(err));
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const currUser = JSON.parse(window.localStorage.getItem('currentUser'));
    if (currUser) {
      fetch(`/api/lists/${currUser.user.userId}`, {
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
        .then(res => {
          if (res !== prevState.lists) {
            this.setState({
              lists: res
            });
          }
        })
        .catch(err => console.error(err));
    }

  }

  render() {
    const currUser = JSON.parse(window.localStorage.getItem('currentUser'));
    return (
      <header className="mb-5">
        <NewListModal />
        <nav className="navbar navbar-expand-sm navbar-light bg-nav">
          <div className="container-fluid">
            <a href={'#'} className="navbar-brand">
              <img src="../favicon.ico" alt="Chase.me Icon" width="30" height="30" />Chase.me
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarToggler">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item dropdown">
                  <a className={currUser ? 'nav-link dropdown-toggle' : 'nav-link dropdown-toggle d-none'} id="listsDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">My Lists</a>
                  <this.UserLists />
                </li>
                <li className="nav-item">
                  <a href={'#info'} className="nav-link">Info</a>
                </li>
                <li className={currUser ? 'nav-item ' : 'nav-item d-none'}>
                  <a onClick={() => this.props.logoutUser()} href={'#?user=logout'} className="nav-link">Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}

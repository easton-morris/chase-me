import React from 'react';
import Home from './pages/home';
import Header from './components/header';
import Info from './pages/info';
import List from './pages/list';
import Login from './pages/login';
import Footer from './components/footer';
import { parseRoute } from './lib';

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.logoutUser = this.logoutUser.bind(this);

    this.state = {
      route: parseRoute(window.location.hash),
      onlineStatus: true
    };
  }

  logoutUser() {
    window.localStorage.removeItem('currentUser');
  }

  componentDidMount() {
    window.addEventListener('offline', event => {
      this.setState({
        onlineStatus: false
      });
    });
    window.addEventListener('online', event => {
      this.setState({
        onlineStatus: true
      });
    });
    window.addEventListener('hashchange', () => {
      this.setState(prevState => (
        { route: parseRoute(window.location.hash) }
      ));
    });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return <Home />;
    } else if (route.path === 'info') {
      return <Info />;
    } else if (route.path === 'mylists') {
      const listId = route.params.get('listId');
      const listName = route.params.get('listName');
      return <List listName={listName} activeListId={listId} />;
    } else if (route.path === 'login') {
      return <Login />;
    }
  }

  render() {
    if (this.state.onlineStatus) {
      return (
      <>
        <Header logoutUser={this.logoutUser} />
        { this.renderPage() }
        <hr />
        <Footer />
      </>
      );
    } else {
      return (
        <>
          <Header logoutUser={this.logoutUser} />
          <div className='d-flex justify-content-center'>
            <h1>You are offline.</h1>
          </div>
          <hr />
          <Footer />
        </>
      );
    }
  }
}

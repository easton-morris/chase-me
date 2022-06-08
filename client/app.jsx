import React from 'react';
import Home from './pages/home';
import Header from './components/header';
import Info from './pages/info';
import List from './pages/list';
import Login from './pages/login';
import { parseRoute } from './lib';

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      route: parseRoute(window.location.hash),
      // loggedIn: parseRoute(window.location.hash).params.get('userId')
      loggedIn: 1
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState(prevState => (
        { route: parseRoute(window.location.hash) }
      ));
    });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return <Home activeUser={this.state.loggedIn}/>;
    } else if (route.path === 'info') {
      return <Info activeUser={this.state.loggedIn}/>;
    } else if (route.path === 'mylists') {
      const listId = route.params.get('listId');
      return <List activeUser={this.state.loggedIn} activeListId={listId} />;
    } else if (route.path === 'login') {
      return <Login activeUser={this.state.loggedIn}/>;
    }
  }

  render() {
    return (
    <>
      <Header activeUser={this.state.loggedIn}/>
      { this.renderPage() }
    </>
    );
  }
}

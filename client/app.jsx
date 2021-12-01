import React from 'react';
import Home from './pages/home';
import Header from './components/header';
import Info from './pages/info';
import { parseRoute } from './lib';

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      route: parseRoute(window.location.hash)
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
      return <Home />;
    } else if (route.path === 'info') {
      return <Info />;
    }
  }

  render() {
    return (
    <>
      <Header />
      { this.renderPage() }
    </>
    );
  }
}

import React from 'react';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: null
    };
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="container">
        <div className="welcomeBox">
          <img src="../images/ProfessorSycamoreAnime.png" alt="Professor Sycamore" />
          <h1>
            Welcome to Chase.me
          </h1>
          <p>
            Chase.me is a platform for building and sharing a simple list of your Chase Cards
            for the Pokémon Trading Card Game (TCG). If you aren&apos;t familar, a Chase Card is a card
            that you want to own but don&apos;t.
          </p>
          <p className={ this.state.loggedInloggedIn ? 'hidden' : ''}>
            To get started: <a href="#pages?pageId=login">Sign In or Sign Up.</a>
          </p>
        </div>
      </div>
    );
  }
}

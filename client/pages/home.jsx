import React from 'react';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: this.props.activeUser
    };
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="container">
        <div className="welcomeBox">
          <div className='row align-items-end'>
            <div id='sycArea' className='col-4'>
              <img className="img-fluid text-wrap" src="../images/ProfessorSycamoreAnime.png" alt="Professor Sycamore" />
            </div>
            <div id='skidArea' className='col-2'>
              <img className="img-fluid text-wrap" src="../images/672Skiddo.png" alt="Skiddo" />
            </div>
          </div>
          <h1>
            Welcome to Chase.me
          </h1>
          <p>
            Chase.me is a platform for building and sharing a simple list of your Chase Cards
            for the Pokémon Trading Card Game (TCG). If you aren&apos;t familar, a Chase Card is a card
            that you want to own but don&apos;t.
          </p>
          <p className={ this.state.loggedIn ? 'd-none' : ''}>
            To get started: <a href="#login">Sign In or Sign Up.</a>
          </p>
        </div>
      </div>
    );
  }
}

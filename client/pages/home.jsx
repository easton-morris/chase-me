import React from 'react';

export default class Home extends React.Component {

  render() {
    const currUser = JSON.parse(window.localStorage.getItem('currentUser'));
    return (
      <div className="container">
        <div className="welcomeBox">
          <div className='row align-items-end'>
            <div id='sycArea' className='col-4'>
              <img className="img-fluid text-wrap" src="../images/ProfessorSycamoreAnime.png" alt="Professor Sycamore" />
            </div>
            <div id='skidArea' className='col-2'>
              <span className='p-1 m-4 bg-info'>Skiddo</span>
              <img className="img-fluid m-3 text-wrap" src="../images/672Skiddo.png" alt="Skiddo" />
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
          <p className={ currUser ? 'd-none' : ''}>
            To get started: <a href="#login">Sign In or Sign Up.</a>
          </p>
        </div>
      </div>
    );
  }
}

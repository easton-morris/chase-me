import React from 'react';

export default class Info extends React.Component {

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
              How to use Chase.me
            </h1>
            <p>
              Chase.me is a platform for building and sharing a simple list of your Chase Cards
              for the Pokémon Trading Card Game (TCG). If you aren&apos;t familar, a Chase Card is a card
              that you want to own but don&apos;t.
            </p>
          </div>
        </div>
    );
  }
}

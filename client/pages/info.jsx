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
              <span className='p-1 m-4 bg-info'>Skiddo</span>
              <img className="img-fluid m-3 text-wrap" src="../images/672Skiddo.png" alt="Skiddo" />
            </div>
          </div>
            <h1>
              How to use Chase.me
            </h1>
            <h4>If you haven&apos;t signed in.</h4>
            <p>
              If you are brand new to Chase.me, please head over to the <a href="#login">Sign In/Sign Up Page</a> to create your account or try out the Demo Account.
            </p>
            <h4>Once you&apos;re signed in:</h4>
          <p>The first thing you should do is...give our mascot Pokémon Skiddo a little pat with your cursor. Then, click on the My Lists dropdown to create your first list.</p>
          <img className='img-fluid border border-2 border-dark' src='../images/Info/EmptyList.png' alt="EmptyListsExample" />
            <p>Next, click on the <strong>+New List</strong> button, which will bring up a prompt to create your list with a name.</p>
            <div className='alert alert-warning'>Note: List Names must be less than 12 characters.</div>
          <img className='img-fluid text-wrap border border-2 border-dark' src='../images/Info/NewListModal.png' alt="NewListModal" />
          <p>Once on your new List Page: click the <strong>Add a Card</strong> button to begin adding your first card.</p>
          <img className='img-fluid text-wrap border border-2 border-dark' src='../images/Info/AddACard.png' alt="AddACard" />
          </div>
        </div>
    );
  }
}

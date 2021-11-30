import React from 'react';

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: null,
      pages: []
    };
  }

  render() {
    return (
      <header className="mb-5">
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container-fluid">
            <a href="#" className="navbar-brand">
              <img src="../favicon.ico" alt="Chase.me Icon" />Chase.me
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-colapse" id="navbarToggler">

            </div>
          </div>
        </nav>
      </header>
    );
  }
}

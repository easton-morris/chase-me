import React from 'react';

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.signinHandler = this.signinHandler.bind(this);
    this.signupHandler = this.signupHandler.bind(this);

    this.state = {
      loggedIn: this.props.activeUser
    };
  }

  signinHandler(event) {
    const $username = document.getElementById('inputUNSignin');
    const $password = document.getElementById('inputPWSignin');
    const $signinPWWarn = document.getElementById('signinPWWarn');

    fetch('/api/users/sign-in', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: $username.value,
        password: $password.value
      })
    })
      .then(res => {
        if (res.status === 401) {
          $signinPWWarn.className = 'alert alert-danger d-none';

          $signinPWWarn.className = 'alert alert-danger';
        } else if (res.status === 200) {
          this.props.updateUser(res.statusText);
          window.location.href = `#?userId=${res.statusText}`;
        }
      })
      .catch(err => console.error(err));

    event.preventDefault();
  }

  signupHandler(event) {
    const $username = document.getElementById('inputUNSignup');
    const $email = document.getElementById('inputEmailSignup');
    const $password = document.getElementById('inputPWSignup');
    const $signupUNWarn = document.getElementById('signupUNWarn');

    fetch('/api/users/sign-up', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: $username.value,
        email: $email.value,
        password: $password.value
      })
    })
      .then(res => {
        if (res.status === 500) {
          $signupUNWarn.className = 'alert alert-danger';
        } else {
          return res.json();
        }
      })
      .then(newUser => {
        const newUserId = newUser.userId;
        this.props.updateUser(newUserId);
        window.location.href = `#?userId=${newUserId}`;
      })
      .catch(err => console.error(err));

    event.preventDefault();
  }

  render() {
    return (
      <div className="container">
        <div className='row align-items-end'>
          <div id='sycArea' className='col-4'>
            <img className="img-fluid text-wrap" src="../images/ProfessorSycamoreAnime.png" alt="Professor Sycamore" />
          </div>
          <div id='skidArea' className='col-2'>
            <img className="img-fluid text-wrap" src="../images/672Skiddo.png" alt="Skiddo" />
          </div>
        </div>
        <div id="loginArea">
          <h1>
            Please Sign In or Sign Up
          </h1>
          <hr />
          <div>
            <h2>Sign In</h2>
            <form onSubmit={this.signinHandler} id='signin'>
              <div className="mb-3">
                <label htmlFor="inputUNSignin" className="form-label">Username</label>
                <input type="text" className="form-control" id="inputUNSignin" aria-describedby="signinHelp" required></input>
                <div id="signinHelp" className="form-text">Please enter your username.</div>
              </div>
              <div className="mb-3">
                <label htmlFor="inputPWSignin" className="form-label">Password</label>
                <input type="password" className="form-control" id="inputPWSignin" required></input>
                <div id="signinPWWarn" className="alert alert-danger d-none">
                  Password or username is incorrect.
                </div>
              </div>
              <button type="submit" form='signin' className="btn btn-primary">Sign In</button>
            </form>
          </div>
          <hr />
          <div>
            <h2>Sign Up</h2>
            <form onSubmit={this.signupHandler} id='signup'>
              <div className="mb-3">
                <label htmlFor="inputUNSignup" className="form-label">Username</label>
                <input type="text" className="form-control" id="inputUNSignup" aria-describedby="signupHelp" required></input>
                <div id="signupHelp" className="form-text">Please enter your desired username.</div>
                <div id="signupUNWarn" className="alert alert-danger d-none">
                  Username already exists.
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="inputEmailSignup" className="form-label">Email address</label>
                <input type="email" className="form-control" id="inputEmailSignup" aria-describedby="emailHelp" required></input>
                <div id="emailHelp" className="form-text">We&apos;ll never share your email with anyone else.</div>
              </div>
              <div className="mb-3">
                <label htmlFor="inputPWSignup" className="form-label">Password</label>
                <input type="password" className="form-control" id="inputPWSignup" required></input>
              </div>
              <button type="submit" form='signup' className="btn btn-primary">Sign Up</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

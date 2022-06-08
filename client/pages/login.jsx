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

    fetch('/api/users/sign-in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: $username.value,
        password: $password.value
      })
    })
      .then(res => {
        if (res === 400) {
          $username.className();
        } else {
          return res.json();
        }
      });

    event.preventDefault();
  }

  signupHandler(event) {
    // const $username = document.getElementById('inputUNSignin').value;
    // const $email = document.getElementById('inputEmailSignup').value;
    // const $password = document.getElementById('inputPWSignin').value;

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
            <form id='signin'>
              <div className="mb-3">
                <label htmlFor="inputUNSignin" className="form-label">Username</label>
                <input type="text" className="form-control" id="inputUNSignin" aria-describedby="signinHelp" required></input>
                <div id="signinHelp" className="form-text">Please enter your username.</div>
                <div className="alert alert-danger d-none">
                  Username does not exist.
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="inputPWSignin" className="form-label">Password</label>
                <input type="password" className="form-control" id="inputPWSignin" required></input>
              </div>
              <button onSubmit={this.signinHandler} type="submit" className="btn btn-primary">Sign In</button>
            </form>
          </div>
          <hr />
          <div>
            <h2>Sign Up</h2>
            <form id='signup'>
              <div className="mb-3">
                <label htmlFor="inputUNSignup" className="form-label">Username</label>
                <input type="text" className="form-control" id="inputUNSignup" aria-describedby="signupHelp" required></input>
                <div id="signupHelp" className="form-text">Please enter your desired username.</div>
              </div>
              <div className="mb-3">
                <label htmlFor="inputEmailSignup" className="form-label">Email address</label>
                <input type="email" className="form-control" id="inputEmailSignup" aria-describedby="emailHelp" required></input>
                <div id="emailHelp" className="form-text">We&apos;ll never share your email with anyone else.</div>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" required></input>
              </div>
              <button onSubmit={this.signupHandler} type="submit" className="btn btn-primary">Sign Up</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

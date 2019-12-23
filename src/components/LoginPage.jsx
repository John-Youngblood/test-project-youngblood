import React from 'react';
import { withRouter } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import {withFirebase} from '../firebase';

const LoginPage = () => (
  <div>
    <h1>SIGN IN</h1>
    <LoginForm/>
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class LoginFormBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  };

  onSubmit = event => {
    event.preventDefault();
    const { email, password } = this.state;
    this.props.firebase.doSignInWithEmailAndPassword(email,password).then(authUser => {
      console.log(authUser);
      this.setState({ ...INITIAL_STATE });
      this.props.history.push(ROUTES.ADMIN);
    })
    .catch(error => {
      this.setState({ error });
    });
  };

  handleChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [target.name]: value
    });
  };

  render() {
    const {
      email,
      password,
      error,
    } = this.state;

    const isInvalid =
      password === '' ||
      email === '';


    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="email"
          value={email}
          onChange={this.handleChange}
          type="email"
          placeholder="Email Address"
        />
        <input
          name="password"
          value={password}
          onChange={this.handleChange}
          type="password"
          placeholder="Password"
        />
        <button disabled={isInvalid} type="submit">Sign In</button>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}
const LoginForm = withRouter(withFirebase(LoginFormBase));
export default LoginPage;
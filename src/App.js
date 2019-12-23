import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import './App.css';
import * as ROUTES from './constants/routes';
import LoginPage from './components/LoginPage';
// import EventsPage from './components/EventsPage';
import { withFirebase } from './firebase';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authUser: null,
    };
  }

  componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged(
      authUser => {
      authUser
        ? this.setState({ authUser })
        : this.setState({ authUser: null });
    });
  }

  componentWillUnmount() {
    this.listener();
  }

  render() {
    return (
      <Router>
        <div>
          <Navigation authUser={this.state.authUser} />
          <hr/>
          <p>HELLO WORLD</p>
          <Route path={ROUTES.SIGN_IN} component={LoginPage} />
          {/*<Route path={ROUTES.ADMIN} component={EventsPage} />*/}
        </div>
      </Router>
    );
  }
}
export default withFirebase(App);

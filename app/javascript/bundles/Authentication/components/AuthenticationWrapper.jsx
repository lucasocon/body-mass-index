import PropTypes from 'prop-types';
import React from 'react';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

export default class AuthenticationWrapper extends React.Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  updateName = (name) => {
    this.setState({ name });
  };

  render() {
    return (
      <Router>
        <div className='uk-container uk-container-small'>
          <div className="uk-card uk-card-default uk-card-body uk-width-1-2@m">
            <Switch>
              <Route exact path="/access" component={SignInForm} />
              <Route path="/access/sign_up" component={SignUpForm} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

import PropTypes from 'prop-types';
import React from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';

export default class SignInForm extends React.Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {email: '', password: ''};
  }

  updateEmail = (email) => {
    this.setState({ email });
  };
  
  updatePassword = (password) => {
    this.setState({ password });
  };

  cleanFields = () => {
    this.setState({ email: '', password: '' });
  }

  sendForm = () => {
    let _this = this;

    const credentials = {
      email: this.state.email,
      password: this.state.password
    };

    axios.post('/api/sign_in', credentials, { withCredentials: true}).then(function (resp) {
      const response = resp.data;
      if (response.success) {
        window.location = response.location;
      } else {
        swal("Oops", response.message, "error");
      }
    }).catch(function () {
      console.log('Error on server');
    });
  }

  render() {
    return (
      <div>
        <fieldset className="uk-fieldset">
          <legend className="uk-legend">Authenticate</legend>
          <hr className="uk-divider-icon" />

          <div className="uk-margin">
            <input 
              className="uk-input" 
              type="email" 
              placeholder="Email" 
              value={this.state.email}
              onChange={(e) => this.updateEmail(e.target.value)} /> 
          </div>

          <div className="uk-margin">
            <input 
              className="uk-input" 
              type="password" 
              placeholder="Password"
              value={this.state.password}
              onChange={(e) => this.updatePassword(e.target.value)} /> 
          </div>

          <div className="uk-margin">
            <p className='uk-margin'>
              <button 
                className="uk-button uk-button-default" 
                onClick={() => this.cleanFields()}> 
                Clean fields
              </button>
              
              <button 
                className="uk-button uk-button-primary"
                onClick={() => this.sendForm()}> 
                Log in
              </button>
            </p>
          </div>
        </fieldset>

        <Link to={'/access/sign_up'}> Sign up </Link>
      </div>
    );
  }
}
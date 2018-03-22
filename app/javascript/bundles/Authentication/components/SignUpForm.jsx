import PropTypes from 'prop-types';
import React from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';

export default class SignUpForm extends React.Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '', 
      password: '',
      password_confirmation: '',
    };
  }

  updateName = (name) => {
    this.setState({ name });
  };

  updateEmail = (email) => {
    this.setState({ email });
  };
  
  updatePassword = (password) => {
    this.setState({ password });
  };

  updatePasswordConfirmation = (password_confirmation) => {
    this.setState({ password_confirmation });
  };

  cleanFields = () => {
    this.setState({ 
      name: '', 
      email: '', 
      password: '',
      password_confirmation: '', 
    });
  }

  sendForm = () => {
    let _this = this;

    const data = {
      user: {
        name: this.state.email,
        email: this.state.email,
        password: this.state.password,
        password_confirmation: this.state.password_confirmation
      }
    };

    axios.post('/api/sign_up', data, { withCredentials: true}).then(function (resp) {
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
          <legend className="uk-legend">Sign Up</legend>
          <hr className="uk-divider-icon" />

          <div className="uk-margin">
            <input 
                className="uk-input" 
                type="text" 
                placeholder="Name" 
                value={this.state.name}
                onChange={(e) => this.updateName(e.target.value)} /> 
          </div>
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
            <input 
              className="uk-input" 
              type="password" 
              placeholder="Password Confirmation"
              value={this.state.password_confirmation}
              onChange={(e) => this.updatePasswordConfirmation(e.target.value)} /> 
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
                Create Account
              </button>
            </p>
          </div>
        </fieldset>

        <Link to={'/access'}> Sign In </Link>
      </div>
    );
  }
}
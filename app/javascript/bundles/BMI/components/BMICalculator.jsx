import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

export default class BMICalculator extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { mass: 0, height: 0, bmi: 0 };
  }

  updateMass = (mass) => {
    this.setState({ mass });
  };

  updateHeight = (height) => {
    this.setState({ height });
  };

  calculateBMI = () => {
    let bmi = 0;
    if (this.state.height > 0){
      bmi = ((this.state.mass) / (this.state.height  * this.state.height)).toFixed(2);
    }
    
    this.setState({ bmi });
  }

  relatedImage = () => {
    // These are example images of other authors only for recreational use:
    const under = 'https://cdn3.iconfinder.com/data/icons/destitution/500/destitution-famine-starving_6-512.png'
    const good = 'https://www.ozchiroinhutch.com/wp-content/uploads/2017/10/muscleIcon.png'
    const fat = 'https://d30y9cdsu7xlg0.cloudfront.net/png/1217-200.png'
    const bmi = this.state.bmi;
    let currentImage = '';

    if (bmi < 18.5) {
      currentImage = under;
    } else if (bmi >= 18.5 && bmi <= 25) {
      currentImage = good;
    } else {
      currentImage = fat; 
    }

    return (
      <img src={currentImage} className='bmi' />
    );
  }

  relatedCategory = () => {
    const bmi = this.state.bmi;
    let currentCategory = '';

    if (bmi < 15) {
      currentCategory = 'Very severely underweight';
    } else if (bmi >= 15 && bmi < 16) {
      currentCategory = 'Severely underweight';
    } else if (bmi >= 16 && bmi < 18.5) {
      currentCategory = 'Underweight';
    } else if (bmi >= 18.5 && bmi < 25) {
      currentCategory = 'Normal (healthy weight)';
    } else if (bmi >= 25 && bmi < 30) {
      currentCategory = 'Overweight';
    } else if (bmi >= 30 && bmi < 35) {
      currentCategory = 'Obese Class I (Moderately obese)';
    } else if (bmi >= 35 && bmi < 40) {
      currentCategory = 'Obese Class II (Severely obese)';
    } else {
      currentCategory = 'Obese Class III (Very severely obese)';
    }

    return (
      <p className="related-category"> {currentCategory} </p>
    );
  }

  logOut = () => {
    window.location = '/log_out';
  }

  render() {
    return (
      <div className='uk-container uk-container-large'>
        <div className="uk-card uk-card-default uk-card-body uk-width-1-2@m">
          <div>
            <legend className="uk-legend">Welcome to BMI Calculator, { this.props.name }</legend>
            <hr className="uk-divider-icon" />
            <div className="uk-column-1-2">
              <div className="column-1">
                <label class="uk-form-label">Mass (In kg) </label>
                <input 
                  className="uk-input" 
                  type="number" 
                  placeholder="Mass (kg)" 
                  value={this.state.mass}
                  onChange={(e) => this.updateMass(e.target.value)} /> 
              </div>
              <div className="column-2">
                <label class="uk-form-label">Height (In mts) </label>
                <input 
                  className="uk-input" 
                  type="number" 
                  placeholder="Height (mts)" 
                  value={this.state.height}
                  onChange={(e) => this.updateHeight(e.target.value)} /> 
              </div> 
            </div>

            <div className="uk-column-1-2 margin">
              <div className="column-1">
                <h1 className="bmi"> {this.state.bmi} </h1>
                { this.relatedCategory() }
              </div>
              <div className="column-2 centering">
                { this.relatedImage() }
              </div> 
            </div>

            <hr className="uk-divider-icon" />

            <div className="uk-margin">
              <p className='uk-margin'>
                <button 
                  className="uk-button uk-button-secondary" 
                  onClick={() => this.logOut()}> 
                  Log Out
                </button>
                
                <button 
                  className="uk-button uk-button-primary"
                  onClick={() => this.calculateBMI()}> 
                  Calculate
                </button>
              </p>
            </div>

          </div>
        </div>
      </div>
    );
  }
}
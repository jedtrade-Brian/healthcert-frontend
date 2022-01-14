import React, { Component } from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import './shared.css';

class ProgressStepper extends Component {
  constructor(props) {
    super(props);
    this.state = {
        activeStep: 5
    };
  }

  render() {
    return (
        <div className='progressSteps' style={{overflowX: 'auto'}}>
            {/*  */}
            <Stepper
             activeStep={this.state.activeStep}
             // nonLinear
             className={this.state.activeStep !== 1 ? 'completed' : ''}
             alternativeLabel
            >
             {this.props.steps.map((item,index) => {
              return (
                 <Step key={index} >
                    <StepLabel completed={item.isActive}>{item.label}</StepLabel>
                 </Step>
               )})}
            </Stepper>
        </div>
    )
  }
}

export default ProgressStepper;

import React, { Component } from "react";
import { addCompanyConfig } from "./CreateAccountConfig";
import { Link } from "react-router-dom";
import FormComponent from "../../Form/FormComponent";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import LoginImage from "../../Login/LoginImage.js";
import PersonalInformation from "./PersonalInformation";
import "./CreateAccount.css";
import { IconButton, Tooltip, Typography } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

class CreateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      formData: {}
    };
  }


  preSubmitChanges = e => {
    this.setState({ formData: e, activeStep: 1 });
    return false;
  };

  getSteps = () => {
    return [
      {label:"Step 1",isActive: this.state.activeStep === 0 || this.state.activeStep === 1},
      {label:"Step 2",isActive: this.state.activeStep === 1},
    ];
  };

  render() {
    const steps = this.getSteps();
    return (
      <div>
        <div className="CompanySection">
          <LoginImage {...this.props}/>
          <div className="Company">
          <div className="logoPart">
            <span className="logo">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xlink="http://www.w3.org/1999/xlink"
            width="78"
            height="87"
            viewBox="0 0 78 87"
          >
            <defs>
              <clipPath id="clip-path">
                <rect
                  id="Rectangle_371"
                  data-name="Rectangle 371"
                  width="78"
                  height="87"
                  transform="translate(-2269 -5850)"
                  fill="#fff"
                  opacity="0.2"
                />
              </clipPath>
            </defs>
            <g
              id="logo"
              transform="translate(2269 5850)"
              clipPath="url(#clip-path)"
            >
              <g
                id="Group_1069"
                data-name="Group 1069"
                transform="translate(-3989.496 -5953.821)"
              >
                <path
                  id="Oval-3"
                  d="M37.529,6.955a38.144,38.144,0,0,0,6.084,75.8"
                  transform="translate(1701.713 146.92) rotate(-45)"
                  fill="none"
                  stroke="#fff"
                  strokeLinecap="square"
                  strokeWidth="9"
                  fillRule="evenodd"
                />
                <path
                  id="Oval-3-2"
                  data-name="Oval-3"
                  d="M81.755,44.614A38.187,38.187,0,0,0,70.912,17.976"
                  transform="translate(1702.054 146.92) rotate(-45)"
                  fill="none"
                  stroke="#fff"
                  strokeLinecap="square"
                  strokeWidth="9"
                  fillRule="evenodd"
                />
                <path
                  id="Path_435"
                  data-name="Path 435"
                  d="M.1,1.979l9.979-3.887-.031,31.94H31.026l-.031,9.953H10V44s-.037,5.375,7.8,7.348a15.406,15.406,0,0,0,11.313-1.856l6.127,6.252a26.852,26.852,0,0,1-22.372,3.5C-.248,53.378,0,44,0,44Z"
                  transform="translate(1744 108)"
                  fill="#fff"
                />
              </g>
            </g>
          </svg>
        </span>
        <span className="logoText">ConsenTrade</span>
              </div>
              <div className="backLink">
            {this.state.activeStep === 1 && (
              <Tooltip title="Go Back" placement="right">
                <IconButton color="primary" aria-label="add an alarm" onClick={() => {this.setState({activeStep: 0})}}>
                  <ArrowBackIcon />
                </IconButton>
              </Tooltip>  
            )} 
            </div>
            <h2>Create Account</h2>
            <div className="stepperSection">
              <Stepper
                activeStep={this.state.activeStep}
                className={this.state.activeStep === 0 ? "completed" : "full-completed"}
                alternativeLabel
              >
                {console.log(steps)}
                {steps.map((item,index) => (
                  <Step key={index}>
                    <StepLabel completed={item.isActive}>{item.label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </div>
            
            <h4>
              {this.state.activeStep === 0
                ? "Company Information :"
                : "Authorized Personal Information :"}
            </h4>
            {this.state.activeStep === 0 ? (
              <div className="companies">
                <FormComponent
                  formConfig={addCompanyConfig}
                  mutationParams={this.state.formData}
                  continueButton="Continue"
                  preSubmitChanges={this.preSubmitChanges}
                  modalCloseCallback={() => {}}
                />
              </div>
            ) : (
              <div className="companies">
                <PersonalInformation formData={this.state.formData}/>
              </div>
            )}
            <Typography style={{marginTop:'30px',fontSize:'15px'}}>
               Already have an account?{" "}
               <Link to='/login' style={{textDecoration:'none'}}>
                 Login 
               </Link>
            </Typography>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateAccount;

import React, { Component } from "react";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import SelectTemplate from "./SelectTemplate";
import "./CreateDocument.css";


class CreateSaleDocument extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
    };
  }

  handleNext = () => {
    this.setState({ activeStep: 1 });
  };

  handleFormNext = data => {
    this.setState({ activeStep: 2});
  };

  handleBack = data => {
    this.setState({ activeStep: 1});
  };

  getSteps = () => {
    return ["Select Template", "Details", "Confirmation"];
  };

  render() {
    const steps = this.getSteps();
    return (
      <div className="createsaleSection">
        <h3>Create Sale Document</h3>
        <div>
          <Stepper
            activeStep={this.state.activeStep}
            alternativeLabel
          >
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </div>
        {this.state.activeStep === 0 ? (
          <SelectTemplate
            handleNext={this.handleNext}
            type={this.props.match.params.docType}
            history={this.props.history}
          />
        ) : this.state.activeStep === 1 ? (
          <></>
        ) : (
          <></>
        )}
      </div>
    );
  }
}

export default CreateSaleDocument;

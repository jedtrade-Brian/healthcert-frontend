import React, { Component } from "react";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import SelectTemplate from "./SelectTemplate";
import CreateDocumentForm from "./CreateDocumentForm";
import ConfirmTemplate from "./ConfirmTemplate";
import {
  SalesQuotationConfigLeft,
  DeliveryOrderConfigLeft,
  PaymentCertificateConfigLeft,
  InvoiceConfigLeft,
  TVCertificateConfigLeft,
  TVCertificateConfigRight,
  None
} from "./CreateDocumentConfig.js";
import "./CreateDocument.css";



class CreateDocument extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      formData: {},
      // editableData: undefined,
      heading: "Invalid",
      infoHeading: "Invalid",
      formConfig: {},
      loader: false,
      importedFormData: null,
      isManualInput: null,
      fileObj:null,
      template: null,
    };
  }
  componentDidMount() {
    if (this.props && this.props.match && this.props.match.params) {
      if (this.props.match.params.docType !== 'TVCertificate') {
        this.props.history.goBack()
      }
    }
    this.setData(this.props.match.params.docType);
  }

  handleExcel = (data, template) => {
    this.setState({
      fileObj:data,
      template:template
    });
  }

  
/*
  setData = type => {
    switch (type) {
      case "TVCertificate":
        this.setState({
          heading: "Create Jupyton Certificate",
          formConfig: TVCertificateConfigLeft,
          infoHeading: "Subject Information"
        });
        break;
      default:
        this.setState({
          heading: "Invalid Page",
          formConfig: None,
          infoHeading: "Invalid Information"
        });
    }
  };
*/
  

  setData = type => {
    switch (type) {
      case "TVCertificate":
        this.setState({
          heading: "Create Certificate",
          formConfig: TVCertificateConfigRight,
          infoHeading: "Subject Information"
        });
        break;
      default:
        this.setState({
          heading: "Invalid Page",
          formConfig: None,
          infoHeading: "Invalid Information"
        });
    }
    console.log(TVCertificateConfigRight);
  };

  

  handleNext = (formData = null) => {
    console.log('handleNextFormData',formData)
    if (formData) {
      this.setState({ activeStep: 2, importedFormData: formData, isManualInput: false });
    } else {
      this.setState({ activeStep: 2, isManualInput: true });
    }
    console.log("this.state",this.state)
  };

  handleFormNext = data => {
    // this.createDocuments(data)
    this.setState({ activeStep: 2, formData: data });
    console.log(data);
  };

  

  handleBack = () => {
    this.setState({ activeStep: 0 });
  };

  handleCancel = () => {
    this.setState({ activeStep: 0 });
  }

  getSteps = () => {
    return ["Select Template", "Details", "Confirmation"];
  };

  render() {
    const steps = this.getSteps();
    return (
      <div className="createsaleSection">
        <h3>{this.state.heading}</h3>
        <div>
          <Stepper
            activeStep={this.state.activeStep}
            // className={this.state.activeStep === 1 ? "completed" : ""}
            alternativeLabel
          >
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </div>
        {
        this.state.activeStep === 0 ? (
          <SelectTemplate
            handleNext={this.handleNext}
            history={this.props.history}
            handleExcel={this.handleExcel}
          />
          
        ) :
         this.state.activeStep === 1 ? (
          <CreateDocumentForm
            handleFormNext={this.handleFormNext}
            importedFormData={!this.state.isManualInput ? this.state.importedFormData : null}
            formConfig={this.state.formConfig}
            infoHeading={this.props.match.params.docType !== 'TVCertificate'? this.state.infoHeading : "Subject"}
            docType={this.props.match.params.docType}
            // editableData={
            //   this.state.editableData ? this.state.editableData : ""
            // } 
            history={this.props.history}
            onCancel={this.handleCancel}
          />
        ) : (
          
              <ConfirmTemplate
                fileObj={this.state.fileObj}
                handleBack={this.handleBack}
                formData={this.state.importedFormData}
                history={this.props.history}
                docType={this.props.match.params.docType}
                template={this.state.template}
                onConfirmClick={() => { this.setState({ activeStep: 3 }) }}
              />
            )}
      </div>
    );
  }
}

export default CreateDocument;

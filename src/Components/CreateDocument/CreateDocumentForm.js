import React, { Component } from "react";
import FormComponent from "../../Form/FormComponent";
import "./CreateDocument.css";
import Grid from "@material-ui/core/Grid";
import OrderInfo from "./OrderInfo.js";
import DeliveryInfo from "./DeliveryInfo.js";
import PaymentInfo from "./PaymentInfo.js";
import InvoiceInfo from "./InvoiceInfo.js";
import swal from "sweetalert";

class CreateDocumentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderInfo: null,
      finalAmt: 0,
      isInfoError: true,
      mutationParams: null,
      isManualInput: this.props.importedFormData ? false : true
    };
  }
  componentDidMount(){
    if(this.props.importedFormData && Object.keys(this.props.importedFormData).length !== 0){
      let orderInfo = []
      if(this.props.importedFormData.docType === 'salesQuotation'){
       orderInfo = this.props.importedFormData.orderInfo.filter((item) => {
          if(item.itemAmt && item.itemDesc){
            return item
          }
        })
      } else{
        orderInfo = this.props.importedFormData.orderInfo
      }
      // const finalAmt = this.props.importedFormData.finalAmt
      // delete this.props.importedFormData.orderInfo
      const mutationParams = this.props.importedFormData
      this.setState({mutationParams, orderInfo},()=>{
        console.log(this.state);
      })
    } 
  }

  // getData = (obj, amt) => {
  //   this.setState({ orderInfo: obj, finalAmt: amt });
  // };

  getData = (obj) => {
    this.setState({ orderInfo: obj });
  };

  getInfoError = err => {
    this.setState({ isInfoError: err });
  };

  preSubmitChanges = e => {
    e.orderInfo = this.state.orderInfo;
    e.finalAmt = this.state.finalAmt;
    // console.log('e', e);
    if (!this.state.isInfoError) {
      this.props.handleFormNext(e);
    } else {
      swal("Oops!", `'${this.props.infoHeading}' fields are empty`, "error");
    }
    return false;
  };

  render() {
    const Info = () => {
      switch (this.props.docType) {
        case "salesQuotation":
          return (
            ((this.state.orderInfo || this.state.isManualInput) && (
              <OrderInfo
              sendData={this.getData}
              sendInfoError={this.getInfoError}
              orderInfo={this.state.orderInfo? this.state.orderInfo : null}
              // editableData={
              //   this.props.editableData !== ""
              //     ? this.props.editableData.orderInfo
              //     : undefined
              // }
             />
            ))
          );
        case "deliveryOrder":
          return (
            <DeliveryInfo
              sendData={this.getData}
              sendInfoError={this.getInfoError}
              // editableData={
              //   this.props.editableData !== ""
              //     ? this.props.editableData.orderInfo
              //     : undefined
              // }
            />
          );
        case "paymentCertificate":
          return (
            ((this.state.orderInfo || this.state.isManualInput) && (
              <PaymentInfo
                sendData={this.getData}
                sendInfoError={this.getInfoError}
                orderInfo={this.state.orderInfo? this.state.orderInfo : null}
                // editableData={
                //   this.props.editableData !== ""
                //     ? this.props.editableData.orderInfo
                //     : undefined
                // }
              />
            ))
            
          );
        case "invoice":
          return (
            ((this.state.orderInfo || this.state.isManualInput) && (
              <InvoiceInfo
                sendData={this.getData}
                sendInfoError={this.getInfoError}
                orderInfo={this.state.orderInfo? this.state.orderInfo : null}
                // editableData={
                //   this.props.editableData !== ""
                //     ? this.props.editableData.orderInfo
                //     : undefined
                // }
             />
            ))
          );
          case "TVCertificate":
          return (
            ((this.state.orderInfo || this.state.isManualInput) 
            && (
              <OrderInfo
              sendData={this.getData}
              sendInfoError={this.getInfoError}
              orderInfo={this.state.orderInfo? this.state.orderInfo : null}
              // editableData={
              //   this.props.editableData !== ""
              //     ? this.props.editableData.orderInfo
              //     : undefined
              // }
             />
            )
            )
          );
        default:
          return <h1>No Info</h1>;
      }
    };

    return (
      <div className="billToInfo">
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <h3>Bill To Information</h3>
            {(this.state.mutationParams || this.state.isManualInput) && (
              <FormComponent
              formConfig={this.props.formConfig}
              preSubmitChanges={this.preSubmitChanges}
              mutationParams={this.state.mutationParams}
              // editableData={
              //   this.props.editableData !== ""
              //     ? this.props.editableData
              //     : undefined
              // }
              buttonTitle=""
              saveButtonTitle="Preview"
              buttonTitleCSS="salesbottomAction"
              modalCloseCallback={() => {}}
              closeButton={this.props.onCancel}
            />
            )}
            
          </Grid>
          <Grid item xs={6}>
            <h3>{this.props.infoHeading}</h3>
            {Info()}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default CreateDocumentForm;

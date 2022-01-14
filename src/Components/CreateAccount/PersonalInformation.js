import React, { Component } from "react";
import { addAuthorizedConfig } from "./CreateAccountConfig";
import FormComponent from "../../Form/FormComponent";
import {createAccountEnterprise} from "../../services/createAcountService";
import { messagePopup } from "../../services/messagePopupService";
import { withRouter } from "react-router-dom";
import {BackdropLoader} from "../../services/loader";
import "./CreateAccount.css";
import CommonDialogBox from '../Shared/CommonDialogBox';

class PersonalInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: this.props.formData,
      loader: false,
      openDialog: false
    };
  }

  preSubmitChanges = async e => {
    const { formData } = this.state;
    e["companyName"] = formData.companyName;
    e["uen"] = formData.uen;
    e["address1"] = formData.address1;
    e["address2"] = formData.address2;
    e["country"] = formData.country;
    e["zipcode"] = formData.zipcode;
    e["domain"] = formData.domain;
    e.mobileNo = `${e.code}${e.mobileNo}`;

    delete e.checkboxData;
    delete e.confirmPassword;
    delete e.code;
    // this.showSuccessMsg(e)
    this.setState({ loader: true });
    try {
      // if(e.role === 'financier'){
      //   console.log('financier');
      //   await createAccountFinancier(e);
      //   this.showSuccessMsg(e)
      // } else {
      //   console.log('not financier');
        await createAccountEnterprise(e);
        this.showSuccessMsg(e)
      // }
      return false;
    } catch (error) {
      this.setState({ loader: false });
      if (error.response && error.response.status === 403) {
        messagePopup("", "Email already exist", "error");
      }
      if (error.response && error.response.status === 400) {
        messagePopup("", "Bad Request", "error");
      }
      return false;
    }
  };

  showSuccessMsg = (e) => {
    this.setState({ loader: false });
      messagePopup(
        "Verify Number",
        "Verification code send to registered number",
        "success"
      );
      this.props.history.push({
        pathname: "/verificationCode/new-user",
        search: `?mobileNo=${e.mobileNo}&email=${e.email}`,
      });
  }

  onHandleClose = () => {
    this.setState({openDialog: false})
  }

  handleHyperLinkClick = () => {
    console.log('handleHyperLinkClick');
    this.setState({openDialog: true})
  }

  render() {
    return (
      <React.Fragment>
        <FormComponent
          onHyperLinkClick={this.handleHyperLinkClick}
          formConfig={addAuthorizedConfig}
          preSubmitChanges={this.preSubmitChanges}
          continueButton="CREATE ACCOUNT"
          modalCloseCallback={() => {}}
        />
        {/* <Tooltip open={open} onClose={handleClose} onOpen={handleOpen} title="Add">
          <Button>Controlled</Button>
        </Tooltip> */}
        <BackdropLoader open={this.state.loader} />
      </React.Fragment>
    );
  }
}

export default withRouter(PersonalInformation);

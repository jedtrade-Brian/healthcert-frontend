import React, { Component } from "react";
import FormComponent from "../../Form/FormComponent";
import { profileConfig, changePasswordConfig } from "./ProfileConfig";
import Grid from "@material-ui/core/Grid";
import "./profile.css";
import authService from "../../services/authService";
import { BackdropLoader } from "../../services/loader";
import { messagePopup } from "../../services/messagePopupService";
import { getUsers } from "../../services/userService";
class Profile extends Component {
  constructor(props){
    super(props)
    this.state = {
      formData: null,
      loader: false
    }
  }
  componentDidMount() {
    const user = authService.getUserInfo()
    // console.log('XXYYYYYY : ',user);
    const formData = {
      name: user.name,
      // email: user.email,
      mobile: user.mobileNo,
      address1: user.address1,
      address2: user.address2,
      country: user.country
    }
    this.setState({
      formData
    })
  }
  preSubmitProfile = (data) => {
    let finalData = {
        fullName: data.name,
        mobileNo: data.mobile,
        address1: data.address1,
        address2: data.address2,
        country: data.country
      }
    this.setState({loader: true})
    authService.updateUser(finalData).then(response => {
      console.log('Response : ',response);
      if(response && response.status === 200){
        messagePopup('', `Credentials updated`, 'success');
      }
      getUsers().then(response => {
        if (response && response.data) {
          authService.setUserInfo(response.data);
        }
      });

      this.setState({loader: false})
    }).catch(err => {
      console.log('Error : ',err);
      this.setState({loader: false})
      if(err.response.status === 400){
        console.log(err.response);
        messagePopup('', `${err.response.data.error}`, 'error');
      }
    })
  }
  preSubmitPassword = (data) => {
    this.setState({loader: true})
    authService.changePassword({
        oldpassword: data.oldPassword,
        newpassword: data.newPassword
    }).then(response => {
      console.log('Response : ',response);
      if(response && response.status === 200){
        messagePopup('', `${response.data}`, 'success');
      }
      this.setState({loader: false})
    }).catch(err => {
      console.log('Error : ',err);
      this.setState({loader: false})
      if(err.response.status === 400){
        console.log(err.response);
        messagePopup('', `${err.response.data.error}`, 'error');
      }
    })
  }
  render() {
    return (
      <div className="profilemodifySection">
        <BackdropLoader open={this.state.loader} />
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <h3>Edit Profile</h3>
            {this.state.formData && (
              <FormComponent
                mutationParams={this.state.formData}
                formConfig={profileConfig}
                buttonTitle=""
                continueButton="Update Profile"
                preSubmitChanges={this.preSubmitProfile}
              />
            )}
            
          </Grid>
          <Grid item xs={6}>
            <h3>Change Password</h3>
            <FormComponent
              formConfig={changePasswordConfig}
              buttonTitle=""
              continueButton="Update Password"
              preSubmitChanges={this.preSubmitPassword}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Profile;

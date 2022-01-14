import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import './login.css';
import LoginImage from './LoginImage';
import { BackdropLoader } from '../services/loader';
import FormComponent from '../Form/FormComponent';
import { resetPwdConfig } from './ResetPasswordConfig';
import { resetPassword,verifyForgetPasswordReq } from '../services/authService';
import swal from 'sweetalert';

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
      authToken: null
    };
  }
  componentDidMount() {
    console.log('this.props ',this.props);
    if(this.props){
      const encode = this.props.match && this.props.match.params ? this.props.match.params.encode : null;
      if(encode) {
        this.setState({loader: true})
        verifyForgetPasswordReq(encode).then(response => {
          let authToken = null;
          if(response && response.data){
            authToken = response.data.authToken
          }
          this.setState({loader: false,authToken})
        }).catch(err => {
          // this.setState({loader: false})
          console.log('Error : ',err);
        })
      }
    }
  }
  preSubmitChanges = (e) => {
    console.log('RRRRR : ',e);
    this.setState({loader: true})
    // ,this.state.authToken
    resetPassword(e.password,this.state.authToken).then(response => {
      if(response) {
        if(response && response.status === 200){
          swal({
            text: "User Password Updated.",
            icon: "success",
          }).then(resp => {
            this.props.history.push('/login')
          });
        }
      }
      this.setState({loader: false})
    }).catch(err => {
      console.log(err);
      if(err.response.status === 401) {
        swal({
          text: "Invalid bearer token or not presented.",
          icon: "error",
        })
      }
      this.setState({loader: false})
    })
    //Reset button action
    // return false;
  };

  onSignIn = () => {
    this.props.history.push('/login');
  };

  render() {
    return (
      <div className='signMain'>
        <BackdropLoader open={this.state.loader} />
        <LoginImage />
        <div className='signForm'>
          <div className='logoPart'>
            <span className='logo'>
              <svg xmlns="http://www.w3.org/2000/svg" width="100" height="" viewBox="0 0 543 602">
                <path id="Color_Fill_1" fill="#fff" data-name="Color Fill 1" class="cls-1" d="M234,3c26,1.872,65.051,54.05,82,71,47.63,47.634,108.52,91.129,135,159,35.527,91.06-20.658,214.785-93,231-19.873,4.454-67.266-43.775-60-64,4.9-13.636,23.266-17,34-25,26.076-19.432,48.022-67.265,31-111-11.838-30.416-37.736-49.74-59-71l-67-69L204,90c-5.745-10.2,6.515-69.353,13-78C221.005,6.659,227.542,6.079,234,3ZM189,136c20.278,0.184,63.659,38.3,56,60-4.988,14.133-23.119,17.579-34,26-23.163,17.927-46.131,59.292-33,103,8.9,29.638,28.838,45.839,48,65L340,506c12.146,18.2-13.834,81.284-30,85-18.6,4.276-26.419-11.419-34-19l-70-70c-36.353-36.356-83.242-70.923-105-121-32.593-75.013-8.672-177.162,41-217C156.607,152.285,171.376,145.567,189,136Z"></path>
              </svg>
            </span>
            <span className='logoText'>HealthCert</span>
          </div>
          <h2>Reset Password</h2>
          <div className='resetPasswordform'>
            <FormComponent
              formConfig={resetPwdConfig}
              preSubmitChanges={this.preSubmitChanges}
              continueButton='RESET PASSWORD'
              modalCloseCallback={() => {}}
            />
            <Button
              variant='contained'
              className='loginOptional'
              onClick={() => {
                this.onSignIn();
              }}
            >
              LOGIN
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
export default ResetPassword;

import React, { Component } from 'react';
import {
  Button,
  TextField,
  // Link,
  InputAdornment,
  // IconButton
} from '@material-ui/core';
import './login.css';
import LoginImage from './LoginImage';
import authService from '../services/authService';
// import { resetPassword } from "./LoginQueries";

import swal from "sweetalert";
import { BackdropLoader } from '../services/loader';
import { messagePopup } from '../services/messagePopupService';

class ForgotPassword extends Component {
  constructor(props) {
    super(props);

    // const token = localStorage.getItem("token");
    // let loggedIn = true;
    // if (token == null) {
    //   loggedIn = false;
    // }

    this.state = {
        email: "",
        loader: false
        // email1: "",
        // password1: "",
        // userData: undefined,
        // id: undefined,
        // password: undefined,
        // loading: false,
        // forgot: true
    };
  }

    handleChange = e => {
      this.setState({ email: e.target.value });
    };
    validateForm = email => {
      const validEmailRegex = RegExp(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );

      return validEmailRegex.test(email.trim()) ? true : false;
    };

    handleClickShowPassword = () => {
      this.setState({ showPassword: !this.state.showPassword });
    };

    onSubmit = e => {
      e.preventDefault();
      if (this.state.email === "") {
        swal({
          icon: "warning",
          title: "Please enter an Email-ID ",
          className: "loginSwal"
        });
      } else {
        if (this.validateForm(this.state.email)) {
          const email = this.state.email
          this.setState({loader: true})
          authService.forgotPassword(email).then(response => {
            console.log('Response : ',response);
            if(response && response.status === 201){
              swal({
                text: "Change password request sent to email",
                icon: "success",
              }).then(resp => {
                this.props.history.push('/login')
              });
              // messagePopup('', 'Change password request sent to email', 'success');
            }
            this.setState({loader: false})
          }).catch(err => {
            console.log('Error : ',err);
            if(err.response.status === 400) {
              swal({
                text: "Email does not exists",
                icon: "error",
              })
            }
            this.setState({loader: false})
          })
          // fetchMethod(resetPassword, {
          //   options
          // })
          //   .then(res => res.json())
          //   .then(res => {
          //     this.setState({
          //       connectionError: ""
          //     });
          //     if (res.data.UserdataResetPassword === null) {
          //       swal({
          //         icon: "warning",
          //         title: "Email not found",
          //         className: "loginSwal"
          //       });
          //     } else {
          //       swal({
          //         icon: "warning",
          //         title: res.data.UserdataResetPassword.message,
          //         className: "loginSwal"
          //       });
          //     }
          //   })
          //   .catch(e => {
          //     this.setState({
          //       connectionError: e.toString().substring(11, e.length)
          //     });
          //   });
        } else {
          swal({
            icon: "warning",
            title: "Invalid Email ",
            className: "loginSwal"
          });
        }
      }
    };

  onSignIn = () => {
    // window.location = '/login';
    this.props.history.push('/login')
  };

  render() {
    // localStorage.setItem("email", this.state.email);
    return (
      <div className='signMain'>
        <BackdropLoader open={this.state.loader} />
        <LoginImage />
        <div className='signForm forgotpasswordSection'>
          <div className="logoPart">
            <span className="logo">
              <svg xmlns="http://www.w3.org/2000/svg" width="100" height="" viewBox="0 0 543 602">
                <path id="Color_Fill_1" fill="#fff" data-name="Color Fill 1" class="cls-1" d="M234,3c26,1.872,65.051,54.05,82,71,47.63,47.634,108.52,91.129,135,159,35.527,91.06-20.658,214.785-93,231-19.873,4.454-67.266-43.775-60-64,4.9-13.636,23.266-17,34-25,26.076-19.432,48.022-67.265,31-111-11.838-30.416-37.736-49.74-59-71l-67-69L204,90c-5.745-10.2,6.515-69.353,13-78C221.005,6.659,227.542,6.079,234,3ZM189,136c20.278,0.184,63.659,38.3,56,60-4.988,14.133-23.119,17.579-34,26-23.163,17.927-46.131,59.292-33,103,8.9,29.638,28.838,45.839,48,65L340,506c12.146,18.2-13.834,81.284-30,85-18.6,4.276-26.419-11.419-34-19l-70-70c-36.353-36.356-83.242-70.923-105-121-32.593-75.013-8.672-177.162,41-217C156.607,152.285,171.376,145.567,189,136Z"></path>
              </svg>
            </span>
            <span className="logoText">JupytonCert</span>
          </div>
          <h2>Forgot Password</h2>

            <form noValidate onSubmit={this.onSubmit}>
              <TextField
                value={this.state.email}
                //   variant="outlined"
                margin='normal'
                id='email'
                name='email'
                placeholder='Email Address'
                onChange={this.handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>@</InputAdornment>
                  ),
                }}
              />
              <Button
                variant='contained'
                color='primary'
                type='submit'
                className='signBtn'
              >
                CONTINUE
              </Button>
              <Button
                variant='contained'
                className='loginOptional'
                onClick={() => {
                  this.onSignIn();
                }}
              >
                LOGIN
              </Button>
            </form>
   
        </div>
      </div>
    );
  }
}
export default ForgotPassword;

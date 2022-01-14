import React, { Component } from 'react';
import {
  Button,
  TextField,
  InputAdornment,
  IconButton,
} from '@material-ui/core';
import './buyerQuotation.css';
import { VisibilityOutlined, VisibilityOffOutlined } from '@material-ui/icons';
import LoginImage from '../../Login/LoginImage';
import { Link } from 'react-router-dom';
import { BackdropLoader } from '../../services/loader';
import signDocService from '../../services/signDocument';
import { messagePopup } from '../../services/messagePopupService';
import authService from '../../services/authService';

class VerifyDoc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jedtradeid: '',
      jedpassword: '',
      password: '',
      showPassword: false,
      show: false,
      loader: false,
      errors: { jedtradeid: '', jedpassword: '', password: '' },
      docHash: '',
      mobileNo: '',
      signature: '',
    };
  }

  componentDidMount() {
    const docHash = new URLSearchParams(this.props.location.search).get(
      'docHash'
    );
    const mobileNo = new URLSearchParams(this.props.location.search).get(
      'mobileNo'
    );
    const signature = new URLSearchParams(this.props.location.search).get(
      'signature'
    );
    // console.log('mobileNo',typeof mobileNo);
    if (mobileNo && docHash && signature) {
      this.setState({ docHash, mobileNo, signature });
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  onJediD = () => {
    this.setState({ show: true });
  };

  onLogin = () => {
    this.setState({ show: false });
  };

  validateForm = (email, password) => {
    const { errors } = this.state;
    const validEmailRegex = RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    errors.email = validEmailRegex.test(email.trim())
      ? ''
      : 'Email is not valid!';
    errors.password =
      password.trim().length > 5
        ? ''
        : 'Password should be greater than 5 characters';
    this.setState({ errors });
    return this.state.errors.email === 'Email is not valid!' ||
      this.state.errors.password ===
        'Password should be greater than 5 characters'
      ? false
      : true;
  };

  handleSubmitViaPassword = async (e) => {
    e.preventDefault();
    this.setState({ loader: true });
    try {
      const response = await signDocService.verifyUserViaPass(
        this.state.password
      );
      console.log('Response : ', response);
      this.setState({ loader: false });
      if (response && response.data) {
        if (response.data.userValidated) {
          messagePopup(
            '',
            'User has been Validated and SMS OTP has been sent',
            'success'
          );
          if (response.data.otpRequired) {
            if(response.data.token){
              authService.setApiToken(response.data.token)
            }
            this.props.history.push({
              pathname: '/verificationCode/' + this.props.match.params.via,
              search: `?mobileNo=${this.state.mobileNo}&docHash=${this.state.docHash}`,
            });
          }
        } else {
          messagePopup('', 'Password is wrong', 'error');
        }
      }
    } catch (error) {
      this.setState({ loader: false });
      messagePopup('', 'Password verification failed', 'error');
    }
  };
  handleSubmitViaJEDId = (e) => {
    e.preventDefault();
    console.log('JED Id: ', this.state.jedtradeid);
    console.log('JED Pass: ', this.state.jedpassword);
  };
  render() {
    return (
      <div className='buyerSignMain'>
        <BackdropLoader open={this.state.loader} />
        <LoginImage />
        {this.state.show === true ? (
          <div className='signBuyerForm'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='142.75'
              height='142.75'
              viewBox='0 0 142.75 142.75'
            >
              <defs>
                <clipPath id='clip-path'>
                  <circle
                    id='Ellipse_99'
                    data-name='Ellipse 99'
                    cx='71.375'
                    cy='71.375'
                    r='71.375'
                    transform='translate(1368.25 163)'
                    fill='#ffcb21'
                  />
                </clipPath>
              </defs>
              <g
                id='Group_1091'
                data-name='Group 1091'
                transform='translate(-1368.25 -163)'
              >
                <circle
                  id='Ellipse_97'
                  data-name='Ellipse 97'
                  cx='71.375'
                  cy='71.375'
                  r='71.375'
                  transform='translate(1368.25 163)'
                  fill='#ffcb21'
                />
                <g
                  id='Mask_Group_3'
                  data-name='Mask Group 3'
                  clipPath='url(#clip-path)'
                >
                  <path
                    id='Path_438'
                    data-name='Path 438'
                    d='M262.248,201.195c0-2.79,3.924-7.809,3.924-7.809l-2.477-10.041c-.108.058-43.027-41.464-43.027-41.464-9.973,5.156-18.2,6.675-23.762,4.569a9.317,9.317,0,0,1-3.2-2.049c-2.592-2.52-8.1-9.9-8.1-9.9s-10.563,20.521-34.829,7.982l-2.52,10.041s3.906,5.022,3.906,7.813-.374,5.667-.4,8.471a78.765,78.765,0,0,0,1.379,16.4,48.594,48.594,0,0,0,7.129,17.825,27.066,27.066,0,0,0,4.256,4.882l42.76,40.413c3.521,3.363,7.791,5.883,12.014,8.421,1.015.608,2.045,1.192,3.1,1.724a58.562,58.562,0,0,1,6.5,3.806s2.859-1.7,6.628-3.9c2.837-1.656,5.339-3.021,7.885-4.723,3.175-2.121,6.39-4.248,8.864-7.2A37.669,37.669,0,0,0,258,236.909a51.854,51.854,0,0,0,1.951-5.429,68.535,68.535,0,0,0,2.653-16.8,101.721,101.721,0,0,0-.238-11.571C262.323,202.48,262.248,201.836,262.248,201.195Z'
                    transform='translate(1254.736 58.292)'
                    opacity='0.2'
                  />
                </g>
                <path
                  id='Path_439'
                  data-name='Path 439'
                  d='M222.915,153.572l-2.473-10.041c-24.266,12.554-34.8-7.391-34.8-7.391s-10.6,19.945-34.865,7.391l-2.52,10.041s3.906,5.022,3.906,7.813-.374,5.667-.4,8.471a78.764,78.764,0,0,0,1.379,16.4,48.594,48.594,0,0,0,7.129,17.825c3.852,5.724,9.7,9.191,15.481,12.676,1.048.63,2.106,1.257,3.2,1.8a58.47,58.47,0,0,1,6.693,3.906s2.859-1.707,6.628-3.906c2.837-1.656,5.339-3.021,7.888-4.724,3.172-2.117,6.39-4.248,8.864-7.2a37.781,37.781,0,0,0,5.721-9.544,51.844,51.844,0,0,0,1.955-5.426,68.4,68.4,0,0,0,2.65-16.8,101.772,101.772,0,0,0-.234-11.575c-.047-.637-.122-1.282-.122-1.923C218.994,158.595,222.915,153.572,222.915,153.572Z'
                  transform='translate(1254.736 57.243)'
                  fill='#304ffe'
                />
                <path
                  id='Path_440'
                  data-name='Path 440'
                  d='M222.915,153.572l-2.473-10.041c-24.266,12.554-34.8-7.391-34.8-7.391s-10.6,19.945-34.865,7.391l-2.52,10.041s3.906,5.022,3.906,7.813-.374,5.667-.4,8.471a78.764,78.764,0,0,0,1.379,16.4,48.594,48.594,0,0,0,7.129,17.825c3.852,5.724,9.7,9.191,15.481,12.676,1.048.63,2.106,1.257,3.2,1.8a58.47,58.47,0,0,1,6.693,3.906s2.859-1.707,6.628-3.906c2.837-1.656,5.339-3.021,7.888-4.724,3.172-2.117,6.39-4.248,8.864-7.2a37.781,37.781,0,0,0,5.721-9.544,51.844,51.844,0,0,0,1.955-5.426,68.4,68.4,0,0,0,2.65-16.8,101.772,101.772,0,0,0-.234-11.575c-.047-.637-.122-1.282-.122-1.923C218.994,158.595,222.915,153.572,222.915,153.572Z'
                  transform='translate(1254.736 57.243)'
                  fill='none'
                  stroke='#fff'
                  strokeMiterlimit='10'
                  strokeWidth='3'
                />
                <path
                  id='Path_441'
                  data-name='Path 441'
                  d='M185.7,142.546a25.536,25.536,0,0,0,19.693,9.173A33.843,33.843,0,0,0,218.3,149l1.174,4.778c-1.508,2.142-3.654,5.692-3.654,8.529,0,.6.047,1.17.09,1.671,0,.166.029.335.04.5a97.482,97.482,0,0,1,.23,11.208,65.47,65.47,0,0,1-2.52,16,49.084,49.084,0,0,1-1.829,5.087A34.624,34.624,0,0,1,206.6,205.5c-2.142,2.549-5.012,4.464-8.047,6.48l-.137.09c-1.851,1.235-3.726,2.315-5.714,3.46l-.094.054q-.936.536-1.912,1.105c-2.009,1.17-3.773,2.211-4.914,2.88-1.314-.821-3.154-1.9-5.328-2.988-.99-.493-1.973-1.08-2.977-1.681l-.256-.155c-5.57-3.348-10.83-6.513-14.225-11.557a45.458,45.458,0,0,1-6.639-16.644,75.9,75.9,0,0,1-1.292-15.7c.018-1.242.108-2.495.205-3.82.108-1.523.22-3.1.22-4.7,0-2.819-2.131-6.362-3.629-8.5l1.188-4.792a33.79,33.79,0,0,0,12.925,2.758h0a25.662,25.662,0,0,0,19.74-9.245m0-4.936-2.459,2.859a22.387,22.387,0,0,1-17.281,8.151,30.714,30.714,0,0,1-11.686-2.545l-3.471-1.44-.911,3.647-1.192,4.756-.36,1.44.846,1.213c1.908,2.725,3.046,5.206,3.046,6.642s-.108,3-.212,4.464c-.1,1.379-.191,2.675-.212,4.007a78.93,78.93,0,0,0,1.379,16.4,48.657,48.657,0,0,0,7.125,17.825c3.8,5.642,9.361,8.983,15.243,12.522l.259.158c1.058.634,2.1,1.253,3.2,1.8,2.16,1.08,3.935,2.135,5.058,2.837l1.671,1.044,1.7-1c1.112-.659,2.88-1.692,4.9-2.88l1.887-1.08.1-.061c2.038-1.17,3.96-2.275,5.9-3.575l.133-.086c3.24-2.16,6.29-4.2,8.731-7.1a37.894,37.894,0,0,0,5.724-9.544,51.734,51.734,0,0,0,1.951-5.429,68.6,68.6,0,0,0,2.65-16.8,101.375,101.375,0,0,0-.234-11.575c0-.169-.025-.36-.04-.511v-.025c-.04-.461-.079-.932-.079-1.4,0-1.44,1.145-3.935,3.064-6.66l.846-1.206-.36-1.44-1.174-4.774-.9-3.651-3.481,1.44a30.7,30.7,0,0,1-11.672,2.484,22.229,22.229,0,0,1-17.234-8.029l-2.455-2.859Z'
                  transform='translate(1254.672 56.302)'
                  fill='#fcfcfc'
                />
                <path
                  id='Path_442'
                  data-name='Path 442'
                  d='M240.521,220.118v-4.9a9.04,9.04,0,0,0-2.16-5.926,8.921,8.921,0,0,0-6.819-3.175,9.04,9.04,0,0,0-9.022,9.1v4.9H220v19.441h23.042V220.118Zm-7.4,9.829v4.32h-3.042v-4.32a2.6,2.6,0,0,1-1.008-2.074,2.571,2.571,0,0,1,2.574-2.542h.029a2.52,2.52,0,0,1,2.52,2.542A2.66,2.66,0,0,1,233.123,229.946Zm3.078-9.829H226.48v-5.364a4.874,4.874,0,1,1,9.721,0Z'
                  transform='translate(1208.824 12.457)'
                  fill='#fcfcfc'
                />
                <circle
                  id='Ellipse_98'
                  data-name='Ellipse 98'
                  cx='71.375'
                  cy='71.375'
                  r='71.375'
                  transform='translate(1368.25 163)'
                  fill='none'
                />
              </g>
            </svg>
            <h5>PLEASE ENTER JED CREDENTIALS</h5>

            <form noValidate onSubmit={this.handleSubmitViaJEDId}>
              <TextField
                value={this.state.jedtradeid}
                margin='normal'
                id='jedtradeid'
                name='jedtradeid'
                placeholder='Jed Id'
                onChange={this.handleChange}
              />

              <TextField
                className='loginPassword'
                margin='normal'
                id='jedpassword'
                name='jedpassword'
                placeholder='Password'
                type={this.state.showPassword ? 'text' : 'password'}
                value={this.state.jedpassword}
                onChange={this.handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={this.handleClickShowPassword}
                        onMouseDown={this.handleMouseDownPassword}
                      >
                        {this.state.showPassword ? (
                          <VisibilityOutlined />
                        ) : (
                          <VisibilityOffOutlined />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <span className='forgotpassLink'>
                <Link to='/forgotPassword' variant='body2'>
                  Forgot Password?
                </Link>
              </span>
              <Button
                variant='contained'
                color='primary'
                type='submit'
                className='signBtn'
              >
                CONFIRM
              </Button>
              <span>OR</span>
              <Button
                variant='contained'
                className='loginOptional'
                onClick={() => {
                  this.onLogin();
                }}
              >
                SIGN IN WITH EMAIL ADDRESS
              </Button>
            </form>

            {/* <span className='create'>
              Don't have an account?
              {
                <Link to='/createAccount' variant='body2'>
                  Create Account
                </Link>
              }
            </span> */}
          </div>
        ) : (
          <div className='signBuyerForm'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='142.75'
              height='142.75'
              viewBox='0 0 142.75 142.75'
            >
              <defs>
                <clipPath id='clip-path'>
                  <circle
                    id='Ellipse_99'
                    data-name='Ellipse 99'
                    cx='71.375'
                    cy='71.375'
                    r='71.375'
                    transform='translate(1368.25 163)'
                    fill='#ffcb21'
                  />
                </clipPath>
              </defs>
              <g
                id='Group_1091'
                data-name='Group 1091'
                transform='translate(-1368.25 -163)'
              >
                <circle
                  id='Ellipse_97'
                  data-name='Ellipse 97'
                  cx='71.375'
                  cy='71.375'
                  r='71.375'
                  transform='translate(1368.25 163)'
                  fill='#ffcb21'
                />
                <g
                  id='Mask_Group_3'
                  data-name='Mask Group 3'
                  clipPath='url(#clip-path)'
                >
                  <path
                    id='Path_438'
                    data-name='Path 438'
                    d='M262.248,201.195c0-2.79,3.924-7.809,3.924-7.809l-2.477-10.041c-.108.058-43.027-41.464-43.027-41.464-9.973,5.156-18.2,6.675-23.762,4.569a9.317,9.317,0,0,1-3.2-2.049c-2.592-2.52-8.1-9.9-8.1-9.9s-10.563,20.521-34.829,7.982l-2.52,10.041s3.906,5.022,3.906,7.813-.374,5.667-.4,8.471a78.765,78.765,0,0,0,1.379,16.4,48.594,48.594,0,0,0,7.129,17.825,27.066,27.066,0,0,0,4.256,4.882l42.76,40.413c3.521,3.363,7.791,5.883,12.014,8.421,1.015.608,2.045,1.192,3.1,1.724a58.562,58.562,0,0,1,6.5,3.806s2.859-1.7,6.628-3.9c2.837-1.656,5.339-3.021,7.885-4.723,3.175-2.121,6.39-4.248,8.864-7.2A37.669,37.669,0,0,0,258,236.909a51.854,51.854,0,0,0,1.951-5.429,68.535,68.535,0,0,0,2.653-16.8,101.721,101.721,0,0,0-.238-11.571C262.323,202.48,262.248,201.836,262.248,201.195Z'
                    transform='translate(1254.736 58.292)'
                    opacity='0.2'
                  />
                </g>
                <path
                  id='Path_439'
                  data-name='Path 439'
                  d='M222.915,153.572l-2.473-10.041c-24.266,12.554-34.8-7.391-34.8-7.391s-10.6,19.945-34.865,7.391l-2.52,10.041s3.906,5.022,3.906,7.813-.374,5.667-.4,8.471a78.764,78.764,0,0,0,1.379,16.4,48.594,48.594,0,0,0,7.129,17.825c3.852,5.724,9.7,9.191,15.481,12.676,1.048.63,2.106,1.257,3.2,1.8a58.47,58.47,0,0,1,6.693,3.906s2.859-1.707,6.628-3.906c2.837-1.656,5.339-3.021,7.888-4.724,3.172-2.117,6.39-4.248,8.864-7.2a37.781,37.781,0,0,0,5.721-9.544,51.844,51.844,0,0,0,1.955-5.426,68.4,68.4,0,0,0,2.65-16.8,101.772,101.772,0,0,0-.234-11.575c-.047-.637-.122-1.282-.122-1.923C218.994,158.595,222.915,153.572,222.915,153.572Z'
                  transform='translate(1254.736 57.243)'
                  fill='#304ffe'
                />
                <path
                  id='Path_440'
                  data-name='Path 440'
                  d='M222.915,153.572l-2.473-10.041c-24.266,12.554-34.8-7.391-34.8-7.391s-10.6,19.945-34.865,7.391l-2.52,10.041s3.906,5.022,3.906,7.813-.374,5.667-.4,8.471a78.764,78.764,0,0,0,1.379,16.4,48.594,48.594,0,0,0,7.129,17.825c3.852,5.724,9.7,9.191,15.481,12.676,1.048.63,2.106,1.257,3.2,1.8a58.47,58.47,0,0,1,6.693,3.906s2.859-1.707,6.628-3.906c2.837-1.656,5.339-3.021,7.888-4.724,3.172-2.117,6.39-4.248,8.864-7.2a37.781,37.781,0,0,0,5.721-9.544,51.844,51.844,0,0,0,1.955-5.426,68.4,68.4,0,0,0,2.65-16.8,101.772,101.772,0,0,0-.234-11.575c-.047-.637-.122-1.282-.122-1.923C218.994,158.595,222.915,153.572,222.915,153.572Z'
                  transform='translate(1254.736 57.243)'
                  fill='none'
                  stroke='#fff'
                  strokeMiterlimit='10'
                  strokeWidth='3'
                />
                <path
                  id='Path_441'
                  data-name='Path 441'
                  d='M185.7,142.546a25.536,25.536,0,0,0,19.693,9.173A33.843,33.843,0,0,0,218.3,149l1.174,4.778c-1.508,2.142-3.654,5.692-3.654,8.529,0,.6.047,1.17.09,1.671,0,.166.029.335.04.5a97.482,97.482,0,0,1,.23,11.208,65.47,65.47,0,0,1-2.52,16,49.084,49.084,0,0,1-1.829,5.087A34.624,34.624,0,0,1,206.6,205.5c-2.142,2.549-5.012,4.464-8.047,6.48l-.137.09c-1.851,1.235-3.726,2.315-5.714,3.46l-.094.054q-.936.536-1.912,1.105c-2.009,1.17-3.773,2.211-4.914,2.88-1.314-.821-3.154-1.9-5.328-2.988-.99-.493-1.973-1.08-2.977-1.681l-.256-.155c-5.57-3.348-10.83-6.513-14.225-11.557a45.458,45.458,0,0,1-6.639-16.644,75.9,75.9,0,0,1-1.292-15.7c.018-1.242.108-2.495.205-3.82.108-1.523.22-3.1.22-4.7,0-2.819-2.131-6.362-3.629-8.5l1.188-4.792a33.79,33.79,0,0,0,12.925,2.758h0a25.662,25.662,0,0,0,19.74-9.245m0-4.936-2.459,2.859a22.387,22.387,0,0,1-17.281,8.151,30.714,30.714,0,0,1-11.686-2.545l-3.471-1.44-.911,3.647-1.192,4.756-.36,1.44.846,1.213c1.908,2.725,3.046,5.206,3.046,6.642s-.108,3-.212,4.464c-.1,1.379-.191,2.675-.212,4.007a78.93,78.93,0,0,0,1.379,16.4,48.657,48.657,0,0,0,7.125,17.825c3.8,5.642,9.361,8.983,15.243,12.522l.259.158c1.058.634,2.1,1.253,3.2,1.8,2.16,1.08,3.935,2.135,5.058,2.837l1.671,1.044,1.7-1c1.112-.659,2.88-1.692,4.9-2.88l1.887-1.08.1-.061c2.038-1.17,3.96-2.275,5.9-3.575l.133-.086c3.24-2.16,6.29-4.2,8.731-7.1a37.894,37.894,0,0,0,5.724-9.544,51.734,51.734,0,0,0,1.951-5.429,68.6,68.6,0,0,0,2.65-16.8,101.375,101.375,0,0,0-.234-11.575c0-.169-.025-.36-.04-.511v-.025c-.04-.461-.079-.932-.079-1.4,0-1.44,1.145-3.935,3.064-6.66l.846-1.206-.36-1.44-1.174-4.774-.9-3.651-3.481,1.44a30.7,30.7,0,0,1-11.672,2.484,22.229,22.229,0,0,1-17.234-8.029l-2.455-2.859Z'
                  transform='translate(1254.672 56.302)'
                  fill='#fcfcfc'
                />
                <path
                  id='Path_442'
                  data-name='Path 442'
                  d='M240.521,220.118v-4.9a9.04,9.04,0,0,0-2.16-5.926,8.921,8.921,0,0,0-6.819-3.175,9.04,9.04,0,0,0-9.022,9.1v4.9H220v19.441h23.042V220.118Zm-7.4,9.829v4.32h-3.042v-4.32a2.6,2.6,0,0,1-1.008-2.074,2.571,2.571,0,0,1,2.574-2.542h.029a2.52,2.52,0,0,1,2.52,2.542A2.66,2.66,0,0,1,233.123,229.946Zm3.078-9.829H226.48v-5.364a4.874,4.874,0,1,1,9.721,0Z'
                  transform='translate(1208.824 12.457)'
                  fill='#fcfcfc'
                />
                <circle
                  id='Ellipse_98'
                  data-name='Ellipse 98'
                  cx='71.375'
                  cy='71.375'
                  r='71.375'
                  transform='translate(1368.25 163)'
                  fill='none'
                />
              </g>
            </svg>
            <h5>PLEASE ENTER CONSENTRADE PASSWORD</h5>
            <form noValidate onSubmit={this.handleSubmitViaPassword}>
              <TextField
                className='loginPassword'
                //   variant="outlined"
                margin='normal'
                id='password'
                name='password'
                placeholder='Password'
                type={this.state.showPassword ? 'text' : 'password'}
                value={this.state.password}
                onChange={this.handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={this.handleClickShowPassword}
                        onMouseDown={this.handleMouseDownPassword}
                      >
                        {this.state.showPassword ? (
                          <VisibilityOutlined />
                        ) : (
                          <VisibilityOffOutlined />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                helperText={
                  this.state.errors.password ? this.state.errors.password : ''
                }
              />
              <span className='forgotpassLink'>
                <Link to='' variant='body2'>
                  Forgot Password?
                </Link>
              </span>
              <Button
                variant='contained'
                color='primary'
                type='submit'
                className='signBtn'
              >
                CONFIRM
              </Button>
              <span>OR</span>
              <Button
                variant='contained'
                className='loginOptional'
                onClick={() => {
                  this.onJediD();
                }}
              >
                SIGN IN WITH JED ID
              </Button>
            </form>

            {/* <span className='create'>
              Don't have an account?
              {
                <Link to='/createAccount' variant='body2'>
                  Create Account
                </Link>
              }
            </span> */}
          </div>
        )}
      </div>
    );
  }
}

export default VerifyDoc;

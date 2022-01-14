import React, { Component } from 'react';
import {
  Button,
  TextField,
  InputAdornment,
  IconButton,
} from '@material-ui/core';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import './login.css';
import { VisibilityOutlined, VisibilityOffOutlined } from '@material-ui/icons';
import LoginImage from './LoginImage';
import { Link } from 'react-router-dom';
import { BackdropLoader } from '../services/loader';
import authService from '../services/authService';
import { messagePopup } from '../services/messagePopupService';
import Typography from '@material-ui/core/Typography';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      showPassword: false,
      show: false,
      loader: false,
      errors: { email: '', password: '' },
      isFinancier: false
    };
  }

  async componentDidMount(){
     if(this.props && this.props.location && this.props.location.state){
      const urlLink = this.props.location.state.urlLink;
      if(urlLink === 'verifyEmail'){   
        const emailEncode = this.props.location.state.emailEncode;
        try {
          this.setState({loader: true})
          const response = await authService.verifyEmail(emailEncode)
          console.log('Response : ',response);
          messagePopup('', 'Account activated successfully', 'success');
          this.setState({loader: false})
        } catch (error) {
          this.setState({loader: false})
          console.log('Error : ',error);
        }
      }
     }
     if(this.props && this.props.match && this.props.match.path !== '/login'){
       this.setState({isFinancier:true})
     }
  }

  handleChange = (e) => {
    if (e.target.id === 'email') {
      this.setState({ email: e.target.value });
    }

    if (e.target.id === 'password') {
      this.setState({ password: e.target.value });
    }
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

  handleLoginButtonClick = () => {
    const url = this.state.isFinancier ? '/login': '/loginFinancier'
    this.setState({isFinancier:!this.state.isFinancier})
    this.props.history.push(url)

  }

  onSubmit = async (e) => {
    e.preventDefault();
    if (this.validateForm(this.state.email, this.state.password)) {
      this.setState({ loader: true });
      try {
        const response = await authService.login(this.state);
        this.setState({ loader: false });
        if(this.state.isFinancier){
          if(response && response.data && response.data.role && response.data.role === "financier"){ 
            const url = this.props.location.state ? this.props.location.state.from : 'Certificate'
            this.props.history.push(url);
          } else {
            authService.logout()
            messagePopup('', 'Please enter valid username or password', 'error');
          }  
        } else {
          if(response && response.data && (!response.data.role || response.data.role === "administrator")){ 
            const url = this.props.location.state ? this.props.location.state.from : 'Certificate'
            this.props.history.push(url);
          }
          else if(response && response.data && (!response.data.role || response.data.role === "superUser")){ 
            const url = this.props.location.state ? this.props.location.state.from : 'Settings'
            this.props.history.push(url);
          }
          else if(response && response.data && (!response.data.role || response.data.role === "approver")){ 
            const url = this.props.location.state ? this.props.location.state.from : 'Certificate'
            this.props.history.push(url);
          }
          else {
            authService.logout()
            messagePopup('', 'Please enter valid username or password', 'error');
          }  
        } 
      } catch (ex) {
        this.setState({ loader: false });
        if (ex.response && ex.response.status === 401) {
          messagePopup('', 'Please enter valid username or password', 'error');
        }
      }
    }
  };

  render() {
    return (
      <div className='signMain'>
        <BackdropLoader open={this.state.loader} />
        <LoginImage {...this.props}/>
        {this.state.show === true ? (
          <div className='signForm'>
            <div className="logoPart">
              <span className="logo" onClick={() => {this.props.history.push('')}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="" viewBox="0 0 543 602">
                  <path id="Color_Fill_1" fill="#fff" data-name="Color Fill 1" className="cls-1" d="M234,3c26,1.872,65.051,54.05,82,71,47.63,47.634,108.52,91.129,135,159,35.527,91.06-20.658,214.785-93,231-19.873,4.454-67.266-43.775-60-64,4.9-13.636,23.266-17,34-25,26.076-19.432,48.022-67.265,31-111-11.838-30.416-37.736-49.74-59-71l-67-69L204,90c-5.745-10.2,6.515-69.353,13-78C221.005,6.659,227.542,6.079,234,3ZM189,136c20.278,0.184,63.659,38.3,56,60-4.988,14.133-23.119,17.579-34,26-23.163,17.927-46.131,59.292-33,103,8.9,29.638,28.838,45.839,48,65L340,506c12.146,18.2-13.834,81.284-30,85-18.6,4.276-26.419-11.419-34-19l-70-70c-36.353-36.356-83.242-70.923-105-121-32.593-75.013-8.672-177.162,41-217C156.607,152.285,171.376,145.567,189,136Z"></path>
                </svg>
              </span>
              <span className="logoText">HealthCert</span>
            </div>
            <h2>Login</h2>
            <h5>LOGIN WITH JED TRADE ID</h5>
            {/* <p id="description">
              <span>
                Lorem Ipsum dolor sit amet, consetetur sadIpscing elitr,
              </span>
              <span>sed diam nonumy eirmod tempor invidunt.</span>
            </p> */}

            <form noValidate onSubmit={this.onSubmit}>
              <TextField
                value={this.state.email}
                margin='normal'
                id='jedtradeid'
                name='jedtradeid'
                placeholder='Jed Trade Id'
                onChange={this.handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end' className='icon'>
                      <PersonOutlineIcon />
                    </InputAdornment>
                  ),
                }}
              />

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
                LOGIN
              </Button>
              <span>OR</span>
              <Button
                variant='contained'
                className='loginOptional'
                onClick={() => {
                  this.onLogin();
                }}
              >
                LOGIN WITH EMAIL ADDRESS
              </Button>
            </form>
            {/* {!this.state.isFinancier && (
              <Typography style={{marginTop:'30px',fontSize:'15px'}}>
                Don't have an account?{' '}
                <Link to='/createAccount' style={{textDecoration:'none'}}>
                  Create Account
                </Link>
              </Typography>
            )} */}
          </div>
        ) : (
          <div className='signForm'>
            <div className="logoPart" onClick={() => {this.props.history.push('')}}>
              <span className="logo">
                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="" viewBox="0 0 543 602">
                  <path id="Color_Fill_1" fill="#fff" data-name="Color Fill 1" className="cls-1" d="M234,3c26,1.872,65.051,54.05,82,71,47.63,47.634,108.52,91.129,135,159,35.527,91.06-20.658,214.785-93,231-19.873,4.454-67.266-43.775-60-64,4.9-13.636,23.266-17,34-25,26.076-19.432,48.022-67.265,31-111-11.838-30.416-37.736-49.74-59-71l-67-69L204,90c-5.745-10.2,6.515-69.353,13-78C221.005,6.659,227.542,6.079,234,3ZM189,136c20.278,0.184,63.659,38.3,56,60-4.988,14.133-23.119,17.579-34,26-23.163,17.927-46.131,59.292-33,103,8.9,29.638,28.838,45.839,48,65L340,506c12.146,18.2-13.834,81.284-30,85-18.6,4.276-26.419-11.419-34-19l-70-70c-36.353-36.356-83.242-70.923-105-121-32.593-75.013-8.672-177.162,41-217C156.607,152.285,171.376,145.567,189,136Z"></path>
                </svg>
              </span>
              <span className="logoText">HealthCert</span>
            </div>
            <h2>Login</h2>
            <h5>{this.state.isFinancier ? 'Financial Institute' : 'Welcome to HealthCert'}</h5>
            {/* {!this.state.isFinancier && (
              <p id="description">
                <span>
                  Lorem Ipsum dolor sit amet, consetetur sadIpscing elitr,
                </span>
                <span>sed diam nonumy eirmod tempor invidunt.</span>
              </p>
            )} */}

            <form noValidate onSubmit={this.onSubmit}>
              <TextField
                value={this.state.email}
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
                helperText={
                  this.state.errors.email ? this.state.errors.email : ''
                }
              />
              <TextField
                className='loginPassword'
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
                LOGIN
              </Button>
              <span>OR</span>
              <Button
                variant='contained'
                className='loginOptional'
                onClick={() => {
                  this.onJediD();
                }}
              >
                LOGIN WITH JED ID
              </Button>
            </form>
            {/* {!this.state.isFinancier && (
              <>
                <Typography style={{marginTop:'30px',fontSize:'15px'}}>
                   Don't have an account?{' '}
                   <Link to='/createAccount' style={{textDecoration:'none'}}>
                      Create Account
                   </Link>
                </Typography>
              </>
            )} */}
            {/* <Typography style={{fontSize:'15px', marginTop:'18px' }}>
                <Button onClick={this.handleLoginButtonClick} color="primary" style={{textTransform:'none'}}>
                   {!this.state.isFinancier ? 'Login as Financier' : 'Login as Enterprise'}
                </Button>
            </Typography> */}
      
          </div>
        )}
      </div>
    );
  }
}

export default Login;

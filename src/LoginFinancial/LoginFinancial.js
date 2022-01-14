import React, { Component } from 'react';
import {
  Button,
  TextField,
  InputAdornment,
  IconButton,
} from '@material-ui/core';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import './LoginFinancial.css';
import { VisibilityOutlined, VisibilityOffOutlined } from '@material-ui/icons';
import LoginImage from './LoginImage';
import { Link } from 'react-router-dom';
import { BackdropLoader } from '../services/loader';

class LoginFinancial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      showPassword: false,
      show: false,
      loader: false,
      errors: { email: '', password: '' },
    };
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

  onSubmit = async (e) => {
    e.preventDefault();
    if (this.validateForm(this.state.email, this.state.password)) {
      this.setState({ loader: true });
      localStorage.setItem('token', 'fdsffsddfs');
      this.props.history.push('dashboardFinancial');
    }
  };

  render() {
    return (
      <div className='signMain'>
        <BackdropLoader open={this.state.loader} />
        <LoginImage />
        {this.state.show === true ? (
          <div className='signForm'>
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
            <h2>Sign In</h2>
            <h5>SIGN IN WITH JED TRADE ID</h5>
            <p>
              <span>
                Lorem Ipsum dolor sit amet, consetetur sadIpscing elitr,
              </span>
              <span>sed diam nonumy eirmod tempor invidunt.</span>
            </p>

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
                SIGN IN
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

            {/* <span className='create'>
              Don't have an account?
              {
                <Link to='/createFinancierAccount' variant='body2'>
                  Create Account
                </Link>
              }
            </span> */}
          </div>
        ) : (
          <div className='signForm'>
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
            <h2>Sign In</h2>
            <h3>Financial Institute</h3>

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
                SIGN IN
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
            {/* <span className='create'>
              Don't have an account?
              {
                <Link to='/createFinancierAccount' variant='body2'>
                  Create Account
                </Link>
              }
            </span> */}
            <span className='create'>
              LOGIN ENTERPRISE:
              {
                <Link to='/login' variant='body2'>
                  Click Here
                </Link>
              }
            </span>
          </div>
        )}
      </div>
    );
  }
}

export default LoginFinancial;

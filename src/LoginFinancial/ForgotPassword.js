import React, { Component } from "react";
import {
  Button,
  TextField,
  // Link,
  InputAdornment
  // IconButton
} from "@material-ui/core";
import "./login.css";
import LoginImage from "./LoginImage";
// import { resetPassword } from "./LoginQueries";

// import swal from "sweetalert";

class ForgotPassword extends Component {
  constructor(props) {
    super(props);

    // const token = localStorage.getItem("token");
    // let loggedIn = true;
    // if (token == null) {
    //   loggedIn = false;
    // }

    this.state = {
      //   email: "",
      //   email1: "",
      //   password1: "",
      //   userData: undefined,
      //   id: undefined,
      //   password: undefined,
      //   loading: false,
      //   forgot: true
    };
  }

  //   handleChange = e => {
  //     this.setState({ email: e.target.value });
  //   };
  //   validateForm = email => {
  //     const validEmailRegex = RegExp(
  //       /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  //     );

  //     return validEmailRegex.test(email.trim()) ? true : false;
  //   };

  //   handleClickShowPassword = () => {
  //     this.setState({ showPassword: !this.state.showPassword });
  //   };

  //   onSubmit = e => {
  //     e.preventDefault();

  //     if (this.state.email === "") {
  //       swal({
  //         icon: "warning",
  //         title: "Please enter an Email-ID ",
  //         className: "loginSwal"
  //       });
  //     } else {
  //       if (this.validateForm(this.state.email)) {
  //         let options = {
  //           email: this.state.email
  //         };
  //         fetchMethod(resetPassword, {
  //           options
  //         })
  //           .then(res => res.json())
  //           .then(res => {
  //             this.setState({
  //               connectionError: ""
  //             });
  //             if (res.data.UserdataResetPassword === null) {
  //               swal({
  //                 icon: "warning",
  //                 title: "Email not found",
  //                 className: "loginSwal"
  //               });
  //             } else {
  //               swal({
  //                 icon: "warning",
  //                 title: res.data.UserdataResetPassword.message,
  //                 className: "loginSwal"
  //               });
  //             }
  //           })
  //           .catch(e => {
  //             this.setState({
  //               connectionError: e.toString().substring(11, e.length)
  //             });
  //           });
  //       } else {
  //         swal({
  //           icon: "warning",
  //           title: "Invalid Email-ID ",
  //           className: "loginSwal"
  //         });
  //       }
  //     }
  //   };

  onSignIn = () => {
    window.location = "/";
  };

  render() {
    // localStorage.setItem("email", this.state.email);
    return (
      <div className="signMain">
        <LoginImage />
        <div className="signForm forgotpasswordSection">
          
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
            <h2>Forgot Password</h2>

            <form noValidate onSubmit={this.onSubmit}>
              <TextField
                value={this.state.email}
                //   variant="outlined"
                margin="normal"
                id="email"
                name="email"
                placeholder="Email Address"
                onChange={this.handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">@</InputAdornment>
                  )
                }}
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className="signBtn"
              >
                CONTINUE
              </Button>
              <Button
                variant="contained"
                className="loginOptional"
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

export const profileConfig = {
  className: "ProfileConfig",
  fields: [
    {
      label: "Full Name",
      type: "input",
      name: "name",
      value: ""
    },
    // {
    //   label: "Email Address",
    //   type: "input",
    //   name: "email",
    //   value: ""
    // },
    {
      label: "Mobile Number",
      type: "input",
      name: "mobile",
      value: ""
    },
    {
      label: "Address1",
      type: "input",
      name: "address1",
      value: ""
    },
    {
      label: "Address2",
      type: "input",
      name: "address2",
      value: ""
    },
    {
      label: "Country",
      type: "input",
      name: "country",
      value: ""
    }
  ],
  validations: {
    name: e => {
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please enter user name"
        };
      }
      return {
        valid: true
      };
    },
    // email: e => {
    //   let re = new RegExp(
    //     /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    //   );
    //   if (e == "") {
    //     return {
    //       valid: false,
    //       errMsg: "Please enter email"
    //     };
    //   }
    //   if (re.test(e) === false) {
    //     return {
    //       valid: false,
    //       errMsg: "Please enter valid email "
    //     };
    //   }
    //   return {
    //     valid: true
    //   };
    // },
    mobile: e => {
      let re = new RegExp("^[0-9]*$");
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please enter mobile number"
        };
      }
      // if (re.test(e) === false) {
      //   return {
      //     valid: false,
      //     errMsg: "Mobile Number should be contain only numeric value."
      //   };
      // }
      return {
        valid: true
      };
    },
    address1: e => {
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please enter Address"
        };
      }
      return {
        valid: true
      };
    },
    country: e => {
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please enter country name"
        };
      }
      return {
        valid: true
      };
    }
  }  
};

export const changePasswordConfig = {
  className: "ChangePassword",
  fields: [
    {
      label: "Old Password",
      type: "password",
      name: "oldPassword",
      value: ""
    },
    {
      label: "New Password",
      type: "password",
      name: "newPassword",
      value: ""
    },
    {
      label: "Confirm Password",
      type: "password",
      name: "confirmPassword",
      value: ""
    }
  ],
  validations: {
    newPassword: e => {
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please enter password"
        };
      }
      if (e.length < 6) {
        return {
          valid: false,
          errMsg: "Password should be atleast 6 characters long"
        };
      }
      return {
        valid: true
      };
    }
  },
  dependentValidations: {
    confirmPassword: (val, data) => {
      if (val !== data.newPassword) {
        return {
          valid: false,
          errMsg: "Passwords do not match."
        };
      }
      return {
        valid: true
      };
    }
  }
};

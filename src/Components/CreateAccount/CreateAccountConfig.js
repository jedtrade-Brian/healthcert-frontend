import { Tooltip } from '@material-ui/core';
import React from "react";
export const addCompanyConfig = {
  className: "CreateAccount",
  fields: [
    {
      label: "Company Name",
      type: "input",
      name: "companyName",
      value: ""
    },
    {
      label: "Company UEN",
      type: "input",
      name: "uen",
      value: ""
    },
    {
      label: "Registered Address",
      type: "input",
      name: "address1",
      value: ""
    },
    {
      label: "Apartment, Building, Floor (Optional)",
      type: "input",
      name: "address2",
      value: ""
    },
    {
      label: "Country",
      type: "input",
      name: "country",
      value: ""
    },
    {
      label: "Postal Code",
      type: "input",
      name: "zipcode",
      value: ""
    },
    {
      label: "Company Domain Name (Eg. www.jedtrade.com)",
      type: "input",
      name: "domain",
      value: ""
    },
    {
      type: "icon",
      component: () => {
        return (
          <div>
            <Tooltip title="This is for establishing and verifying the company’s identity when documents are issued on the platform" arrow placement='top-start'>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                >
                  <g
                    id="Group_55"
                    data-name="Group 55"
                    transform="translate(-1661 -800)"
                  >
                    <g
                      id="Ellipse_44"
                      data-name="Ellipse 44"
                      transform="translate(1661 800)"
                      fill="#fff"
                      stroke="#304ffe"
                      strokeWidth="1.5"
                    >
                      <circle cx="15" cy="15" r="15" stroke="none" />
                      <circle cx="15" cy="15" r="14.25" fill="none" />
                    </g>
                    <path
                      id="Path_53"
                      data-name="Path 53"
                      d="M9.334-15.1l-.246.211a1.425,1.425,0,0,1-.527,1.055v.352l-.281.316-.141.492-.457.105a1.662,1.662,0,0,1-.352.879,2.807,2.807,0,0,0-.7.6l-.457.141-.316-.738q.035-.387.035-1.16a1.984,1.984,0,0,0,.246-1.617,3.607,3.607,0,0,1,.633-1.055L7.4-15.77l.141-.141a1.319,1.319,0,0,1,.6-.141H8.7a1.536,1.536,0,0,1,.633.527ZM7.611-2.637a1.782,1.782,0,0,1-.246.879l-.246.141-.141.246H6.838l-.246.281-.527.105a1.864,1.864,0,0,1-.229.352,1.864,1.864,0,0,0-.229.352L5.186.035,4.658.176,4.553.316,4.025.422,3.885.563,3.234.316A2.985,2.985,0,0,1,1.688.035V-.07a1.033,1.033,0,0,0-.246-.281L1.2-.457A2.277,2.277,0,0,1,.879-1.582L1.055-2A5.251,5.251,0,0,0,2-3.445q.439-.809.879-1.635a10.3,10.3,0,0,1,.6-1.934V-7.26L3.621-7.4v-.141h.158L4.061-8.1l-.035-.562-.141-.141a1.591,1.591,0,0,0-.9.387v.141a9.45,9.45,0,0,0-1.02.352l-.281.281A2.485,2.485,0,0,0,.949-7.4L.668-7.436.422-7.646l-.07-.281.07-.352a2.5,2.5,0,0,1,1.02-.562l1.125-.211q.229-.105.668-.316a6.416,6.416,0,0,1,2.584-.457,2.262,2.262,0,0,1,.264.053,2.262,2.262,0,0,0,.264.053,2.188,2.188,0,0,1,.492.773h.141A2.081,2.081,0,0,1,7.119-8q0,.07-.106.6a4.781,4.781,0,0,0-.565.633l-.388.141-.105.387h-.14l-.246.246a3.026,3.026,0,0,1-.14,1.16H5.324a2.038,2.038,0,0,1-.281.773l-.386.352A7.568,7.568,0,0,0,4.271-2.25H4.166a8.375,8.375,0,0,1-.176.914l.035.422a3.706,3.706,0,0,0,1.45-.571A2.518,2.518,0,0,0,6.592-2.5l.422-.246.316-.035Z"
                      transform="translate(1671.648 823.051)"
                      fill="#304ffe"
                    />
                  </g>
                </svg>
            </Tooltip>
          </div>
        );
      }
    }
  ],
  validations: {
    companyName: e => {
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please enter company name"
        };
      }

      return {
        valid: true
      };
    },
    uen: e => {
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please enter company UEN"
        };
      }
      if (e.length < 10 || e.length > 10) {
        return {
          valid: false,
          errMsg: "Company UEN should be 10 characters long"
        };
      }
      return {
        valid: true
      };
    },
    address1: e => {
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please enter registered address"
        };
      }
      return {
        valid: true
      };
    },
    // address2: e => {
    //   if (e == "") {
    //     return {
    //       valid: false,
    //       errMsg: "Please enter address"
    //     };
    //   }
    //   return {
    //     valid: true
    //   };
    // },
    country: e => {
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please enter country"
        };
      }
      return {
        valid: true
      };
    },
    zipcode: e => {
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please enter portal code"
        };
      }
      return {
        valid: true
      };
    },
    domain: e => {
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please enter domain"
        };
      }
      return {
        valid: true
      };
    }
  }
};

export const addAuthorizedConfig = {
  className: "CreatePersonalInformation",
  fields: [
    // {
    //   label: "Role",
    //   type: "staticSelect",
    //   name: "role",
    //   value: "",
    //   data: [
    //     { name: "Enterprise", id: "enterprise" },
    //     { name: "Financier", id: "financier" },
    //   ],
    //   className: 'userRole'
    // },
    {
      label: "Title",
      type: "staticSelect",
      name: "title",
      value: "",
      data: [
        { name: "Mr.", id: "Mr" },
        { name: "Ms", id: "Ms" },
        { name: "Mrs", id: "Mrs" },
        { name: "Dr", id: "Dr" }
      ],
      className: 'userTitle'
    },
    {
      label: "Full Name",
      type: "input",
      name: "name",
      value: ""
    },
    {
      label: "Designation",
      type: "input",
      name: "designation",
      value: ""
    },
    {
      label: "Email Address",
      type: "input",
      name: "email",
      value: ""
    },
    {
      label: "Code",
      type: "input",
      name: "code",
      value: "",
      className: 'mobileCode'
    },
    {
      label: "Mobile Number",
      type: "input",
      name: "mobileNo",
      value: "",
      className: 'mobileNumber'
    },
    {
      label: "Password",
      type: "password",
      name: "password",
      value: ""
    },
    {
      label: "Confirm Password",
      type: "password",
      name: "confirmPassword",
      value: ""
    },
    {
      // label: "The Terms and Condition governing the use of the CosenTrade.",
      isTermAndCondition: true,
      type: "checkbox",
      name: "checkboxData",
      labelHyperLink: true,
      value: false
    }
  ],
  validations: {
    title: e => {
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please select title"
        };
      }

      return {
        valid: true
      };
    },
    name: e => {
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please enter name"
        };
      }
      return {
        valid: true
      };
    },
    email: e => {
      let re = new RegExp(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please enter email"
        };
      }
      if (re.test(e) === false) {
        return {
          valid: false,
          errMsg: "Please enter valid email "
        };
      }
      return {
        valid: true
      };
    },
    mobileNo: e => {
      let re = new RegExp("^[0-9]*$");
      // let digit = new RegExp("^[0-9]{10}$");
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please enter mobile number"
        };
      }
      if (re.test(e) === false) {
        return {
          valid: false,
          errMsg: "Mobile Number should be contain only numeric value."
        };
      }
      // if (digit.test(e) === false) {
      //   return {
      //     valid: false,
      //     errMsg: "Mobile Number should be contain 10 digit."
      //   };
      // }
      return {
        valid: true
      };
    },
    password: e => {
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
      if (val !== data.password) {
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

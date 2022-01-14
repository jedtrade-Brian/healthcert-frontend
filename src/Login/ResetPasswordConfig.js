export const resetPwdConfig = {
  className: 'CreatePersonalInformation',
  fields: [
    {
      label: 'Password',
      type: 'password',
      name: 'password',
      value: '',
    },
    {
      label: 'Confirm Password',
      type: 'password',
      name: 'confirmPassword',
      value: '',
    },
  ],
  validations: {
    password: (e) => {
      if (e == '') {
        return {
          valid: false,
          errMsg: 'Please enter password',
        };
      }
      if (e.length < 6) {
        return {
          valid: false,
          errMsg: 'Password should be atleast 6 characters long',
        };
      }
      return {
        valid: true,
      };
    },
  },
  dependentValidations: {
    confirmPassword: (val, data) => {
      if (val !== data.password) {
        return {
          valid: false,
          errMsg: 'Passwords do not match.',
        };
      }
      return {
        valid: true,
      };
    },
  },
};

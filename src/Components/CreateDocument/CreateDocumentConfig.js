export const SalesQuotationConfigLeft = {
  className: "salesTemplateForm",
  fields: [
    {
      label: "Full Name",
      type: "input",
      name: "fullName",
      value: "",
      className: 'column12'
    },
    {
      label: "Email Address",
      type: "input",
      name: "emailAddress",
      value: "",
      className: 'column6'
    },
    {
      label: "Phone Number",
      type: "input",
      name: "phoneNumber",
      value: "",
      className: 'column6'
    },
    {
      label: "Company Name",
      type: "input",
      name: "companyName",
      value: "",
      className: 'column6' // column12
    },
    {
      label: "Street Address",
      type: "input",
      name: "streetAddress",
      value: "",
      className: 'column6'
    },
    {
      label: "City",
      type: "input",
      name: "city",
      value: "",
      className: 'column6'
    },
    {
      label: "State",
      type: "input",
      name: "state",
      value: "",
      className: 'column6'
    },
    // {
    //   label: "City",
    //   type: "staticSelect",
    //   name: "city",
    //   value: "",
    //   data: [
    //     { id: 'Noida', name: "Noida" },
    //     { id: 'Ghaziabad', name: "Ghaziabad" }
    //   ]
    // },
    // {
    //   label: "State",
    //   type: "staticSelect",
    //   name: "state",
    //   value: "",
    //   data: [
    //     { id: 'Delhi', name: "Delhi" },
    //     { id: 'UP', name: "UP" }
    //   ]
    // },
    {
      label: "Zip Code",
      type: "input",
      name: "zipCode",
      value: "",
      className: 'zipCode'
    },
    {
      label: "Validity Period",
      type: "datePicker",
      name: "validityPeriod",
      value: new Date(),
      className: 'docDate'
    },
    {
      label: "Quote Number",
      type: "input",
      name: "quoteNumber",
      value: "",
      className: 'column6'
    },
    {
      label: "Customer Id",
      type: "input",
      name: "customerId",
      value: "",
      className: 'column6'
    },
    {
      label: "Quote Date",
      type: "datePicker",
      name: "quoteDate",
      value: new Date(),
      className: 'docDate'
    },
    {
      label: "Currency",
      type: "staticSelect",
      name: "currency",
      value: "",
      data: [
        { name: "Dollar (USD)", id: "USD" },
        { name: "Euro (EUR)", id: "EUR" },
        { name: "Dollar (SGD)", id: "SGD" },
      ],
      className: 'column6'
    },
    {
      label: "Comments or Special Instructions",
      type: "input",
      name: "comments",
      value: "",
      className: 'fullWidthColumn12'
    }
  ],
  validations: {
    fullName: e => {
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
    emailAddress: e => {
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
    phoneNumber: e => {
      // let digit = new RegExp("^[0-9]{10}$");
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please enter mobile number"
        };
      }
      if (isNaN(e) !== false) {
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
    companyName: e => {
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please enter company"
        };
      }
      return {
        valid: true
      };
    },
    streetAddress: e => {
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please enter address"
        };
      }
      return {
        valid: true
      };
    },
    city: e => {
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please select city"
        };
      }
      return {
        valid: true
      };
    },
    state: e => {
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please select state"
        };
      }
      return {
        valid: true
      };
    },
    zipCode: e => {
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please enter zip code"
        };
      }
      if (isNaN(e) !== false) {
        return {
          valid: false,
          errMsg: "Zip Code should be contain only numeric value."
        };
      }
      return {
        valid: true
      };
    },
    validityPeriod: e => {
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please enter validity period"
        };
      }
      return {
        valid: true
      };
    },
    quoteNumber: e => {
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please enter quote number"
        };
      }
      // if (isNaN(e) !== false) {
      //   return {
      //     valid: false,
      //     errMsg: "Quote Number should be contain only numeric value."
      //   };
      // }
      return {
        valid: true
      };
    },
    currency: e => {
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please enter currency"
        };
      }
      return {
        valid: true
      };
    },
    comments: e => {
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please enter comments"
        };
      }
      return {
        valid: true
      };
    }
  }
};

export const DeliveryOrderConfigLeft = {
  className: "salesTemplateForm",
  fields: [
    {
      label: "Quote Number",
      type: "input",
      name: "quoteNumber",
      value: "",
      className: 'column12'
    },
    {
      label: "Full Name",
      type: "input",
      name: "fullName",
      value: "",
      className: 'column6'
    },
    {
      label: "Email Address",
      type: "input",
      name: "emailAddress",
      value: "",
      className: 'column6'
    },
    {
      label: "Phone Number",
      type: "input",
      name: "phoneNumber",
      value: "",
      className: 'column6'
    },
    {
      label: "Company Name",
      type: "input",
      name: "companyName",
      value: "",
      className: 'column6'
    },
    {
      label: "Street Address",
      type: "input",
      name: "streetAddress",
      value: "",
      className: 'column6'
    },
    {
      label: "City",
      type: "input",
      name: "city",
      value: "",
      className: 'column6'
    },
    {
      label: "State",
      type: "input",
      name: "state",
      value: "",
      className: 'column6'
    },
    {
      label: "Zip Code",
      type: "input",
      name: "zipCode",
      value: "",
      className: 'zipCode'
    },
    {
      label: "Note No",
      type: "input",
      name: "noteNo",
      value: "",
      className: 'column6'
    },
    {
      label: "IssueDate",
      type: "datePicker",
      name: "issueDate",
      value: new Date(),
      className: 'docDate'
    },
    {
      label: "Term",
      type: "input",
      name: "term",
      value: "",
      className: 'column6'
    },
    {
      label: "Attention",
      type: "input",
      name: "attention",
      value: "",
      className: 'fullWidthColumn12'
    },
    {
      label: "Explanation",
      type: "input",
      name: "explanation",
      value: "",
      className: 'column6'
    },
    {
      label: "Others",
      type: "input",
      name: "others",
      value: "",
      className: 'column6'
    },
    {
      label: "Certification No",
      type: "input",
      name: "certNo",
      value: "",
      className: 'column6'
    }
  ],
  validations: {
    quoteNumber: e => {
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please enter quote number"
        };
      }
      // if (isNaN(e) !== false) {
      //   return {
      //     valid: false,
      //     errMsg: "Quote Number should be contain only numeric value."
      //   };
      // }
      return {
        valid: true
      };
    },
    fullName: e => {
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
    emailAddress: e => {
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
    phoneNumber: e => {
      // let digit = new RegExp("^[0-9]{10}$");
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please enter mobile number"
        };
      }
      if (isNaN(e) !== false) {
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
    companyName: e => {
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please enter company"
        };
      }
      return {
        valid: true
      };
    },
    streetAddress: e => {
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please enter address"
        };
      }
      return {
        valid: true
      };
    },
    city: e => {
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please select city"
        };
      }
      return {
        valid: true
      };
    },
    state: e => {
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please select state"
        };
      }
      return {
        valid: true
      };
    },
    zipCode: e => {
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please enter zip code"
        };
      }
      if (isNaN(e) !== false) {
        return {
          valid: false,
          errMsg: "Zip Code should be contain only numeric value."
        };
      }
      return {
        valid: true
      };
    },
    noteNo: e => {
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please enter note number"
        };
      }
      if (isNaN(e) !== false) {
        return {
          valid: false,
          errMsg: "Note Number should be contain only numeric value."
        };
      }
      return {
        valid: true
      };
    },
    term: e => {
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please enter term"
        };
      }
      return {
        valid: true
      };
    },
    attention: e => {
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please enter attention"
        };
      }
      return {
        valid: true
      };
    },
    explanation: e => {
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please enter explanation"
        };
      }
      return {
        valid: true
      };
    },
    others: e => {
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please enter others"
        };
      }
      return {
        valid: true
      };
    },
    certNo: e => {
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please enter certification no"
        };
      }
      return {
        valid: true
      };
    }
  }
};

export const PaymentCertificateConfigLeft = {
  className: "salesTemplateForm",
  fields: [
    {
      label: "Quote Number",
      type: "input",
      name: "quoteNumber",
      value: "",
      className: 'column12'
    },
    {
      label: "Full Name",
      type: "input",
      name: "fullName",
      value: "",
      className: 'column6'
    },
    {
      label: "Email Address",
      type: "input",
      name: "emailAddress",
      value: "",
      className: 'column6'
    },
    {
      label: "Phone Number",
      type: "input",
      name: "phoneNumber",
      value: "",
      className: 'column6'
    },
    {
      label: "Company Name",
      type: "input",
      name: "companyName",
      value: "",
      className: 'column6'
    },
    {
      label: "Street Address",
      type: "input",
      name: "streetAddress",
      value: "",
      className: 'column6'
    },
    {
      label: "City",
      type: "input",
      name: "city",
      value: "",
      className: 'column6'
    },
    {
      label: "State",
      type: "input",
      name: "state",
      value: "",
      className: 'column6'
    },
    {
      label: "Zip Code",
      type: "input",
      name: "zipCode",
      value: "",
      className: 'zipCode'
    },
    {
      label: "Certification No",
      type: "input",
      name: "certNo",
      value: "",
      className: 'column6'
    },
    {
      label: "IssueDate",
      type: "datePicker",
      name: "issueDate",
      value: new Date(),
      className: 'docDate'
    },
    {
      label: "Claim No",
      type: "input",
      name: "claimNo",
      value: "",
      className: 'column6'
    },
    {
      label: "Claim Date",
      type: "datePicker",
      name: "claimDate",
      value: new Date(),
      className: 'docDate'
    },
    {
      label: "Currency",
      type: "staticSelect",
      name: "currency",
      value: "",
      data: [
        { name: "Dollar (USD)", id: "USD" },
        { name: "Euro (EUR)", id: "EUR" },
        { name: "Dollar (SGD)", id: "SGD" },
      ],
      className: 'column6'
    },
    {
      label: "Payment Term ( Days)",
      type: "input",
      name: "paymentTerm",
      value: "",
      className: 'column6'
    }
  ],
  validations: {
    quoteNumber: e => {
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please enter quote number"
        };
      }
      // if (isNaN(e) !== false) {
      //   return {
      //     valid: false,
      //     errMsg: "Quote Number should be contain only numeric value."
      //   };
      // }
      return {
        valid: true
      };
    },
    fullName: e => {
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
    emailAddress: e => {
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
    phoneNumber: e => {
      // let digit = new RegExp("^[0-9]{10}$");
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please enter mobile number"
        };
      }
      if (isNaN(e) !== false) {
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
    companyName: e => {
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please enter company"
        };
      }
      return {
        valid: true
      };
    },
    streetAddress: e => {
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please enter address"
        };
      }
      return {
        valid: true
      };
    },
    city: e => {
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please select city"
        };
      }
      return {
        valid: true
      };
    },
    state: e => {
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please select state"
        };
      }
      return {
        valid: true
      };
    },
    zipCode: e => {
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please enter zip code"
        };
      }
      if (isNaN(e) !== false) {
        return {
          valid: false,
          errMsg: "Zip Number should be contain only numeric value."
        };
      }
      return {
        valid: true
      };
    },
    certNo: e => {
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please enter certification number"
        };
      }
      // if (isNaN(e) !== false) {
      //   return {
      //     valid: false,
      //     errMsg: "Certification Number should be contain only numeric value."
      //   };
      // }
      return {
        valid: true
      };
    },
    currency: e => {
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please enter currency"
        };
      }
      return {
        valid: true
      };
    },
    paymentTerm: e => {
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please enter payment term ( Days)"
        };
      }
      return {
        valid: true
      };
    }
  }
};

export const InvoiceConfigLeft = {
  className: "salesTemplateForm",
  fields: [
    {
      label: "Quote Number",
      type: "input",
      name: "quoteNumber",
      value: "",
      className: 'column12'
    },
    {
      label: "Email Address",
      type: "input",
      name: "emailAddress",
      value: "",
      className: 'column6'
    },
    {
      label: "Phone Number",
      type: "input",
      name: "phoneNumber",
      value: "",
      className: 'column6'
    },
    {
      label: "Company Name",
      type: "input",
      name: "companyName",
      value: "",
      className: 'column6'
    },
    {
      label: "Street Address",
      type: "input",
      name: "streetAddress",
      value: "",
      className: 'column6'
    },
    {
      label: "City",
      type: "input",
      name: "city",
      value: "",
      className: 'column6'
    },
    {
      label: "State",
      type: "input",
      name: "state",
      value: "",
      className: 'column6'

    },
    {
      label: "Zip Code",
      type: "input",
      name: "zipCode",
      value: "",
      className: 'zipCode'
    },
    {
      label: "Date",
      type: "datePicker",
      name: "date",
      value: new Date(),
      className: 'docDate'
    },
    {
      label: "Invoice Number",
      type: "input",
      name: "invNo",
      value: "",
      className: 'column6'
    },
    {
      label: "Currency",
      type: "staticSelect",
      name: "currency",
      value: "",
      data: [
        { name: "Dollar (USD)", id: "USD" },
        { name: "Euro (EUR)", id: "EUR" },
        { name: "Dollar (SGD)", id: "SGD" },
      ],
      className: 'column6'
    },

    {
      label: "Terms (Days)",
      type: "input",
      name: "terms",
      value: "",
      className: 'column6'
    },
    {
      label: "GST ( %)",
      type: "input",
      name: "gst",
      value: "",
      className: 'column6'
    }
  ],
  validations: {
    quoteNumber: e => {
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please enter quote number"
        };
      }
      // if (isNaN(e) !== false) {
      //   return {
      //     valid: false,
      //     errMsg: "Quote Number should be contain only numeric value."
      //   };
      // }
      return {
        valid: true
      };
    },
    emailAddress: e => {
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
    phoneNumber: e => {
      // let digit = new RegExp("^[0-9]{10}$");
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please enter mobile number"
        };
      }
      if (isNaN(e) !== false) {
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
    companyName: e => {
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please enter company"
        };
      }
      return {
        valid: true
      };
    },
    streetAddress: e => {
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please enter address"
        };
      }
      return {
        valid: true
      };
    },
    city: e => {
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please select city"
        };
      }
      return {
        valid: true
      };
    },
    state: e => {
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please select state"
        };
      }
      return {
        valid: true
      };
    },
    zipCode: e => {
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please enter zip code"
        };
      }
      if (isNaN(e) !== false) {
        return {
          valid: false,
          errMsg: "Zip Number should be contain only numeric value."
        };
      }
      return {
        valid: true
      };
    },
    invNo: e => {
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please enter invoice number"
        };
      }
      return {
        valid: true
      };
    },
    currency: e => {
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please enter currency"
        };
      }
      return {
        valid: true
      };
    },
    terms: e => {
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please enter Terms (Days)"
        };
      }
      return {
        valid: true
      };
    },
    gst: e => {
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please enter GST ( %)"
        };
      }
      return {
        valid: true
      };
    }
  }
};

export const TVCertificateConfigLeft = {
  className: "TVCertificateForm",
  fields: [
    {
      label: "Student Name",
      type: "input",
      name: "studentName",
      value: "",
      className: ''
    },
    {
      label: "Student NRIC",
      type: "input",
      name: "studentNRIC",
      value: "",
      className: ''
    },
    {
      label: "Student Id",
      type: "input",
      name: "studentId",
      value: "",
      className: ''
    },
    {
      label: "Student Email",
      type: "input",
      name: "studentEmail",
      value: "",
      className: ''
    },
    {
      label: "Student Course",
      type: "input",
      name: "studentCourse",
      value: "",
      className: '' // column12
    },
    {
      label: "Transcript Id",
      type: "input",
      name: "transcriptId",
      value: "",
      className: ''
    },
    {
      label: "Merit",
      type: "input",
      name: "merit",
      value: "",
      className: ''
    },
    {
      label: "Certificate Description",
      type: "input",
      name: "certificateDescription",
      value: "",
      className: ''
    },
    {
      label: "Certificate Name",
      type: "input",
      name: "certificateName",
      value: "",
      className: ''
    },
    {
      label: "Certificate Issued Date",
      type: "datePicker",
      name: "issuedOn",
      value: new Date(),
      className: ''//docdate
    },
    {
      label: "Student Admission Date",
      type: "datePicker",
      name: "admissionDate",
      value: new Date(),
      className: ''//docdate
    },
    {
      label: "Student Graduation Date",
      type: "datePicker",
      name: "graduationDate",
      value: new Date(),
      className: ''//docdate
    },
    // {
    //   label: "Grade",
    //   type: "staticSelect",
    //   name: "grade",
    //   value: "",
    //   data: [
    //     { name: "A", id: "A" },
    //     { name: "B", id: "B" },
    //     { name: "C", id: "C" },
    //     { name: "D", id: "D" },
    //     { name: "E", id: "E" },
    //     { name: "F", id: "F" },
    //     { name: "G", id: "G" },
    //   ],
    //   className: 'column6'
    // },
    // {
    //   label: "Course Credit",
    //   type: "input",
    //   name: "courseCredit",
    //   value: "",
    //   className: ''
    // },
    // {
    //   label: "Course Code",
    //   type: "input",
    //   name: "courseCode",
    //   value: "",
    //   className: ''
    // },
    // {
    //   label: "City",
    //   type: "staticSelect",
    //   name: "city",
    //   value: "",
    //   data: [
    //     { id: 'Noida', name: "Noida" },
    //     { id: 'Ghaziabad', name: "Ghaziabad" }
    //   ]
    // },
    // {
    //   label: "State",
    //   type: "staticSelect",
    //   name: "state",
    //   value: "",
    //   data: [
    //     { id: 'Delhi', name: "Delhi" },
    //     { id: 'UP', name: "UP" }
    //   ]
    // },
    // {
    //   label: "",
    //   type: "input",
    //   name: "zipCode",
    //   value: "",
    //   className: 'zipCode'
    // },
    // {
    //   label: "Examination Date",
    //   type: "datePicker",
    //   name: "examinationDate",
    //   value: new Date(),
    //   className: ''//docdate
    // },

    // {
    //   label: "Quote Date",
    //   type: "datePicker",
    //   name: "quoteDate",
    //   value: new Date(),
    //   className: 'docDate'
    // },
    // {
    //   label: "Currency",
    //   type: "staticSelect",
    //   name: "currency",
    //   value: "",
    //   data: [
    //     { name: "Dollar (USD)", id: "USD" },
    //     { name: "Euro (EUR)", id: "EUR" },
    //     { name: "Dollar (SGD)", id: "SGD" },
    //   ],
    //   className: 'column6'
    // },
    // {
    //   label: "Comments or Special Instructions",
    //   type: "input",
    //   name: "comments",
    //   value: "",
    //   className: 'fullWidthColumn12'
    // }
  ],

  


  
  validations: {
    studentName: e => {
      if (e === "") {
        return {
          valid: false,
          errMsg: "Please enter name"
        };
      }
      return {
        valid: true
      };
    },
    studentNRIC: e => {
      if (e === "") {
        return {
          valid: false,
          errMsg: "Please enter NRIC"
        };
      }
      return {
        valid: true
      };
    },
    studentId: e => {
      if (e === "") {
        return {
          valid: false,
          errMsg: "Please enter student Id"
        };
      }
      return {
        valid: true
      };
    },
    studentEmail: e => {
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
    studentCourse: e => {
      if (e === "") {
        return {
          valid: false,
          errMsg: "Please enter Course"
        };
      }
      return {
        valid: true
      };
    },
    transcriptId: e => {
      if (e === "") {
        return {
          valid: false,
          errMsg: "Please enter Transcript Id"
        };
      }
      return {
        valid: true
      };
    },
    merit: e => {
      if (e === "") {
        return {
          valid: false,
          errMsg: "Please enter Merit."
        };
      }
      return {
        valid: true
      };
    },
    certificateDescription: e => {
      if (e === "") {
        return {
          valid: false,
          errMsg: "Please enter Certificate Description."
        };
      }
      return {
        valid: true
      };
    },
    certificateName: e => {
      if (e === "") {
        return {
          valid: false,
          errMsg: "Please enter Certificate Name."
        };
      }
      return {
        valid: true
      };
    },
    admissionDate: e => {
      if (e === "") {
        return {
          valid: false,
          errMsg: "Please enter Student Admission Date."
        };
      }
      return {
        valid: true
      };
    },
    issuedOn: e => {
      if (e === "") {
        return {
          valid: false,
          errMsg: "Please enter Certificate Issued Date."
        };
      }
      return {
        valid: true
      };
    },
    graduationDate: e => {
      if (e === "") {
        return {
          valid: false,
          errMsg: "Please enter Student Graduation Date."
        };
      }
      return {
        valid: true
      };
    },



    
    // emailAddress: e => {
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
    // phoneNumber: e => {
    //   // let digit = new RegExp("^[0-9]{10}$");
    //   if (e == "") {
    //     return {
    //       valid: false,
    //       errMsg: "Please enter mobile number"
    //     };
    //   }
    //   if (isNaN(e) !== false) {
    //     return {
    //       valid: false,
    //       errMsg: "Mobile Number should be contain only numeric value."
    //     };
    //   }
    //   // if (digit.test(e) === false) {
    //   //   return {
    //   //     valid: false,
    //   //     errMsg: "Mobile Number should be contain 10 digit."
    //   //   };
    //   // }
    //   return {
    //     valid: true
    //   };
    // },
    // companyName: e => {
    //   if (e == "") {
    //     return {
    //       valid: false,
    //       errMsg: "Please enter company"
    //     };
    //   }
    //   return {
    //     valid: true
    //   };
    // },
    // streetAddress: e => {
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
    // city: e => {
    //   if (e == "") {
    //     return {
    //       valid: false,
    //       errMsg: "Please select city"
    //     };
    //   }
    //   return {
    //     valid: true
    //   };
    // },
    // state: e => {
    //   if (e == "") {
    //     return {
    //       valid: false,
    //       errMsg: "Please select state"
    //     };
    //   }
    //   return {
    //     valid: true
    //   };
    // },
    // zipCode: e => {
    //   if (e == "") {
    //     return {
    //       valid: false,
    //       errMsg: "Please enter zip code"
    //     };
    //   }
    //   if (isNaN(e) !== false) {
    //     return {
    //       valid: false,
    //       errMsg: "Zip Code should be contain only numeric value."
    //     };
    //   }
    //   return {
    //     valid: true
    //   };
    // },
    // validityPeriod: e => {
    //   if (e == "") {
    //     return {
    //       valid: false,
    //       errMsg: "Please enter validity period"
    //     };
    //   }
    //   return {
    //     valid: true
    //   };
    // },
    // quoteNumber: e => {
    //   if (e == "") {
    //     return {
    //       valid: false,
    //       errMsg: "Please enter quote number"
    //     };
    //   }
    //   // if (isNaN(e) !== false) {
    //   //   return {
    //   //     valid: false,
    //   //     errMsg: "Quote Number should be contain only numeric value."
    //   //   };
    //   // }
    //   return {
    //     valid: true
    //   };
    // },
    // currency: e => {
    //   if (e == "") {
    //     return {
    //       valid: false,
    //       errMsg: "Please enter currency"
    //     };
    //   }
    //   return {
    //     valid: true
    //   };
    // },
    // comments: e => {
    //   if (e == "") {
    //     return {
    //       valid: false,
    //       errMsg: "Please enter comments"
    //     };
    //   }
    //   return {
    //     valid: true
    //   };
    // }
  }
};


export const TVCertificateConfigRight = {
  className: "TVCertificateForm",
  fields: [
    {
      label: "Transcript Id",
      type: "input",
      name: "transcriptId",
      value: "",
      className: ''
    },
    {
      label: "Patient Id",
      type: "input",
      name: "patientId",
      value: "",
      className: ''
    },
    {
      label: "Patient NRIC",
      type: "input",
      name: "patientNRIC",
      value: "",
      className: ''
    },
    {
      label: "Patient Email",
      type: "input",
      name: "patientEmail",
      value: "",
      className: ''
    },
    {
      label: "Patient First Name",
      type: "input",
      name: "patientFirstName",
      value: "",
      className: ''
    },
    {
      label: "Patient Last Name",
      type: "input",
      name: "patientLastName",
      value: "",
      className: ''
    },
    {
      label: "Gender",
      type: "input",
      name: "gender",
      value: "",
      className: ''
    },
    {
      label: "Patient PPN",
      type: "input",
      name: "patientPPN",
      value: "",
      className: ''
    },
    {
      label: "Nationally",
      type: "input",
      name: "nationally",
      value: "",
      className: ''
    },
    {
      label: "Test Kit Code",
      type: "input",
      name: "patientTKC",
      value: "",
      className: ''
    },
    {
      label: "Test Kit Name",
      type: "input",
      name: "patientTKN",
      value: "",
      className: ''
    },
    {
      label: "Collected Date",
      type: "datePicker",
      name: "collectedDate",
      value: new Date(),
      className: ''//docdate
    },
    {
      label: "Effective Date",
      type: "datePicker",
      name: "effectiveDate",
      value: new Date(),
      className: ''//docdate
    },
    {
      label: "Result Code",
      type: "input",
      name: "resultCode",
      value: "",
      className: ''
    },
    {
      label: "Result",
      type: "input",
      name: "result",
      value: "",
      className: ''
    },
    {
      label: "Performer",
      type: "input",
      name: "performer",
      value: "",
      className: ''
    },
    {
      label: "Identifier",
      type: "input",
      name: "identifier",
      value: "",
      className: ''
    },
    {
      label: "Clinic Name",
      type: "input",
      name: "clinicName",
      value: "",
      className: ''
    },
    {
      label: "Office Add",
      type: "input",
      name: "officeAdd",
      value: "",
      className: ''
    },
    {
      label: "Office No",
      type: "input",
      name: "officeNo",
      value: "",
      className: ''
    },
    {
      label: "Website Add",
      type: "input",
      name: "wedAdd",
      value: "",
      className: ''
    },
    {
      label: "Lab Name",
      type: "input",
      name: "labName",
      value: "",
      className: ''
    },
    {
      label: "Lab Add",
      type: "input",
      name: "labAdd",
      value: "",
      className: ''
    },
    {
      label: "Lab No",
      type: "input",
      name: "labNo",
      value: "",
      className: ''
    }
    
    // {
    //   label: "Grade",
    //   type: "staticSelect",
    //   name: "grade",
    //   value: "",
    //   data: [
    //     { name: "A", id: "A" },
    //     { name: "B", id: "B" },
    //     { name: "C", id: "C" },
    //     { name: "D", id: "D" },
    //     { name: "E", id: "E" },
    //     { name: "F", id: "F" },
    //     { name: "G", id: "G" },
    //   ],
    //   className: 'column6'
    // },
    // {
    //   label: "Course Credit",
    //   type: "input",
    //   name: "courseCredit",
    //   value: "",
    //   className: ''
    // },
    // {
    //   label: "Course Code",
    //   type: "input",
    //   name: "courseCode",
    //   value: "",
    //   className: ''
    // },
    // {
    //   label: "City",
    //   type: "staticSelect",
    //   name: "city",
    //   value: "",
    //   data: [
    //     { id: 'Noida', name: "Noida" },
    //     { id: 'Ghaziabad', name: "Ghaziabad" }
    //   ]
    // },
    // {
    //   label: "State",
    //   type: "staticSelect",
    //   name: "state",
    //   value: "",
    //   data: [
    //     { id: 'Delhi', name: "Delhi" },
    //     { id: 'UP', name: "UP" }
    //   ]
    // },
    // {
    //   label: "",
    //   type: "input",
    //   name: "zipCode",
    //   value: "",
    //   className: 'zipCode'
    // },
    // {
    //   label: "Examination Date",
    //   type: "datePicker",
    //   name: "examinationDate",
    //   value: new Date(),
    //   className: ''//docdate
    // },

    // {
    //   label: "Quote Date",
    //   type: "datePicker",
    //   name: "quoteDate",
    //   value: new Date(),
    //   className: 'docDate'
    // },
    // {
    //   label: "Currency",
    //   type: "staticSelect",
    //   name: "currency",
    //   value: "",
    //   data: [
    //     { name: "Dollar (USD)", id: "USD" },
    //     { name: "Euro (EUR)", id: "EUR" },
    //     { name: "Dollar (SGD)", id: "SGD" },
    //   ],
    //   className: 'column6'
    // },
    // {
    //   label: "Comments or Special Instructions",
    //   type: "input",
    //   name: "comments",
    //   value: "",
    //   className: 'fullWidthColumn12'
    // }
  ],

  
  

  
  validations: {
    transcriptId: e => {
      if (e === "") {
        return {
          valid: false,
          errMsg: "Please enter Transcript Id"
        };
      }
      return {
        valid: true
      };
    },
    patientId: e => {
      if (e === "") {
        return {
          valid: false,
          errMsg: "Please enter student Id"
        };
      }
      return {
        valid: true
      };
    },
    patientNRIC: e => {
      if (e === "") {
        return {
          valid: false,
          errMsg: "Please enter NRIC"
        };
      }
      return {
        valid: true
      };
    },
    patientEmail: e => {
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
    patientName: e => {
      if (e === "") {
        return {
          valid: false,
          errMsg: "Please enter name"
        };
      }
      return {
        valid: true
      };
    },
    gender: e => {
      if (e === "") {
        return {
          valid: false,
          errMsg: "Please enter Course"
        };
      }
      return {
        valid: true
      };
    },
   
    patientPPN: e => {
      if (e === "") {
        return {
          valid: false,
          errMsg: "Please enter Merit."
        };
      }
      return {
        valid: true
      };
    },
    nationally: e => {
      if (e === "") {
        return {
          valid: false,
          errMsg: "Please enter Certificate Description."
        };
      }
      return {
        valid: true
      };
    },
    dob: e => {
      if (e === "") {
        return {
          valid: false,
          errMsg: "Please enter Certificate Name."
        };
      }
      return {
        valid: true
      };
    },
    patientTKC: e => {
      if (e === "") {
        return {
          valid: false,
          errMsg: "Please enter Student Admission Date."
        };
      }
      return {
        valid: true
      };
    },
    patientTKN: e => {
      if (e === "") {
        return {
          valid: false,
          errMsg: "Please enter Certificate Issued Date."
        };
      }
      return {
        valid: true
      };
    },
    collectedDate: e => {
      if (e === "") {
        return {
          valid: false,
          errMsg: "Please enter Student Graduation Date."
        };
      }
      return {
        valid: true
      };
    },
    effectiveDate: e => {
      if (e === "") {
        return {
          valid: false,
          errMsg: "Please enter Student Graduation Date."
        };
      }
      return {
        valid: true
      };
    },
    resultCode: e => {
      if (e === "") {
        return {
          valid: false,
          errMsg: "Please enter Student Graduation Date."
        };
      }
      return {
        valid: true
      };
    },
    result: e => {
      if (e === "") {
        return {
          valid: false,
          errMsg: "Please enter Student Graduation Date."
        };
      }
      return {
        valid: true
      };
    },
    performer: e => {
      if (e === "") {
        return {
          valid: false,
          errMsg: "Please enter Student Graduation Date."
        };
      }
      return {
        valid: true
      };
    },
    identifier: e => {
      if (e === "") {
        return {
          valid: false,
          errMsg: "Please enter Student Graduation Date."
        };
      }
      return {
        valid: true
      };
    },
    clinicName: e => {
      if (e === "") {
        return {
          valid: false,
          errMsg: "Please enter Student Graduation Date."
        };
      }
      return {
        valid: true
      };
    },
    officeAdd: e => {
      if (e === "") {
        return {
          valid: false,
          errMsg: "Please enter Student Graduation Date."
        };
      }
      return {
        valid: true
      };
    },
    officeNo: e => {
      if (e === "") {
        return {
          valid: false,
          errMsg: "Please enter Student Graduation Date."
        };
      }
      return {
        valid: true
      };
    },
    webAdd: e => {
      if (e === "") {
        return {
          valid: false,
          errMsg: "Please enter Student Graduation Date."
        };
      }
      return {
        valid: true
      };
    },
    labName: e => {
      if (e === "") {
        return {
          valid: false,
          errMsg: "Please enter Student Graduation Date."
        };
      }
      return {
        valid: true
      };
    },
    labAdd: e => {
      if (e === "") {
        return {
          valid: false,
          errMsg: "Please enter Student Graduation Date."
        };
      }
      return {
        valid: true
      };
    },
    labNo: e => {
      if (e === "") {
        return {
          valid: false,
          errMsg: "Please enter Student Graduation Date."
        };
      }
      return {
        valid: true
      };
    },
   




    
    // emailAddress: e => {
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
    // phoneNumber: e => {
    //   // let digit = new RegExp("^[0-9]{10}$");
    //   if (e == "") {
    //     return {
    //       valid: false,
    //       errMsg: "Please enter mobile number"
    //     };
    //   }
    //   if (isNaN(e) !== false) {
    //     return {
    //       valid: false,
    //       errMsg: "Mobile Number should be contain only numeric value."
    //     };
    //   }
    //   // if (digit.test(e) === false) {
    //   //   return {
    //   //     valid: false,
    //   //     errMsg: "Mobile Number should be contain 10 digit."
    //   //   };
    //   // }
    //   return {
    //     valid: true
    //   };
    // },
    // companyName: e => {
    //   if (e == "") {
    //     return {
    //       valid: false,
    //       errMsg: "Please enter company"
    //     };
    //   }
    //   return {
    //     valid: true
    //   };
    // },
    // streetAddress: e => {
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
    // city: e => {
    //   if (e == "") {
    //     return {
    //       valid: false,
    //       errMsg: "Please select city"
    //     };
    //   }
    //   return {
    //     valid: true
    //   };
    // },
    // state: e => {
    //   if (e == "") {
    //     return {
    //       valid: false,
    //       errMsg: "Please select state"
    //     };
    //   }
    //   return {
    //     valid: true
    //   };
    // },
    // zipCode: e => {
    //   if (e == "") {
    //     return {
    //       valid: false,
    //       errMsg: "Please enter zip code"
    //     };
    //   }
    //   if (isNaN(e) !== false) {
    //     return {
    //       valid: false,
    //       errMsg: "Zip Code should be contain only numeric value."
    //     };
    //   }
    //   return {
    //     valid: true
    //   };
    // },
    // validityPeriod: e => {
    //   if (e == "") {
    //     return {
    //       valid: false,
    //       errMsg: "Please enter validity period"
    //     };
    //   }
    //   return {
    //     valid: true
    //   };
    // },
    // quoteNumber: e => {
    //   if (e == "") {
    //     return {
    //       valid: false,
    //       errMsg: "Please enter quote number"
    //     };
    //   }
    //   // if (isNaN(e) !== false) {
    //   //   return {
    //   //     valid: false,
    //   //     errMsg: "Quote Number should be contain only numeric value."
    //   //   };
    //   // }
    //   return {
    //     valid: true
    //   };
    // },
    // currency: e => {
    //   if (e == "") {
    //     return {
    //       valid: false,
    //       errMsg: "Please enter currency"
    //     };
    //   }
    //   return {
    //     valid: true
    //   };
    // },
    // comments: e => {
    //   if (e == "") {
    //     return {
    //       valid: false,
    //       errMsg: "Please enter comments"
    //     };
    //   }
    //   return {
    //     valid: true
    //   };
    // }
  }
};


export const None = {};



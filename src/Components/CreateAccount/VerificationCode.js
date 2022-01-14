import React, { Component } from 'react';
import LoginImage from '../../Login/LoginImage.js';
import { TextField, IconButton, Dialog, Button } from '@material-ui/core';
import createAcountService from '../../services/createAcountService';
import { messagePopup } from '../../services/messagePopupService';
import { BackdropLoader } from '../../services/loader';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { withStyles } from '@material-ui/core/styles';
import MuiDialogActions from '@material-ui/core/DialogActions';
import ApprovedFinancialTemplate from '../InvoicesFinancial/ApprovedFinancialTemplate.js';
import AcknowledgedFinancialTemplate from '../InvoicesFinancial/AcknowledgedFinancialTemplate.js';
import signDocService from '../../services/signDocument';
import ViewDocument from '../ApproveCertificate/ViewDocument';
import { formatDate, formatTime } from '../Shared/dateTimeFormat';
import './CreateAccount.css';
import { verifyNoaOTP } from '../../services/financierService.jsx';
import {unixTimestampToDate,getTimeFromUnixTimestamp} from '../Shared/dateTimeFormat'
import ProgressStepper from '../Shared/ProgressStepper.js';
import authService from '../../services/authService';


const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      {onClose ? (
        <IconButton
          aria-label='close'
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
      <Typography variant='h6'>{children}</Typography>
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogButton = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

class VerificationCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileNo: '',
      email: '',
      apiToken: '',
      signature: '',
      certificate: null,
      docHash: null,
      loader: true,
      openModal: false,
      activeStep: 2,
      data: {
        otp1: '',
        otp2: '',
        otp3: '',
        otp4: '',
        otp5: '',
        otp6: '',
      },
      errors: {
        otp1: false,
        otp2: false,
        otp3: false,
        otp4: false,
        otp5: false,
        otp6: false,
      },
      focus: {
        otp1: React.createRef(),
        otp2: React.createRef(),
        otp3: React.createRef(),
        otp4: React.createRef(),
        otp5: React.createRef(),
        otp6: React.createRef(),
      },
      openFinancialApproveModal: false,
      openFinancialAcknowledgedModal: false,
      viewDoc: false,
      disableVerify: false,
      noaDocumentData: null,
      noaResponse: null,
    };
  }

  getParameterByName(name, url) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2])//.replace(/\+/g, ' '));
  }

  componentDidMount() {
    this.state.focus.otp1.current.focus();
    const serachStr = this.props.location.search;
    // const mobileNo = new URLSearchParams(this.props.location.search).get(
    //   'mobileNo'
    // );
    const mobileNo = this.getParameterByName('mobileNo', serachStr)
    const email = new URLSearchParams(serachStr).get('email');
    const apiToken = authService.getApiToken() ? authService.getApiToken() : null
    const signature = this.props.location.state.signature
    if (email) {
      this.setState({ email });
    }
    if (mobileNo) {
      this.setState({ mobileNo });
    }
    if (apiToken && signature) {
      this.setState({ apiToken, signature });
    }
    const docHash = new URLSearchParams(serachStr).get(
      'docHash'
    );
    if (docHash && this.props.match.params.via === 'approver') {
      signDocService
        .getDocHash(docHash)
        .then((response) => {
          if (response && response.data) {
            this.setState({ loader: false, certificate: response.data.document, docHash: docHash });
            console.log("Verification Code", response.data)
          }
        })
        .catch((error) => {
          console.log('Error : ', error);
          this.setState({ loader: false });
        });
    }
  }

  validateOnSubmit() {
    const errorsArr = [];
    for (const key in this.state.data) {
      if (this.state.data.hasOwnProperty(key)) {
        if (this.validateTextField(this.state.data[key])) {
          errorsArr.push(key);
        }
      }
    }
    if (errorsArr.length) {
      const errors = { ...this.state.errors };
      for (const key of errorsArr) {
        errors[key] = true;
      }
      this.setState({ errors });
      return true;
    }
    return false;
  }

  validateTextField = (data) => {
    if (!data || data === '') {
      return true;
    }
    return false;
  };

  handleChange = (e) => {
    const inputArr = ['otp1', 'otp2', 'otp3', 'otp4', 'otp5', 'otp6'];
    const errors = { ...this.state.errors };
    const data = { ...this.state.data };
    data[e.target.name] = e.target.value;
    this.setState({ data });
    if (this.validateTextField(e.target.value)) {
      errors[e.target.name] = true;
      this.setState({ errors });
    } else {
      errors[e.target.name] = false;
      this.setState({ errors });
      if (inputArr.indexOf(e.target.name) < 5) {
        const nextInput = inputArr[inputArr.indexOf(e.target.name) + 1];
        const focus = { ...this.state.focus };
        focus[nextInput].current.focus();
      }
    }
  };
  validateNumber = (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
  };

  handleResend = () => {
    this.setState({ loader: true });
    createAcountService
      .resendMobileOTP(this.state.mobileNo) //.then(resp=>resp.json())
      .then((mobileResp) => {
        this.setState({ loader: false,disableVerify: false });
        messagePopup(
          '',
          'Verification code resend to registered number',
          'success'
        );
      })
      .catch((ex) => {
        this.setState({ loader: false,disableVerify: true });
      });
  };

  // mobVerification = async () => {
  //   if(this.validateOnSubmit()){
  //     return false
  //   }
  //   this.setState({ loader: true });
  //   let mobResp = null;
  //   try {
  //     mobResp = await createAcoountService.verifyMobileOTP(
  //       Object.values(this.state.data).join("")
  //     );
  //     this.setState({ loader: false });
  //     messagePopup("", "Mobile number verified successfully", "success");
  //   } catch (err) {
  //     this.setState({ loader: false });
  //     messagePopup("", "Mobile number verification failed", "error");
  //   }
  //   return mobResp
  // };

  approverMobVerification = async () => {
    const docHash = this.state.docHash;
    const apiToken = this.state.apiToken;
    const signature = this.state.signature;
    console.log("DOCHASH", docHash)
    if (this.validateOnSubmit()) {
      return;
    }
    this.setState({ loader: true });
    const otp = Object.values(this.state.data).join('');

    try {
      if(docHash && apiToken && signature) {
        // TO-DO (Add Sign Document with Signature Function)
        const data = {
          "signature": signature,
          "otp": otp
        }
        const response = await signDocService.verifyMobileOTP(data, docHash)
        if (response && response.status === 200){
          console.log("Certificate Signed");

          // Successfully Approved
          this.setState({ loader: false, disableVerify: true, openModal: true });

        } else {
          console.log("OTP Verification Error: ", response)
          this.setState({ loader: false, disableVerify: false });
          messagePopup('', 'Mobile number verification failed', 'error');
        }
      } else {
        this.setState({ loader: false, disableVerify: false });
        messagePopup('Error', 'Invalid Approver, Invalid Certificate or Empty Signature', 'error');
      }

    } catch (err) {
      console.log("OTP Verification Error: ", err)
      this.setState({ loader: false, disableVerify: false });
      messagePopup('', 'Mobile number verification failed', 'error');
    }
  };

  createUserMobVerification = async () => {
    if (this.validateOnSubmit()) {
      return;
    }
    this.setState({ loader: true });
    let mobResp = null;

    try {
      mobResp = await createAcountService.verifyMobileOTP(
        Object.values(this.state.data).join('')
      );
      this.setState({ loader: false, disableVerify: true });
      messagePopup('', 'Mobile number verified successfully', 'success');
      // messagePopup(
      //   "Verify Email Address",
      //   "Verification code send to registered email address",
      //   "success"
      // );
      this.props.history.push({
        pathname: '/emailVerification',
        search: `?email=${this.state.email}`,
      });
    } catch (err) {
      this.setState({ loader: false,disableVerify: false });
      messagePopup('', 'Mobile number verification failed', 'error');
    }

    // if (mobResp) {
    //   this.setState({ loader: true });
    //   createAcountService
    //     .resendEmail(this.state.email)
    //     .then(emailResp => {
    //       this.setState({ loader: false });
    //       messagePopup(
    //         "Verify Email Address",
    //         "Verification code send to registered email address",
    //         "success"
    //       );
    //       this.props.history.push({
    //         pathname: "/emailVerification",
    //         search: `?email=${this.state.email}`
    //       });
    //     })
    //     .catch(emailErr => {
    //       this.setState({ loader: false });
    //       //  messagePopup("", "Email verification failed", "error");
    //     });
    // }
  };

  handleClose = () => {
    this.setState({ openModal: false });
    this.props.history.push('/Certificate');
  };

  stepperLabel = (docName,date) => {
    return (
      <div>
        <Typography variant="body2" gutterBottom>
          {docName}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {date}
        </Typography>
      </div>
    )
  }


  onVerifyClick = () => {
    console.log('this.props.match.params.via', this.props.match.params.via);

    switch (this.props.match.params.via) {
      case 'approver':
        return this.approverMobVerification();
      case 'new-user':
        return this.createUserMobVerification();
      default:
        return null;
    }
  };


  handleViewDocument = () => {
    this.props.history.push(`/api/v1/hash/${this.state.docHash}`);
  };

  handleCloseDoc = () => {
    this.setState({ viewDoc: false });
  };

  handleAcountClick = () => {
    // // // this.props.history.index = 0
    // this.props.history.entries = []
    // this.props.history.index = -1
    this.props.history.push('/Certificate');
    // removeDocumentInfo()
  };
  render() {
    return (
      <div className='CompanySection VerificationSection'>
        <BackdropLoader open={this.state.loader} />
        <LoginImage />
        <div className='verificaitonSection'>
          <div className='verificaitonField'>
            <h2>VERIFY MOBILE NUMBER </h2>
            <span className='phoneicon'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                // xmlns:xlink="http://www.w3.org/1999/xlink"
                width='84.3'
                height='109.75'
                viewBox='0 0 84.3 109.75'
              >
                <defs>
                  <filter
                    id='Ellipse_8'
                    x='0'
                    y='91.75'
                    width='71'
                    height='18'
                    filterUnits='userSpaceOnUse'
                  >
                    <feOffset input='SourceAlpha' />
                    <feGaussianBlur stdDeviation='2.5' result='blur' />
                    <feFlood />
                    <feComposite operator='in' in2='blur' />
                    <feComposite in='SourceGraphic' />
                  </filter>
                </defs>
                <g
                  id='Group_1171'
                  data-name='Group 1171'
                  transform='translate(-1257.5 -305.75)'
                >
                  <path
                    id='Icon_awesome-mobile-alt'
                    data-name='Icon awesome-mobile-alt'
                    d='M39.1,0H6.9A6.93,6.93,0,0,0,0,6.957V67.248A6.93,6.93,0,0,0,6.9,74.2H39.1A6.93,6.93,0,0,0,46,67.248V6.957A6.93,6.93,0,0,0,39.1,0ZM23,69.567a4.638,4.638,0,1,1,4.6-4.638A4.614,4.614,0,0,1,23,69.567ZM39.1,53.914a1.737,1.737,0,0,1-1.725,1.739H8.625A1.737,1.737,0,0,1,6.9,53.914V8.7A1.737,1.737,0,0,1,8.625,6.957h28.75A1.737,1.737,0,0,1,39.1,8.7Z'
                    transform='translate(1270 318.397)'
                    fill='#304ffe'
                  />
                  <g
                    id='Icon_awesome-comment-dots'
                    data-name='Icon awesome-comment-dots'
                    transform='translate(1300.8 308.5)'
                    fill='#00b8fe'
                  >
                    <path
                      d='M 0.5624966025352478 36.25 C -0.6575033664703369 36.25 -1.759373426437378 35.52640151977539 -2.24466347694397 34.40653991699219 C -2.734952926635742 33.27501678466797 -2.50507926940918 31.97077751159668 -1.659304976463318 31.08047485351563 C -1.07308292388916 30.44946098327637 0.3681192696094513 28.63480758666992 1.177938103675842 26.67132949829102 C 0.1883133500814438 25.48824501037598 -0.6150003671646118 24.20911407470703 -1.218653321266174 22.85321998596191 C -2.068893432617188 20.94342994689941 -2.500003337860107 18.93206977844238 -2.500003337860107 16.875 C -2.500003337860107 14.49433040618896 -1.929123401641846 12.1904296875 -0.803213357925415 10.02729988098145 C 0.2619766294956207 7.98084020614624 1.775466680526733 6.152339935302734 3.695236682891846 4.592589855194092 C 7.538836479187012 1.469799995422363 12.61902618408203 -0.25 17.99999618530273 -0.25 C 23.38096618652344 -0.25 28.46116638183594 1.469799995422363 32.30475616455078 4.592589855194092 C 34.22452545166016 6.152339935302734 35.7380256652832 7.98084020614624 36.80320739746094 10.02729988098145 C 37.92911529541016 12.1904296875 38.49999618530273 14.49433040618896 38.49999618530273 16.875 C 38.49999618530273 19.25567054748535 37.92911529541016 21.5595703125 36.80320739746094 23.72270011901855 C 35.7380256652832 25.7691593170166 34.22452545166016 27.59766006469727 32.30475616455078 29.15740966796875 C 28.46116638183594 32.28020095825195 23.38096618652344 34 17.99999618530273 34 C 15.56243515014648 34 13.17374706268311 33.63927841186523 10.88027095794678 32.92620086669922 C 9.843160629272461 33.64066314697266 8.746576309204102 34.2519416809082 7.606456756591797 34.75040817260742 C 5.330506801605225 35.74546051025391 2.96057653427124 36.25 0.5624966025352478 36.25 Z M 26.99999618530273 16.625 C 26.86448669433594 16.625 26.74999618530273 16.7394905090332 26.74999618530273 16.875 C 26.74999618530273 17.0105094909668 26.86448669433594 17.125 26.99999618530273 17.125 C 27.13550758361816 17.125 27.24999618530273 17.0105094909668 27.24999618530273 16.875 C 27.24999618530273 16.7394905090332 27.13550758361816 16.625 26.99999618530273 16.625 Z M 17.99999618530273 16.625 C 17.86448669433594 16.625 17.74999618530273 16.7394905090332 17.74999618530273 16.875 C 17.74999618530273 17.0105094909668 17.86448669433594 17.125 17.99999618530273 17.125 C 18.13550758361816 17.125 18.24999618530273 17.0105094909668 18.24999618530273 16.875 C 18.24999618530273 16.7394905090332 18.13550758361816 16.625 17.99999618530273 16.625 Z M 8.999996185302734 16.625 C 8.864486694335938 16.625 8.749996185302734 16.7394905090332 8.749996185302734 16.875 C 8.749996185302734 17.0105094909668 8.864486694335938 17.125 8.999996185302734 17.125 C 9.135506629943848 17.125 9.249996185302734 17.0105094909668 9.249996185302734 16.875 C 9.249996185302734 16.7394905090332 9.135506629943848 16.625 8.999996185302734 16.625 Z'
                      stroke='none'
                    />
                    <path
                      d='M 17.99999618530273 2.25 C 8.057806015014648 2.25 -3.814697265625e-06 8.796089172363281 -3.814697265625e-06 16.875 C -3.814697265625e-06 20.36249923706055 1.504688262939453 23.55469131469727 4.007816314697266 26.06484031677246 C 3.12890625 29.60858917236328 0.1898384094238281 32.76562118530273 0.1546859741210938 32.80078125 C -3.814697265625e-06 32.96250152587891 -0.04218292236328125 33.20156097412109 0.04921722412109375 33.41249847412109 C 0.140625 33.62343978881836 0.3374977111816406 33.75 0.5624961853027344 33.75 C 5.224216461181641 33.75 8.718746185302734 31.51406097412109 10.44843673706055 30.13594055175781 C 12.74765586853027 31.00078010559082 15.29999732971191 31.5 17.99999618530273 31.5 C 27.94218635559082 31.5 35.99999618530273 24.95391082763672 35.99999618530273 16.875 C 35.99999618530273 8.796089172363281 27.94218635559082 2.25 17.99999618530273 2.25 M 8.999996185302734 19.125 C 7.755466461181641 19.125 6.749996185302734 18.11952972412109 6.749996185302734 16.875 C 6.749996185302734 15.63047027587891 7.755466461181641 14.625 8.999996185302734 14.625 C 10.24452590942383 14.625 11.24999618530273 15.63047027587891 11.24999618530273 16.875 C 11.24999618530273 18.11952972412109 10.24452590942383 19.125 8.999996185302734 19.125 M 17.99999618530273 19.125 C 16.75546646118164 19.125 15.74999618530273 18.11952972412109 15.74999618530273 16.875 C 15.74999618530273 15.63047027587891 16.75546646118164 14.625 17.99999618530273 14.625 C 19.24452590942383 14.625 20.24999618530273 15.63047027587891 20.24999618530273 16.875 C 20.24999618530273 18.11952972412109 19.24452590942383 19.125 17.99999618530273 19.125 M 26.99999618530273 19.125 C 25.75546646118164 19.125 24.74999618530273 18.11952972412109 24.74999618530273 16.875 C 24.74999618530273 15.63047027587891 25.75546646118164 14.625 26.99999618530273 14.625 C 28.24452590942383 14.625 29.24999618530273 15.63047027587891 29.24999618530273 16.875 C 29.24999618530273 18.11952972412109 28.24452590942383 19.125 26.99999618530273 19.125 M 17.99999618530273 -2.75 C 23.95332717895508 -2.75 29.59337615966797 -0.8314399719238281 33.88120651245117 2.652271270751953 C 36.06771850585938 4.428749084472656 37.79692840576172 6.521720886230469 39.02079772949219 8.873050689697266 C 40.3340950012207 11.39620018005371 40.99999618530273 14.08844947814941 40.99999618530273 16.875 C 40.99999618530273 19.66155052185059 40.3340950012207 22.35379981994629 39.02079772949219 24.87694931030273 C 37.79692840576172 27.22827911376953 36.06771850585938 29.32125091552734 33.88120651245117 31.09773063659668 C 29.59337615966797 34.58143997192383 23.95332717895508 36.5 17.99999618530273 36.5 C 15.71391868591309 36.5 13.46572875976563 36.21218109130859 11.2872314453125 35.64232635498047 C 10.42417335510254 36.17082977294922 9.52882194519043 36.63843154907227 8.607936859130859 37.04104995727539 C 6.014236450195313 38.17502975463867 3.307357788085938 38.75 0.5624961853027344 38.75 C -1.654544830322266 38.75 -3.656814575195313 37.43527984619141 -4.538543701171875 35.40058898925781 C -5.424884796142578 33.35500335693359 -5.012844085693359 30.99658966064453 -3.490550994873047 29.37843132019043 C -3.147705078125 29.00341606140137 -2.386672973632813 28.05732917785645 -1.750167846679688 26.95816802978516 C -2.437973022460938 25.97719955444336 -3.023773193359375 24.94540023803711 -3.502544403076172 23.87001037597656 C -4.496181488037109 21.63811874389648 -5.000003814697266 19.2846508026123 -5.000003814697266 16.875 C -5.000003814697266 14.08844947814941 -4.334102630615234 11.39620018005371 -3.020801544189453 8.873050689697266 C -1.796932220458984 6.521720886230469 -0.06772232055664063 4.428749084472656 2.118785858154297 2.652271270751953 C 6.4066162109375 -0.8314399719238281 12.04666709899902 -2.75 17.99999618530273 -2.75 Z'
                      stroke='none'
                      fill='#fff'
                    />
                  </g>
                  <g
                    transform='matrix(1, 0, 0, 1, 1257.5, 305.75)'
                    filter='url(#Ellipse_8)'
                  >
                    <ellipse
                      id='Ellipse_8-2'
                      data-name='Ellipse 8'
                      cx='28'
                      cy='1.5'
                      rx='28'
                      ry='1.5'
                      transform='translate(7.5 99.25)'
                      fill='#9f9f9f'
                      opacity='0.3'
                    />
                  </g>
                </g>
              </svg>
            </span>
            <p className='otpmsg'>
              <span>
                A 6 digit OTP has been send to{' '}
                {this.state.mobileNo
                  ? Array.from(this.state.mobileNo.toString())
                      .map((char, charIndex) =>
                        charIndex > 1 &&
                        charIndex < this.state.mobileNo.toString().length - 2
                          ? '*'
                          : char
                      )
                      .join('')
                  : ''}
                .
              </span>
              <span>
                This help us confirm your identity or secure your account.
              </span>
            </p>
            <span> Please enter the one-time password</span>
            <ul>
              <li>
                <TextField
                  value={this.state.data['otp1']}
                  variant='outlined'
                  margin='normal'
                  id='otp1'
                  name='otp1'
                  onChange={this.handleChange}
                  error={this.state.errors['otp1']}
                  inputProps={{ maxLength: 1 }}
                  // onInput={this.validateNumber}
                  inputRef={this.state.focus.otp1}
                />
              </li>
              <li>
                <TextField
                  value={this.state.data['otp2']}
                  variant='outlined'
                  margin='normal'
                  id='otp2'
                  name='otp2'
                  onChange={this.handleChange}
                  error={this.state.errors['otp2']}
                  inputProps={{ maxLength: 1 }}
                  // onInput={this.validateNumber}
                  inputRef={this.state.focus.otp2}
                />
              </li>
              <li>
                <TextField
                  value={this.state.data['otp3']}
                  variant='outlined'
                  margin='normal'
                  id='otp3'
                  name='otp3'
                  onChange={this.handleChange}
                  error={this.state.errors['otp3']}
                  inputProps={{ maxLength: 1 }}
                  // onInput={this.validateNumber}
                  inputRef={this.state.focus.otp3}
                />
              </li>
              <li>
                <TextField
                  value={this.state.data['otp4']}
                  variant='outlined'
                  margin='normal'
                  id='otp4'
                  name='otp4'
                  onChange={this.handleChange}
                  error={this.state.errors['otp4']}
                  inputProps={{ maxLength: 1 }}
                  // onInput={this.validateNumber}
                  inputRef={this.state.focus.otp4}
                />
              </li>
              <li>
                {' '}
                <TextField
                  value={this.state.data['otp5']}
                  variant='outlined'
                  margin='normal'
                  id='otp5'
                  name='otp5'
                  onChange={this.handleChange}
                  error={this.state.errors['otp5']}
                  inputProps={{ maxLength: 1 }}
                  // onInput={this.validateNumber}
                  inputRef={this.state.focus.otp5}
                />
              </li>
              <li>
                <TextField
                  value={this.state.data['otp6']}
                  variant='outlined'
                  margin='normal'
                  id='otp6'
                  name='otp6'
                  onChange={this.handleChange}
                  error={this.state.errors['otp6']}
                  inputProps={{ maxLength: 1 }}
                  // onInput={this.validateNumber}
                  inputRef={this.state.focus.otp6}
                />
              </li>
            </ul>

            <button
              type='button'
              className='verifyBtn'
              // disabled={this.state.disableVerify}
              onClick={this.onVerifyClick}
            >
              VERIFY
            </button>

            <p className='resendcode'>
              Didn't received the code?
              <a style={{ cursor: 'pointer' }} onClick={this.handleResend}>
                Resend Code
              </a>
            </p>
          </div>
        </div>

        <div>
          <Dialog
            open={this.state.openFinancialApproveModal}
            onClose={this.onFinancialVerifyCancel}
            aria-labelledby='simple-modal-title'
            ariadescribedby='simple-modal-description'
            className='ApprovedFinancialTemplate'
          >
            <DialogTitle
              id='customized-dialog-title'
              onClose={this.onFinancialVerifyCancel}
            ></DialogTitle>
            <DialogContent>
              <ApprovedFinancialTemplate noaResponse={this.state.noaResponse}/>
            </DialogContent>
          </Dialog>
        </div>


        <Dialog
          open={this.state.openModal}
          onClose={this.handleClose}
          aria-labelledby='simple-modal-title'
          ariadescribedby='simple-modal-description'
          className='buyerVerificationCompleted'
        >
          <DialogTitle
            id='customized-dialog-title'
            onClose={this.handleClose}
          ></DialogTitle>
          <DialogContent>
            <div>
              <div className='buyerModalDocumentHead'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='60'
                  height='60'
                  viewBox='0 0 60 60'
                >
                  <g transform='translate(0 0)'>
                    <g transform='translate(6.381 0)'>
                      <g transform='translate(0 0)'>
                        <path
                          className='a'
                          d='M107.028.154a1.171,1.171,0,0,0-1.176.009L84.4,12.846A1.17,1.17,0,1,0,85.59,14.86l15.393-9.1L72.311,35.5,58.051,31.14l18.61-11a1.17,1.17,0,1,0-1.192-2.015L54.574,30.476a1.17,1.17,0,0,0,.253,2.127l17.03,5.209,7.513,13.672a.277.277,0,0,0,.024.037,1.168,1.168,0,0,0,1.82.237l8.639-8.441,16.25,4.97a1.171,1.171,0,0,0,1.513-1.119v-46A1.17,1.17,0,0,0,107.028.154ZM79.435,38.533a1.171,1.171,0,0,0-.208.666v7.159L74.1,37.023l22.7-23.55Zm2.133,9.606V40.781L87.3,42.535Zm23.709-2.555-23-7.036,23-33.2Z'
                          transform='translate(-53.999 0)'
                        />
                      </g>
                    </g>
                    <g transform='translate(6.381 40.224)'>
                      <path
                        className='a'
                        d='M67.048,344.994a1.182,1.182,0,0,0-1.671,0L54.345,356.026a1.182,1.182,0,0,0,1.671,1.671l11.032-11.032A1.182,1.182,0,0,0,67.048,344.994Z'
                        transform='translate(-53.999 -344.648)'
                      />
                    </g>
                    <g transform='translate(0 54.918)'>
                      <path
                        className='a'
                        d='M4.735,469.347a1.182,1.182,0,0,0-1.671,0L.346,472.065a1.182,1.182,0,1,0,1.671,1.671l2.718-2.718A1.182,1.182,0,0,0,4.735,469.347Z'
                        transform='translate(0 -469.001)'
                      />
                    </g>
                    <g transform='translate(14.712 57.567)'>
                      <path
                        className='a'
                        d='M127.6,491.756a1.181,1.181,0,1,0,.346.835A1.19,1.19,0,0,0,127.6,491.756Z'
                        transform='translate(-125.58 -491.41)'
                      />
                    </g>
                    <g transform='translate(17.618 48.774)'>
                      <path
                        className='a'
                        d='M158.395,417.352a1.182,1.182,0,0,0-1.671,0L150.88,423.2a1.182,1.182,0,0,0,1.671,1.671l5.843-5.843A1.182,1.182,0,0,0,158.395,417.352Z'
                        transform='translate(-150.534 -417.006)'
                      />
                    </g>
                    <g transform='translate(37.574 48.326)'>
                      <path
                        className='a'
                        d='M328.93,413.557a1.182,1.182,0,0,0-1.671,0l-5.859,5.859a1.182,1.182,0,1,0,1.671,1.671l5.859-5.859A1.182,1.182,0,0,0,328.93,413.557Z'
                        transform='translate(-321.053 -413.211)'
                      />
                    </g>
                    <g transform='translate(31.212 15.625)'>
                      <path
                        className='a'
                        d='M268.447,133.726a1.181,1.181,0,1,0,.346.837A1.191,1.191,0,0,0,268.447,133.726Z'
                        transform='translate(-266.43 -133.38)'
                      />
                    </g>
                  </g>
                </svg>
                <h5>Successfully Approved</h5>
                <ul>
                  <li>
                    <span>
                      Thank you! This certificate has been approved
                      successfully
                    </span>
                  </li>
                </ul>
              </div>
              <div className='buyerVerificationDocumentOrder'>
                <div className='successfullmessageBodytitle'>
                  <h3>
                    <span>Certificate Details</span>
                  </h3>
                </div>
                <ul>
                 <li>
                    <span>Document No.</span>
                    <span>:</span>
                    <span>
                    {this.state.certificate
                        ? this.state.certificate.docInfo.id
                        : ''}
                    </span>
                  </li>
                  <li>
                    <span>Document Name</span>
                    <span>:</span>
                    <span>
                      {this.state.certificate
                        ? this.state.certificate.docInfo.name
                        : ''}
                    </span>
                  </li>
                  <li>
                    <span>Document Hash</span>
                    <span>:</span>
                    <span>
                      {this.state.docHash
                          ? this.state.docHash
                          : ''}
                    </span>
                  </li>
                  <li>
                    <span>{'Created By'}</span>
                    <span>:</span>
                    <span>
                      {this.state.certificate
                          ? this.state.certificate.docInfo.issuers[0].name
                          : ''}
                    </span>
                  </li>
                  {/* <li>
                    <span>{'Date & Time'}</span>
                    <span>:</span>
                    <span>
                      {formatDate(
                        this.state.document.doc
                          ? this.state.document.doc.createdAt
                          : ''
                      ) +
                        ' ' +
                        formatTime(
                          this.state.document.doc
                            ? this.state.document.doc.createdAt
                            : ''
                        )}
                    </span>
                  </li> */}
                </ul>
              </div>
            </div>
          </DialogContent>
          <DialogButton>
            <Button onClick={this.handleViewDocument}>VIEW DOCUMENT</Button>
            <Button onClick={this.handleAcountClick}>ACCOUNT</Button>
          </DialogButton>
        </Dialog>
      </div>
    );
  }
}

export default VerificationCode;

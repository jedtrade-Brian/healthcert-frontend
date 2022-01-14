import React, { Component } from 'react';
import { Button, Input, InputLabel, FormControl } from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import { withStyles } from '@material-ui/core/styles';
import signDocService from "../../services/signDocument" 
import {BackdropLoader} from "../../services/loader";
import CertificateTemplate from "./CertificateTemplate"
import './certificateApproval.css';
import authService from '../../services/authService';
import dummyData from './dummyData';
import { messagePopup } from '../../services/messagePopupService.jsx';
import { GenerateSignatureConfig } from './GenerateSignatureConfig';
import * as htmlToImage from 'html-to-image';
import SignatureCanvas from 'react-signature-canvas';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import { IconButton, Dialog } from '@material-ui/core';
import { getUsers } from "../../services/userService";
import '../../assets/SignatureFonts/stylesheet.css'


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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 250,
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


class ApproveCertificate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      loader: false,
      user: authService.getUserInfo() ? authService.getUserInfo() : null,
      isSigned: false,
      signature: '',
      generatingSignature: '',
      openSignaturePad: false,
      drawingMode: false,
      signatureText: 'Signature',
      certificate: null,
      currentApprover: null,
    };

    this.sigCanvas = null;
  }
  componentDidMount(){
    const docHash = this.props.match ? this.props.match.params.docHash : '';

    if(docHash && docHash !== '' ){
      this.setState({ loader:true, signature: ''})
      this.getUser().then(() => {
        signDocService.getDocHash(this.props.match.params.docHash)
        .then(response => {
          if(response && response.data){
            console.log('response.data : ',response.data);

            // Check if current user is one of the assigned approver
            let approverIndex = response.data.document.docInfo.approvers.findIndex((approver) => {
              return approver.email === this.state.user.email && this.state.user.role === 'approver'
            })

            if(approverIndex === -1 || !this.state.user || this.state.user.role !== 'approver') {
              // Unauthorise account
              messagePopup('Unauthorised User', 'Please login to an authorised approver account', 'error');
              authService.logout();
              this.props.history.push(`/api/v1/hash/${docHash}`);
            } else {
              let approver = response.data.document.docInfo.approvers[approverIndex]
              this.setState({ currentApprover: approver, signature: approver.signature, loader: false, certificate: response.data.document }, 
                () => console.log('State : ',this.state))
            }

          }   
        })
        .catch(error => {
          console.log('Error : ',error);
          this.setState({loader: false})
        })
      })
    }
  }

  componentDidUpdate() {
    window.onpopstate = e => {
      if(this.state.currentApprover) {
         // Reset signature if user return back after continuing to next page
        this.state.currentApprover.signature = ""
        this.setState({ signature: '', isSigned: false })
      }
   }
  }

  getUser = async () => {
    try {
      const response = await getUsers();
      if (response && response.data) {
        authService.setUserInfo(response.data);
        this.setState({ user: response.data })
      }
    } catch (error) {
      console.log('Error : ',error);
      this.setState({loader: false})
    }
  };

  VerifyDoc = () => {
    // console.log('Doc Info ',this.state.document.docInfo.recipient.phoneNumber);
    let mobNo = ''
    if(this.state.user && this.state.currentApprover){
      mobNo = this.state.user.mobileNo
    } else {
      messagePopup('Unauthorised User', 'Please login to an authorised approver account', 'error');
    }
    if(this.state.certificate && mobNo && this.state.currentApprover){
      this.props.history.push({
        pathname: '/verifyDoc/approver',
        search: `?mobileNo=${mobNo}&docHash=${this.props.match ? this.props.match.params.docHash : ''}`,
        state: { signature: this.state.signature },
      })
    }
  };

  checkSignatureWillDisable = () => {
    if(this.state.certificate) {
      if(this.state.currentApprover) {
        if(this.state.currentApprover.signature && !this.state.isSigned) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    } else {
      return true;
    }
  }

  handleOpenModal = () => {
    this.setState({ openSignaturePad: true });
  }

  handleCloseModal = () => {
    this.setState({ openSignaturePad: false, });
  };

  clearSignature = () => {
    this.sigCanvas.clear();
  }

  handleDrawSignature = () => {
    if(!this.sigCanvas.isEmpty()) {
      let signatureBase64 = this.sigCanvas.getCanvas().toDataURL();
      this.setState({ signature: signatureBase64, isSigned: true, openSignaturePad: false, });
    } else {
      messagePopup('No Signature Found', 'Please draw your signature on the gray area', 'error');
    }
  }

  generateSignature = async (signatureId) => {
    this.setState({ generatingSignature: signatureId });
    var signatureDOM = document.getElementById(signatureId);
    htmlToImage.toSvg(signatureDOM).then((dataUrl) => {
        this.setState({ signature: dataUrl, isSigned: true, openSignaturePad: false, generatingSignature: "" });
    }).catch((error) => {
        console.error('Generate signature Error: ', error);
        messagePopup('', 'Unexpected Error', 'error');
        this.setState({ generatingSignature: "" });
    })
  }

  handleTextSignature = (event) => {
    this.setState({ signatureText: event.target.value });
  }

  switchMode = () => {
    this.setState({ drawingMode: !this.state.drawingMode });
  }

  signedCertificate = (document) => {
    if(document && this.state.currentApprover) {
      let certificate = document
      let approverIndex = certificate.docInfo.approvers.findIndex((approver) => {
        return approver === this.state.currentApprover
      })
      certificate.docInfo.approvers[approverIndex].signature = this.state.signature;

      return certificate;
    } else {
      return document
    }
  }

  render() {
    return (
      <div className='buyerSignedDocument'>
        <BackdropLoader open={this.state.loader} />
        <div className={`buyerSignedDocumentMain ${ this.checkSignatureWillDisable() ? 'disabled' : 'active'}`}>
          {this.state.certificate && 
            <CertificateTemplate certificate={this.signedCertificate(this.state.certificate)} signature={this.state.signature} />
          }

          {/* <Button disabled={this.checkSignatureWillDisable()} onClick={this.VerifyDoc} className='signbtn'>
              Sign Document
          </Button> */}

          {this.state.isSigned
            ? <div className="signedBtnGroup">
                <span>
                  <Button onClick={this.handleOpenModal} className="secondarySignBtn">
                    Sign Document
                  </Button>
                </span>
                <Button onClick={this.VerifyDoc}>
                  Confirm
                </Button> 
              </div>
            : <Button disabled={this.checkSignatureWillDisable()} onClick={this.handleOpenModal} className='signbtn'>
                  Sign Document
              </Button>
          }

          <Dialog
            open={this.state.openSignaturePad}
            onClose={this.handleCloseModal}
            aria-labelledby='simple-modal-title'
            aria-describedby='scroll-dialog-description'
            className='saleModaleTemplate'
          >
            <DialogTitle id='customized-dialog-title' onClose={this.handleCloseModal} ></DialogTitle>
            <DialogContent>
              {
                this.state.drawingMode
                ? <div>
                    <div style={{ backgroundColor: '#E5E5E5', width: 500, height: 200, marginTop: 40, marginBottom: 15, }}>
                      <SignatureCanvas ref={(ref) => { this.sigCanvas = ref }} canvasProps={{width: 500, height: 200,}} />
                    </div>
                    <Button onClick={this.switchMode} color="primary">Switch Mode</Button>
                    <Button onClick={this.clearSignature} style={{ marginLeft: 190 }}>
                      CLEAR
                    </Button>
                    <Button onClick={this.handleDrawSignature} variant="contained" color="primary" style={{ marginLeft: 12 }}>
                      CONFIRM
                    </Button>
                  </div>

                : <div style={{ minWidth: 750, }}>
                    <div style={{ marginTop: 30, marginBottom: 30, maxWidth: 300 }}>
                      <FormControl fullWidth className={styles.formControl}>
                        <InputLabel htmlFor="signature" id="signatureLabel">Signature</InputLabel>
                        <Input 
                          type="text" 
                          name="signature" 
                          placeholder="Name or Initials" 
                          value={this.state.signatureText} 
                          onChange={this.handleTextSignature}
                        />
                      </FormControl>
                    </div>
                    <div style={{ marginBottom: 50, width: 750 }} className="container-fluid">
                      {
                        GenerateSignatureConfig.signatureStyles.map((font) => {
                          return (
                            <div className="row" style={{ marginBottom: 15 }}>
                              <div className="col-sm-11">
                                <div style={{fontWeight: "bold"}}>
                                  {font.fontName}
                                </div>
                                <Button onClick={() => this.generateSignature(font.fontFamily)} style={{textTransform: 'none'}}>
                                  <div style={{ border: "1px solid black", padding: 20 }}>
                                    <div id={font.fontFamily} style={{ fontFamily: font.fontFamily, fontSize: 48 }}>
                                      {
                                        this.state.signatureText
                                        ? this.state.signatureText
                                        : "Signature"
                                      }
                                    </div>
                                  </div>
                                </Button>
                              </div>
                              <div className="col-sm-1" style={{ alignSelf: 'center' }}>
                                {
                                  this.state.generatingSignature === font.fontFamily 
                                  && <span className="spinner-border text-dark"></span>
                                }
                              </div>
                            </div>
                          ) 
                        })
                      }
                    </div>
                    <div style={{ marginBottom: 15 }}>
                      <Button onClick={this.switchMode} color="primary">Switch Mode</Button>
                    </div>
                  </div>
              }
            </DialogContent>
          </Dialog>
        </div>
      </div>
    );
  }
}

export default ApproveCertificate;

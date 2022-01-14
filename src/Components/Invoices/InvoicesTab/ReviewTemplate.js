import React, { Component } from "react";
import "./reviewTemplate.css";
import NOATemplate from "./NOATemplate";
import { Button, IconButton, Dialog } from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import {getFinancierCompanyDetails} from "../../../services/financierService";
import {getDocHash} from "../../../services/signDocument";
import {BackdropLoader} from "../../../services/loader";
import {createFinanceRequest} from "../../../services/invoiceService"
import { messagePopup } from '../../../services/messagePopupService';
import authService from "../../../services/authService";
import { unixTimestampToDate  , getTimeFromUnixTimestampNew, getTimeFromUnixTimestamp} from '../../Shared/dateTimeFormat'



const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
      <Typography variant="h6">{children}</Typography>
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent);

class ReviewTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: true,
      openModal: false,
      financierCompanyDetails : null,
      selectedData: null,
      document: {
        doc: null,
        issuerDetails: null,
        recipientDetails: null
      },
      docResponse: null,
      user: authService.getUserInfo(),
    };
  }

  async componentDidMount(){
    if(this.props && this.props.location){
      if(this.props.location.state){
        console.log('this.props.location.state',this.props.location.state);
        const {selectedData} = this.props.location.state
        if(selectedData){
          try {
            // this.setState({loader: true})
            selectedData.selectedInvoices = selectedData.selectedInvoices.map((item) => {
              return {
                ...item,
                amount: item.finalAmt
              }
            })
            const response = await Promise.all([
              getFinancierCompanyDetails(selectedData.financierName),
              getDocHash(selectedData.selectedInvoices[0].docHash)
            ]);
            let financierCompanyDetails = null;
            let document = {
              doc: null,
              issuerDetails: null,
              recipientDetails: null
            };
            if(response && response[0] && response[0].data){
              console.log('Resp 1' , response[0].data);
              financierCompanyDetails = response[0].data
            }
            if(response && response[1] && response[1].data){
              console.log('Resp 2' , response[1].data);
              const {doc ,issuerDetails,recipientDetails} = response[1].data
              document = {
                doc,
                issuerDetails,
                recipientDetails
              }
            }
            this.setState({
              loader: false,
              financierCompanyDetails,
              document,
              selectedData
            },() => console.log('State : ',this.state))
         } catch(err) {
           this.setState({loader: false})
           console.log('Error : ',err);
         }
       }
      } else{
        this.props.history.goBack()
      }
      // console.log('This.Props : ',this.props);
    }
  }

  handleModal = () => {
    this.setState({loader: true})
    const formattedData = this.formattedData()
    const {selectedData} = this.state
    const financierName = selectedData && selectedData.financierName ? selectedData.financierName : ''
    const docName = selectedData && selectedData.docName ? selectedData.docName : ''
    // console.log('XXXXX',formattedData,financierName,docName);
    createFinanceRequest(formattedData,financierName,docName).then(response => {
      console.log('Response : ',response);
      let docResponse = null;
      if(response && response.data){
        docResponse = {...response.data , docInfo : response.data.docInfo ? JSON.parse(response.data.docInfo) : ''}
      }
      this.setState({ openModal: true,loader : false, docResponse },() => console.log('State : ',this.state));
      messagePopup('', 'Document has been issued successfully', 'success');
    }).catch(err => {
      console.log('Error : ',err);
      this.setState({loader : false})
      messagePopup('', 'Document generation process has been failed', 'error');
    })
  };

  formattedData = () => {
    const {document,selectedData} = this.state
    const finalData = {
      recipient: {
        buyerEmail: document && document.recipientDetails ? document.recipientDetails.emailAddress : '',
      },
      docDetails: selectedData && selectedData.selectedInvoices ? selectedData.selectedInvoices.map(item => {
          return {
            docHash: item.docHash
          }
        }) : [],
    }
    return finalData
  }

  handleClose = () => {
    this.setState({ openModal: false });
    this.props.history.push('/invoices')
  };

  render() {
    return (
      <div className="reviewTemplate">
        <BackdropLoader open={this.state.loader} />
        <h3>Review Document</h3>
        <div className="reviewConfirmTemplate">
          <h5>Review & Confirm</h5>
          {(this.state.document && this.state.financierCompanyDetails && this.state.selectedData) && (
            <NOATemplate issuer={this.state.document ? {...this.state.document.issuerDetails, signDate: new Date()} : null} user={this.state.user} document={this.state.document} financierCompanyDetails={this.state.financierCompanyDetails} selectedData={this.state.selectedData}/>
          )}
        </div>
        <div className="btnSubmit">
          {/* <Button className="amendBtn" disabled onClick={() => {this.props.history.goBack()}}>AMEND</Button> */}
          <Button onClick={this.handleModal} className="createBtn">
            CONFIRM & CREATE
          </Button>
        </div>
        <Dialog
          open={this.state.openModal}
          onClose={this.handleClose}
          aria-labelledby="simple-modal-title"
          ariadescribedby="simple-modal-description"
          className="successfullyModal"
        >
          <DialogTitle
            id="customized-dialog-title"
            onClose={this.handleClose}
          ></DialogTitle>
          <DialogContent>
            <div>
              <div className="successfullMeassage">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="60"
                  height="60"
                  viewBox="0 0 60 60"
                >
                  <g transform="translate(0 0)">
                    <g transform="translate(6.381 0)">
                      <g transform="translate(0 0)">
                        <path
                          className="a"
                          d="M107.028.154a1.171,1.171,0,0,0-1.176.009L84.4,12.846A1.17,1.17,0,1,0,85.59,14.86l15.393-9.1L72.311,35.5,58.051,31.14l18.61-11a1.17,1.17,0,1,0-1.192-2.015L54.574,30.476a1.17,1.17,0,0,0,.253,2.127l17.03,5.209,7.513,13.672a.277.277,0,0,0,.024.037,1.168,1.168,0,0,0,1.82.237l8.639-8.441,16.25,4.97a1.171,1.171,0,0,0,1.513-1.119v-46A1.17,1.17,0,0,0,107.028.154ZM79.435,38.533a1.171,1.171,0,0,0-.208.666v7.159L74.1,37.023l22.7-23.55Zm2.133,9.606V40.781L87.3,42.535Zm23.709-2.555-23-7.036,23-33.2Z"
                          transform="translate(-53.999 0)"
                        />
                      </g>
                    </g>
                    <g transform="translate(6.381 40.224)">
                      <path
                        className="a"
                        d="M67.048,344.994a1.182,1.182,0,0,0-1.671,0L54.345,356.026a1.182,1.182,0,0,0,1.671,1.671l11.032-11.032A1.182,1.182,0,0,0,67.048,344.994Z"
                        transform="translate(-53.999 -344.648)"
                      />
                    </g>
                    <g transform="translate(0 54.918)">
                      <path
                        className="a"
                        d="M4.735,469.347a1.182,1.182,0,0,0-1.671,0L.346,472.065a1.182,1.182,0,1,0,1.671,1.671l2.718-2.718A1.182,1.182,0,0,0,4.735,469.347Z"
                        transform="translate(0 -469.001)"
                      />
                    </g>
                    <g transform="translate(14.712 57.567)">
                      <path
                        className="a"
                        d="M127.6,491.756a1.181,1.181,0,1,0,.346.835A1.19,1.19,0,0,0,127.6,491.756Z"
                        transform="translate(-125.58 -491.41)"
                      />
                    </g>
                    <g transform="translate(17.618 48.774)">
                      <path
                        className="a"
                        d="M158.395,417.352a1.182,1.182,0,0,0-1.671,0L150.88,423.2a1.182,1.182,0,0,0,1.671,1.671l5.843-5.843A1.182,1.182,0,0,0,158.395,417.352Z"
                        transform="translate(-150.534 -417.006)"
                      />
                    </g>
                    <g transform="translate(37.574 48.326)">
                      <path
                        className="a"
                        d="M328.93,413.557a1.182,1.182,0,0,0-1.671,0l-5.859,5.859a1.182,1.182,0,1,0,1.671,1.671l5.859-5.859A1.182,1.182,0,0,0,328.93,413.557Z"
                        transform="translate(-321.053 -413.211)"
                      />
                    </g>
                    <g transform="translate(31.212 15.625)">
                      <path
                        className="a"
                        d="M268.447,133.726a1.181,1.181,0,1,0,.346.837A1.191,1.191,0,0,0,268.447,133.726Z"
                        transform="translate(-266.43 -133.38)"
                      />
                    </g>
                  </g>
                </svg>
                <h5>Successfully Sent</h5>
                <ul>
                  <li>
                    <span>
                      Thank you! Your Invoice has been sent to financial
                      Institute
                    </span>
                  </li>
                  <li>
                    <span>{this.state.selectedData ?' ' + this.state.selectedData.financierName + ' ' : ''}</span> <span> for financing.</span>
                  </li>
                </ul>
              </div>
              <div className="successfullmessageBody">
                <div className="successfullmessageBodytitle">
                  <h3>
                    <span>Order Details</span>
                  </h3>
                </div>
                <ul>
                  <li>
                    {" "}
                    <span>Document Name</span>
                    <span>:</span>
                    <span>{this.state.docResponse ? this.state.docResponse.docName : ''}</span>
                  </li>
                  <li>
                    <span>Document Hash</span>
                    <span>:</span>
                    <span>{this.state.docResponse ? this.state.docResponse.docHash : ''}</span>
                  </li>
                  <li>
                    {" "}
                    <span>{"Date & Time"}</span>
                    <span>:</span>
                    <span>{this.state.docResponse ?  unixTimestampToDate(this.state.docResponse.createdAt) + ' ' + getTimeFromUnixTimestamp(this.state.docResponse.createdAt) : ''}</span>
                  </li>
                </ul>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default ReviewTemplate;

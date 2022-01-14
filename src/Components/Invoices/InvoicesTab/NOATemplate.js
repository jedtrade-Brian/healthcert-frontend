import React, { Component } from 'react';
import {
  IconButton,
  Dialog,
  Button,
  DialogContentText,
} from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import './NOATemplate.css';
import CheckIcon from '@material-ui/icons/Check';
import { formatDate } from '../../Shared/dateTimeFormat';
import signDocService from '../../../services/signDocument';
import { BackdropLoader } from '../../../services/loader';
import InvoicesTemplate from '../../Shared/Documents/InvoicesTemplate';
import { formatAmount } from '../../Shared/amountFormat';
import InvestorTemplate from '../../InvoicesFinancial/InvestorSchedule/InvestorTemplate';

// const styles = (theme) => ({
//   root: {
//     margin: 0,
//     padding: theme.spacing(2),
//   },
//   closeButton: {
//     position: 'absolute',
//     left: theme.spacing(1),
//     top: theme.spacing(1),
//     color: theme.palette.grey[500],
//   },
// });

// const DialogTitle = withStyles(styles)((props) => {
//   const { children, classes, onClose, ...other } = props;
//   return (
//     <MuiDialogTitle disableTypography className={classes.root} {...other}>
//       {onClose ? (
//         <IconButton
//           aria-label='close'
//           className={classes.closeButton}
//           onClick={onClose}
//         >
//           <div>
//             <ArrowBackIosIcon /> <span>Back</span>
//           </div>
//         </IconButton>
//       ) : null}
//       <Typography variant='h6'>{children}</Typography>
//     </MuiDialogTitle>
//   );
// });

// const DialogContent = withStyles((theme) => ({
//   root: {
//     padding: theme.spacing(2),
//   },
// }))(MuiDialogContent);

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    left: theme.spacing(1),
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
          <ArrowBackIosIcon />
        </IconButton>
      ) : null}
      <Typography variant='h6' align={children ? 'center' : 'left'}>
        {children}
      </Typography>
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

class NOATemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      user: this.props.user ? this.props.user : null,
      financierCompanyDetails: this.props.financierCompanyDetails
        ? this.props.financierCompanyDetails
        : null,
      document: this.props.document ? this.props.document : null,
      selectedData: this.props.selectedData ? this.props.selectedData : null,
      investorDetails: this.props.investorDetails
        ? this.props.investorDetails
        : null,
      issuer: this.props.issuer ? this.props.issuer : null,
      via: this.props.via ? this.props.via : '',
      invoiceDocument: null,
      loader: false,
    };
  }

  componentDidMount() {
    // console.log('****** TTTTTT : ', this.state);
  }
  numberWithCommas(x) {
    if (x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    } else {
      return '';
    }
  }

  getInvoiceNumber = (data) => {
    let invoiceArr = [];
    if (data) {
      invoiceArr = data.map((item) => {
        return item.invNo;
      });
      if (invoiceArr.length) {
        return invoiceArr.join();
      }
      return '';
    } else {
      return '';
    }
  };

  modalOpenData = (data) => {
    console.log('Item : ', data);
    if (data.docHash) {
      this.setState({ loader: true });
      signDocService
        .getDocHash(data.docHash)
        .then((response) => {
          if (response && response.data) {
            console.log('response.data : ', response.data);
            const { recipientDetails, issuerDetails, doc } = response.data;
            const docInfo = JSON.parse(response.data.doc.docInfo);
            // const docType = response.data.doc.docType;
            doc['docInfo'] = docInfo;
            doc['docType'] = 'Invoices';
            this.setState({
              loader: false,
              openModal: true,
              invoiceDocument: {
                doc,
                issuerDetails,
                recipientDetails,
              },
            });
          }
        })
        .catch((error) => {
          console.log('Error : ', error);
          this.setState({ loader: false });
        });
    }
    // this.setState({ openModal: true });
  };

  handleClose = () => {
    this.setState({ openModal: false });
  };

  onAckClick = () => {
    this.props.history.push('/verifyDoc/financialAcknowledged');
  };

  render() {
    return (
      <div className='buyerSignedDocument'>
        <BackdropLoader open={this.state.loader} />
        <div className='buyerSignedDocumentMain'>
          {/* <span className="logo">Logo</span>
          <h3>{this.state.issuer ? this.state.issuer.individualName ? this.state.issuer.individualName : this.state.issuer.name : ''}</h3> */}
           {/* <span style={{fontSize: '24px',fontWeight: '300',paddingRight: '7px'}}>Issued by :</span>
           <span>{this.state.issuer ? this.state.issuer.individualName ? this.state.issuer.individualName : this.state.issuer.name : ''}</span> */}
          {/* {this.state.via === 'financialAcknowledge' && (
            <div className='supplierpart'>
              <h4>Issued by:</h4>
              <h5>{this.state.issuer ? this.state.issuer.companyName : ''}</h5>
              <ul className='documentpart'>
                <li>
                  <span className='check'>
                    <CheckIcon />
                  </span>
                  <span>NOA has not been tempered with</span>
                </li>
                <li>
                  <span className='check'>
                    <CheckIcon />
                  </span>
                  <span>NOA has been issued</span>
                </li>
                <li>
                  <span className='check'>
                    <CheckIcon />
                  </span>
                  <span>NOA issuer has been identified</span>
                </li>
                <li>
                  <span className='check'>
                    <CheckIcon />
                  </span>
                  <span>
                    NOA has been assigned and financed by Financial Institute
                  </span>
                </li>
              </ul>
            </div>
          )} */}

          <div className='noaDetailsSection' id='investor'>
            <div className='noaDetailHead'>
              <h5>To</h5>
              <ul>
                <li>
                  <span style={{fontWeight: '600'}}>
                    {this.state.document && this.state.document.recipientDetails
                      ? this.state.document.recipientDetails.companyName
                      : ''}
                  </span>
                </li>
                <li>
                  <span>
                    {this.state.document && this.state.document.recipientDetails
                      ? this.state.document.recipientDetails.fullAddress.address
                      ? this.state.document.recipientDetails.fullAddress.address
                      : ''
                      : ''}
                  </span>
                </li>
                <li>
                  <span>
                    {this.state.document && this.state.document.recipientDetails
                      ? this.state.document.recipientDetails.fullAddress.city 
                      ? this.state.document.recipientDetails.fullAddress.city
                      : ''
                      : ''}
                  </span>
                </li>
                {this.state.document && this.state.document.recipientDetails && this.state.document.recipientDetails.fullAddress && (this.state.document.recipientDetails.fullAddress.state || this.state.document.recipientDetails.fullAddress.zipcode) && (
                  <li>
                    <span>
                      {(this.state.document.recipientDetails.fullAddress.state ? this.state.document.recipientDetails.fullAddress.state : '' ) + ( this.state.document.recipientDetails.fullAddress.zipcode ? ' ' + this.state.document.recipientDetails.fullAddress.zipcode: '')}
                    </span>
                  </li>  
                )}
                {/* <li>
                  <span>
                    {this.state.document && this.state.document.recipientDetails
                      ? this.state.document.recipientDetails.fullAddress.state
                        ? this.state.document.recipientDetails.fullAddress.state +
                        ' ' + ( this.state.document.recipientDetails.fullAddress.zipcode
                          ? this.state.document.recipientDetails.fullAddress.zipcode
                          : '') 
                        : ''                         
                      : ''}
                  </span>
                </li> */}
                <li>
                  <span>
                    {this.state.document && this.state.document.recipientDetails
                      ? this.state.document.recipientDetails.phoneNumber
                      : ''}
                  </span>
                </li>
              </ul>
              <p>
                <span>For the attention of </span>
                <span>
                  {/* <b>{this.state.issuer && this.state.issuer.name ? this.state.issuer.name : ''}</b> */}
                  <b>
                    {this.state.document && this.state.document.recipientDetails
                      ? this.state.document.recipientDetails.name
                      : ''}
                  </b>
                </span>
              </p>
              <span>
                Date <b>{this.state.issuer.signDate ? formatDate(this.state.issuer.signDate) : ''}</b>
              </span>
              <h4>
                <span>NOTICE OF ASSIGNMENT OF RECEIVABLE</span>
              </h4>
            </div>
            <div className='noaDetailBody'>
              <div>
                <p>Dear Sir/ Madam,</p>
                <p>
                  We wish to inform you that we have assigned and/ or
                  transferred the receivables/ invoices [
                  {this.state.selectedData
                    ? this.getInvoiceNumber(
                        this.state.selectedData.selectedInvoices
                      )
                    : ''}
                  ].
                </p>
                <p>
                  Payment of any amount due must be made in accordance wih the
                  following instructions
                </p>
                <p  className="paraFlex">
                  <span>(a)</span>
                  <span>For cheques: Payment to be made out to{' '}
                  {this.state.financierCompanyDetails &&
                  this.state.financierCompanyDetails.financierDetails
                    ? ' ' +
                      this.state.financierCompanyDetails.financierDetails
                        .accountName +
                      ' '
                    : ''}{' '}
                  as payee with particulars of the invoices written on the back of the cheques</span>
                   
                </p>
                {/* <p>on the back of the cheques</p> */}
                <p>(b) For bank transfers: </p>
                <div>
                  <ul className='accountInfo'>
                    <li>
                      <span>Account Name : </span>
                      <span style={{ paddingLeft: '5px' }}>
                        {this.state.financierCompanyDetails &&
                        this.state.financierCompanyDetails.financierDetails
                          ? ' ' +
                            this.state.financierCompanyDetails.financierDetails
                              .accountName
                          : ''}
                      </span>
                    </li>
                    <li>
                      <span>Account Number : </span>
                      <span style={{ paddingLeft: '5px' }}>
                        {this.state.financierCompanyDetails &&
                        this.state.financierCompanyDetails.financierDetails
                          ? ' ' +
                            this.state.financierCompanyDetails.financierDetails
                              .accountNumber
                          : ''}
                      </span>
                    </li>
                    <li>
                      <span>Bank Name : </span>
                      <span style={{ paddingLeft: '5px' }}>
                        {this.state.financierCompanyDetails &&
                        this.state.financierCompanyDetails.financierDetails
                          ? ' ' +
                            this.state.financierCompanyDetails.financierDetails
                              .bankName
                          : ''}
                      </span>
                    </li>
                    <li>
                      <span>SWIFT : </span>
                      <span style={{ paddingLeft: '5px' }}>
                        {this.state.financierCompanyDetails &&
                        this.state.financierCompanyDetails.financierDetails
                          ? ' ' +
                            this.state.financierCompanyDetails.financierDetails
                              .swiftNumber
                          : ''}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* <span>XXXXXXXXXXXXXXXXXX.</span> */}
              <div>
                <p>
                  Please feel free to contact{' '}
                  {this.state.issuer ? ' ' + this.state.issuer.email + ' ' : ''}{' '}
                  if you have any questions about this notice or our new payment arrangements.
                </p>
                {/* <p>notice or our new payment arrangements.</p> */}
              </div>
              {/* <span>XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.</span> */}
              <div>
                <div className='recievablestatemnt'>
                  <p>PARTICULARS OF RECEIVABLES/ INVOICES ASSIGNED</p>
                </div>
                <table className='noaassignmentTable'>
                  <thead>
                    <tr>
                      <th>Invoice No.</th>
                      <th>Date</th>
                      {/* ,display: 'flow-root' */}
                      <th style={{textAlign: 'right'}}>Amount(S$)</th> 
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.selectedData &&
                      this.state.selectedData.selectedInvoices &&
                      this.state.selectedData.selectedInvoices.map(
                        (item, index) => (
                          <tr key={index}>
                            <td onClick={() => this.modalOpenData(item)}>
                              <span className='label'>Invoice No.</span>
                              <span>{item.invNo}</span>
                            </td>
                            <td onClick={() => this.modalOpenData(item)}>
                              <span className='label'>Date</span>
                              <span>{formatDate(new Date(item.invDate))}</span>
                            </td>
                            <td onClick={() => this.modalOpenData(item)}>
                              <span className='label'>Amount(S$)</span>
                              <span className='amount'>
                                {this.numberWithCommas(
                                  formatAmount(Number(item.amount))
                                )}
                              </span>
                            </td>
                          </tr>
                        )
                      )}
                  </tbody>
                </table>
                {/* {this.state.investorDetails && (
                  <table className='noaassignmentTable investorDetailTable'>
                    <thead>
                      <tr style={{ backgroundColor: '#0e060645' }}>
                        <th style={{ width: '20%' }}>Investor Id</th>
                        <th style={{ width: '20%' }}>Investor: Company Name</th>
                        <th
                          style={{
                            width: '20%',
                            borderRight: '1px solid #ccc',
                          }}
                        >
                          Investor Percentage
                        </th>
                        <th
                          style={{
                            width: '20%',
                            borderRight: '1px solid #ccc',
                          }}
                        >
                          Transaction Brief
                        </th>
                        <th style={{ width: '20%' }}>Transaction Number</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.investorDetails &&
                        this.state.investorDetails.map((item, index) => (
                          <tr key={index}>
                            <td
                              style={{ width: '20%' }}
                              onClick={this.modalOpenData}
                            >
                              <span className='label'>Investor Id</span>
                              <span>{item.invtId}</span>
                            </td>
                            <td
                              style={{ width: '20%' }}
                              onClick={this.modalOpenData}
                            >
                              <span className='label'>
                                Investor: Company Name
                              </span>
                              <span>{item.invtCpy}</span>
                            </td>
                            <td
                              style={{
                                width: '20%',
                                borderRight: '1px solid #ccc',
                              }}
                              onClick={this.modalOpenData}
                            >
                              <span className='label'>Investor Percentage</span>
                              <span>{item.invtPercent}</span>
                            </td>
                            <td
                              style={{
                                width: '20%',
                                borderRight: '1px solid #ccc',
                              }}
                              onClick={this.modalOpenData}
                            >
                              <span className='label'>Transaction Brief</span>
                              <span>{item.transBrief}</span>
                            </td>
                            <td
                              style={{ width: '20%' }}
                              onClick={this.modalOpenData}
                            >
                              <span className='label'>Transaction Number</span>
                              <span>{item.transNo}</span>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                )} */}
              </div>
              <div>
                <p>Yours Sincerely,</p>
              </div>
              <div>
                <ul className='signedSection'>
                  <li>
                    <span>
                      <b>Digitally Confirmed and Signed By:</b>
                    </span>
                  </li>
                  <li>
                    <span>
                      <b>Name :</b>
                    </span>
                    <span style={{ paddingLeft: '5px' }}>
                      {this.state.issuer
                        ? this.state.issuer.individualName
                          ? this.state.issuer.individualName
                          : this.state.issuer.name
                        : ''}
                    </span>
                  </li>
                  <li>
                    <span>
                      <b>Designation : </b>
                    </span>
                    <span style={{ paddingLeft: '5px' }}>
                      {this.state.issuer ? this.state.issuer.designation ? this.state.issuer.designation : this.state.issuer.Designation : ''}
                    </span>
                  </li>
                  <li>
                    <span>
                      <b>Date :</b>
                    </span>
                    <span style={{ paddingLeft: '5px' }}>
                      {this.state.issuer ? this.state.issuer.signDate ? formatDate(this.state.issuer.signDate) : '' : ''}
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <p className='bottomStatement'>
                  <span>
                    This document is electronically generated. The document hash
                    has been recorded on Blockchain. To verify the authentically
                    of this document, please verify at{' '}
                    <a href='https://renderer.consentrade.io' target='_blank'>
                      https://renderer.consentrade.io
                    </a>
                  </span>
                </p>
              </div>
            </div>
          </div>
          {this.state.investorDetails && (
            <div style={{marginTop: '10px'}}>
              <InvestorTemplate data={this.state.investorDetails} purchaseDate= {this.state.issuer.signDate}></InvestorTemplate>
            </div>
          )}

          {this.props &&
          this.props.location &&
          this.props.location.pathname === '/financialAcknowledge' ? (
            <div className='ackBtn'>
              <Button className='financeBtn' onClick={this.onAckClick}>
                ACKNOWLEDGE
              </Button>
            </div>
          ) : (
            ''
          )}

          <Dialog
            open={this.state.openModal}
            onClose={this.handleClose}
            aria-labelledby='simple-modal-title'
            aria-describedby='scroll-dialog-description'
            className='saleModaleTemplate'
          >
            <DialogTitle
              id='customized-dialog-title'
              onClose={this.handleClose}
            >
              Invoices
            </DialogTitle>
            <DialogContent>
              <InvoicesTemplate
                document={this.state.invoiceDocument}
                showTerms={false}
                showDigitalSign={true}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    );
  }
}

export default NOATemplate;

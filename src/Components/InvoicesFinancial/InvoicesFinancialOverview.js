import React, { Component } from 'react';
import { OverviewList, SupplierList } from './InvoicesFinancialConfig';
import './InvoicesFinancial.css';
import {
  Button,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
} from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { Checkbox } from 'pretty-checkbox-react';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import { IconButton, Dialog } from '@material-ui/core';
import BuyerSignedDocument from '../BuyerQuotation/BuyerSignedDocument';
import ConfirmDeclineIcon from '../../assets/confirm.svg';
import DateRange from '../Shared/DateRange';
import NewReactTableComponent from '../../ReactTable/NewReactTable';
import Link from '@material-ui/core/Link';
import authService from '../../services/authService';
import { BackdropLoader } from '../../services/loader';
import { getSuplierInvoices,declineInvoiceRequest,getInvoiceRelatedDocs,getFinancierDocumentDetails } from '../../services/financierService';
import { unixTimestampToDate, formatDate, getTimeFromUnixTimestamp } from '../Shared/dateTimeFormat';
import NOATemplate from '../Invoices/InvoicesTab/NOATemplate';
import InvoicesTemplate from '../Shared/Documents/InvoicesTemplate';
import PaymentCertTemplate from '../Shared/Documents/PaymentCertTemplate';
import signDocService from '../../services/signDocument';
import SaleModalTemplate from '../Dashboard/DashboardTabSetup/SaleModalTemplate';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import { formatAmount, numberWithCommas } from '../Shared/amountFormat';

// import { formatDate } from '../Shared/dateTimeFormat';

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

class InvoicesFinancialOverView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
      pageNo: 0,
      rows: 5,
      value: 0,
      buttonData: 'Invoices',
      openSupplierRowModal: false,
      openViewModal: false,
      rowData: false,
      selected: {},
      selectedArray: [],
      // totalCount: this.state.supplierData.length,
      selectAll: false,
      radioValue: 'pending',
      activeStep: 1,
      // openConfirmModal: false,
      openDeclinedModal: false,
      openDateRangeModal: false,
      supplierData: [],
      via: '',
      pendingInvoices : null,
      financedInvoices : null,
      declinedInvoices: null,
      suplierEmail: null,
      invoiceDetails: null,
      documentType: null,
      financierCompanyDetails: null,
      user: authService.getUserInfo(),
      docReciepient: null,
      selectedData: null,
      document : {
        doc: null,
        issuerDetails: null,
        recipientDetails: null,
        isSigned: false,
        isRevoked: false
      },
      investorDetails: null,
      suplierName: null,
      oaStatus: null,
      docIssuer: null,
      listData: this.props.overviewData ? this.props.overviewData : [],
      search: '',
      actualData: this.props.overviewData ? this.props.overviewData : [],
      disableButton: false
    };
  }

  componentDidMount() {
    let supplier = '';
    if (this.props.location && this.props.location.search) {
      supplier = new URLSearchParams(this.props.location.search).get(
        'supplier'
      );
    }
    if (supplier) {
      this.setState({ via: 'dashboard',suplierEmail: supplier });
      this.getInvoicesOnSuplierEmail(supplier);
    }
  }

  setTableData() {
    let supplierData = this.state.radioValue === 'pending' ? this.state.pendingInvoices : this.state.radioValue === 'financed' ? this.state.financedInvoices : this.state.declinedInvoices;
    this.setState({supplierData})
  }

  handleChange = (event) => {
    this.setState({supplierData: null , radioValue: event.target.value, disableButton: event.target.value !== 'pending'},() => {
       this.setTableData()
    });
  };

  backButton = () => {
    this.setState(
      { 
        rowData: false, 
        selectAll: false,
        selected: [],
        selectedArray: [],
      }
    );
    if (this.state.via && this.state.via === 'dashboard') {
      this.props.history.goBack();
    }
  };

  toggleSelectAllRow = (isChecked) => {
    if (isChecked) {
      this.getSalesTab();
    } else {
      this.setState({
        selectAll: false,
        selectedArray: [],
        selected: {},
      });
    }
  };

  getSalesTab = () => {
    let selectedArr = [];
    let consolidateArray = [];
    this.state.supplierData.map((item) => {
      consolidateArray[item.docHash] = true;
      return selectedArr.push(item);
    });
    this.setState({
      selectAll: true,
      selected: consolidateArray,
      selectedArray: selectedArr,
    });
  };

  toggleRowNew = (docHash, rowInfo) => {
    const newSelected = Object.assign({}, this.state.selected);
    newSelected[docHash] = !this.state.selected[docHash];
    this.setState({
      selected: newSelected,
    });
    const { selectedArray } = this.state;
    let arr = selectedArray.filter((val) => val.docHash !== docHash);
    if (!arr.length) {
      this.setState(
        {
          selectedArray: [],
        },
        () => {
          this.onRowSelected(this.state.selectedArray);
        }
      );
    }
    if (arr.length === selectedArray.length) {
      this.setState(
        {
          selectedArray: [...selectedArray, rowInfo],
        },
        () => {
          this.onRowSelected(this.state.selectedArray);
        }
      );
    } else {
      this.setState(
        {
          selectedArray: arr,
        },
        () => {
          this.onRowSelected(this.state.selectedArray);
        }
      );
    }
  };
  onRowSelected = (sarray) => {
    if (sarray.length === this.state.supplierData.length) {
      this.setState({ selectAll: true });
    } else {
      this.setState({ selectAll: false });
    }
  };

  getInvoiceTableData = (radio) => {
    console.log('Radio Button : ',radio);
    return radio === 'pending' ? [...this.state.pendingInvoices] : [...this.state.financedInvoices];
  }

  getInvoicesOnSuplierEmail(suplierEmail) {
    this.setState({ loader: true });

  getSuplierInvoices(suplierEmail)
      .then((response) => {
        console.log('Response : ', response);
        // let invoices = [];
        let pendingInvoices = [];
        let financedInvoices = [];
        let declinedInvoices = [];
        let supplierName = null
        if (response && response.data) {
          let invoicesObj = {};
          supplierName = response.data.invoices[0].supplierName;
          // const docInfo = JSON.parse(response.data.invoices[0].docInfo)
          // console.log('*********',docInfo);
          const sortedData = response.data.invoices.sort(function(a, b){ 
            return new Date(b.createdAt) - new Date(a.createdAt); 
          });
          for (const data of sortedData) {
            const docInfo = JSON.parse(data.docInfo);
            const currency = docInfo.docDetails.currency;
            // const creditTerm = docInfo.docDetails.terms + ' days';
            invoicesObj[data.buyerEmail] = invoicesObj[data.buyerEmail]
              ? [
                  ...invoicesObj[data.buyerEmail],
                  {
                    ...data,
                    invAmount: numberWithCommas(formatAmount(data.invAmt)),
                    status: data.isRevoked ? 'Revoked' : '',
                    docInfo,
                    currency,
                    creditTerm : docInfo.docDetails.terms + ' days',
                    // buyerName: data.buyerEmail,
                    invoiceDate: data.invDate ?
                      String(new Date(data.invDate)).trim() !== 'Invalid Date'
                        ? unixTimestampToDate(data.invDate)
                        : ''  : '',
                    invoiceDueDate: data.invDueDate ? unixTimestampToDate(data.invDueDate) : ''
                      //  String(new Date(data.invDueDate)).trim() !==
                      // 'Invalid Date'
                      //   ? unixTimestampToDate(data.invDueDate)
                      //   : '' 
                      //   : '',
                  },
                ]
              : [
                  {
                    ...data,
                    invAmount: numberWithCommas(formatAmount(data.invAmt)),
                    status: data.isRevoked ? 'Revoked' : '',
                    docInfo,
                    currency,
                    creditTerm: docInfo.docDetails.terms + ' days',
                    // buyerName: data.buyerEmail,
                    invoiceDate:
                      String(new Date(data.invDate)).trim() !== 'Invalid Date'
                        ? unixTimestampToDate(data.invDate)
                        : '',
                    invoiceDueDate:
                      String(new Date(data.invDueDate)).trim() !==
                      'Invalid Date'
                        ? unixTimestampToDate(data.invDueDate)
                        : '',
                  },
                ];
          }
          
          for (const [key, value] of Object.entries(invoicesObj)) {
            value.map(item => {
              if(item.financingStatus === 1){
                pendingInvoices = [...pendingInvoices, item];
              }
              if(item.financingStatus === 2){
                financedInvoices = [...financedInvoices, item];
              }
              if(item.financingStatus === 3) {
                declinedInvoices = [...declinedInvoices , item]
              } 
            })
                 
          }
        }
        // console.log('pendingInvoices : ',pendingInvoices);
        this.setState({
          pendingInvoices,
          financedInvoices,
          declinedInvoices,
          loader: false,
          rowData: true,
          supplierData: pendingInvoices,
          supplierName
        });
      })
      .catch((err) => {
        this.setState({ loader: false });
        console.log('Error : ', err);
      });
  }

  onInvoicesFinRowClick = (e) => {
    // this.setState({ loader: true, rowData: true });
    if (e && e.original && e.original.email) {
      this.setState({suplierEmail: e.original.email})
      this.getInvoicesOnSuplierEmail(e.original.email);
    }
  };

  onFinanceClick = () => {
    console.log('this.state.selectedArray : ',this.state.selectedArray);
    authService.setSelectedInvoices(this.state.selectedArray);
    this.props.history.push('/invoicesFinancial/invoices/investorSchedule');
  };
  // onFinanceConfirmClick = () => {
  //   this.props.history.push({
  //     pathname: '/verificationCode/financial',
  //     state: {
  //       mobileNo: '1234567890',
  //       email: 'nikhilsinghal@gmail.com',
  //     },
  //   });
  // };
  // onFinanceCancelClick = () => {
  //   this.setState({ openConfirmModal: false });
  // };

  onDeclinedClick = () => {
    this.setState({ openDeclinedModal: true });
  };
  onDeclinedConfirmClick = (e) => {
    const invNumbers = this.state.selectedArray.map((item) => {
      return { invNo: item.invNo };
    });
    // console.log('this.state.selectedArray', this.state.selectedArray);
    this.setState({loader: true})
    declineInvoiceRequest(invNumbers)
      .then((resp) => {
        console.log('declineInvoice resp', resp);
        this.setState({ openDeclinedModal: false, loader: false,rowData: false },() => {this.props.onDeclineConfirmClick()});
      })
      .catch((error) => {
        console.log('declineInvoice error', error);
        this.setState({ loader: false });
      });
    // this.setState({ openDeclinedModal: false });
    // this.props.onDeclineConfirmClick();
  };
  onDeclinedCancelClick = () => {
    this.setState({ openDeclinedModal: false });
  };

  onSupplierRowClick = (rowData) => {
    // console.log('Row Data : ',rowData);
    // original.docHash
    this.setState({loader: true})
    getInvoiceRelatedDocs(this.state.suplierEmail,rowData.original.docHash).then(response => {
      let invoiceDetails = null
      if(response && response.data){
        // console.log('%%%%%%',response.data);
        const invoice = rowData.original;
        const {documentList,statuses} = {...response.data}
        invoiceDetails = {
          invoice,
          documentList,
          statuses
        }
      }
      this.setState({loader: false,invoiceDetails,openSupplierRowModal: true})
    }).catch(err => {
      console.log('Error : ',err);
      this.setState({loader: false})
    })
    // this.setState({ openSupplierRowModal: true });
  };
  handleSupplierRowModalClose = () => {
    this.setState({ openSupplierRowModal: false });
  };
  onSelectClick = (invoice) => {
    this.toggleRowNew(invoice.docHash, invoice)
    this.setState({ openSupplierRowModal: false });
  };

  onViewClick = (rowData) => {
    // console.log('Row Data : ',rowData);
    this.setState({loader: true })
    if(rowData.docType === 'NOA') {
      getFinancierDocumentDetails(rowData.docHash).then(response => {
          // console.log('XXXXXX Response : ',response);
          let financierCompanyDetails = null;
          let docReciepient = null;
          let selectedData = null;
          let investorDetails = null;
          let docIssuer = null;
          let oaStatus = null;
          if(response && response.data){
           const data = response.data
          //  console.log('Response %%% : ',response);
           financierCompanyDetails = {
              financierDetails : {
                accountName: data.docInfo && data.docInfo.financierDetails ? data.docInfo.financierDetails.bankDetails.accName : '',
                accountNumber: data.docInfo && data.docInfo.financierDetails ? data.docInfo.financierDetails.bankDetails.accNum : '',
                bankName: data.docInfo && data.docInfo.financierDetails ? data.docInfo.financierDetails.bankDetails.bankName : '',
                swiftNumber: data.docInfo && data.docInfo.financierDetails ? data.docInfo.financierDetails.bankDetails.swiftNo : ''
              },
              email: data.docInfo && data.docInfo.financierDetails ? data.docInfo.financierDetails.email : ''
            }
           docReciepient = {
              recipientDetails: {
                name: data.docInfo && data.docInfo.recipient ? data.docInfo.recipient.name : '',
                companyName: data.docInfo && data.docInfo.recipient ? data.docInfo.recipient.cpyName : '',
                fullAddress: {
                  // ...data.docInfo.recipient,
                  address: data.docInfo && data.docInfo.recipient ? data.docInfo.recipient.address : '',
                  zipcode: data.docInfo && data.docInfo.recipient ? data.docInfo.recipient.zipcode : '',
                  state: data.docInfo && data.docInfo.recipient ? data.docInfo.recipient.state : '',
                  city: data.docInfo && data.docInfo.recipient ? data.docInfo.recipient.city : '',
                },
                phoneNumber: data.docInfo && data.docInfo.recipient ? data.docInfo.recipient.phoneNo : ''
              }
            }
            selectedData = {
              selectedInvoices: data.docInfo && data.docInfo.reqInfo ? data.docInfo.reqInfo.map(item => (
                {
                  invNo: item.invNo,
                  invDate: item.date,
                  amount: item.amt
                }
              )) : []
            }
            investorDetails = data.docInfo ? data.docInfo.noaDetails : null;
            docIssuer = {
              ...data.docInfo.issuers[0],
              name: data.docInfo.issuers[0].name,
              signDate: data.docInfo && data.docInfo.recipient ? data.docInfo.recipient.date : '',
            };
            oaStatus = data.oaStatus;
          }
        this.setState({loader: false, oaStatus, docIssuer ,investorDetails,openViewModal: true , documentType: rowData.docType,financierCompanyDetails,docReciepient,selectedData})
      }).catch(err => {
        console.log('Errr : ',err);
        this.setState({loader: false})
      })
    } else {
      signDocService.getDocHash(rowData.docHash).then(response => {
        let doc = null;
        let oaStatus = null;
        if (response && response.data) {
          console.log('response.data : ', response.data);
          doc = response.data.doc;
          const docInfo = JSON.parse(response.data.doc.docInfo);
          const docType = response.data.doc.docType;
          oaStatus = response.data.oaStatus
          doc['docInfo'] = docInfo;
          doc['docType'] = this.getDocumentName(docType);
        }
        this.setState({
          // openSupplierRowModal: false,
          oaStatus,
          loader: false,
          openModalQuotation: true,
          document: {
            doc,
            issuerDetails: response.data.issuerDetails,
            recipientDetails: response.data.recipientDetails
          },
          openViewModal: true ,
          documentType: rowData.docType
        });
      }).catch(err => {
        console.log('Errr : ',err);
        this.setState({loader: false})
      })
    }
    // this.setState({ openViewModal: true , documentType});
  };
  handleViewModalClose = () => {
    this.setState({ openViewModal: false });
  };

  getSteps = () => {
    return [
      'Document has not been tempered with',
      'Document has been issued',
      'Document issue has been identified',
    ];
  };

  openDateRange = () => {
    this.setState({ openDateRangeModal: true });
  };
  closeDateRange = () => {
    this.setState({ openDateRangeModal: false });
  };

  handleSaveDate = (date) => {};

  getDocDate = (docData) => {
    if(docData) {
      if(docData.revoked){
        return unixTimestampToDate(docData.revoked) + ' ' + getTimeFromUnixTimestamp(docData.revoked)
      }
      if(docData.signed){
        return unixTimestampToDate(docData.signed) + ' ' + getTimeFromUnixTimestamp(docData.signed)
      }
      if(docData.issued){
        return unixTimestampToDate(docData.issued) + ' ' + getTimeFromUnixTimestamp(docData.issued)
      }
    }
    return ""
    // switch(docType) {
    //   case 'SQ' : 
    //    return this.state.invoiceDetails ?
    //     this.state.invoiceDetails.statuses.quotationSigned 
    //     ? unixTimestampToDate(this.state.invoiceDetails.statuses.quotationSigned) + ' ' + getTimeFromUnixTimestamp(this.state.invoiceDetails.statuses.quotationSigned)
    //     : this.state.invoiceDetails.statuses.quotationSent 
    //     ? unixTimestampToDate(this.state.invoiceDetails.statuses.quotationSent) + ' ' + getTimeFromUnixTimestamp(this.state.invoiceDetails.statuses.quotationSent)
    //     : '' 
    //    : ''
    //   case 'PC' :
    //     return this.state.invoiceDetails ? this.state.invoiceDetails.statuses.paymentCertSigned 
    //     ? unixTimestampToDate(this.state.invoiceDetails.statuses.paymentCertSigned) + ' ' + getTimeFromUnixTimestamp(this.state.invoiceDetails.statuses.paymentCertSigned)
    //     : this.state.invoiceDetails.statuses.paymentCertSent 
    //     ? unixTimestampToDate(this.state.invoiceDetails.statuses.paymentCertSent)+ ' ' + getTimeFromUnixTimestamp(this.state.invoiceDetails.statuses.paymentCertSent) : '' : '';
    //   case 'Inv' :
    //     return this.state.invoiceDetails ? this.state.invoiceDetails.statuses.invoiceSent ? unixTimestampToDate(this.state.invoiceDetails.statuses.invoiceSent)+ ' ' + getTimeFromUnixTimestamp(this.state.invoiceDetails.statuses.invoiceSent) : '' : '';
    //   case 'NOA' :
    //     return this.state.invoiceDetails ? this.state.invoiceDetails.statuses.noaSent ? unixTimestampToDate(this.state.invoiceDetails.statuses.noaSent)+ ' ' + getTimeFromUnixTimestamp(this.state.invoiceDetails.statuses.noaSent) : '' : '';
    //   default :
    // }
  }

  getDocumentName = (docType) => {
    switch(docType) {
      case 'SQ' : 
       return 'Sales Quotation'
      case 'PC' :
        return 'Payment Certificate'
      case 'Inv' :
        return 'Invoice'
      case 'NOA' :
        return 'NOA'
      default :
    }
  }

  getDocStatus = (doc) => {
    if(doc){
      switch(doc.docType) {
        case 'SQ' : 
          if(doc.revoked) {
            return 'Revoked';
          } else {
            return doc.signed ? 'Signed' : doc.issued ? 'Pending' : '';
          }
        case 'PC' :
          if(doc.revoked) {
            return 'Revoked';
          } else {
            return doc.signed ? 'Signed' : doc.issued ? 'Pending' : '';
          }
        case 'Inv' :
          if(doc.revoked) {
            return 'Revoked';
          } else {
            return doc.signed ? 'Issued' : doc.issued ? 'Issued' : '';
          }
        case 'NOA' :
          if(doc.revoked) {
            return 'Revoked';
          } else {
            return doc.signed ? 'Accepted' : doc.issued ? 'Issued' : '';
          }
        default :
          return ''
      }
    }  
    return '';
  }

  // getDocStatus = (docType) => {
  //   if(this.state.invoiceDetails && this.state.invoiceDetails.statuses){
  //     switch(docType) {
  //       case 'SQ' : 
  //         if(this.state.invoiceDetails.statuses.quotationRevoked) {
  //           return 'Revoked';
  //         } else {
  //           return this.state.invoiceDetails.statuses.quotationSigned ? 'Signed' : this.state.invoiceDetails.statuses.quotationSent ? 'Pending' : '';
  //         }
  //       case 'PC' :
  //         if(this.state.invoiceDetails.statuses.paymentCertRevoked) {
  //           return 'Revoked';
  //         } else {
  //           return this.state.invoiceDetails.statuses.paymentCertSigned ? 'Signed' : this.state.invoiceDetails.statuses.paymentCertSent ? 'Pending' : '';
  //         }
  //       case 'Inv' :
  //         if(this.state.invoiceDetails.statuses.invoiceRevoked) {
  //           return 'Revoked';
  //         } else {
  //           return this.state.invoiceDetails.statuses.invoiceSent ? 'Issued' : '';
  //         }
  //       case 'NOA' :
  //         if(this.state.invoiceDetails.statuses.noaRevoked) {
  //           return 'Revoked';
  //         } else {
  //           return this.state.invoiceDetails.statuses.noaAccepted ? 'Accepted' : this.state.invoiceDetails.statuses.noaSent ? 'Issued' : '';
  //         }
  //       default :
  //         return ''
  //     }
  //   } else {
  //     return '';
  //   }
  // }

  finalSearch = () => {
    const listData = this.state.actualData.filter(data => {
      if(data) {
        if(data.companyName.toLowerCase().includes(this.state.search.toLowerCase())){
          return true;
        }
        return false
      }    
    })
    this.setState({
      listData
    })
  }

  handleSearchChange = () => {
    this.setState({
      listData: null
    },() => this.finalSearch())
    
  }

  searchValueChange = () => {
    this.handleSearchChange(this.state.search)
 }


  render() {
    const nameColumn = [
      {
        Header: 'S.',
        Cell: (row) => {
          return <div className='dot'>{row.original.sNo}</div>;
        },
        width: 45,
      },
    ];

    const checkboxColumn = [
      {
        Header: (obj) => {
          return (
            <Checkbox
            className="selectallCheck"
              size='small'
              value='small'
              color='primary'
              inputprops={{ 'aria-label': 'checkbox with small size' }}
              checked={this.state.selectAll}
              onChange={(e) => {
                this.toggleSelectAllRow(e.target.checked);
              }}
            />
          );
        },
        Cell: (rowInfo) => {
          return (
            <Checkbox
              size='small'
              value='small'
              color='primary'
              inputprops={{ 'aria-label': 'checkbox with small size' }}
              checked={this.state.selected[rowInfo.original.docHash] === true}
              onChange={() =>
                this.toggleRowNew(rowInfo.original.docHash, rowInfo.original)
              }
            />
          );
        },
      },
    ];

    const columns = nameColumn.concat(OverviewList.columns);
    const SuppliercolumnsPending = this.state.supplierData && this.state.supplierData.length ? SupplierList.columns.concat(checkboxColumn) : SupplierList.columns;
    const SuppliercolumnsFinanced = SupplierList.columns;
    // const SuppliercolumnsDeclined = SupplierList.columns;

    return this.state.rowData === false ? (
      <div>
        <BackdropLoader open={this.state.loader} />
        <div className='salesaction'>
          <div className='saleactionTwo'>
            {/* <DateRange onSave={this.handleSaveDate}></DateRange> */}
            <form noValidate autoComplete="off"> 
              <TextField 
                 id="outlined-basic" 
                 label="Filter by Supplier Name"  
                 variant="outlined" 
                 value={this.state.search}
                 onChange={(e) => this.setState({search: e.target.value})}
                 onKeyUp={this.searchValueChange}
              />
            </form>
          </div>
        </div>

        {this.state.listData && (
          <div className='invoicefinanceOverviewTable'>
            <NewReactTableComponent
              listData={this.state.listData}
              listConfig={OverviewList}
              columns={columns}
              onHeaderClick={this.sortByHeader}
              onRowClick={this.onInvoicesFinRowClick}
              rowsPerPageOptions={[5, 10, 25, 50, 100]}
              forSerialNo={{
                pageNo: this.state.pageNo,
                pageSize: this.state.rows,
              }}
            />
          </div>
        )}
      </div>
    ) : (
      <div>
        <BackdropLoader open={this.state.loader} />
        <div>
          <div className='noaBackBTn'>
            <Button onClick={this.backButton}>
              <span>
                <ArrowBackIosIcon />
              </span>
              Back
            </Button>
          </div>
          <div className='subinvoiefinanceHead'>
            <h2>{this.state.supplierName ? this.state.supplierName : ''}</h2>
            <div className='invoiceOverviewAction'>
              <FormControl component='fieldset'>
                <RadioGroup
                  value={this.state.radioValue}
                  onChange={this.handleChange}
                >
                  <FormControlLabel
                    value='pending'
                    control={<Radio />}
                    label='Pending'
                  />
                  <FormControlLabel
                    value='financed'
                    control={<Radio />}
                    label='Financed'
                  />
                  <FormControlLabel
                    value='declined'
                    control={<Radio />}
                    label='Declined'
                  />
                </RadioGroup>
              </FormControl>
              <Button
                  className='declinedBtn'
                  onClick={this.onDeclinedClick}
                  disabled={this.state.disableButton || !(
                      this.state.selectAll === true ||
                      this.state.selectedArray.length > 0
                    )
                  }
                >
                  DECLINED
                </Button>
                <Button
                  className='financeBtn'
                  onClick={this.onFinanceClick}
                  disabled={this.state.disableButton || !(
                      this.state.selectAll === true ||
                      this.state.selectedArray.length > 0
                    )
                  }
                >
                  FINANCE
                </Button>
              {/* {this.state.disableButton && (
               <>
                
               </>
              )} */}
            </div>
            <div className=' supplierTable'>
            {this.state.supplierData && (
                <NewReactTableComponent
                  listData={this.state.supplierData}
                  listConfig={SupplierList}
                  columns={ 
                    this.state.radioValue === 'pending'
                      ? SuppliercolumnsPending
                      : SuppliercolumnsFinanced
                  }
                  onHeaderClick={this.sortByHeader}
                  // onRowClick={this.onSupplierRowClick}
                  onCellClick={this.onSupplierRowClick}
                  rowAndCellBothClick={true}
                  cellClickColName={'invNo'}
                  rowsPerPageOptions={[5, 10, 25, 50, 100]}
                  forSerialNo={{
                    pageNo: this.state.pageNo,
                    pageSize: this.state.rows,
                  }}
                />
              ) 
            } 
           </div>
          </div>
        </div>
        <div>
          <Dialog
            open={this.state.openSupplierRowModal}
            onClose={this.handleSupplierRowModalClose}
            aria-labelledby='simple-modal-title'
            ariadescribedby='simple-modal-description'
            className='financeDetailModal'
          >
            <DialogTitle
              id='customized-dialog-title'
              // onClose={this.handleSupplierRowModalClose}
            ></DialogTitle>
            <DialogContent>
              <div>
                <div className='modalHead'>
                  <Button onClick={this.handleSupplierRowModalClose}>
                    <span>
                      <ArrowBackIosIcon />
                    </span>
                  </Button>
                  <h3>FINANCING DETAILS</h3>
                </div>
                <div className='financetablefirst'>
                  <table className='table'>
                    <thead>
                      <tr>
                        <th>Supplier's Name</th>
                        <th>Buyer's Name</th>
                        <th>Invoice No.</th>
                        <th>Invoice Amount</th>
                        <th>Invoice Date</th>
                        <th>Invoice Due Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <span className='label'>Supplier's Name</span>
                          <span>{this.state.supplierName ? this.state.supplierName : ''}</span>
                        </td>
                        <td>
                          <span className='label'>Buyer's Name</span>
                          <span>{this.state.invoiceDetails ? this.state.invoiceDetails.invoice.buyerName : ''}</span>
                        </td>
                        <td>
                          <span className='label'>Invoice No.</span>
                          <span>{this.state.invoiceDetails ? this.state.invoiceDetails.invoice.invNo : ''}</span>
                        </td>
                        <td>
                          <span className='label'>Invoice Amount</span>
                          <span>{this.state.invoiceDetails ? this.state.invoiceDetails.invoice.invAmount : ''}</span>
                        </td>
                        <td>
                          <span className='label'>Invoice Date</span>
                          <span>{this.state.invoiceDetails ? this.state.invoiceDetails.invoice.invoiceDate : ''}</span>
                        </td>
                        <td>
                          <span className='label'>Invoice Due Date</span>
                          <span>{this.state.invoiceDetails ? this.state.invoiceDetails.invoice.invoiceDueDate : ''}</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className='financetableSecond'>
                  <table className='table' style={{width: '100%'}}>
                    <thead>
                      <tr>
                        <th style={{width:'20%'}}>Document No.</th>
                        <th style={{width:'20%'}}>Doc Type</th>
                        <th style={{width:'30%'}}>Doc Hash</th>
                        <th style={{width:'15%'}}>Date & Time</th>
                        <th style={{width:'10%'}}>Status</th>
                        <th style={{width:'5%'}}></th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.invoiceDetails && this.state.invoiceDetails.documentList && this.state.invoiceDetails.documentList.map((item,index) => 
                        (
                          <tr key={index}>
                            <td style={{wordWrap:'break-word', minWidth:'20%'}}>
                              <span className='label'>Document No.</span>
                              <span>{item.docNo}</span>
                            </td>
                            {/* getDocumentName */}
                            <td style={{wordWrap:'break-word', minWidth:'20%'}}>
                              <span className='label'>Doc Type</span>
                              <span>{item.docType}</span>
                            </td>
                            <td style={{ maxWidth:'30%'}}>
                              <span className='label'>Doc Hash</span>
                              <span style={{overflowWrap:'break-all'}}>{item.docHash}</span>
                            </td>
                            <td style={{wordWrap:'break-word', minWidth:'15%'}}>
                              <span className='label'>Date</span>
                              <span>{this.getDocDate(item)}</span>
                            </td>
                            <td style={{wordWrap:'break-word', minWidth:'10%'}}>
                              <span className='status'>{this.getDocStatus(item)}</span>
                            </td>
                            <td style={{wordWrap:'break-word', minWidth:'5%'}}>
                              <Link
                                style={{ cursor: 'pointer' }}
                                onClick={() => this.onViewClick(item)}
                              >
                                View
                              </Link>
                            </td>
                          </tr>
                        )
                      )}
                      
                    </tbody>
                  </table>
                </div>
                {this.state.radioValue === 'pending' && (
                  <div className='selectBtn'>
                  <Button className='financeBtn' onClick={() => this.onSelectClick(this.state.invoiceDetails.invoice)}>
                    SELECT
                  </Button>
                </div>
                )}  
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <div>
          <Dialog
            open={this.state.openViewModal}
            onClose={this.handleViewModalClose}
            aria-labelledby='simple-modal-title'
            ariadescribedby='simple-modal-description'
            className='saleModaleTemplate invoicefinancModal'
          >
            <DialogTitle
              id='customized-dialog-title'
              onClose={this.handleViewModalClose}
            ></DialogTitle>
            <DialogContent>
              {/* <BuyerSignedDocument via='financial' /> */}
              <div className='noaTemplate'>
                {this.state.oaStatus && (
                  <ul className='documentpart'>
                    <li>
                        {this.state.oaStatus &&
                        this.state.oaStatus.docIntegrity ? (
                          <>
                            <span className='check'>
                              <CheckIcon />
                            </span>
                            <span>Document has not been tempered with</span>
                          </>
                        ) : (
                          <>
                            <span className='check'>
                              <ClearIcon/>
                            </span>
                            <span>Document has been tempered with</span>
                          </> 
                        )}
                    </li>
                    <li>
                        {this.state.oaStatus && this.state.oaStatus.docStatus ? (
                          <>
                            <span className='check'>
                              <CheckIcon />
                            </span>
                            <span>Document has been issued</span>
                          </>
                        ) : (
                          <>
                            <span className='check'>
                              <ClearIcon/>
                            </span>
                            <span>Document has not been issued</span>
                          </>
                        )}
                    </li>
                    <li>
                        {this.state.oaStatus &&
                        this.state.oaStatus.issuerIdentity ? (
                          <>
                            <span className='check'>
                              <CheckIcon />
                            </span>
                            <span>Document issuer has been identified</span>
                          </>
                        ) : (
                          <>
                            <span className='check'>
                              <ClearIcon/>
                            </span>
                            <span>Document issuer has not been identified</span>
                          </>
                        )}
                    </li>
                  </ul>
                )}
               {this.state.documentType === 'SQ' ? (
                    <SaleModalTemplate document={this.state.document}/>
                  ) : this.state.documentType === 'Inv' ? (
                    <InvoicesTemplate document={this.state.document} showTerms={true} showDigitalSign={true} />
                  ) : this.state.documentType === 'PC' ? (
                    <PaymentCertTemplate document={this.state.document} showTerms={true} showDigitalSign={true} />
                  ) : (<NOATemplate issuer={this.state.docIssuer} investorDetails={this.state.investorDetails} user={this.state.user} financierCompanyDetails={this.state.financierCompanyDetails} document={this.state.docReciepient} selectedData={this.state.selectedData}/>)
                }
            </div>
            </DialogContent>
          </Dialog>
        </div>
        {/* <div>
          <Dialog
            open={this.state.openConfirmModal}
            onClose={this.onFinanceCancelClick}
            aria-labelledby='simple-modal-title'
            ariadescribedby='simple-modal-description'
            className='financeDeclinePopup'
          >
            <DialogTitle
              id='customized-dialog-title'
              onClose={this.onFinanceCancelClick}
            ></DialogTitle>
            <DialogContent>
              <div className='confirmDeclinePopup'>
                <img
                  src={ConfirmDeclineIcon}
                  alt='Confirm Decline'
                  className='confirmDeclineIcon'
                />
                <div>
                  <h3>Finance Invoice</h3>
                  <small>Are you sure you want to finance this invoice</small>
                </div>
                <div className='actionBtns'>
                  <Button
                    className='cancelBtn'
                    onClick={this.onFinanceCancelClick}
                  >
                    CANCEL
                  </Button>

                  <Button
                    className='confirmBtn'
                    onClick={this.onFinanceConfirmClick}
                  >
                    CONFIRM
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div> */}
        <div>
          <Dialog
            open={this.state.openDeclinedModal}
            onClose={this.onDeclinedCancelClick}
            aria-labelledby='simple-modal-title'
            ariadescribedby='simple-modal-description'
            className='financeDeclinePopup'
          >
            <DialogTitle
              id='customized-dialog-title'
              onClose={this.onDeclinedCancelClick}
            ></DialogTitle>
            <DialogContent>
              <div className='confirmDeclinePopup'>
                <img
                  src={ConfirmDeclineIcon}
                  alt='Confirm Decline'
                  className='confirmDeclineIcon'
                />
                <div>
                  <h3>Decline Invoice</h3>
                  <small>Are you sure you want to decline this invoice</small>
                </div>
                <div className='actionBtns'>
                  <Button
                    className='cancelBtn'
                    onClick={this.onDeclinedCancelClick}
                  >
                    CANCEL
                  </Button>

                  <Button
                    className='confirmBtn'
                    onClick={this.onDeclinedConfirmClick}
                  >
                    CONFIRM
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    );
  }
}

export default withRouter(InvoicesFinancialOverView);

import React, { Component } from 'react';
import { AppBar, Tabs, Tab, Typography, Box } from '@material-ui/core';
import PropTypes from 'prop-types';
import SalesTab from './InvoicesTab/SalesTab.js';
import PurchasesTab from './InvoicesTab/PurchasesTab.js';
import invoiceServ from '../../services/invoiceService';
import './invoices.css';
import { unixTimestampToDate ,getTimeFromUnixTimestampNew, getTimeFromUnixTimestamp} from '../Shared/dateTimeFormat';
import { filterOnDocType } from '../Shared/Documents/DocumentsDataFormat';
import { getLocalDocumentsList } from '../../services/authService';
import { BackdropLoader } from '../../services/loader';
import { Dialog, IconButton } from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import { withStyles } from '@material-ui/core/styles';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import signDocService from '../../services/signDocument';
import InvoicesTemplate from '../Shared/Documents/InvoicesTemplate';
import {revokeDocument} from "../../services/createDocumentService"
import {getDocumentListFun} from '../Shared/Documents/getDocumentsList'
import RefreshIcon from '@material-ui/icons/Refresh';
import Tooltip from '@material-ui/core/Tooltip';
import { formatAmount, numberWithCommas } from '../Shared/amountFormat.js';

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



function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component='div'
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

class Invoices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      loader: true,
      sales: {},
      purchases: {},
      loader1: false,
      openModalQuotation: false,
      document: {
        doc: null,
        issuerDetails: null,
        recipientDetails: null,
      },
    };
  }

  getSalesInvoiceStatus = (revoked,financingStatus) => {
    if(revoked){
      return 'Revoked'
    } else {
        return financingStatus === 1 ? 'Requested' 
           : (financingStatus === 2 ? 'Financed' 
            : (financingStatus === 3 ? 'Declined'   
              : (financingStatus === 0 ? 'Issued' : '')))
    }  
  }

  getPurchaseInvoiceStatus = (revoked,financingStatus) => {
    if(revoked){
      return 'Revoked'
    } else {
        return financingStatus === 1 ? 'Issued' 
           : (financingStatus === 2 ? 'Financed' 
            : (financingStatus === 3 ? 'Issued'   
              : (financingStatus === 0 ? 'Issued' : '')))
    }  
  }
  async componentDidMount() {
    try {
      const response1 = getLocalDocumentsList();
      let purchaseDoc = filterOnDocType(response1.purchaseDoc, 'invoices') ? filterOnDocType(response1.purchaseDoc, 'invoices') : [];
      if (purchaseDoc) {
        purchaseDoc = purchaseDoc.sort(function(a, b){ 
          return new Date(b.createdAt) - new Date(a.createdAt); 
        }).map((item) => {
          return {
            ...item,
            invoice: item.invNo,
            status: this.getPurchaseInvoiceStatus(item.revoked,item.financingStatus),
            finalAmt: numberWithCommas(formatAmount(item.finalAmt)),
            docType: 'Invoices',
            createdAt: unixTimestampToDate(item.createdAt),
            updatedAt: unixTimestampToDate(item.updatedAt),
          };
        });
      }
      const response = await Promise.all([
        invoiceServ.getSalesInvoiceData(),
        invoiceServ.getSalesNOAData(),
        invoiceServ.getPurchaseNOAData()
      ]);
      let invoices = [];
      let salesNoa = [];
      let purchaseNoa = []
      if (response[0] && response[0].data) {
        let invoicesObj = {} 
        
        for (const data of response[0].data.invoices) {
          invoicesObj[data.buyerEmail] = invoicesObj[data.buyerEmail] ? [...invoicesObj[data.buyerEmail], {
            ...data,  
            showBuyerName: data.buyerName,
            amount: numberWithCommas(formatAmount(data.finalAmt)),
            invoice: data.invNo,
            status: this.getSalesInvoiceStatus(data.isRevoked,data.financingStatus),
            invoiceDate: unixTimestampToDate(data.invDate),
          }] : [{
            ...data,  
            showBuyerName: data.buyerName,
            amount: numberWithCommas(formatAmount(data.finalAmt)),
            invoice: data.invNo,
            status: this.getSalesInvoiceStatus(data.isRevoked,data.financingStatus),
            invoiceDate: unixTimestampToDate(data.invDate),
          }]
        }
        for (const [key, value] of Object.entries(invoicesObj)) {
          invoices = [...invoices , ...value]
        }
        // console.log('%%%%%%% : ',invoices);
        invoices = invoices.sort(function(a, b){ 
          return new Date(b.invDate) - new Date(a.invDate); 
        });
      }
      if(response[1] && response[1].data){
        // console.log('YYYYYY : ',response[1].data);
        salesNoa = response[1].data.sort(function(a, b){ 
          return new Date(b.createdAt) - new Date(a.createdAt); 
        }).map((item) => {
          return {
            ...item,
            approved: item.mergedCount.approved,
            declined: item.mergedCount.declined,
            createdAt: unixTimestampToDate(item.createdAt) + ' ' + getTimeFromUnixTimestamp(item.createdAt)
          }
        })
      }
      if(response[2] && response[2].data){
        // console.log('ZZZZZZ : ',response[2].data);
        purchaseNoa = response[2].data.sort(function(a, b){ 
          return new Date(b.createdAt) - new Date(a.createdAt); 
        }).map((item) => {
          return {
            ...item,
            approved: item.mergeCount.approved,
            declined: item.mergeCount.declined,
            totalCount: item.numberOfInvoices,
            // invoiceNo: item.invDetails ? item.invDetails.map(invoice => invoice.invNo).join() : '',
            createdAt: unixTimestampToDate(item.createdAt) + ' ' + getTimeFromUnixTimestamp(item.createdAt)
          }
        })
      }
      this.setState({
        sales: { noa: salesNoa, invoices },
        purchases: { noa: purchaseNoa, invoices: purchaseDoc },
        loader: false,
      });
    } catch (error) {
      this.setState({ loader: false });
      console.log('Error : ', error);
    }
  }

  getInvoicesData = (docHash = null) => {
    invoiceServ.getSalesInvoiceData().then(response => {
      let invoices = [];
      if (response && response.data) {
        let invoicesObj = {} 
        
        for (const data of response.data.invoices) {
          invoicesObj[data.buyerEmail] = invoicesObj[data.buyerEmail] ? [...invoicesObj[data.buyerEmail], {
            ...data,  
            showBuyerName: data.buyerName,
            amount: numberWithCommas(formatAmount(data.finalAmt)),
            invoice: data.invNo,
            status: data.financingStatus === 1 ? 'Requested' 
             : (data.financingStatus === 2 ? 'Financed' 
              : (data.financingStatus === 3 ? 'Declined'   
                : (data.financingStatus === 0 ? 'Issued' : ''))),
            invoiceDate: unixTimestampToDate(data.invDate),
          }] : [{
            ...data,  
            showBuyerName: data.buyerName,
            amount: numberWithCommas(formatAmount(data.finalAmt)),
            invoice: data.invNo,
            status: data.financingStatus === 1 ? 'Requested' 
             : (data.financingStatus === 2 ? 'Financed' 
              : (data.financingStatus === 3 ? 'Declined'   
                : (data.financingStatus === 0 ? 'Issued' : ''))),
            invoiceDate: unixTimestampToDate(data.invDate),
          }]
        }
        for (const [key, value] of Object.entries(invoicesObj)) {
          invoices = [...invoices , ...value]
        }
        invoices = invoices.sort(function(a, b){ 
          return new Date(b.invDate) - new Date(a.invDate); 
        });
      }
      this.setState({
        sales: { invoices },
        loader: false,
      });
    }).catch(error => {
      this.setState({loader: false})
      console.log('Error : ',error);
    })
  }

  handleRevokedClick = async (data) => {
    this.setState({loader: true})
    let response = null
    try {
      response = await revokeDocument(data.docHash)
    } catch (error) {
     this.setState({loader: false})
      console.log('Error : ',error);
    }
    if(response){
     getDocumentListFun()
     this.getInvoicesData(data.docHash)
    }
 }

openModalQuotation = (data) => {
    this.setState({ loader1: true });
    signDocService
      .getDocHash(data.original.docHash)
      .then((response) => {
        if (response && response.data) {
          console.log('response.data : ', response.data);
          const { recipientDetails, issuerDetails, doc } = response.data;
          const docInfo = JSON.parse(response.data.doc.docInfo);
          doc['docInfo'] = docInfo;
          doc['docType'] = 'Invoices';
          this.setState({
            loader1: false,
            openModalQuotation: true,
            document: {
              doc,
              issuerDetails,
              recipientDetails,
            },
          });
        }
      })
      .catch((error) => {
        console.log('Error : ', error);
        this.setState({ loader1: false });
      });
  };

  handleCloseQuotation = () => {
    this.setState({ openModalQuotation: false });
  };

  handleChildTabs = (parentTab, childTab) => {};

  handleTabs = (event, newValue) => {
    this.setState({
      value: newValue,
    });
  };

  onRefresh = async (evt) => {
    this.setState({loader: true})
    try {
      await getDocumentListFun()
      this.componentDidMount()
    } catch (error) {
      this.setState({loader: false})
      console.log('Error : ',error);
    }
  }

  render() {
    if(this.state.loader){
      return <BackdropLoader open={this.state.loader} />
    }

    return (
      <div className='invoiceSection'>
        <BackdropLoader open={this.state.loader} />
        <div className="invoiceHeader row">
          <h3>Invoices</h3>
          <Tooltip title='refresh' placement="right-end">
            <IconButton color="primary" aria-label="upload picture" component="span" onClick={this.onRefresh}>
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </div>
        <AppBar position='static'>
          <Tabs
            variant='scrollable'
            indicatorColor='primary'
            className='tab-appbar'
            style={{ color: 'black' }}
            value={this.state.value}
            onChange={this.handleTabs}
            aria-label='simple tabs example'
          >
            <Tab className='tab' label='Sales' {...a11yProps(0)} />
            <Tab className='tab' label='Purchases' {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <TabPanel value={this.state.value} index={0}>
          {this.state.sales && (
            <SalesTab
              onChildTabClick={this.handleChildTabs}
              data={this.state.sales}
              history={this.props.history}
              onRevoked={this.handleRevokedClick}
              onOpenModalQuotation={this.openModalQuotation}
              loader={this.state.loader1}
            />
          )}
        </TabPanel>
        <TabPanel value={this.state.value} index={1}>
          {this.state.purchases && (
            <PurchasesTab
              onChildTabClick={this.handleChildTabs}
              history={this.props.history}
              data={this.state.purchases}
              onOpenModalQuotation={this.openModalQuotation}
              loader={this.state.loader1}
            />
          )}
        </TabPanel>

        <Dialog
          open={this.state.openModalQuotation}
          onClose={this.handleCloseQuotation}
          aria-labelledby='simple-modal-title'
          aria-describedby='scroll-dialog-description'
          className='saleModaleTemplate'
        >
          <DialogTitle
            id='customized-dialog-title'
            onClose={this.handleCloseQuotation}
          >
            {this.state.document && this.state.document.doc ? this.state.document.doc.docType : ''}
          </DialogTitle>
          <DialogContent>
            <InvoicesTemplate document={this.state.document} showTerms={true} showDigitalSign={true}/>
          </DialogContent>
        </Dialog>

      </div>
    );
  }
}

export default Invoices;

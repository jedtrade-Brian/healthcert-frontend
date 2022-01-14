import React, { Component } from 'react';
import { AppBar, Tabs, Tab, Typography, Box } from '@material-ui/core';
import PropTypes from 'prop-types';
import { DotLoader } from 'react-spinners';
import PaymentCertificatePurchase from './PaymentCertificatePurchase';
import PaymentCertificateSales from './PaymentCertificateSales';
import {getLocalDocumentsList} from "../../services/authService";

import {getBatchHistory} from '../../services/historyService';
import {revokeBatch} from '../../services/historyService';

import {filterOnDocType} from "../Shared/Documents/DocumentsDataFormat"
import {getTimeFromUnixTimestamp, unixTimestampToDate} from "../Shared/dateTimeFormat"
import {revokeDocument} from "../../services/createDocumentService"
import {getDocumentListFun} from '../Shared/Documents/getDocumentsList'
import { BackdropLoader } from '../../services/loader';
import { Dialog, IconButton } from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import { withStyles } from '@material-ui/core/styles';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import signDocService from '../../services/signDocument';
import PaymentCertTemplate from '../Shared/Documents/PaymentCertTemplate';
import RefreshIcon from '@material-ui/icons/Refresh';
import Tooltip from '@material-ui/core/Tooltip';



import './PaymentCertificate.css';
import { formatAmount, numberWithCommas } from '../Shared/amountFormat';

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

class PaymentCertificateTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      batchList: [],
      changeValue: 0, 
      loader: true,
      loader1: false,
      openModalQuotation: false,
      document: {
        doc: null,
        issuerDetails: null,
        recipientDetails: null,
      },
    };
  }

  async componentDidMount() {
    this.getBatchData()  
  }

  toggleChangeValue() {
    if(this.state.changeValue === 0){
      this.setState({ changeValue: 1 });
    }
    else {
      this.setState({ changeValue: 0 });
    }
  }


  getPaymentCertStatus = (revoked,signed) => {
    if(revoked){
      return 'Revoked'
    } else {
        if(signed) {
           return 'Accepted'
        } else {
           return 'Pending'
        }
    }  
  }

  getBatchData = async (docHash = null) => {
    const response = await getBatchHistory()
    console.log("response", response)
    if(response) {
      let batch = response.data.batchArr ? response.data.batchArr : []
      console.log('batch: ',batch);
      if(batch){
          batch = batch.sort(function(a, b){ 
            return new Date(b.issuedTime) - new Date(a.issuedTime); 
          })
      }
      this.setState({loader: false, batchList: batch })

      this.toggleChangeValue();
    }
  }

  openModalQuotation = (data) => {
    this.setState({ loader1: true });
    signDocService
      .getDocHash(data.original.merkleRoot)
      .then((response) => {
        if (response && response.data) {
          console.log('response.data : ', response.data);
          const { recipientDetails, issuerDetails, doc } = response.data;
          const docInfo = JSON.parse(response.data.doc.docInfo);
          const docType = response.data.doc.docType;
          doc['docInfo'] = docInfo;
          doc['docType'] = 'Payment Certificate';
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

  handleRevokedClick = async (data) => {
    // console.log('Data : ',data);
    this.setState({loader: true})
    let response = null
    try {
      response = await revokeDocument(data.merkleRoot,"1")
    } catch (error) {
     this.setState({loader: false})
      console.log('Error : ',error);
    }
    if(response){
      this.getBatchData()
    }
 }

  handleTabs = (event, newValue) => {
    this.setState({
      value: newValue,
    });
  };

  onRefresh = async (evt) => {
    this.setState({loader: true})
    try {
      await this.getBatchData()
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
      <div className='PaymentCertificateTab'>
        <div className="paymentHeader row">
          <h3>History</h3>
          <Tooltip title='refresh' placement="right-end">
            <IconButton color="primary" aria-label="upload picture" component="span" onClick={this.onRefresh}>
              <RefreshIcon htmlColor='#15A063'/>
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
            <Tab className='tab' label='Ceritificate Batches' {...a11yProps(0)} />
          </Tabs>
        </AppBar>
        <TabPanel value={this.state.value} index={0}>
          <PaymentCertificateSales data={this.state.batchList}  changeValue={this.state.changeValue} onRevoked={this.handleRevokedClick}/>
        </TabPanel>
       
      </div>
    );
  }
}

export default PaymentCertificateTab;

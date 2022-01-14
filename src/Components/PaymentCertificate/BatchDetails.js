import React, { Component } from 'react';
import { AppBar, Tabs, Tab, Typography, Box } from '@material-ui/core';
import PropTypes from 'prop-types';
import { DotLoader } from 'react-spinners';
import {getBatchCertificates} from '../../services/historyService';
import SalesQuotationPurchase from '../SalesQuotation/SalesQuotationPurchase';
import SalesQuotationSales from '../SalesQuotation/SalesQuotationSales';
import TvCertDetailsView from '../Dashboard/DashboardTabSetup/TvCertDetailsView'
// import salesQuotationService from '../../services/salesQuotationService'
import {getLocalDocumentsList} from "../../services/authService";
import {getCertificateList} from "../../services/createDocumentService";
import {filterOnDocType} from "../Shared/Documents/DocumentsDataFormat"
import {getTimeFromUnixTimestamp, unixTimestampToDate} from "../Shared/dateTimeFormat"
import {revokeDocument} from "../../services/createDocumentService"
import {getDocumentListFun} from '../Shared/Documents/getDocumentsList'
import { BackdropLoader } from '../../services/loader';
import { Dialog, IconButton } from '@material-ui/core';
// import { salesOverviewList } from './SalesOverviewConfig';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import { withStyles } from '@material-ui/core/styles';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import signDocService from '../../services/signDocument';
import SaleModalTemplate from '../Dashboard/DashboardTabSetup/SaleModalTemplate';
import TvCertModalIFrame from '../Dashboard/DashboardTabSetup/TvCertModaIFrame';
import RefreshIcon from '@material-ui/icons/Refresh';
import Tooltip from '@material-ui/core/Tooltip';
import '../SalesQuotation/salesQuotation.css';
import "../DeliveryOrder/DeliveryOrder.css";
import { formatAmount, numberWithCommas } from '../Shared/amountFormat';
import SearchBar from '../Shared/SearchBar';
import { QueryBuilderOutlined } from '@material-ui/icons';
import FilterBar from '../Shared/FilterBar';
import { toDate } from 'date-fns';
import CertificateTemplateDemo from '../Dashboard/CertificateTemplate/CertificateTemplateDemo'
import * as htmlToImage from 'html-to-image';
import { toPng, toBlob, toSvg } from 'html-to-image';
import ReactDOM from 'react-dom';
import ADCSTemplate from '../Dashboard/CertificateTemplate/ADCSTemplate'
import ADSMTemplate from '../Dashboard/CertificateTemplate/ADSMTemplate'
import DICTTemplate from '../Dashboard/CertificateTemplate/DICTTemplate'
import PDDMCSTemplate from '../Dashboard/CertificateTemplate/PDDMCSTemplate'
import PGDSLITemplate from '../Dashboard/CertificateTemplate/PGDSLITemplate'
import BatchDetailsTab from './BatchDetailsTab';


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


export class BatchDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      issuedDate: this.props.location.state.issuedDate,
      value: 0,
      changeValue: 0, 
      certificateList: [],
      filteredCertList: [],
      issuedTo: [],
      loader: true,
      loader1: false,
      openModalQuotation: false,
      document: {
        doc: null,
        issuerDetails: null,
        recipientDetails: null,        
      },
      certificate: null,
      searchQuery: '',
      changeValue: 0 ,
      certURL: null,
    };
  }

  
      
  async componentDidMount() {
    this.getBatchCertificatesData()
  }

  toggleChangeValue() {
    if(this.state.changeValue === 0){
      this.setState({ changeValue: 1 });
    }
    else {
      this.setState({ changeValue: 0 });
    }
  }

  formatCertificateData(data){
    console.log('formattingMethod', data);
    let monthNames =["Jan","Feb","Mar","Apr",
                    "May","Jun","Jul","Aug",
                    "Sep", "Oct","Nov","Dec"];

    let issuedDate = new Date(data * 1000);
    let date = issuedDate.getDate();
    let month = monthNames[issuedDate.getMonth()]
    let year = issuedDate.getFullYear();
    let hour = issuedDate.getHours();
    let mins = issuedDate.getMinutes();
    let timeType = 'am'

    // Converting 24-hr format to 12-hr format
    if(hour >= 12){
      timeType = 'pm'
      if(hour === 12){
        hour = 12;
      }
      else{
        hour -= 12;
      }
    } 
    else if(hour === 0){
      hour = 12;
    }

    // Add '0' to mins prefix if less than 10
    if(mins < 10){
      mins = '0' + mins.toString();
    }

    let convertedDate = `${date} ${month} ${year}, ${hour}:${mins} ${timeType}`;
    
    return convertedDate;
  };

  

  handleTabs = (event, newValue) => {
    this.setState({
      value: newValue,
    });
  };
  
  handleQueryChange = (query) => {
    this.filterCerts(this.state.certificateList, query);
    this.setState({ searchQuery: query });
    if(this.state.changeValue === 0){
      this.setState({ changeValue: 1 })
    }
    else {
      this.setState({ changeValue: 0 })
    }
  }
  
  filterCerts = (certs, query) => {
    if (!query) {
      let allCerts = this.state.certificateList
      this.setState({ filteredCertList: allCerts });
    }

    let filteredCerts = certs.filter((cert) => {
        const studentName = cert.name.toLowerCase();
        const studentId = cert.studentId.toString().toLowerCase();
        const email = cert.email.toLowerCase();

        query = query.toString().toLowerCase();
        return (studentName.includes(query) || studentId.includes(query) || email.includes(query));
    });

    console.log("Filter Certs: ", filteredCerts)
    this.setState({ filteredCertList: filteredCerts });
    console.log("Filter Cert State: ", this.state.filteredCertList)
  };
  
  getSalesQuotationStatus = (revoked,signed) => {
    if(revoked !== 0){
      return 'Revoked'
    } else {
        if(signed) {
            return 'Accepted'
        } else {
            return 'Pending'
        }
    }  
  }

  getBatchCertificatesData = async () => {
    const response = await getBatchCertificates(this.state.id)
    console.log("response2", response)
    if(response) {
      // let IssuedDate = response.data.issuedBatch ? response.data.issuedBatch : String
      let BatchCertDetails = response.data.studentArr ? response.data.studentArr : []
      let convertedIssuedDate = this.formatCertificateData(this.state.IssuedDate);
      
      // let students = [{docHash : studentCertDetails[0].docHash, docType : studentCertDetails[0].docType, studentId:studentDetails.studentId, studentName:studentDetails.name, courseName: studentCertDetails[0].courseName, transcriptId:studentCertDetails[0].transcriptId, issuedOn:studentCertDetails[0].issuedDate, revoked: studentCertDetails[0].revokedDate, wrapDocInfo : studentCertDetails[0].wrapDocInfo, studentEmail: studentDetails.email, birth: studentDetails.dob, graduationDate:studentDetails.graduationDate}]

      console.log('BatchCertDetails',BatchCertDetails);

      
    
      this.setState({loader: false, certificateList: BatchCertDetails, filteredCertList: BatchCertDetails})
      this.toggleChangeValue();
    }
  }

  openModalQuotation = (data) => {
    this.setState({ loader1: true, docHash: data.original.docHash })
    this.getSelectedCertificate(data.original.docHash);
    this.generateCertificateImage(data.original);
  };

  retrieveTemplate = (cert) => {
    switch (cert.docType){
      case 'ADCS':
        return <ADCSTemplate certificate={cert} />;
      case 'ADSM':
        return <ADSMTemplate certificate={cert} />;
      case 'DICT':
        return <DICTTemplate certificate={cert} />;
      case 'PGDSLI':
        return <PGDSLITemplate certificate={cert} />;
      case 'PDDMCS':
        return <PDDMCSTemplate certificate={cert} />;
    }
  }

  generateCertificateImage = (cert) => {
    let certdata = this.retrieveTemplate(cert)
    var certDOM = document.createElement('div') // document.getElementById('certificate-renderer')
    certDOM.style.height = "550px";
    certDOM.style.width = "750px";
    ReactDOM.render(certdata, certDOM);
    document.body.appendChild(certDOM);

    htmlToImage.toPng(certDOM).then((dataUrl) => {
      ReactDOM.unmountComponentAtNode(certDOM);
      this.setState({ certURL: dataUrl, loader1: false, openModalQuotation:true });

    }).catch((error) => {
        console.error('Generate Cert Image Error: ', error);;
        this.setState({ loader1:false, openModalQuotation:true });
    })

    // htmlToImage.toSvg(certDOM, { filter: (node) => node.tagName !== 'i' }).then((svgUrl) => {
    //   let dataUrl = decodeURIComponent(svgUrl.split(',', 2)[1])
    //   this.setState({ certURL: dataUrl, loader1: false, openModalQuotation:true });
    //   ReactDOM.unmountComponentAtNode(certDOM);

    // }).catch((error) => {
    //     console.error('Generate Cert Image Error: ', error);;
    //     this.setState({ loader1:false, openModalQuotation:true });
    // })
  }
  
  getSelectedCertificate = (docHash) => {
    let currentCerts = this.state.certificateList ? this.state.certificateList : []
    currentCerts.forEach((cert) => {
      if(cert.docHash === docHash){
        this.setState({certificate: cert})
      }
    });
  }

  handleCloseQuotation = () => {
    this.setState({ openModalQuotation: false });
  };
  
  handleRevokedClick = async (data) => {
    //  console.log('Data : ',data);
      this.setState({loader: true})
      let response = null
      try {
        response = await revokeDocument(data.docHash)
      } catch (error) {
        this.setState({loader: false})
        console.log('Error : ', error);
      }
      if(response){
        this.getBatchCertificatesData(data.docHash)
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
      await this.getBatchCertificatesData()
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
      <div className='salesQtnTab'>
        <div className="salesHeader row">
          <h3>Batch Details</h3>
          <Tooltip title='refresh' placement="right-end">
            <IconButton aria-label="upload picture" onClick={this.onRefresh}>
              <RefreshIcon htmlColor='#15A063'/>
            </IconButton>
          </Tooltip>
        </div>

        <div className="studentDetailsContainer">
          <div className="studentDetailsRow">
            <span className="studentDetailsTitle">Batch ID</span>
            <span className="studentDetailsValue">{this.state.id}</span>
            <span className="studentDetailsTitle2">Issued Date</span>
            <span className="studentDetailsValue">{this.props.location.state.issuedDate}</span>
          </div>
        </div>
{/* 
        <table>
        <tr>
          <th>Name</th>
            <td>{this.state.certificateList[0].studentName}</td> 
          <th>Student ID</th>
            <td>{this.state.certificateList[0].studentId}</td> 
        </tr>
        <tr>
          <th>Email</th>
            <td>{this.state.certificateList[0].studentEmail}</td> 
          <th>DOB</th>
            <td>{this.state.dateOfBirth}</td> 
        </tr> 
        <tr>
          <th>Graduation Date</th>
            <td>{this.state.graduationDate}</td> 
        </tr>
        </table>
 */}


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
            <Tab className='tab' label='Students' {...a11yProps(0)} />
            {/* <Tab className='tab' label='Purchases' {...a11yProps(1)} /> */}
          </Tabs>
        </AppBar>
        <TabPanel value={this.state.value} index={0}>
          <SearchBar searchContent="Certificates" onSearchHandler={this.handleQueryChange} searchQuery={this.state.searchQuery} />
          <BatchDetailsTab 
            loader={this.state.loader1} 
            data={this.state.filteredCertList} 
            changeValue={this.state.changeValue} 
            onRevoked={this.handleRevokedClick} 
            onOpenModalQuotation={this.openModalQuotation}
            issuedDate ={this.state.issuedDate}/>
        </TabPanel>
        <TabPanel value={this.state.value} index={1} className='purchaseTab'>
          <SalesQuotationPurchase loader={this.state.loader1} data={this.state.issuedTo} onOpenModalQuotation={this.openModalQuotation}/>
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
            {this.state.document.doc ? this.state.document.doc.docType : ''}
          </DialogTitle>
          <DialogContent>
            <TvCertDetailsView certificate={this.state.certificate} certURL={this.state.certURL} />
            <TvCertModalIFrame docHash={this.state.docHash}/>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}




export default BatchDetails;

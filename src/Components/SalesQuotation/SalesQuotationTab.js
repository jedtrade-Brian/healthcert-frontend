import React, { Component } from 'react';
import { AppBar, Tabs, Tab, Typography, Box } from '@material-ui/core';
import PropTypes from 'prop-types';
import SalesQuotationPurchase from './SalesQuotationPurchase';
import SalesQuotationSales from './SalesQuotationSales';
import TvCertDetailsView from '../Dashboard/DashboardTabSetup/TvCertDetailsView'
//import salesQuotationService from '../../services/salesQuotationService'
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
import './salesQuotation.css';
import { formatAmount, numberWithCommas } from '../Shared/amountFormat';
import SearchBar from '../Shared/SearchBar'
import { QueryBuilderOutlined } from '@material-ui/icons';
import FilterBar from '../Shared/FilterBar';
import CertificateTemplateDemo from '../Dashboard/CertificateTemplate/CertificateTemplateDemo'
import ADCSTemplate from '../Dashboard/CertificateTemplate/ADCSTemplate'
import ADSMTemplate from '../Dashboard/CertificateTemplate/ADSMTemplate'
import DICTTemplate from '../Dashboard/CertificateTemplate/DICTTemplate'
import PDDMCSTemplate from '../Dashboard/CertificateTemplate/PDDMCSTemplate'
import PGDSLITemplate from '../Dashboard/CertificateTemplate/PGDSLITemplate'
import TwoApproversTemplate from '../Dashboard/CertificateTemplate/TwoApproverTemplate'
import * as htmlToImage from 'html-to-image';
import { toPng, toBlob, toSvg } from 'html-to-image';
import ReactDOM from 'react-dom'
import Pdf from 'react-to-pdf'
import {getCertificate} from "../../services/createDocumentService"
import TranscriptTemplate from '../Dashboard/CertificateTemplate/TranscriptTemplate'
import { setIntervalAsync, clearIntervalAsync } from 'set-interval-async/dynamic'
import { Checkmark } from 'react-checkmark'

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

class SalesQuotationTab extends Component {
  mounted;
  errorCount = 0;
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
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
      wrapDocInfo: null,
      searchQuery: '',
      changeValue: 0,
      certURL: null,
      interval: null,
      pendingCertificateLoader: null
    };
  }

  async componentDidMount() {
    this.mounted = true;
    await this.getCertificateData()
    //this.setLiveRefresh()
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  setLiveRefresh = () => {
    let pendingCertificate = this.state.certificateList.filter((cert) => {
      return cert.issuedOn === 0;
    })
    
    if(pendingCertificate.length !== 0){
      this.setState({ pendingCertificateLoader: "loading" });
      const interval = setIntervalAsync(() => this.loadCertificateData(), 12000);
      this.setState({ interval: interval });
    }
  }

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
        console.log(cert.transcriptId)
        const Name = cert.name.toLowerCase();
        const testName = cert.testName.toLowerCase();
        const transcriptId = cert.transcriptId.toString().toLowerCase();
        const patientId = cert.patientId.toString().toLowerCase();
        query = query.toString().toLowerCase();
        return (Name.includes(query) || testName.includes(query) || transcriptId.includes(query) || patientId.includes(query));
    });

    this.setState({ filteredCertList: filteredCerts });
  };

  getSalesQuotationStatus2 = (revoked,signed) => {
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

  loadCertificateData = async () => {
    if(!this.mounted){
      (async () => {
        await clearIntervalAsync(this.state.interval);
      })();
      return;
    }
    else if(this.mounted){
      try {
        const response = await getCertificateList();
        if(response && this.mounted) {
          let certificate = response.data.certList ? response.data.certList : [];
          console.log('certificate',certificate);
          if(certificate){
            certificate = certificate.sort(function(a, b){ 
              return new Date(b.issuedOn) - new Date(a.issuedOn); 
            })

            let pendingCertificate = certificate.filter((cert) => {
              return cert.issuedOn === 0;
            })

            if(pendingCertificate.length === 0){
              this.setState({ certificateList: certificate })
              this.filterCerts(certificate, this.state.searchQuery);
    
              // Notify table to update data
              if(this.state.changeValue === 0){
                this.setState({ changeValue: 1, pendingCertificateLoader: "loaded" })
              }
              else {
                this.setState({ changeValue: 0, pendingCertificateLoader: "loaded" })
              }
    
              // Clear Interval
              (async () => {
                await clearIntervalAsync(this.state.interval);
                this.setState({ interval: null })
              })();
            }
          }
        }
      } catch (error) {
        if(error.response && error.response.status === 400){
          return;
        }
        else{
          console.log("Real Time Update", error);
          // Clear Interval
          (async () => {
            await clearIntervalAsync(this.state.interval);
            this.setState({ interval: null })
          })();
        }
      }
    }
  }

  // getAllCertificates = async (docHash = null) => {
  //   let retrieveCertList = [];
  //   let certificateData = [];
  //   const numofGroup = await getCertificateGroupCount();
  //   for(let i = 0; i <= numofGroup; i++){
  //     let retrieveCertBatch = () => retrieveCertificateBatch(i);
  //     retrieveCertList.push(retrieveCertBatch);
  //   }

  //   Promise.all(retrieveCertList).then((responseList) => {
  //     responseList.forEach((response) => {
  //       let certficateBatch = response.data.certList
  //       certficateBatch.forEach((cert) => {
  //         certificateData.push(cert)
  //       });
  //     });

  //     if(certificateData){
  //       certificateData = certificateData.sort(function(a, b){ 
  //         return new Date(b.issuedOn) - new Date(a.issuedOn); 
  //       }).map((item)=>{
  //         if(docHash && docHash === item.docHash){
  //           console.log('IF DOCHASH ENTERED')
  //           return {
  //             ...item,
  //             // status: this.getSalesQuotationStatus(item.revoked,item.signed),
  //             revoked: true,
  //           }
  //         }else{
  //           console.log('ELSE DOCHASH ENTERED')
  //           return {
  //             ...item,
  //             // revoked: true,
  //             status: this.getSalesQuotationStatus(item.revoked, item.signed),
  //           }
  //         } 
  //       })
  //     }
  //     this.setState({loader: false, certificateList: certificateData , filteredCertList: certificateData })
  //   })
  // }

  getCertificateData = async (docHash = null) => {
    console.log(docHash);
    try {
      console.log('Retrieving Certificate...')
      const response = await getCertificateList()
      if(response) {
        let certificate = response.data.certList ? response.data.certList : []
        console.log('certificate',certificate);
        if(certificate){
            certificate = certificate.sort(function(a, b){ 
              return new Date(b.issuedOn) - new Date(a.issuedOn); 
            }).map((item)=>{
              //console.log(item);
              console.log('1',item.revoked,'2',item.issuedOn,'3',item.merkleroot,'4',item.docHash)
                return {
                ...item, 
                     
                status: this.getSalesQuotationStatus(item.revoked,item.issuedOn),

                
              }
              
              
          //   if(docHash === item.docHash){
          //     return {
          //       ...item,
          //       //status: this.getSalesQuotationStatus(item.revoked,item.signed),
          //       revoked: true,
          //     }
              
          //   }else{
          //     return {
                
          //       ...item,
                
          //       //revoked: true,
          //       status: this.getSalesQuotationStatus(item.revoked,item.signed),
          //     }
              
          //  } 
           
          })
        }
        
        this.setState({loader: false, certificateList: certificate , filteredCertList: certificate })
        
      }
      
    } catch (error) {
      console.log('Retrieve Certificate', error)
      console.log('ok');
      if(error.response && error.response.status === 400){
        if(this.errorCount <= 5){
          this.getCertificateData();
          this.errorCount++;
        }
        else{
          this.errorCount = 0;
          window.location.reload();
        }
      }
      else{
        this.setState({loader: false})
        console.log('Error : ',error);
      }
    }
  }
  
  openModalQuotation = async (data) => {
    
    this.setState({ loader1: true, docHash: data.original.docHash });

    console.log(data.original.docHash);
    
    const fullDetailsCert = await getCertificate(data.original.docHash);
    
    this.getSelectedCertificate(data.original.docHash, fullDetailsCert.data.document.wrapDocInfo);

    

    this.generateCertificateImage(data.original, fullDetailsCert);

    //console.log(fullDetailsCert);

    console.log(fullDetailsCert);
  };

  

  getSelectedCertificate = (docHash, wrapDocInfo) => {
    let currentCerts = this.state.certificateList ? this.state.certificateList : []
    currentCerts.forEach((cert) => {
      if(cert.docHash === docHash){
        this.setState({certificate: cert, wrapDocInfo: wrapDocInfo})
      }
    });

    //console.log(currentCerts);
  }

  handleCloseQuotation = () => {
    this.setState({ openModalQuotation: false });
  };

  handleRevokedClick = async (data) => {
     console.log('Data : ',data);
    
     this.setState({loader: true})
     let response = null
     try {      
       response = await revokeDocument(data.docHash,"0");
     } catch (error) {
       this.setState({loader: false})
       console.log('Error : ', error);
     }
     if(response){
       await Promise.all([this.getCertificateData(data.docHash), this.onRefresh()]);
       //await this.getCertificateData(data.docHash);
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
      await this.getCertificateData()
    } catch (error) {
      this.setState({loader: false})
      console.log('Error : ',error);
    }
  }

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

  retrieveIssuedDateTime = (certificate) => {
    if(certificate.issuedOn === 0){
      return "Pending";
    }
    else{
      let date = new Date(certificate.issuedOn)
      let day = date.getDate()
      let month = date.toLocaleString('default', { month: 'long' });
      let year = date.getFullYear();

      return `${day} ${month} ${year}`
    }
  }

  generateCertificateImage = (cert, fullCert) => {
    let certdata = this.retrieveTemplate(cert)
    let transcriptData = <TranscriptTemplate certificate={fullCert} issuedDateTime={this.retrieveIssuedDateTime(cert)} />

    var transcriptDOM = document.createElement('div')
    transcriptDOM.style.height = "750px";
    transcriptDOM.style.width = "550px";

    var certDOM = document.createElement('div') // document.getElementById('certificate-renderer')
    certDOM.style.height = "850px";
    certDOM.style.width = "1000px";

    ReactDOM.render(transcriptData, transcriptDOM)
    ReactDOM.render(certdata, certDOM);
    document.body.appendChild(certDOM);
    document.body.appendChild(transcriptDOM)

    Promise.all([htmlToImage.toPng(certDOM), htmlToImage.toPng(transcriptDOM)]).then((dataUrls) => {
      console.log("Data URLs", dataUrls);
      ReactDOM.unmountComponentAtNode(certDOM);
      ReactDOM.unmountComponentAtNode(transcriptDOM);
      this.setState({ certURL: dataUrls, loader1: false, openModalQuotation:true });

    }).catch((error) => {
      console.error('Generate Certificate or Transcript Image Error: ', error);;
      this.setState({ loader1:false, openModalQuotation:true });
    })

    // htmlToImage.toPng(certDOM).then((dataUrl) => {
    //   ReactDOM.unmountComponentAtNode(certDOM);
    //   this.setState({ certURL: dataUrl, loader1: false, openModalQuotation:true });

    // }).catch((error) => {
    //     console.error('Generate Cert Image Error: ', error);;
    //     this.setState({ loader1:false, openModalQuotation:true });
    // })

    // htmlToImage.toSvg(certDOM, { filter: (node) => node.tagName !== 'i' }).then((svgUrl) => {
    //   let dataUrl = decodeURIComponent(svgUrl.split(',', 2)[1])
    //   this.setState({ certURL: dataUrl, loader1: false, openModalQuotation:true });
    //   ReactDOM.unmountComponentAtNode(certDOM);

    // }).catch((error) => {
    //     console.error('Generate Cert Image Error: ', error);;
    //     this.setState({ loader1:false, openModalQuotation:true });
    // })
  }

  render() {
    if(this.state.loader){
      return <BackdropLoader open={this.state.loader} />
    }
    return (
      <div className='salesQtnTab'>
        <div id="certificate-renderer"></div>
        <div className="salesHeader row">
          <div className="col-sm-9">
            <h3>Certificates</h3>
            <Tooltip title='refresh' placement="right-end">
              <IconButton aria-label="upload picture" onClick={this.onRefresh}>
                <RefreshIcon htmlColor='#15A063'/>
              </IconButton>
            </Tooltip>
          </div>
          
          {
            this.state.pendingCertificateLoader === "loading"
            ? <div className="pending-loader col-sm-3">
                <span className="spinner-border text-dark"></span>
                <span className="loader-text">Certificate Issuance in Progress</span>
              </div> 
            : this.state.pendingCertificateLoader === "loaded" 
            ? <div className="pending-loader col-sm-3">
                <div className="row">
                  <div className="check-mark col-sm-3">
                    <Checkmark size='28px' color='#23DC3D' />
                  </div>
                  <span className="loader-text col-sm-9">Certificate Issuance Completed</span>
                </div>
              </div>
            : ''
          }
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
            <Tab className='tab' label='Certificate' {...a11yProps(0)} />
          </Tabs>
        </AppBar>
        <TabPanel value={this.state.value} index={0}>
          <SearchBar searchContent="Certificates" onSearchHandler={this.handleQueryChange} searchQuery={this.state.searchQuery} />
          <SalesQuotationSales 
            loader={this.state.loader1} 
            data={this.state.filteredCertList} 
            changeValue={this.state.changeValue} 
            onRevoked={this.handleRevokedClick} 
            onOpenModalQuotation={this.openModalQuotation}
            parentPage='CertificateMenu' />
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
            <TvCertDetailsView certificate={this.state.certificate} certURL={this.state.certURL} wrapDocInfo={this.state.wrapDocInfo} />
            <TvCertModalIFrame docHash={this.state.docHash} />
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default SalesQuotationTab;

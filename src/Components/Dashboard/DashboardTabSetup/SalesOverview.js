import React, { Component } from 'react';
import { Button, Dialog, IconButton } from '@material-ui/core';
import { salesOverviewList } from './SalesOverviewConfig';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import './salesOverview.css';
import { withRouter } from 'react-router-dom';
import SaleModalTemplate from './SaleModalTemplate';
import NOATemplate from '../../Invoices/InvoicesTab/NOATemplate';
import DateRange from '../../Shared/DateRange';
import NewReactTableComponent from '../../../ReactTable/NewReactTable';
import { BackdropLoader } from '../../../services/loader';
import signDocService from '../../../services/signDocument';
import InvoicesTemplate from '../../Shared/Documents/InvoicesTemplate';
import PaymentCertTemplate from '../../Shared/Documents/PaymentCertTemplate';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import { getInvoiceNOA } from '../../../services/invoiceService';
import authService from '../../../services/authService';

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

class SalesOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNo: 0,
      rows: 5,
      listData: [...this.props.data],
      openModal: false,
      openModalQuotation: false,
      buttonFilter: 'SHOWALL',
      openNoaModal: false,
      count: 8,
      loader: false,
      document: {
        doc: null,
        issuerDetails: null,
        recipientDetails: null,
      },

      financierCompanyDetails: null,
      docReciepient: null,
      docIssuer: null,
      selectedData: null,
      investorDetails: null,
      oaStatus: null,
      user: authService.getUserInfo(),
      dateFilteredData: null
    };
  }

  handleClickOpen = () => {
    this.setState({ openModal: true });
  };

  handleClose = () => {
    this.setState({ openModal: false });
  };

  setTableData = () => {
    const listData = this.state.buttonFilter === 'SHOWALL' || this.state.buttonFilter === 'RECENT' ? [...this.props.data] : [...this.props.pendingData]
    this.setState({ listData});
  }

  showAllData = () => {
    this.setState({ buttonFilter: 'SHOWALL', listData: null },() => this.setTableData());
  };

  createAllData = () => {
    this.setState({ buttonFilter: 'RECENT', listData: null },() => this.setTableData());
  };

  pendingData = () => {
    this.setState({
      buttonFilter: 'PENDING',
      listData: null
    },() => this.setTableData());
  };

  salesQuotaionPage = () => {
    this.props.history.push('/createSalesQuotations');
  };

  getDocumentType = (doctype) => {
    switch (doctype) {
      case 'SQ':
        return 'Sales Quotation';
      case 'Inv':
        return 'Invoices';
      case 'PC':
        return 'Payment Certificate';
      default:
    }
  };

  openModalQuotation = (data) => {
    console.log('Row Data : ', data.original.docHash);
    this.setState({ loader: true });
    signDocService
      .getDocHash(data.original.docHash)
      .then((response) => {
        if (response && response.data) {
          console.log('response.data : ', response.data);
          const { recipientDetails, issuerDetails, doc } = response.data;
          const docInfo = JSON.parse(response.data.doc.docInfo);
          const docType = response.data.doc.docType;
          doc['docInfo'] = docInfo;
          doc['docType'] = this.getDocumentType(docType);
          this.setState({
            loader: false,
            openModalQuotation: true,
            document: {
              doc,
              issuerDetails,
              recipientDetails,
            },
          });
          // const { docHash,issuerDocStore,quoteNumber,signerDocStore,createdAt,updatedAt,transId } = response.data
          // const docType = this.getDocumentType(response.data.docType)
          // const docInfo = JSON.parse(response.data.docInfo)
          // this.setState({
          //   loader: false,
          //   openModalQuotation: true,
          //   document: {
          //     docHash,
          //     docType,
          //     docInfo,
          //     issuerDocStore,
          //     quoteNumber,
          //     signerDocStore,
          //     createdAt,
          //     updatedAt,
          //     transId
          //   }})
        }
      })
      .catch((error) => {
        console.log('Error : ', error);
        this.setState({ loader: false });
      });
  };

  handleCloseQuotation = () => {
    this.setState({ openModalQuotation: false });
  };
  onChooseDocumentClick(type) {
    this.props.history.push({
      pathname: '/createDocument/' + type,
    });
  }

  openNoaModal = (data) => {
    if (data.original.noa) {
      this.setState({ loader: true });
      const docHash = data.original.docHash;
      if (docHash && docHash !== '') {
        getInvoiceNOA(docHash)
          .then((response) => {
            let financierCompanyDetails = null;
            let docReciepient = null;
            let selectedData = null;
            let investorDetails = null;
            let docIssuer = null;
            let oaStatus = null;
            if (response && response.data) {
              const data = response.data;
              // console.log('Response %%% : ',response);
              financierCompanyDetails = {
                financierDetails: {
                  accountName: data.financierDetails
                    ? data.financierDetails.bankDetails.accName
                    : '',
                  accountNumber: data.financierDetails
                    ? data.financierDetails.bankDetails.accNum
                    : '',
                  bankName: data.financierDetails
                    ? data.financierDetails.bankDetails.bankName
                    : '',
                  swiftNumber: data.financierDetails
                    ? data.financierDetails.bankDetails.swiftNo
                    : '',
                },
                email: data.financierDetails ? data.financierDetails.email : '',
                name: data.financierDetails ? data.financierDetails.name : '',
                designation: data.financierDetails ? data.financierDetails.designation : '',
              };
              docReciepient = {
                recipientDetails: {
                  name: data.recipient ? data.recipient.name : '',
                  companyName: data.recipient ? data.recipient.cpyName : '',
                  fullAddress: {
                    ...data.recipient,
                    address: data.recipient ? data.recipient.address : '',
                    zipcode: data.recipient ? data.recipient.zipcode : '',
                  },
                  phoneNumber: data.recipient ? data.recipient.phoneNo : '',
                },
              };
              selectedData = {
                selectedInvoices: data.reqInfo
                  ? data.reqInfo.map((item) => ({
                      invNo: item.invNo,
                      invDate: item.date,
                      amount: item.amt,
                    }))
                  : [],
              };
              investorDetails = data.noaDetails;
              docIssuer = {
                ...data.issuers[0],
                name: data.issuers[0].name,
                signDate: data.recipient ? data.recipient.date : '',
              };
              oaStatus = data.oaStatus;
            }
            // console.log(
            //   '**%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%',
            //   docReciepient
            // );
            this.setState({
              loader: false,
              oaStatus,
              openNoaModal: true,
              docIssuer,
              financierCompanyDetails,
              docReciepient,
              selectedData,
              investorDetails,
            });
          })
          .catch((err) => {
            console.log('Invoice NOA error : ', err);
            this.setState({ loader: false });
          });
      }
    }
  };

  handleCloseNoaModal = () => {
    this.setState({ openNoaModal: false });
  };

  setDateFilteredData = () => {
    this.setState({listData: [...this.state.dateFilteredData]})
  }

  handleSave = (date) => {
    if(date){
      var startDate = date.startDate
      var endDate = date.endDate
      var aDate = new Date();
      const dataForFiltering = this.state.buttonFilter === 'SHOWALL' || this.state.buttonFilter === 'RECENT' ? [...this.props.data] : [...this.props.pendingData]
      var filteredData = dataForFiltering.filter((a) => {
          aDate = new Date(a.unixCreatedAt);
          aDate.setHours(0,0,0,0);
          return aDate.getTime() >= startDate.getTime() && aDate.getTime() <= endDate.getTime();
      });
      this.setState({listData: null,dateFilteredData: filteredData}, () => this.setDateFilteredData())
    } else {
      this.setState({listData: null,dateFilteredData: this.props.data},() => {
        this.setDateFilteredData()
      })
    }
  };

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

    // const actionColumn = [
    //   {
    //     Header: "Action",
    //     Cell: row => {
    //       return <Button className="revokeBtn">Revoke</Button>;
    //     }
    //   }
    // ];

    const columns = nameColumn.concat(salesOverviewList.columns);
    // .concat(actionColumn);
    return (
      <div>
        <BackdropLoader open={this.state.loader} />
        <div className='salesaction'>
          <div className='saleactionfirst'>
            <Button
              className={
                this.state.buttonFilter === 'SHOWALL' ? 'showButton' : ''
              }
              onClick={this.showAllData}
            >
              Show All
            </Button>
            <Button
              className={
                this.state.buttonFilter === 'RECENT' ? 'showButton' : ''
              }
              onClick={this.createAllData}
            >
              Recently Created
              {<span>{this.props.data ? this.props.data.length : 0}</span>}
            </Button>
            <Button
              className={
                this.state.buttonFilter === 'PENDING' ? 'showButton' : ''
              }
              onClick={this.pendingData}
            >
              Pending
              {
                <span>
                  {this.props.pendingData ? this.props.pendingData.length : 0}
                </span>
              }
            </Button>
          </div>
          <div className='saleactionSecond'>
            {this.state.buttonFilter === 'SHOWALL' && (
              <DateRange onSave={this.handleSave}></DateRange>
            )}
            <Button onClick={this.handleClickOpen}>Create Docs</Button>
          </div>
        </div>
        {this.state.listData && (
          <div className='DashboardSalesTable'>
            <NewReactTableComponent
              listData={[...this.state.listData]}
              listConfig={salesOverviewList}
              columns={columns}
              onHeaderClick={this.sortByHeader}
              onRowClick={this.openModalQuotation}
              onCellClick={this.openNoaModal}
              rowAndCellBothClick={true}
              cellClickColName={'noa'}
              rowsPerPageOptions={[5, 10, 25, 50, 100]}
              forSerialNo={{
                pageNo: this.state.pageNo,
                pageSize: this.state.rows,
              }}
            />
          </div>
        ) }
        <Dialog
          open={this.state.openModal}
          onClose={this.handleClose}
          aria-labelledby='simple-modal-title'
          ariadescribedby='simple-modal-description'
          className='documentOptions'
        >
          <DialogTitle id='customized-dialog-title' onClose={this.handleClose}>
            CHOOSE A DOCUMENT
          </DialogTitle>
          <DialogContent>
            <div className='documentflex'>
              <div
                className='salesquesiton'
                onClick={() => this.onChooseDocumentClick('salesQuotation')}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  viewBox='0 0 20 20'
                >
                  <g transform='translate(-86.439 0)'>
                    <g transform='translate(94.195 13.837)'>
                      <g transform='translate(0)'>
                        <path
                          className='a'
                          d='M189.719,283.386H186.06a.418.418,0,0,0,0,.835h3.659a.418.418,0,0,0,0-.835Z'
                          transform='translate(-185.642 -283.386)'
                        />
                      </g>
                    </g>
                    <g transform='translate(92.455 15.55)'>
                      <g transform='translate(0)'>
                        <path
                          className='a'
                          d='M151.5,324.386H144.36a.418.418,0,0,0,0,.835H151.5a.418.418,0,0,0,0-.835Z'
                          transform='translate(-143.942 -324.386)'
                        />
                      </g>
                    </g>
                    <g transform='translate(86.439 0)'>
                      <g transform='translate(0 0)'>
                        <path
                          className='a'
                          d='M106.04.028a.9.9,0,0,0-.713.109l-1.393.973L102.542.141a.929.929,0,0,0-.922-.025l-.039.025-1.393.969L98.8.137a.93.93,0,0,0-.922-.025l-.039.025-1.393.969L95.05.137a.93.93,0,0,0-.922-.025l-.039.025L92.7,1.106,91.3.137a.93.93,0,0,0-.922-.025l-.039.025-1.393.969-1.4-.969a.9.9,0,0,0-.706-.109c-.248.063-.412.217-.405.388V19.582c-.007.226.275.414.628.418a.831.831,0,0,0,.49-.134l1.393-.973,1.393.969a.929.929,0,0,0,.922.025l.039-.025,1.393-.969,1.393.969a.93.93,0,0,0,.922.025l.039-.025,1.393-.969,1.393.969a.93.93,0,0,0,.922.025l.039-.025,1.393-.969,1.393.969a.93.93,0,0,0,.922.025l.039-.025,1.393-.969,1.393.969a.855.855,0,0,0,.484.134.781.781,0,0,0,.222-.029c.248-.063.412-.217.405-.388V.413C106.451.246,106.288.091,106.04.028Zm-2.1,17.824a.856.856,0,0,0-.484.138l-1.393.973-1.393-.969a.93.93,0,0,0-.922-.025l-.039.025-1.393.969-1.393-.969A.93.93,0,0,0,96,17.969l-.039.025-1.393.969-1.393-.969a.93.93,0,0,0-.922-.025l-.039.025-1.4.969-1.393-.973a.856.856,0,0,0-.484-.138.8.8,0,0,0-.471.138l-.726.518V1.49L88.473,2a.8.8,0,0,0,.471.138A.856.856,0,0,0,89.427,2l1.393-.973L92.212,2a.93.93,0,0,0,.922.025L93.173,2l1.393-.969L95.958,2a.93.93,0,0,0,.922.025L96.919,2l1.393-.969L99.7,2a.93.93,0,0,0,.922.025L100.665,2l1.393-.969L103.451,2a.856.856,0,0,0,.484.138A.8.8,0,0,0,104.405,2l.732-.518V18.5l-.726-.514A.8.8,0,0,0,103.941,17.852Z'
                          transform='translate(-86.439 0)'
                        />
                      </g>
                    </g>
                    <path
                      className='a'
                      d='M3.228,1.2V.12a4.157,4.157,0,0,1-2.8-1.248L1.224-2.22a3.3,3.3,0,0,0,2,1.08V-3.468q-.36-.1-.624-.174a5.131,5.131,0,0,1-.582-.216,2.469,2.469,0,0,1-.534-.306,2.711,2.711,0,0,1-.408-.4,1.529,1.529,0,0,1-.288-.534,2.3,2.3,0,0,1-.1-.69,2.09,2.09,0,0,1,.69-1.584,2.958,2.958,0,0,1,1.842-.744v-1.1h.96V-8.1A3.991,3.991,0,0,1,6.6-7.008L5.808-5.964a3.093,3.093,0,0,0-1.62-.852V-4.74q.444.12.756.222a4.574,4.574,0,0,1,.69.3,2.383,2.383,0,0,1,.606.432,2,2,0,0,1,.39.606,2.084,2.084,0,0,1,.162.84,2.312,2.312,0,0,1-.66,1.668A2.942,2.942,0,0,1,4.188.12V1.2ZM5.352-2.208a.734.734,0,0,0-.3-.606,2.641,2.641,0,0,0-.864-.4v2.088a1.444,1.444,0,0,0,.876-.39A.981.981,0,0,0,5.352-2.208ZM2.136-5.892q0,.576,1.092.9V-6.876a1.411,1.411,0,0,0-.8.324A.85.85,0,0,0,2.136-5.892Z'
                      transform='translate(93.007 12)'
                    />
                  </g>
                </svg>
                <span>Sales Quotation</span>
              </div>
              <div
                className='deliveryOrder'
                // onClick={() => this.onChooseDocumentClick("deliveryOrder")}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='22.278'
                  height='20.782'
                  viewBox='0 0 22.278 20.782'
                >
                  <path
                    className='a'
                    d='M1.726,27.922V17.777a.655.655,0,0,1,.655-.655H19.94a.655.655,0,0,1,.655.655V28.731a1.967,1.967,0,0,1,1.242,3.194L18.885,35.5c-1.827,2.138-3.768,2.4-6.654,2.4a21.489,21.489,0,0,1-5.741-.481l-2.1-.5A1.834,1.834,0,0,1,2.9,37.7H1.864A1.919,1.919,0,0,1,0,35.739V29.881A1.928,1.928,0,0,1,1.726,27.922ZM4.672,29.27l.873-.443a5.192,5.192,0,0,1,4.554-.073,6.261,6.261,0,0,0,1.716.664h3.03a1.825,1.825,0,0,1,1.823,1.823v.478l.017-.018,2.164-2.349A2,2,0,0,1,19.284,29v-6.5H13.921v2.4a.655.655,0,0,1-.655.655H9.131a.655.655,0,0,1-.655-.655v-2.4H3.037v5.429A1.89,1.89,0,0,1,4.672,29.27Zm7.939-6.777H9.786V24.24h2.825ZM3.037,21.183H8.475v-2.75H3.037v2.75Zm6.749-2.75v2.75h2.825v-2.75Zm4.135,0v2.75h5.363v-2.75ZM6.795,36.148a20.848,20.848,0,0,0,5.414.438c2.709,0,4.017-.044,5.666-1.917l2.952-3.578a.663.663,0,0,0-1.014-.851l-2.164,2.349a2.975,2.975,0,0,1-2.178.955h-6a.655.655,0,1,1,0-1.311h5.886V31.24a.513.513,0,0,0-.512-.512h-3.03a6,6,0,0,1-2.268-.786A3.888,3.888,0,0,0,6.137,30l-1.372.7v4.97ZM1.31,35.739a.611.611,0,0,0,.555.654H2.9a.611.611,0,0,0,.555-.654V29.881a.611.611,0,0,0-.555-.654H1.864a.611.611,0,0,0-.555.654Z'
                    transform='translate(0.001 -17.122)'
                  />
                </svg>
                <span>Delivery Orders</span>
              </div>

              <div
                className='paymentCertificate'
                onClick={() => this.onChooseDocumentClick('paymentCertificate')}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='22.278'
                  height='21.081'
                  viewBox='0 0 22.278 21.081'
                >
                  <path
                    id='Union_2'
                    data-name='Union 2'
                    d='M18.187-2276.923a.423.423,0,0,1-.357-.3l-.854-3.074a1.046,1.046,0,0,1-.247.031,1.053,1.053,0,0,1-.248-.031l-.854,3.074a.423.423,0,0,1-.356.3c-.019,0-.038,0-.056,0a.43.43,0,0,1-.37-.206l-.591-.988-1.025.571a.44.44,0,0,1-.473-.03.4.4,0,0,1-.152-.434l.942-3.392a3.153,3.153,0,0,1-.19-.39,1.363,1.363,0,0,0-.206-.38,1.423,1.423,0,0,0-.394-.2,1.573,1.573,0,0,1-.833-.576,1.438,1.438,0,0,1-.1-.975,1.333,1.333,0,0,0,.017-.438,1.3,1.3,0,0,0-.232-.351,1.508,1.508,0,0,1-.427-.913,1.514,1.514,0,0,1,.427-.914,1.321,1.321,0,0,0,.232-.351,1.328,1.328,0,0,0-.017-.437,1.441,1.441,0,0,1,.1-.976,1.578,1.578,0,0,1,.833-.576,1.436,1.436,0,0,0,.4-.2,1.35,1.35,0,0,0,.205-.38,1.532,1.532,0,0,1,.6-.8,1.6,1.6,0,0,1,1.012-.1,1.516,1.516,0,0,0,.454.016,1.385,1.385,0,0,0,.364-.224,1.618,1.618,0,0,1,.947-.411,1.62,1.62,0,0,1,.947.411,1.371,1.371,0,0,0,.364.224,1.517,1.517,0,0,0,.455-.016,1.593,1.593,0,0,1,1.011.1,1.523,1.523,0,0,1,.6.8,1.349,1.349,0,0,0,.206.38,1.429,1.429,0,0,0,.394.2,1.584,1.584,0,0,1,.833.576,1.446,1.446,0,0,1,.1.976,1.357,1.357,0,0,0-.017.438,1.354,1.354,0,0,0,.232.35,1.514,1.514,0,0,1,.427.914,1.508,1.508,0,0,1-.427.913,1.344,1.344,0,0,0-.232.351,1.358,1.358,0,0,0,.017.438,1.443,1.443,0,0,1-.1.975,1.575,1.575,0,0,1-.833.576,1.45,1.45,0,0,0-.394.2,1.356,1.356,0,0,0-.206.381,3.211,3.211,0,0,1-.19.389l.012.044c.151-.115.3-.237.436-.364a1,1,0,0,1-.411.455l.9,3.258a.4.4,0,0,1-.152.434.44.44,0,0,1-.473.03l-1.024-.571-.592.988a.429.429,0,0,1-.369.206A.381.381,0,0,1,18.187-2276.923Zm-.149-3.981a1.085,1.085,0,0,0-.3.176l.647,2.33.29-.483a.425.425,0,0,1,.259-.192.441.441,0,0,1,.324.041l.5.28-.589-2.118a2.337,2.337,0,0,1-.682-.016,2.688,2.688,0,0,0-.33-.03A.493.493,0,0,0,18.039-2280.9Zm-3.52,1.831a.423.423,0,0,1,.259.192l.29.483.648-2.33a1.1,1.1,0,0,0-.3-.176,1.48,1.48,0,0,0-.454.017,2.332,2.332,0,0,1-.681.016l-.589,2.118.5-.28a.444.444,0,0,1,.213-.055A.411.411,0,0,1,14.519-2279.073Zm1.12-2.626a1.978,1.978,0,0,1,.663.366,1.091,1.091,0,0,0,.427.241,1.1,1.1,0,0,0,.427-.241,1.978,1.978,0,0,1,.663-.366,2.107,2.107,0,0,1,.784,0,1.148,1.148,0,0,0,.474.006,1.06,1.06,0,0,0,.237-.406,1.905,1.905,0,0,1,.391-.647,2.021,2.021,0,0,1,.671-.377,1.117,1.117,0,0,0,.42-.228,1.027,1.027,0,0,0-.006-.457,1.893,1.893,0,0,1,0-.756,1.869,1.869,0,0,1,.381-.64c.112-.14.25-.314.25-.411s-.139-.272-.25-.411a1.886,1.886,0,0,1-.381-.64,1.9,1.9,0,0,1,0-.757,1.022,1.022,0,0,0,.006-.456,1.106,1.106,0,0,0-.42-.229,1.992,1.992,0,0,1-.671-.377,1.9,1.9,0,0,1-.391-.647,1.064,1.064,0,0,0-.237-.406,1.149,1.149,0,0,0-.474.006,2.072,2.072,0,0,1-.784,0,1.973,1.973,0,0,1-.663-.366,1.1,1.1,0,0,0-.427-.241,1.1,1.1,0,0,0-.427.241,1.973,1.973,0,0,1-.663.366,2.092,2.092,0,0,1-.785,0,1.15,1.15,0,0,0-.474-.006,1.076,1.076,0,0,0-.236.406,1.886,1.886,0,0,1-.391.647,1.988,1.988,0,0,1-.671.377,1.126,1.126,0,0,0-.421.228,1.04,1.04,0,0,0,.006.457,1.882,1.882,0,0,1,0,.757,1.884,1.884,0,0,1-.38.64c-.112.14-.25.313-.25.411s.139.271.25.411a1.867,1.867,0,0,1,.38.64,1.877,1.877,0,0,1,0,.756,1.04,1.04,0,0,0-.006.457,1.117,1.117,0,0,0,.42.228,2,2,0,0,1,.671.377,1.915,1.915,0,0,1,.391.647,1.049,1.049,0,0,0,.236.406,1.149,1.149,0,0,0,.474-.006,3.575,3.575,0,0,1,.439-.035A1.373,1.373,0,0,1,15.638-2281.7Zm-2.8.57H1a1,1,0,0,1-1-1V-2297a1,1,0,0,1,1-1H19.448a1,1,0,0,1,1,1v6.989a5.982,5.982,0,0,0-1.454-1.026v-5.561H1.5v14.066H11.35a5.922,5.922,0,0,0,1.487,1.4l0,0Zm.05-4.49a3.781,3.781,0,0,1,3.843-3.705,3.78,3.78,0,0,1,3.842,3.705,3.78,3.78,0,0,1-3.842,3.705A3.781,3.781,0,0,1,12.885-2285.619Zm.854,0a2.941,2.941,0,0,0,2.989,2.882,2.94,2.94,0,0,0,2.988-2.882,2.939,2.939,0,0,0-2.988-2.882A2.94,2.94,0,0,0,13.739-2285.619Zm-10.063.94a.723.723,0,0,1-.723-.723.723.723,0,0,1,.723-.724h5.1a.723.723,0,0,1,.723.724.723.723,0,0,1-.723.723Zm0-2.76a.723.723,0,0,1-.723-.724.723.723,0,0,1,.723-.723h5.1a.723.723,0,0,1,.723.723.723.723,0,0,1-.723.724Zm5.817-2.8a.724.724,0,0,1-.724-.723.723.723,0,0,1,.724-.723h.735a.723.723,0,0,1,.723.723.723.723,0,0,1-.723.723Zm-5.817,0a.723.723,0,0,1-.723-.723.723.723,0,0,1,.723-.723H7.32a.723.723,0,0,1,.724.723.724.724,0,0,1-.724.723Zm10.179-2.848a.723.723,0,0,1-.724-.723.724.724,0,0,1,.724-.724h2.916a.723.723,0,0,1,.723.724.723.723,0,0,1-.723.723Zm-10.179,0a.723.723,0,0,1-.723-.723.723.723,0,0,1,.723-.724h7.278a.724.724,0,0,1,.724.724.723.723,0,0,1-.724.723Z'
                    transform='translate(0 2298)'
                    fill='#fff'
                  />
                </svg>
                <span>Payment Certificate</span>
              </div>
              <div
                className='invoice'
                onClick={() => this.onChooseDocumentClick('invoice')}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='19.922'
                  height='20'
                  viewBox='0 0 19.922 20'
                >
                  <g transform='translate(-1)'>
                    <path
                      className='a'
                      d='M228.337,70.119c-.09-.032-.182-.065-.273-.1V68.464a.726.726,0,0,1,.314.165.391.391,0,0,0,.588-.515,1.505,1.505,0,0,0-.9-.448v-.276a.391.391,0,0,0-.781,0v.321c-.04.01-.081.021-.123.033a1.448,1.448,0,0,0-.993,1.136,1.281,1.281,0,0,0,.421,1.261,3.309,3.309,0,0,0,.695.4v1.984a1.367,1.367,0,0,1-.68-.27.391.391,0,1,0-.428.654,2.108,2.108,0,0,0,1.108.4v.329a.391.391,0,0,0,.781,0v-.364a1.757,1.757,0,0,0,1.323-1.411A1.525,1.525,0,0,0,228.337,70.119Zm-1.267-.591a.517.517,0,0,1-.135-.5.7.7,0,0,1,.348-.491v1.134A1.844,1.844,0,0,1,227.07,69.528Zm1.546,2.208a.972.972,0,0,1-.553.723V70.851l.013,0A.759.759,0,0,1,228.616,71.736Z'
                      transform='translate(-216.209 -64.383)'
                    />
                    <path
                      className='a'
                      d='M61.586,93.172h4.3a.586.586,0,0,0,0-1.172h-4.3a.586.586,0,0,0,0,1.172Z'
                      transform='translate(-57.656 -88.406)'
                    />
                    <path
                      className='a'
                      d='M61.586,153.172h4.3a.586.586,0,0,0,0-1.172h-4.3a.586.586,0,0,0,0,1.172Z'
                      transform='translate(-57.656 -146.063)'
                    />
                    <path
                      className='a'
                      d='M61.586,213.172h4.3a.586.586,0,0,0,0-1.172h-4.3a.586.586,0,0,0,0,1.172Z'
                      transform='translate(-57.656 -203.719)'
                    />
                    <path
                      className='a'
                      d='M70.18,272H61.586a.586.586,0,0,0,0,1.172H70.18a.586.586,0,0,0,0-1.172Z'
                      transform='translate(-57.656 -261.375)'
                    />
                    <path
                      className='a'
                      d='M70.18,332H61.586a.586.586,0,0,0,0,1.172H70.18a.586.586,0,0,0,0-1.172Z'
                      transform='translate(-57.656 -319.031)'
                    />
                    <path
                      className='a'
                      d='M70.18,392H61.586a.586.586,0,0,0,0,1.172H70.18a.586.586,0,0,0,0-1.172Z'
                      transform='translate(-57.656 -376.688)'
                    />
                    <path
                      className='a'
                      d='M20.606,11.863A.586.586,0,0,0,20,11.9l-1.324.934L17.35,11.9a.586.586,0,0,0-.675,0l-1.221.862V.586a.586.586,0,0,0-.924-.479l-1.324.934L11.881.107a.586.586,0,0,0-.676,0l-1.323.933L8.562.107a.586.586,0,0,0-.676,0L6.564,1.04,5.243.107a.586.586,0,0,0-.676,0l-1.322.933L1.924.107A.586.586,0,0,0,1,.586v15.7A3.715,3.715,0,0,0,4.711,20H17.6a3.324,3.324,0,0,0,3.32-3.32v-4.3A.586.586,0,0,0,20.606,11.863ZM2.172,16.289V1.717l.736.519a.586.586,0,0,0,.676,0L4.9,1.3l1.322.933a.586.586,0,0,0,.676,0L8.224,1.3l1.321.933a.586.586,0,0,0,.676,0L11.544,1.3l1.324.934a.586.586,0,0,0,.675,0l.738-.521V16.68a3.3,3.3,0,0,0,.792,2.148H4.711A2.542,2.542,0,0,1,2.172,16.289Zm17.578.391a2.148,2.148,0,1,1-4.3,0V14.132a.585.585,0,0,0,.236-.1l1.323-.934,1.324.934a.586.586,0,0,0,.675,0l.738-.521Z'
                      transform='translate(0 0)'
                    />
                  </g>
                </svg>
                <span>Invoice</span>
              </div>
            </div>
          </DialogContent>
        </Dialog>
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
            {/* <DialogContentText id="scroll-dialog-description"> */}
            {this.state.document.doc &&
              (this.state.document.doc.docType === 'Sales Quotation' ? (
                <SaleModalTemplate document={this.state.document} />
              ) : this.state.document.doc.docType === 'Invoices' ? (
                <InvoicesTemplate
                  document={this.state.document}
                  showTerms={true}
                  showDigitalSign={true}
                />
              ) : this.state.document.doc.docType === 'Payment Certificate' ? (
                <PaymentCertTemplate
                  document={this.state.document}
                  showTerms={true}
                  showDigitalSign={true}
                />
              ) : null)}
            {/* </DialogContentText>   */}
          </DialogContent>
        </Dialog>
        <Dialog
          open={this.state.openNoaModal}
          onClose={this.handleCloseNoaModal}
          aria-labelledby='simple-modal-title'
          ariadescribedby='simple-modal-description'
          className='saleModaleTemplate '
        >
          <DialogTitle
            id='customized-dialog-title'
            onClose={this.handleCloseNoaModal}
          >
            NOA Details
          </DialogTitle>
          <DialogContent>
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
              <NOATemplate
                issuer={this.state.docIssuer}
                investorDetails={this.state.investorDetails}
                user={this.state.user}
                financierCompanyDetails={this.state.financierCompanyDetails}
                document={this.state.docReciepient}
                selectedData={this.state.selectedData}
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default withRouter(SalesOverview);

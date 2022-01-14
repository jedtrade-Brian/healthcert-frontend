import React, { Component } from 'react';
import {
  Button,
  IconButton,
  Dialog,
  TextField,
  FormControl,
  InputLabel,
  Select,
  Input,
} from '@material-ui/core';
import { saleTabList, saleNOATabList } from './SalesTabConfig';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import MuiDialogActions from '@material-ui/core/DialogActions';
import SettingsBackupRestoreIcon from '@material-ui/icons/SettingsBackupRestore';
import { Checkbox } from 'pretty-checkbox-react';
import NOATemplate from './NOATemplate';
import { withRouter } from 'react-router-dom';
import NewReactTableComponent from '../../../ReactTable/NewReactTable.js';
import { getFinancierCompanyName } from '../../../services/financierService';
import MenuItem from '@material-ui/core/MenuItem';
import {BackdropLoader} from "../../../services/loader";
import authService from "../../../services/authService"
import { getFinancingNOA } from '../../../services/invoiceService';
import './salesTab.css';
import ConfirmationPopUp from '../../Shared/Documents/ConfirmationPopUp';
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
  closeButton1: {
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
          <ArrowBackIosIcon />
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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

class SalesTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNo: 0,
      rows: 5,
      invoices: this.props.data ? this.props.data.invoices ? this.props.data.invoices : [] : [],
      noa: this.props.data ? this.props.data.noa ? this.props.data.noa : [] : [],
      value: 0,
      buttonData: 'Invoices',
      openModal: false,
      openModal1: false,
      rowData: false,
      selectedArray: [],
      selectAll: false,
      selected: {},
      financierCompanies: null,
      selectedFinanCompName: '',
      documentName: '',
      totalCount: this.props.data
        ? this.props.data.invoices
          ? this.props.data.invoices.length
          : 0
        : 0,
      selectedBuyer: null,
      financierCompanyDetails: null,
      docReciepient: null,
      selectedData: null,
      investorDetails: null,
      docIssuer: null,
      user: authService.getUserInfo(),
      openRevokedModal: false,
      selectedDoc: null
    };
  }

  componentDidMount() {
    // this.setState({
    //   invoices: this.props.data.invoices,
    //   noa: this.props.data.noa
    // });
    getFinancierCompanyName()
      .then((response) => {
        if (response && response.data) {
          this.setState({ financierCompanies: response.data.listOfCompanies });
        }
      })
      .catch((error) => {
        console.log('Financier company name error : ', error);
      });
  }

  invoiceClick = () => {
    this.setState({ buttonData: 'Invoices' });
    this.props.onChildTabClick('sales', 'invoice');
  };

  noaClick = () => {
    this.setState({ buttonData: 'NOA' });
    this.props.onChildTabClick('sales', 'NOA');
  };

  handleClickOpen = () => {
    console.log('Selected Array : ', this.state.selectedArray);
    this.setState({ openModal: true });
  };

  handleClose = () => {
    this.setState({ openModal: false });
  };

  handleClose1 = () => {
    this.setState({ openModal1: false });
  };

  handleModalOpen = () => {
    this.setState({ openModal1: true, openModal: false });
  };

  modalSuccessOpen = () => {
    console.log('State : ', this.state);
    this.props.history.push({
      pathname: "/reviewNOATemplate",
      state: {
        selectedData: {
          docName : this.state.documentName,
          financierName : this.state.selectedFinanCompName,
          selectedInvoices: this.state.selectedArray
        }
      }
    })
    // this.props.history.push("/reviewNOATemplate");
  };

  noaClickData = (rowData) => {
    if(rowData && rowData.original && rowData.original.docHash && rowData.original.docHash !== ''){
      this.setState({loader: true})
      getFinancingNOA(rowData.original.docHash).then(response => {
        let financierCompanyDetails = null;
        let docReciepient = null;
        let selectedData = null;
        let investorDetails = null;
        let docIssuer = null;
        if(response && response.data){
         const data = response.data[0]
        // console.log('Response %%% : ',response);
         financierCompanyDetails = {
            financierDetails : {
              accountName: data.financierDetails ? data.financierDetails.bankDetails.accName : '',
              accountNumber: data.financierDetails ? data.financierDetails.bankDetails.accNum : '',
              bankName: data.financierDetails ? data.financierDetails.bankDetails.bankName : '',
              swiftNumber: data.financierDetails ? data.financierDetails.bankDetails.swiftNo : ''
            },
            email: data.financierDetails ? data.financierDetails.email : ''
          }
         docReciepient = {
            recipientDetails: {
              name: data.recipient ? data.recipient.name : '',
              companyName: data.recipient ? data.recipient.cpyName : '',
              fullAddress: {
                ...data.recipient.address,
                address: data.recipient ? data.recipient.address : '',
                zipcode: data.recipient ? data.recipient.zipcode : ''
              },
              phoneNumber: data.recipient ? data.recipient.phoneNo : ''
            }
          }
          selectedData = {
            selectedInvoices: data.reqInfo ? data.reqInfo.map(item => (
              {
                invNo: item.invNo,
                invDate: item.date,
                amount: item.amt
              }
            )) : []
          }
          docIssuer = {
            ...data.issuers[0],
            name : data.issuers[0].name,
            signDate: data.recipient ? data.recipient.date : '',
          };
          investorDetails = data.noaDetails;
        }
        // console.log('**%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%',docReciepient);
        this.setState({loader: false,docIssuer,rowData: true,financierCompanyDetails,docReciepient,selectedData,investorDetails})
      }).catch(err => {
        console.log('Invoice NOA error : ',err);
        this.setState({loader: false})
      })
    }
    // const document = {
    //   recipientDetails: rowData.original.buyerInfo
    // }
    // const financierCompanyDetails = {
    //   financierDetails: rowData.original.financierInfo.financierDetails
    // }
    // const selectedData = {
    //   selectedInvoices: rowData.original.invDetails ? rowData.original.invDetails.map(item => (
    //     {
    //       invNo: item.invNo,
    //       invDate: item.date,
    //       amount: item.amt
    //     }
    //   )) : []
    // }
    // this.setState({ rowData: true,document,financierCompanyDetails,selectedData });
  };

  backButton = () => {
    this.setState({ rowData: false });
  };

  // onRowSelected = (sarray) => {
  //   if (sarray.length === this.state.totalCount) {
  //     this.setState({ selectAll: true });
  //   } else {
  //     this.setState({ selectAll: false });
  //   }
  // };

  // toggleSelectAllRow = (isChecked) => {
  //   if (isChecked) {
  //     this.getSalesTab();
  //   } else {
  //     this.setState({
  //       selectAll: false,
  //       selectedArray: [],
  //       selected: {},
  //     });
  //   }
  // };

  // getSalesTab = () => {
  //   let selectedArr = [];
  //   let consolidateArray = [];
  //   this.state.invoices.map((item) => {
  //     consolidateArray[item.docHash] = true;
  //     return selectedArr.push(item);
  //   });
  //   this.setState({
  //     selectAll: true,
  //     selected: consolidateArray,
  //     selectedArray: selectedArr,
  //   });
  // };

  toggleRowNew = (evt , docHash, rowInfo) => {
    if(evt.target.checked){
      const selectedBuyer = this.state.selectedBuyer ? [...this.state.selectedBuyer,rowInfo.buyerEmail] : [rowInfo.buyerEmail]
      this.setState({selectedBuyer : selectedBuyer })
    } else {
      if(this.state.selectedBuyer.includes(rowInfo.buyerEmail)){
        let {selectedBuyer} = {...this.state}
        if(this.state.selectedBuyer.length > 1){
          selectedBuyer.splice(0, 1)
        } else {
          selectedBuyer = []
        }
        this.setState({selectedBuyer : selectedBuyer})
      }  
    }
    const newSelected = Object.assign({}, this.state.selected);
    newSelected[docHash] = !this.state.selected[docHash];
    this.setState({
      selected: newSelected,
      // selectedBuyer: rowInfo.buyerEmail
    });
    const { selectedArray } = this.state;
    let arr = selectedArray.filter((val) => val.docHash !== docHash);
    if (!arr.length) {
      this.setState(
        {
          selectedArray: [],
        },
        // () => {
        //   this.onRowSelected(this.state.selectedArray);
        // }
      );
    }
    if (arr.length === selectedArray.length) {
      this.setState(
        {
          selectedArray: [...selectedArray, rowInfo],
        },
        // () => {
        //   this.onRowSelected(this.state.selectedArray);
        // }
      );
    } else {
      this.setState(
        {
          selectedArray: arr,
        },
        // () => {
        //   this.onRowSelected(this.state.selectedArray);
        // }
      );
    }
  };

  goToCreateInvoice = () => {
    this.props.history.push('/createDocument/invoice');
  };

  handleFilter = (eve) => {
    const selectedFinanCompName = eve.target.value;
    this.setState({ selectedFinanCompName });
  };

  handleCancel = () => {
    this.setState({openModal1: false})
  }

  handleRevokedClick = (e,row) => {
    e.stopPropagation()
    this.setState({openRevokedModal: true,selectedDoc: row.original})
  }
  handleCancelRevoke = () => {
    this.setState({openRevokedModal: false, selectedDoc: null})
  }

  handleConfirmClick = () => {
    this.props.onRevoked(this.state.selectedDoc)
  }

  render() {
    if(this.state.loader){
      return <BackdropLoader open={this.state.loader} />
    }
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
        Header: 'Action',
        Cell: (row) => {
          return (
            <Button
              onClick={(e) => {
                this.handleRevokedClick(e,row)
              }}
              disabled={row.original.isRevoked}
              className={row.original.isRevoked ? 'revokeBtnDisabled' : 'revokeBtn'}
              // className='revokeBtn'
              variant='contained'
              color='secondary'
              startIcon={
                <SettingsBackupRestoreIcon></SettingsBackupRestoreIcon>
              }
            >
              Revoke
            </Button>
          );
        },
      },
      {
        // Header: (obj) => {
        //   return (
        //     <Checkbox
        //       // defaultChecked
        //       size='small'
        //       value='small'
        //       color='primary'
        //       // style="thick"
        //       inputprops={{ 'aria-label': 'checkbox with small size' }}
        //       checked={this.state.selectAll}
        //       onChange={(e) => {
        //         this.toggleSelectAllRow(e.target.checked);
        //       }}
        //     />
        //   );
        // },
        Cell: (rowInfo) => {
          return (
            <Checkbox
              // defaultChecked
              size='small'
              value='small'
              color='primary'
              onClick={(e) => e.stopPropagation()}
              // style="thick"
              disabled={(this.state.selectedBuyer && this.state.selectedBuyer.length ? !this.state.selectedBuyer.includes(rowInfo.original.buyerEmail) : false) || rowInfo.original.isRevoked || rowInfo.original.financingStatus === 1 || rowInfo.original.financingStatus === 2}
              inputprops={{ 'aria-label': 'checkbox with small size' }}
              checked={this.state.selected[rowInfo.original.docHash] === true}
              onChange={(evt) =>
                this.toggleRowNew(evt, rowInfo.original.docHash, rowInfo.original)
              }
            />
          );
        },
      },
    ];

    const columns = nameColumn
      .concat(saleTabList.columns)
      .concat(checkboxColumn);
    // const columns = saleTabList.columns.concat(checkboxColumn);

    const nameColumn1 = [
      {
        Header: 'S.',
        Cell: (row) => {
          return <div className='dot'>{row.original.sNo}</div>;
        },
        width: 45,
      },
    ];

    // const actionBtn = [
    //   {
    //     Header: 'Action',
    //     Cell: (row) => {
    //       return (
    //         <Button
    //           className='revokeBtn'
    //           variant='contained'
    //           color='secondary'
    //           startIcon={
    //             <SettingsBackupRestoreIcon></SettingsBackupRestoreIcon>
    //           }
    //         >
    //           Revoke
    //         </Button>
    //       );
    //     },
    //   },
    // ];

    const columns1 = nameColumn1
      .concat(saleNOATabList.columns)
      // .concat(actionBtn);
    return (
      <div>
       <BackdropLoader open={this.props.loader} />
        <div className='invoicetabs'>
          <Button
            className={
              this.state.buttonData === 'Invoices' ? 'activeButton' : ''
            }
            onClick={this.invoiceClick}
          >
            Invoices
          </Button>
          <Button
            className={this.state.buttonData === 'NOA' ? 'activeButton' : ''}
            onClick={this.noaClick}
          >
            NOA
          </Button>
        </div>
        {this.state.buttonData === 'Invoices' ? (
          <div>
            <div className='invoiceviewcreateAction'>
              {this.state.selectAll === true ||
              this.state.selectedArray.length > 0 ? (
                <Button onClick={this.handleClickOpen} className='financingBtn'>
                  FINANCING
                </Button>
              ) : (
                ''
              )}
              {/* <Button className="verifyinvoiceBtn">VERIFY INVOICE</Button> */}
              <Button
                className='createinvoiceBtn'
                onClick={this.goToCreateInvoice}
              >
                CREATE INVOICE
              </Button>
            </div>
            {this.state.invoices && (
              <div className='invoiceSalesTab'>
                <NewReactTableComponent
                  listData={this.state.invoices}
                  listConfig={saleTabList}
                  columns={columns}
                  onHeaderClick={this.sortByHeader}
                  onRowClick={this.props.onOpenModalQuotation}
                  forSerialNo={{
                    pageNo: this.state.pageNo,
                    pageSize: this.state.rows,
                  }}
                />
              </div>
            )}
          </div>
        ) : this.state.buttonData === 'NOA' && this.state.rowData === false ? (
          <div>
            {this.state.noa && (
              <div className=' NoaSelect'>
                <NewReactTableComponent
                  listData={this.state.noa}
                  listConfig={saleNOATabList}
                  columns={columns1}
                  onHeaderClick={this.sortByHeader}
                  onRowClick={this.noaClickData}
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
            <div className='noaBackBTn'>
              <Button onClick={this.backButton}>
                <span>
                  <ArrowBackIosIcon />
                </span>
                Back
              </Button>
            </div>
            <NOATemplate issuer={this.state.docIssuer} investorDetails={this.state.investorDetails} user={this.state.user} document={this.state.docReciepient} financierCompanyDetails={this.state.financierCompanyDetails} selectedData={this.state.selectedData}/>
          </div>
        )}
        <Dialog
          open={this.state.openModal}
          onClose={this.handleClose}
          aria-labelledby='simple-modal-title'
          ariadescribedby='simple-modal-description'
          className='financingModalClass'
        >
          <DialogTitle id='customized-dialog-title' onClose={this.handleClose}>
            FINANCING DETAILS
          </DialogTitle>
          <DialogContent>
            <div className='financingDetailfield'>
              <div>
                <TextField
                  value={this.state.documentName}
                  margin='normal'
                  id='documentName'
                  name='documentName'
                  placeholder='Document Name'
                  onChange={(eve) =>
                    this.setState({ [eve.target.name]: eve.target.value })
                  }
                />
              </div>
              <div>
                <FormControl>
                  <InputLabel id='demo-simple'>Financial Institute</InputLabel>
                  <Select
                    labelid='demo-simple'
                    value={this.state.selectedFinanCompName}
                    name='industry'
                    onChange={this.handleFilter}
                    input={<Input />}
                    MenuProps={MenuProps}
                  >
                  {this.state.financierCompanies ? this.state.financierCompanies.map((item, index) => 
                         (
                            <MenuItem key={index} value={item.companyName}>
                              {item.companyName}
                            </MenuItem>
                          )
                        )
                        : (
                          <MenuItem value=''>
                            No financial institute found
                          </MenuItem>
                        )
                      })
                    {/* ) : (
                      <MenuItem value=''>No financial institute found</MenuItem>
                    )} */}
                  </Select>
                </FormControl>
              </div>
            </div>
          </DialogContent>
          <DialogButton>
            <Button onClick={this.handleModalOpen}>CREATE DOCUMENT</Button>
          </DialogButton>
        </Dialog>
        <Dialog
          open={this.state.openModal1}
          onClose={this.handleClose1}
          aria-labelledby='simple-modal-title'
          ariadescribedby='simple-modal-description'
          className='chooseTemplateModal'
        >
          <DialogContent>
            <div className='choosetemplatebody'>
              <h5>Choose a Document</h5>
              <img
                src={require('../../../assets/noaTemplate.png')}
                alt='NOA Template'
                className='saleTemplateImg'
              />
            </div>
          </DialogContent>
          <DialogButton>
            <div className='choostemplateActions'>
              <Button className='cancelbtn' onClick={this.handleCancel}>CANCEL</Button>
              <Button
                className='autogenerateBtn'
                onClick={this.modalSuccessOpen}
              >
                AUTO GENERATE
              </Button>
              {/* <Button className="importfileBtn">IMPORT FILE</Button> */}
            </div>
          </DialogButton>
        </Dialog>

        {this.state.openRevokedModal && (
              <ConfirmationPopUp
                openDeclinedModal={this.state.openRevokedModal}
                onCancelClick={this.handleCancelRevoke}
                title={'Revoke Invoice'}
                message="Are you sure you want to revoke this invoice"
                onConfirmClick={this.handleConfirmClick}
              />
        )}
      </div>
    );
  }
}

export default withRouter(SalesTab);

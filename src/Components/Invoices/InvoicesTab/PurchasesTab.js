import React, { Component } from "react";
import {
  Button,
  IconButton,
  Dialog,
  TextField,
  FormControl,
  InputLabel,
  Select,
  Input
} from "@material-ui/core";
import ReactTableComponent from "../../../ReactTable/ReactTable.js";
import { saleTabList, saleNOATabList } from "./SalesTabConfig";
import {purchaseTabList} from "./PurchaseConfig"
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import MuiDialogActions from "@material-ui/core/DialogActions";
import SettingsBackupRestoreIcon from '@material-ui/icons/SettingsBackupRestore';
import NOATemplate from "./NOATemplate";
import { withRouter } from "react-router-dom";
import NewReactTableComponent from '../../../ReactTable/NewReactTable.js';
import {BackdropLoader} from "../../../services/loader";
import {purchaseNOATabList} from "./PurchaseConfig"

import "./purchasesTab.css";
import authService from "../../../services/authService.jsx";
const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: "absolute",
    left: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  },
  closeButton1: {
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
          <ArrowBackIosIcon />
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

const DialogButton = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1)
  }
}))(MuiDialogActions);

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

class PurchasesTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNo: 0,
      rows: 5,
      invoices: this.props.data ? this.props.data.invoices ? this.props.data.invoices : [] : [],
      noa: this.props.data ? this.props.data.noa ? this.props.data.noa : [] : [],
      value: 0,
      buttonData: "Invoices",
      openModal: false,
      openModal1: false,
      rowData: false,
      user: authService.getUserInfo(),
      document: null,
      financierCompanyDetails: null,
      selectedData: null,
      investorDetails: null,
      docIssuer: null,
      docReciepient: null
    };
  }

  // componentWillMount() {
  //   this.setState({
  //     invoices: this.props.data.invoices,
  //     noa: this.props.data.noa
  //   });
  // }

  invoiceClick = () => {
    this.setState({ buttonData: "Invoices" });
    this.props.onChildTabClick("sales", "invoice");
  };

  noaClick = () => {
    this.setState({ buttonData: "NOA" });
    this.props.onChildTabClick("sales", "NOA");
  };

  handleClickOpen = () => {
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
    this.props.history.push("/reviewNOATemplate");
  };

  noaClickData = (rowData) => {
    console.log('RowData : ',rowData);
    // this.setState({ rowData: true });
    const document = {
      // recipientDetails: rowData.original.buyerInfo
      recipientDetails: {
        name: rowData.original.buyerInfo ? rowData.original.buyerInfo.name : '',
        companyName: rowData.original.buyerInfo ? rowData.original.buyerInfo.cpyName : '',
        fullAddress: {
          ...rowData.original.buyerInfo,
          address: rowData.original.buyerInfo ? rowData.original.buyerInfo.address : '',
          zipcode: rowData.original.buyerInfo ? rowData.original.buyerInfo.zipcode : '',
        },
        phoneNumber: rowData.original.buyerInfo ? rowData.original.buyerInfo.phoneNo : '',
      },
    }
    const financierCompanyDetails = {
      financierDetails: rowData.original.financierInfo.financierDetails
    }
    const selectedData = {
      selectedInvoices: rowData.original.invDetails ? rowData.original.invDetails.map(item => (
        {
          invNo: item.invNo,
          invDate: item.date,
          amount: item.amt
        }
      )) : []
    }
    const investorDetails = rowData.original.noaInfo ? rowData.original.noaInfo : null;
    const docReciepient = {
      recipientDetails: {
        name: rowData.original.buyerInfo ? rowData.original.buyerInfo.name : '',
        companyName: rowData.original.buyerInfo ? rowData.original.buyerInfo.cpyName : '',
        fullAddress: {
          address: rowData.original.buyerInfo ? rowData.original.buyerInfo.address : '',
          zipcode: rowData.original.buyerInfo ? rowData.original.buyerInfo.zipcode : ''
        },
        phoneNumber: rowData.original.buyerInfo ? rowData.original.buyerInfo.phoneNo : ''
      }
    }
    const docIssuer = {...rowData.original.supplierInfo, signDate: rowData.original.buyerInfo ? rowData.original.buyerInfo.date : '', designation: rowData.original.supplierDesignation.designation,email: rowData.original.supplierEmail}
    this.setState({ rowData: true,document,financierCompanyDetails,selectedData,investorDetails,docReciepient,docIssuer });
  };

  backButton = () => {
    this.setState({ rowData: false });
  };

  goToCreateInvoice = () => {
    this.props.history.push("/createDocument/invoice");
  };

  render() {
    const nameColumn = [
      {
        Header: "S.",
        Cell: row => {
          return <div className="dot">{row.original.sNo}</div>;
        },
        width: 45
      }
    ];

    const checkboxColumn = [
      {
        Header: "Action",
        Cell: row => {
          return (
            <Button
            className="revokeBtn"
            variant="contained"
            color="secondary"
            startIcon={
              <SettingsBackupRestoreIcon></SettingsBackupRestoreIcon>
            }
          >
            Revoke
          </Button>
         )
        }
      }
    ];

    const columns = nameColumn
      .concat(purchaseTabList.columns)
      // .concat(checkboxColumn);

    const nameColumn1 = [
      {
        Header: "S.",
        Cell: row => {
          return <div className="dot">{row.original.sNo}</div>;
        },
        width: 45
      }
    ];

    const actionBtn = [
      {
        Header: "Action",
        Cell: row => {
          return (
            <Button
            className="revokeBtn"
            variant="contained"
            color="secondary"
            startIcon={
              <SettingsBackupRestoreIcon></SettingsBackupRestoreIcon>
            }
          >
            Revoke
          </Button>
         )
        }
      }
    ];

    const columns1 = nameColumn1
      .concat(purchaseNOATabList.columns)
      // .concat(actionBtn);
    return (
      <div>
        <BackdropLoader open={this.props.loader} />
        <div className="invoicetabs">
          <Button
            className={
              this.state.buttonData === "Invoices" ? "activeButton" : ""
            }
            onClick={this.invoiceClick}
          >
            Invoices
          </Button>
          <Button
            className={this.state.buttonData === "NOA" ? "activeButton" : ""}
            onClick={this.noaClick}
          >
            NOA
          </Button>
        </div>
        {this.state.buttonData === "Invoices" ? (
          <>
            {this.state.invoices && (
              <div className="purchaseInvoiceTable">
                <NewReactTableComponent
                  listData={this.state.invoices}
                  listConfig={purchaseTabList}
                  columns={columns}
                  onHeaderClick={this.sortByHeader}
                  onRowClick={this.props.onOpenModalQuotation}
                  forSerialNo={{
                    pageNo: this.state.pageNo,
                    pageSize: this.state.rows
                  }}
                />
              </div>
            ) }
          </>
        ) : this.state.buttonData === "NOA" && this.state.rowData === false ? (
          <div>
            {this.state.noa && (
              <div className="PurchaseNoaSelect">
                <NewReactTableComponent
                  listData={this.state.noa}
                  listConfig={purchaseNOATabList}
                  columns={columns1}
                  onHeaderClick={this.sortByHeader}
                  onRowClick={this.noaClickData}
                  forSerialNo={{
                    pageNo: this.state.pageNo,
                    pageSize: this.state.rows
                  }}
                />
              </div>
            )}
          </div>
        ) : (
          <div>
            <div className="noaBackBTn">
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
          aria-labelledby="simple-modal-title"
          ariadescribedby="simple-modal-description"
          className="financingModalClass"
        >
          <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
            FINANCING DETAILS
          </DialogTitle>
          <DialogContent>
            <div className="financingDetailfield">
              <div>
                <TextField
                  value={this.state.document}
                  margin="normal"
                  id="documentName"
                  name="documentName"
                  placeholder="Document Name"
                  onChange={this.handleChange}
                />
              </div>
              <div>
                <FormControl>
                  <InputLabel id="demo-simple">Financial Institute</InputLabel>
                  <Select
                    labelid="demo-simple"
                    // value={this.state.industry}
                    name="industry"
                    onChange={this.handleFilter}
                    input={<Input />}
                    MenuProps={MenuProps}
                  >
                    {/* {this.state.industryOptions !== undefined
                      ? this.state.industryOptions.map((item, index) => {
                          return (
                            <MenuItem key={index} value={item.id}>
                              {item.name}
                            </MenuItem>
                          );
                        })
                      : ""} */}
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
          aria-labelledby="simple-modal-title"
          ariadescribedby="simple-modal-description"
          className="chooseTemplateModal"
        >
          <DialogContent>
            <div className="choosetemplatebody">
              <h5>Choose a Document</h5>
              <img
                src={require("../../../assets/noaTemplate.png")}
                alt="NOA Template"
                className="saleTemplateImg"
              />
            </div>
          </DialogContent>
          <DialogButton>
            <div className="choostemplateActions">
              <Button className="cancelbtn">CANCEL</Button>
              <Button
                className="autogenerateBtn"
                onClick={this.modalSuccessOpen}
              >
                AUTO GENERATE
              </Button>
            </div>
          </DialogButton>
        </Dialog>
      </div>
    );
  }
}
export default withRouter(PurchasesTab);

import React, { Component } from 'react';
import { InvoicesFinancialList, SupplierList } from './InvoicesFinancialConfig';
import { DotLoader } from 'react-spinners';
import ReactTableComponent from '../../ReactTable/ReactTable';
import './InvoicesFinancial.css';
import {
  Button,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
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
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

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

class InvoicesFinancial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNo: 10,
      rows: 10,
      listData: undefined,
      supplierData: undefined,
      value: 0,
      buttonData: 'Invoices',
      openSupplierRowModal: false,
      openViewModal: false,
      rowData: false,
      selected: {},
      selectedArray: [],
      selectAll: false,
      radioValue: 'pending',
      activeStep: 1,
    };
  }

  componentWillMount() {
    this.setState({
      listData: [
        {
          supplierName: 'Supplier A',
          pendingInvoice: '4',
          invoiceFinanced: '0',
        },
        {
          supplierName: 'Supplier B',
          pendingInvoice: '1',
          invoiceFinanced: '4',
        },
        {
          supplierName: 'Supplier C',
          pendingInvoice: '0',
          invoiceFinanced: '2',
        },
        {
          supplierName: 'Supplier D',
          pendingInvoice: '1',
          invoiceFinanced: '4',
        },
      ],
      supplierData: [
        {
          buyerName: 'Buyer 1',
          invoice: 'Invoice 1 Invoice 2',
          amount: '$10000.00 $15000.00',
          invoiceDate: '02 July 2020 02 July 2020',
        },
        {
          buyerName: 'Buyer 2',
          invoice: 'Invoice 3 Invoice 3',
          amount: '$10000.00 $20000.00',
          invoiceDate: '04 July 2020 06 July 2020',
        },
      ],
    });
  }

  handleChange = (event) => {
    this.setState({ radioValue: event.target.value });
  };

  onInvoicesFinRowClick = () => {
    this.setState({ rowData: true });
  };

  backButton = () => {
    this.setState({ rowData: false });
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
      consolidateArray[item.buyerName] = true;
      return selectedArr.push({ id: item.buyerName });
    });
    this.setState({
      selectAll: true,
      selected: consolidateArray,
      selectedArray: selectedArr,
    });
  };

  toggleRowNew = (id, rowInfo) => {
    const newSelected = Object.assign({}, this.state.selected);
    newSelected[id] = !this.state.selected[id];
    this.setState({
      selected: newSelected,
    });
    const { selectedArray } = this.state;
    let arr = selectedArray.filter((val) => val.id !== id);
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
    if (sarray.length === this.state.totalCount) {
      this.setState({ selectAll: true });
    } else {
      this.setState({ selectAll: false });
    }
  };

  onFinanceClick = () => {
    this.props.history.push({
      pathname: '/verificationCode',
      state: {
        mobileNo: '1234567890',
        email: 'nikhilsinghal@gmail.com',
        via: 'financial',
      },
    });
  };

  onSupplierRowClick = () => {
    this.setState({ openSupplierRowModal: true });
  };
  handleSupplierRowModalClose = () => {
    this.setState({ openSupplierRowModal: false });
  };

  onViewClick = () => {
    this.setState({ openSupplierRowModal: false });
    this.setState({ openViewModal: true });
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

  render() {
    const steps = this.getSteps();
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
              defaultChecked
              size='small'
              value='small'
              color='primary'
              // style="thick"
              inputProps={{ 'aria-label': 'checkbox with small size' }}
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
              defaultChecked
              size='small'
              value='small'
              color='primary'
              // style="thick"
              inputProps={{ 'aria-label': 'checkbox with small size' }}
              checked={this.state.selected[rowInfo.original.id] === true}
              onChange={() =>
                this.toggleRowNew(rowInfo.original.id, rowInfo.original)
              }
            />
          );
        },
      },
    ];

    const columns = nameColumn.concat(InvoicesFinancialList.columns);
    const Suppliercolumns = nameColumn
      .concat(SupplierList.columns)
      .concat(checkboxColumn);
    return this.state.rowData === false ? (
      <div>
        <h2>Invoice Overview</h2>
        <h4>
          Welcome to Financial Institute! You have two pending document from two
          profiles
        </h4>
        {this.state.listData ? (
          <div className='salesOverviewTable'>
            <ReactTableComponent
              listData={this.state.listData}
              listConfig={InvoicesFinancialList}
              columns={columns}
              dataCount={this.state.count}
              updatePagination={this.updatePagination}
              onHeaderClick={this.sortByHeader}
              initialPage={this.state.pageNo / this.state.rows}
              onRowClick={this.onInvoicesFinRowClick}
              forSerialNo={{
                pageNo: this.state.pageNo,
                pageSize: this.state.rows,
              }}
            />
          </div>
        ) : (
          <div className='spinner'>
            <DotLoader size={70} color={'#020f1f'} />
          </div>
        )}
      </div>
    ) : (
      <div>
        <div>
          <div className='noaBackBTn'>
            <Button onClick={this.backButton}>
              <span>
                <ArrowBackIosIcon />
              </span>
              Back
            </Button>
          </div>
          <div>
            <h2>Supplier A</h2>
            <div className='invoiceviewcreateAction'>
              <FormControl component='fieldset'>
                <RadioGroup
                  aria-label='gender'
                  name='gender1'
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
                    value='expired'
                    control={<Radio />}
                    label='Expired'
                  />
                </RadioGroup>
              </FormControl>
              <Button
                className='createinvoiceBtn'
                onClick={this.onFinanceClick}
              >
                FINANCE
              </Button>
            </div>
            {this.state.supplierData ? (
              <div className='salesOverviewTable'>
                <ReactTableComponent
                  listData={this.state.supplierData}
                  listConfig={SupplierList}
                  columns={Suppliercolumns}
                  dataCount={this.state.count}
                  updatePagination={this.updatePagination}
                  onHeaderClick={this.sortByHeader}
                  initialPage={this.state.pageNo / this.state.rows}
                  onRowClick={this.onSupplierRowClick}
                  forSerialNo={{
                    pageNo: this.state.pageNo,
                    pageSize: this.state.rows,
                  }}
                />
              </div>
            ) : (
              <div className='spinner'>
                <DotLoader size={70} color={'#020f1f'} />
              </div>
            )}
          </div>
        </div>
        <div>
          <Dialog
            open={this.state.openSupplierRowModal}
            onClose={this.handleSupplierRowModalClose}
            aria-labelledby='simple-modal-title'
            ariadescribedby='simple-modal-description'
            className='salesDocumentOptions'
          >
            <DialogTitle
              id='customized-dialog-title'
              onClose={this.handleSupplierRowModalClose}
            ></DialogTitle>
            <DialogContent>
              <div>
                <h3>FINANCING DETAILS</h3>
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
                      <td>SupplierA</td>
                      <td>Buyer1</td>
                      <td>1</td>
                      <td>$10,000</td>
                      <td>02 July 2020</td>
                      <td>02 Aug 2020</td>
                    </tr>
                  </tbody>
                </table>
                <br />
                <br />
                <table className='table'>
                  <thead>
                    <tr>
                      <th>Doc Name</th>
                      <th>Doc Type</th>
                      <th>Doc Hash</th>
                      <th>Date & Time</th>
                      <th>Status</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Sales Quotation</td>
                      <td>Sales Quotation</td>
                      <td>aa....5rdzfsd12</td>
                      <td>01 July 2020 13:25</td>
                      <td>Signed</td>
                      <td>
                        <a href='#' onClick={this.onViewClick}>
                          View
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>Payment Certificate</td>
                      <td>Payment Certificate</td>
                      <td>aa....5rdzfsd12</td>
                      <td>02 July 2020 08:20</td>
                      <td>Accepted</td>
                      <td>
                        {' '}
                        <a href='#' onClick={this.onViewClick}>
                          View
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>Invoice</td>
                      <td>Invoice</td>
                      <td>aa....5rdzfsd12</td>
                      <td>02 July 2020 08:20</td>
                      <td></td>
                      <td>
                        {' '}
                        <a href='#' onClick={this.onViewClick}>
                          View
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>NOA</td>
                      <td>NOA</td>
                      <td>aa....5rdzfsd12</td>
                      <td>03 July 2020 14:00</td>
                      <td></td>
                      <td>
                        {' '}
                        <a href='#' onClick={this.onViewClick}>
                          View
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
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
            className='salesDocumentOptions'
          >
            <DialogTitle
              id='customized-dialog-title'
              onClose={this.handleViewModalClose}
            ></DialogTitle>
            <DialogContent>
              <div>
                <div className='progressSteps'>
                  <Stepper activeStep={this.state.activeStep} alternativeLabel>
                    {steps.map((label) => (
                      <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </div>
                <div className='SalesQuotationDetailsSection'>
                  <div className='SalesQuotationDetailHead'>
                    <ul>
                      <li>
                        <h2>Jed Trade Pte Ltd</h2>
                      </li>
                      <li>
                        <span>79 Ayer Rajah Crescent</span>
                      </li>
                      <li>
                        <span>#01-03, LaunchPad @ One-North</span>
                      </li>
                      <li>
                        <span>Singapore 139955</span>
                      </li>
                      <li>
                        <span>+65 XXXXXXXXXXX / +65 XXXXXXXXXX</span>
                      </li>
                    </ul>
                    <h3>Bill To: </h3>
                    <ul>
                      <li>
                        <h2>Jed Trade Pte Ltd2</h2>
                      </li>
                      <li>
                        <h2>Jed Trade Pte Ltd</h2>
                      </li>
                      <li>
                        <span>79 Ayer Rajah Crescent</span>
                      </li>
                      <li>
                        <span>#01-03, LaunchPad @ One-North</span>
                      </li>
                      <li>
                        <span>Singapore 139955</span>
                      </li>
                      <li>
                        <span>+65 XXXXXXXXXXX / +65 XXXXXXXXXX</span>
                      </li>
                    </ul>
                    <h3>Comments:</h3>
                  </div>

                  <div className='SalesQuotationDetailBody'>
                    <div>
                      <table className='SalesQuotationassignmentTable'>
                        <thead>
                          <tr>
                            <th>S. No.</th>
                            <th>DESCRIPTION</th>
                            <th>Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>XXXXXXXXXXXX</td>
                            <td>$ XXXXXXXXX</td>
                          </tr>
                          <tr>
                            <td>2</td>
                            <td>XXXXXXXXXXXXXXXX</td>
                            <td>$ XXXXXXXXX</td>
                          </tr>
                        </tbody>
                        <tbody>
                          <tr>
                            <td></td>
                            <td></td>
                            <td>Total: $ XXXXXXXX</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div>
                      <p>
                        If you have any question concerning the quotation,
                        contact Mr. ABC via phone number +65 XXXXXXXXXX or email
                        at abc@xyz.com
                      </p>
                    </div>
                    <div>
                      <h3>Thank you for your business! </h3>
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    );
  }
}

export default withRouter(InvoicesFinancial);

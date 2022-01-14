import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import { InvoiceOverviewConfig, DeclinedConfig } from './FinancialTableConfig';
import ReactTableComponent from '../../../ReactTable/ReactTable';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import './salesOverview.css';

class FinancialTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNo: 10,
      rows: 10,
      listData: undefined,
    };
  }

  componentWillMount() {
    this.setState({
      listData: [
        {
          supplierName: 'Supplier A',
          pendingInvoices: '4',
          invoiceFinanced: '1',
        },
        {
          supplierName: 'Supplier B',
          pendingInvoices: '4',
          invoiceFinanced: '1',
        },
        {
          supplierName: 'Supplier C',
          pendingInvoices: '7',
          invoiceFinanced: '0',
        },
        {
          supplierName: 'Supplier D',
          pendingInvoices: '1',
          invoiceFinanced: '5',
        },
        {
          supplierName: 'Supplier E',
          pendingInvoices: '8',
          invoiceFinanced: '0',
        },
        {
          supplierName: 'Supplier F',
          pendingInvoices: '2',
          invoiceFinanced: '1',
        },
        {
          supplierName: 'Supplier G',
          pendingInvoices: '6',
          invoiceFinanced: '1',
        },
      ],
    });
  }

  onInvoicesFinRowClick = () => {
    this.props.history.push('/invoicesFinancial/supplier');
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
    let columns;
    this.props.isInvoiceOverview
      ? (columns = nameColumn.concat(InvoiceOverviewConfig.columns))
      : (columns = nameColumn.concat(DeclinedConfig.columns));

    return (
      <div>
        <div className='salesaction'>
          <div className='saleactionSecond'>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justify='space-around'>
                <KeyboardDatePicker
                  disableToolbar
                  format='dd/MM/yyyy'
                  margin='normal'
                  InputLabelProps={{
                    shrink: true,
                  }}
                  id='date-picker-inline'
                  label='Date Range'
                  value={
                    this.state.startDate
                    // this.state.formData[item.name] !== undefined
                    //   ? this.state.formData[item.name]
                    //   : ""
                  }
                  //   onChange={this.handleDateChange.bind(
                  //     this,
                  //     this.state.startDate
                  //   )}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                  keyboardIcon={
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='20.5'
                      height='20'
                      viewBox='0 0 31.5 36'
                    >
                      <path
                        id='Icon_awesome-calendar-alt'
                        data-name='Icon awesome-calendar-alt'
                        d='M0,32.625A3.376,3.376,0,0,0,3.375,36h24.75A3.376,3.376,0,0,0,31.5,32.625V13.5H0ZM22.5,18.844A.846.846,0,0,1,23.344,18h2.813a.846.846,0,0,1,.844.844v2.813a.846.846,0,0,1-.844.844H23.344a.846.846,0,0,1-.844-.844Zm0,9A.846.846,0,0,1,23.344,27h2.813a.846.846,0,0,1,.844.844v2.813a.846.846,0,0,1-.844.844H23.344a.846.846,0,0,1-.844-.844Zm-9-9A.846.846,0,0,1,14.344,18h2.813a.846.846,0,0,1,.844.844v2.813a.846.846,0,0,1-.844.844H14.344a.846.846,0,0,1-.844-.844Zm0,9A.846.846,0,0,1,14.344,27h2.813a.846.846,0,0,1,.844.844v2.813a.846.846,0,0,1-.844.844H14.344a.846.846,0,0,1-.844-.844Zm-9-9A.846.846,0,0,1,5.344,18H8.156A.846.846,0,0,1,9,18.844v2.813a.846.846,0,0,1-.844.844H5.344a.846.846,0,0,1-.844-.844Zm0,9A.846.846,0,0,1,5.344,27H8.156A.846.846,0,0,1,9,27.844v2.813a.846.846,0,0,1-.844.844H5.344a.846.846,0,0,1-.844-.844ZM28.125,4.5H24.75V1.125A1.128,1.128,0,0,0,23.625,0h-2.25A1.128,1.128,0,0,0,20.25,1.125V4.5h-9V1.125A1.128,1.128,0,0,0,10.125,0H7.875A1.128,1.128,0,0,0,6.75,1.125V4.5H3.375A3.376,3.376,0,0,0,0,7.875V11.25H31.5V7.875A3.376,3.376,0,0,0,28.125,4.5Z'
                      />
                    </svg>
                  }
                />
              </Grid>
            </MuiPickersUtilsProvider>
          </div>
        </div>
        <div className='dashinoviceOverviewTable'>
          <ReactTableComponent
            listData={this.state.listData}
            listConfig={
              this.props.isInvoiceOverview
                ? InvoiceOverviewConfig
                : DeclinedConfig
            }
            columns={columns}
            dataCount={4}
            updatePagination={this.updatePagination}
            onHeaderClick={this.sortByHeader}
            onRowClick={this.onInvoicesFinRowClick}
            initialPage={this.state.pageNo / this.state.rows}
            forSerialNo={{
              pageNo: this.state.pageNo,
              pageSize: this.state.rows,
            }}
          />
        </div>
      </div>
    );
  }
}

export default FinancialTable;

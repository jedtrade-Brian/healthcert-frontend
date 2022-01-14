import React, { Component } from 'react';
import { DotLoader } from 'react-spinners';
// import ReactTableComponent from '../../ReactTable/ReactTable';
import { withRouter } from 'react-router-dom';
import './InvoicesFinancial.css';
import { DeclinedList } from './InvoicesFinancialConfig';

import DateRange from '../Shared/DateRange';
import NewReactTableComponent from '../../ReactTable/NewReactTable';
import { TextField } from '@material-ui/core';

class InvoicesFinancialDeclined extends Component {
  constructor(props) {
    super(props);
    console.log('this.props.declinedData', this.props.declinedData);

    this.state = {
      pageNo: 0,
      rows: 5,
      listData: this.props.declinedData ? this.props.declinedData : [],
      search: '',
      actualData: this.props.declinedData ? this.props.declinedData : [],
    };
  }

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

  // handleSaveDate = (date) => {
  //   console.log('Date : ', date);
  // };

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
    const columns = nameColumn.concat(DeclinedList.columns);
    return (
      <div>
        {this.props.declinedData ? (
          <div>
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
            <div className='invoiceFinanceDeclinedTable'>
              {this.state.listData && (
                <NewReactTableComponent
                  listData={this.state.listData}
                  listConfig={DeclinedList}
                  columns={columns}
                  onHeaderClick={this.sortByHeader}
                  onRowClick={() => {}}
                  rowsPerPageOptions={[5, 10, 25, 50, 100]}
                  forSerialNo={{
                    pageNo: this.state.pageNo,
                    pageSize: this.state.rows,
                  }}
                />
              )}
              
            </div>
          </div>
        ) : (
          <div className='spinner'>
            <DotLoader size={70} color={'#020f1f'} />
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(InvoicesFinancialDeclined);

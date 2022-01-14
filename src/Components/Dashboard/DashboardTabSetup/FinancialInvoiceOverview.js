import React, { Component } from 'react';
import { InvoiceOverviewConfig } from './FinancialTableConfig';
import NewReactTableComponent from '../../../ReactTable/NewReactTable';
import DateRange from '../../Shared/DateRange';
import './salesOverview.css';
import { BackdropLoader } from '../../../services/loader';
import { TextField } from '@material-ui/core';

class FinancialInvoiceOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
      pageNo: 0,
      rows: 5,
      listData: this.props.data ? this.props.data : null,
      search: '',
      actualData: this.props.data ? this.props.data : null,
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

  onInvoicesFinRowClick = (data) => {
    console.log('Data : ',data.original);
    if(data.original && data.original.email){
      this.props.history.push({
        pathname: '/invoicesFinancial/invoices',
        search: `?supplier=${data.original.email}`,
      });
    }
    // this.props.history.push('/invoicesFinancial/supplier');
    
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
    let columns = nameColumn.concat(InvoiceOverviewConfig.columns);

    return (
      <div>
        <BackdropLoader open={this.state.loader} />
        <div className='salesaction'>
          <div className='saleactionSecond'>
            {/* <DateRange onSave={this.handleSaveDate}></DateRange> */}
              <form noValidate autoComplete="off"> 
                <TextField 
                  id="outlined-basic" 
                  label="Filter by Supplier Name"  
                  variant="outlined" 
                  // size="small"
                  value={this.state.search}
                  onChange={(e) => this.setState({search: e.target.value})}
                  onKeyUp={this.searchValueChange}
                />
              </form>
          </div>
        </div>
        {this.state.listData && (
          <div className='dashinoviceOverviewTable'>
            <NewReactTableComponent
              listData={this.state.listData}
              listConfig={InvoiceOverviewConfig}
              columns={columns}
              onHeaderClick={this.sortByHeader}
              onRowClick={this.onInvoicesFinRowClick}
              rowsPerPageOptions={[5, 10, 25, 50, 100]}
              forSerialNo={{
                pageNo: this.state.pageNo,
                pageSize: this.state.rows,
              }}
            />
          </div>
        )}
      </div>
    );
  }
}

export default FinancialInvoiceOverview;

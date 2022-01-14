import ReactTable, { ReactTableDefaults } from 'react-table';
import React, { Component } from 'react';
import NewPagination from './NewPagination';
import propTypes from 'prop-types';
import 'react-table/react-table.css';
import './reactTable.css';

export default class NewReactTableComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: [],
      dataRange: {},
      pageNo: this.props.forSerialNo.pageNo,
      pageSize: this.props.forSerialNo.pageSize,
      previousFilterValue: 0,
      previousStudentValue: 0,
      previousBatchValue: 0,
    };
  }
  
  componentDidMount(){
    this.setTableData()
  }

  componentDidUpdate(){
    if(this.props.filterChangeValue !== undefined && this.props.filterChangeValue !== this.state.previousFilterValue){
      this.setTableData();
      this.setState({ previousFilterValue: this.props.filterChangeValue })
    }
    if(this.props.studentChangeValue !== undefined && this.props.studentChangeValue !== this.state.previousStudentValue){
      this.setTableData();
      this.setState({ previousStudentValue: this.props.studentChangeValue })
    }
    if(this.props.batchChangeValue !== undefined && this.props.batchChangeValue !== this.state.previousBatchValue){
      this.setTableData();
      this.setState({ previousBatchValue: this.props.batchChangeValue })
    }
  }

  setTableData = () => {
    const totalData = [...this.props.listData] 
    const tableData = totalData.slice(this.state.pageNo * this.state.pageSize,(1 + this.state.pageNo) * this.state.pageSize)
    this.setState({tableData},()=>{
        this.setDataRange()
    })
  }

  setDataRange = () => {
    const dataRange = {
        first:
          this.state.pageNo * this.state.pageSize + 1,
        last:
          this.state.pageNo *
          this.state.pageSize +
          this.state.tableData.length,
      };
      this.setState({dataRange})
  }

  onChangeRowsPerPage = (pageSize) => {
    this.setState({pageSize},()=>{
        this.setTableData()
    })
  }

  paginate = (pageNo) => {
    this.setState({pageNo},() => {
       this.setTableData();
    })
  };

  noDataComponent = () => {
    return <h5 style={{ textAlign: 'center',paddingTop: '40px',paddingBottom: '25px' }}>No records found.</h5>;
  };

  getTrProps = (state, rowInfo, instance) => {
    if (rowInfo && rowInfo.row._original.revoked) {
      // console.log('Row Info',rowInfo.row);
      return {
        style: {
          background: rowInfo.row._original.revoked !== 0 ? '#ec636345' : ''
          // color: 'white'
        }
      }
    }
    else if(rowInfo && rowInfo.row._original.revokedDate) {
      // console.log('Row Info',rowInfo.row);
      return {
        style: {
          background: rowInfo.row._original.revokedDate !== 0 ? '#ec636345' : ''
          // color: 'white'
        }
      }
    }
    return {};
  }


  render() {
    if (this.props.listConfig.showSerialNo === true) {
      this.state.tableData.map((item, index) => {
        return (item.sNo =
          this.props.forSerialNo !== undefined
            ? this.state.pageNo *
              this.state.pageSize +
              index +
              1
            : index + 1);
      });
    }

    //console.log(`LIST DATA: ${this.props.listData.length} \n TABLE DATA: ${this.state.tableData.length}`)
    return (
      <div>
        <div>
          <ReactTable
            className='-striped'
            manual
            getTdProps={(state, rowInfo, column, instance) => ({
              onClick: () => {
                //console.log(rowInfo[1]);
                if (this.props.rowAndCellBothClick) {
                  if (column.id === this.props.cellClickColName) {
                    return this.props.onCellClick
                      ? this.props.onCellClick(rowInfo)
                      : '';
                  } else if (column.id !== this.props.cellClickColName) {
                    return this.props.onRowClick
                      ? this.props.onRowClick(rowInfo)
                      : '';
                  }
                } else {
                  return this.props.onRowClick
                    ? this.props.onRowClick(rowInfo)
                    : '';
                }
              },
            })}
            getTheadThProps={(state, rowInfo, column, instance) => ({
              ...ReactTableDefaults.getTheadThProps,
              onClick: () => {
                return this.props.onHeaderClick
                  ? this.props.onHeaderClick(column.id)
                  : '';
              },
            })}
            minRows={0}
            pageSize={1}
            data={this.state.tableData}
            columns={this.props.columns}
            pages={0}
            showPagination={false}
            SubComponent={this.props.subComponent}
            NoDataComponent={this.noDataComponent}
            getTrProps={this.getTrProps}
            sortable={true}
          />

          {this.props.listConfig.showPagination &&
          this.props.listData.length != 0 ? (
            <NewPagination
              rowsPerPageOptions={this.props.rowsPerPageOptions ? this.props.rowsPerPageOptions : [5, 10, 25, 50, 100]}
              rowsPerPage={this.state.pageSize}
              totalData={this.props.listData.length ? this.props.listData.length : ''}
              paginate={this.paginate}
              onChangeRowsPerPage={this.onChangeRowsPerPage}
              pageNo={this.state.pageNo}
              dataRange={this.state.dataRange}
            />
          ) : (
            ''
          )}
        </div>
      </div>
    );
  }
}

NewReactTableComponent.protoType = {
  listData: propTypes.array.isRequired,
  columns: propTypes.array.isRequired,
  paginate: propTypes.func,
  onRowClick: propTypes.func,
};

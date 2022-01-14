import React, { Component } from 'react';
import NewReactTableComponent from '../../ReactTable/NewReactTable';

class TempTable1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            supplierData: this.props.supplierData ? this.props.supplierData : []
        };
      }

    componentDidMount() {
        console.log('Props : ',this.props);
    }
    render() {
      return <div>
               <NewReactTableComponent
                  listData={[]}
                  listConfig={this.props.SupplierList}
                  columns={ this.props.SuppliercolumnsPending
                    // this.state.radioValue === 'pending'
                    //   ? SuppliercolumnsPending
                    //   : SuppliercolumnsFinanced
                  }
                //   onHeaderClick={this.sortByHeader}
                  // onRowClick={this.onSupplierRowClick}
                  onCellClick={this.props.onSupplierRowClick}
                  rowAndCellBothClick={true}
                  cellClickColName={'invNo'}
                  rowsPerPageOptions={[5, 10, 25, 50, 100]}
                  forSerialNo={{
                    pageNo: this.props.forSerialNo.pageNo,
                    pageSize: this.props.forSerialNo.rows,
                  }}
              />
      </div>
    }
}
export default TempTable1
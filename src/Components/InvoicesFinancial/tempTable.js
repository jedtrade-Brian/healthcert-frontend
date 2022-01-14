import React, { Component } from 'react';
import NewReactTableComponent from '../../ReactTable/NewReactTable';

class TempTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            supplierData: null
        };
      }

    componentDidMount() {
        console.log('Props : ',this.props);
        const supplierData = this.props.listData.map((item) => item)
        this.setState({supplierData: this.props.listData})
    }
    render() {
      return <div>
               <NewReactTableComponent
                  listData={this.state.supplierData ? this.state.supplierData : []}
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
export default TempTable
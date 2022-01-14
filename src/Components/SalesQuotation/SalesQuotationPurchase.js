import React, { Component } from "react";
import { salesQuotationPurchase } from "./SalesQuotationConfig";
import { withRouter } from "react-router-dom";
import "./salesQuotation.css";
import NewReactTableComponent from '../../ReactTable/NewReactTable';
import { BackdropLoader } from '../../services/loader';

class SalesQuotationPurchase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNo: 0,
      rows: 5,
    };
  }

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

    // const actionColumn = [
    //   {
    //     Header: "Action",
    //     Cell: row => {
    //       return (
    //         <Button
    //         className="revokeBtn"
    //         variant="contained"
    //         color="secondary"
    //         startIcon={
    //           <SettingsBackupRestoreIcon></SettingsBackupRestoreIcon>
    //         }
    //       >
    //         Revoke
    //       </Button>
    //      )
    //     }
    //   }
    // ];

    const columns = nameColumn.concat(salesQuotationPurchase.columns) // .concat(actionColumn);
    return (
      <div>
         <BackdropLoader open={this.props.loader} />
          <div className="salesQtnTable PurchaseQtnTable">
            <div className="salesOverviewTable SalesQuotationPurchaseTable">
              {this.props.data && (
              <NewReactTableComponent
                listData={this.props.data ? this.props.data : []}
                listConfig={salesQuotationPurchase}
                columns={columns}
                onHeaderClick={this.sortByHeader}
                onRowClick={this.props.onOpenModalQuotation}
                forSerialNo={{
                  pageNo: this.state.pageNo,
                  pageSize: this.state.rows
                }}
              />
              )}
            </div>
          </div>
      </div>
    );
  }
}

export default withRouter(SalesQuotationPurchase);

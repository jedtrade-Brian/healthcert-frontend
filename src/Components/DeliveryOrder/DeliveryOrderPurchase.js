import React, { Component } from "react";
import { saleTabList } from "./DeliveryOrderConfig";
import { DotLoader } from "react-spinners";
import ReactTableComponent from "../../ReactTable/ReactTable";
import { Button } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import SettingsBackupRestoreIcon from '@material-ui/icons/SettingsBackupRestore';
import "./DeliveryOrder.css";
import NewReactTableComponent from '../../ReactTable/NewReactTable';

class DeliveryOrderPurchase extends Component {
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

    const actionColumn = [
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

    const columns = nameColumn.concat(saleTabList.columns).concat(actionColumn);
    return (
      <div>
        {this.props.data ? (
          <div className=" DeliveryPurchaseTable PurchaseOrderTable">
            <NewReactTableComponent
              listData={this.props.data}
              listConfig={saleTabList}
              columns={columns}
              onHeaderClick={this.sortByHeader}
              onRowClick={() => {}}
              forSerialNo={{
                pageNo: this.state.pageNo,
                pageSize: this.state.rows
              }}
            />
          </div>
        ) : (
          <div className="spinner">
            <DotLoader size={70} color={"#020f1f"} />
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(DeliveryOrderPurchase);

import React, { Component } from "react";
import { saleTabList } from "./PaymentCertificatesConfig";
import { DotLoader } from "react-spinners";
import ReactTableComponent from "../../ReactTable/ReactTable";
import SettingsBackupRestoreIcon from '@material-ui/icons/SettingsBackupRestore';
import { Button } from '@material-ui/core';


class PaymentCertificates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNo: 10,
      rows: 10,
      listData: undefined,
      value: 0,
      buttonData: "Invoices",
      openModal: false
    };
  }

  componentWillMount() {
    this.setState({
      listData: [
        {
          paymentName: "Payment 1",
          invoice: "2321243243",
          amount: "$232323.00",
          invoiceDate: "22 Aug 2020",
          invoiceDueDate: "28 Aug 2020"
        },
        {
          paymentName: "Payment 2",
          invoice: "2321243243",
          amount: "$232323.00",
          invoiceDate: "22 Aug 2020",
          invoiceDueDate: "28 Aug 2020"
        },
        {
          paymentName: "Payment 3",
          invoice: "2321243243",
          amount: "$232323.00",
          invoiceDate: "22 Aug 2020",
          invoiceDueDate: "28 Aug 2020"
        },
        {
          paymentName: "Payment 4",
          invoice: "2321243243",
          amount: "$232323.00",
          invoiceDate: "22 Aug 2020",
          invoiceDueDate: "28 Aug 2020"
        }
      ]
    });
  }

  invoiceClick = () => {
    this.setState({ buttonData: "Invoices" });
  };

  noaClick = () => {
    this.setState({ buttonData: "NOA" });
  };

  handleClickOpen = () => {
    this.setState({ openModal: true });
  };

  handleClose = () => {
    this.setState({ openModal: false });
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
        {this.state.listData ? (
          <div className="salesOverviewTable">
            <ReactTableComponent
              listData={this.state.listData}
              listConfig={saleTabList}
              columns={columns}
              dataCount={4}
              updatePagination={this.updatePagination}
              onHeaderClick={this.sortByHeader}
              initialPage={this.state.pageNo / this.state.rows}
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

export default PaymentCertificates;

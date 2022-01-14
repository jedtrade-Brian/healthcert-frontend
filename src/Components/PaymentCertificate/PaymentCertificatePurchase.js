import React, { Component } from "react";
import { saleTabList } from "./PaymentCertificateConfig";
import { DotLoader } from "react-spinners";
import ReactTableComponent from "../../ReactTable/ReactTable";
import { withRouter } from "react-router-dom";
import { Button } from "@material-ui/core";
import SettingsBackupRestoreIcon from '@material-ui/icons/SettingsBackupRestore';
import "./PaymentCertificate.css";
import NewReactTableComponent from '../../ReactTable/NewReactTable';
import { BackdropLoader } from '../../services/loader';
import ConfirmationPopUp from "../Shared/Documents/ConfirmationPopUp";

class PaymentCertificatePurchase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNo: 0,
      rows: 5,
      openRevokedModal: false,
      selectedDoc: null
    };
  }

  goToPaymentCertificate = () => {
    this.props.history.push("/createDocument/paymentCertificate");
  };

  handleRevokedClick = (e,row) => {
    e.stopPropagation()
    this.setState({openRevokedModal: true,selectedDoc: row.original})
  }
  handleCancel = () => {
    this.setState({openRevokedModal: false, selectedDoc: null})
  }

  handleConfirmClick = () => {
    this.props.onRevoked(this.state.selectedDoc)
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
            onClick={(e) => {
              this.handleRevokedClick(e,row)
            }}
            disabled={row.original.revoked}
            className={row.original.revoked ? 'revokeBtnDisabled' : 'revokeBtn'}
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
        <BackdropLoader open={this.props.loader} />
          <div className="PaymentCertificateTable">
            <div>
              <Button
                onClick={this.goToPaymentCertificate}
                className="createPaymentCertificateBtn"
              >
                CREATE PAYMENT CERTIFICATE
              </Button>
            </div>
            <div className="salesOverviewTable PaymentCertificatePurchases PaymentCertificatePurchaseTable">
              {this.props.data && (
                <NewReactTableComponent
                  listData={this.props.data ? this.props.data : []}
                  listConfig={saleTabList}
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
          {this.state.openRevokedModal && (
              <ConfirmationPopUp
                openDeclinedModal={this.state.openRevokedModal}
                onCancelClick={this.handleCancel}
                title={'Revoke Payment Certificate'}
                message="Are you sure you want to revoke this payment certificate"
                onConfirmClick={this.handleConfirmClick}
              />
            )}
      </div>
    );
  }
}

export default withRouter(PaymentCertificatePurchase);

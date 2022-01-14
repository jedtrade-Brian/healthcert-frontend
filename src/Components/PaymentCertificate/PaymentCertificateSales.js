import React, { Component } from "react";
import { batchList} from "./PaymentCertificateConfig";

import { withRouter } from "react-router-dom";
import { Button } from '@material-ui/core';
import SettingsBackupRestoreIcon from '@material-ui/icons/SettingsBackupRestore';
import NewReactTableComponent from '../../ReactTable/NewReactTable';
import { BackdropLoader } from '../../services/loader';
import ConfirmationPopUp from "../Shared/Documents/ConfirmationPopUp";
import FilterBar from '../Shared/FilterBar';

import "./PaymentCertificate.css";

class PaymentCertificateSales extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNo: 0,
      rows: 5,
      count: 4,
      formatedBatch:[],
      openDeclinedModal: false,
      selectedDoc: null,
      startDate: null,
      endDate: null,
      changeValue: 0,
      previousSearchValue: 0,
      startDate: null,
      endDate: null,
      batchId:0,
      issuedTime:0,
    };
  }

  componentDidMount() {
    this.formatBatchData(this.props.data);
    this.toggleChangeValue();

  }

  toggleChangeValue = () => {
    if(this.state.changeValue === 0){
      this.setState({ changeValue: 1 });
    }
    else if (this.state.changeValue === 1){
      this.setState({ changeValue: 0 });
    }
  }

  formatBatchData = (data) => {
    var filterBatch = data.sort(function(a, b){  
      if(a.issuedTime < b.issuedTime) { return -1; }
      if(a.issuedTime > b.issuedTime) { return 1; }
      return 0;
      }).reverse() 


    let formatedData = filterBatch.map((cert) => {
      const formatedBatch = Object.assign({}, cert);
      
      if(cert.issuedTime === 0){
        formatedBatch.issuedTime = "Pending"
      }
      else {
        let monthNames =["Jan","Feb","Mar","Apr",
                      "May","Jun","Jul","Aug",
                      "Sep", "Oct","Nov","Dec"];

        var issuedDate = new Date(cert.issuedTime * 1000);
        var date = issuedDate.getDate();
        var month = monthNames[issuedDate.getMonth()]
        var year = issuedDate.getFullYear();
        var hour = issuedDate.getHours();
        var mins = issuedDate.getMinutes();
        var timeType = 'am'

        // Converting 24-hr format to 12-hr format
        if(hour >= 12){
          timeType = 'pm'
          if(hour === 12){
            hour = 12;
          }
          else{
            hour -= 12;
          }
        } 
        else if(hour === 0){
          hour = 12;
        }

        // Add '0' to mins prefix if less than 10
        if(mins < 10){
          mins = '0' + mins.toString();
        }

        formatedBatch.issuedTime = `${date} ${month} ${year}, ${hour}:${mins} ${timeType}`;
      }

      return formatedBatch;
    });

    this.setState({ formatedBatch: formatedData });
  }

  SortCertificateData = (data, columnId) => {

    switch(columnId){
      case 'batchId': 

        switch(this.state.batchId){       
          case 1:
            this.setState({ batchId: 2 });

            var filterCerts = data.sort(function(a, b){  
            if(a.batchId < b.batchId) { return -1; }
            if(a.batchId > b.batchId) { return 1; }
            return 0;
            }).reverse() 
            break;

          default:
            this.setState({ batchId: 1 });

            var filterCerts = data.sort(function(a, b){  
            if(a.batchId < b.batchId) { return -1; }
            if(a.batchId > b.batchId) { return 1; }
            return 0;
            }) 

            break;
        }
  
        break;

      case 'issuedTime':
 
        switch(this.state.issuedTime){       
          case 1:
            this.setState({ issuedTime: 2 });

            var filterCerts = data.sort(function(a, b){  
            if(a.issuedTime < b.issuedTime) { return -1; }
            if(a.issuedTime > b.issuedTime) { return 1; }
            return 0;
            }).reverse() 
            break;

          default:
            this.setState({ issuedTime: 1 });

            var filterCerts = data.sort(function(a, b){  
            if(a.issuedTime < b.issuedTime) { return -1; }
            if(a.issuedTime > b.issuedTime) { return 1; }
            return 0;
            }) 

            break;
        }
  
        break;

      default:
        this.setState({ issuedTime: 2 });

        var filterCerts = data.sort(function(a, b){  
          if(a.issuedTime < b.issuedTime) { return -1; }
          if(a.issuedTime > b.issuedTime) { return 1; }
          return 0;
        }).reverse();
        console.log(`default triggered`);
        break;

    }
    


    let formatedData = filterCerts.map((cert) => {
      const formatedCert = Object.assign({}, cert);
      if(cert.issuedTime === 0){
        formatedCert.issuedOn = "Pending"
      }
      else{
        let monthNames =["Jan","Feb","Mar","Apr",
                      "May","Jun","Jul","Aug",
                      "Sep", "Oct","Nov","Dec"];

        let issuedDate = new Date(cert.issuedTime * 1000);
        let date = issuedDate.getDate();
        let month = monthNames[issuedDate.getMonth()]
        let year = issuedDate.getFullYear();
        let hour = issuedDate.getHours();
        let mins = issuedDate.getMinutes();
        let timeType = 'am'

        // Converting 24-hr format to 12-hr format
        if(hour >= 12){
          timeType = 'pm'
          if(hour === 12){
            hour = 12;
          }
          else{
            hour -= 12;
          }
        } 
        else if(hour === 0){
          hour = 12;
        }

        // Add '0' to mins prefix if less than 10
        if(mins < 10){
          mins = '0' + mins.toString();
        }

        formatedCert.issuedTime = `${date} ${month} ${year}, ${hour}:${mins} ${timeType}`;
      }
      return formatedCert;
    });

    this.setState({ formatedBatch: formatedData });

  }

  goToBatchDetails = (row) => {

    const location = {
      pathname: `/History/${row.original.batchId}`,
      state: {id: row.original.batchId, issuedDate: row.original.issuedTime }
    }
    
    this.props.history.push(location)

  }

  handleRevokedClick = (e,row) => {
    e.stopPropagation()
    this.setState({openDeclinedModal: true, selectedDoc: row.original})
  }
  handleCancel = () => {
    this.setState({openDeclinedModal: false, selectedDoc: null})
  }

  handleConfirmClick = () => {
    this.props.onRevoked(this.state.selectedDoc)
  }

  handleFilterChange = (startDate, endDate) => {
    let data = this.props.data

    if (startDate === null && endDate === null){
      this.setState({ filteredBatches: data });
      this.formatBatchData(data);
      this.toggleChangeValue();
    }
    else if (startDate !== null && endDate === null){
      let unixStartDate = startDate.getTime() / 1000
      let filteredData = data.filter((batch) => {
        return (batch.issuedTime >= unixStartDate)
      })

      this.setState({ filteredBatches: filteredData });
      this.formatBatchData(filteredData);
      this.toggleChangeValue();
      
    }
    else if (startDate === null && endDate !== null){
      let unixEndDate = endDate.getTime() / 1000
      let filteredData = data.filter((batch) => {
        return (batch.issuedTime <= unixEndDate)
      })

      this.setState({ filteredBatches: filteredData });
      this.formatBatchData(filteredData);
      this.toggleChangeValue();
      
    }
    else if (startDate !== null && endDate !== null){
      let unixStartDate = startDate.getTime() / 1000
      let unixEndDate = endDate.getTime() / 1000
      let filteredData = data.filter((batch) => {
        return (batch.issuedTime >= unixStartDate && batch.issuedTime <= unixEndDate)
      })

      this.setState({ filteredBatches: filteredData });
      this.formatBatchData(filteredData);
      this.toggleChangeValue();
      console.log(`Filtered Data: ${filteredData}`)
    }
    else{
      console.log("Filter Bar Error");
    }
  }

  setStartDate = (date) => {
    this.setState({ startDate: date });

    this.handleFilterChange(date, this.state.endDate);
  }

  setEndDate = (date) => {
    this.setState({ endDate: date });

    this.handleFilterChange(this.state.startDate, date);
  }

  sortByHeader = (columnId) => {
    console.log(`Column Header {${columnId}} Clicked!`);
    this.SortCertificateData(this.props.data, columnId);
    this.toggleChangeValue();

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

   // row.original.revoked
   const actionColumn = [
    {
      Header: "Action",
      Cell: row => {
        return (
          <Button
            onClick={(e) => {
              this.handleRevokedClick(e,row)
             }
            }
            disabled={row.original.revokedDate !== 0}
            className={row.original.revokedDate !== 0 ? 'revokeBtnDisabled' : 'revokeBtn'}
            variant="contained"
            color="secondary"
            startIcon={
              <SettingsBackupRestoreIcon></SettingsBackupRestoreIcon>
            }
          >
            Revoke Batch
          </Button>
        )
        // if(!row.original.revoked){
          
        // } else {
        //   return (null)
        // }
      }
    }
  ];

    const columns = nameColumn.concat(batchList.columns).concat(actionColumn);
    return (
      <div>
        <div className="PaymentSaleTable">
          <BackdropLoader open={this.props.loader} />
            <div className="PaymentCertificateSalesTable">
              <FilterBar 
                  startDate={this.state.startDate} 
                  endDate={this.state.endDate} 
                  setStartDate={this.setStartDate} 
                  setEndDate={this.setEndDate}
              />
              <div className=" PaymentCertificateSales">
                {this.props.data && (
                  <NewReactTableComponent
                    listData={this.state.formatedBatch ? this.state.formatedBatch : []}
                    listConfig={batchList}
                    columns={columns}
                    onHeaderClick={this.sortByHeader}
                    onRowClick={this.goToBatchDetails}
                    forSerialNo={{
                      pageNo: this.state.pageNo,
                      pageSize: this.state.rows
                    }}
                    batchChangeValue={this.state.changeValue}
                  />
                )}
              </div>
            </div>
            {this.state.openDeclinedModal && (
              <ConfirmationPopUp
                openDeclinedModal={this.state.openDeclinedModal}
                onCancelClick={this.handleCancel}
                title={'Revoke Batch'}
                message="Are you sure you want to revoke this batch?"
                onConfirmClick={this.handleConfirmClick}
              />
            )}
        </div>
      </div>
     
    );
  }
}

export default withRouter(PaymentCertificateSales);

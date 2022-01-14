import React, { Component } from "react";
// import { salesQuotationSale } from "./SalesQuotationConfig";
import {BatchDetailsList} from "./PaymentCertificateConfig";
import ReactTableComponent from "../../ReactTable/ReactTable";
import { withRouter } from "react-router-dom";
import { Button } from '@material-ui/core';
import SettingsBackupRestoreIcon from '@material-ui/icons/SettingsBackupRestore';
import { BackdropLoader } from '../../services/loader';
import "../SalesQuotation/salesQuotation.css";
import NewReactTableComponent from '../../ReactTable/NewReactTable';
import ConfirmationPopUp from "../Shared/Documents/ConfirmationPopUp";
import FilterBar from '../Shared/FilterBar';

class BatchDetailsTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNo: 0,
      rows: 5,
      openDeclinedModal: false,
      selectedDoc: null,
      startDate: null,
      endDate: null,
      filteredCerts: this.props.data,
      formatedCert: [],
      changeValue: 0,
      previousSearchValue: 0,
      studentId:0,
      name:0,
      email:0,
      
    };
  }

  componentDidMount() {
    // this.formatCertificateData(this.props.data);
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

  formatCertificateData = (data) => {
    var filterCerts = data.sort(function(a, b){  
      if(a.name < b.name) { return -1; }
      if(a.name > b.name) { return 1; }
      return 0;
      }) 

    let formatedData = filterCerts.map((cert) => {
      const formatedCert = Object.assign({}, cert);
      let monthNames =["Jan","Feb","Mar","Apr",
                      "May","Jun","Jul","Aug",
                      "Sep", "Oct","Nov","Dec"];

      let issuedDate = new Date(cert.issuedOn * 1000);
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

      formatedCert.issuedOn = `${date} ${month} ${year}, ${hour}:${mins} ${timeType}`;
      return formatedCert;
    });

    this.setState({ formatedCert: formatedData });

  }

  SortCertificateData = (data, columnId) => {

    switch(columnId){
      case 'studentId': 

        switch(this.state.studentId){       
          case 1:
            this.setState({ studentId: 2 });

            var filterCerts = data.sort(function(a, b){  
            if(a.studentId < b.studentId) { return -1; }
            if(a.studentId > b.studentId) { return 1; }
            return 0;
            }).reverse() 
            break;

          default:
            this.setState({ studentId: 1 });

            var filterCerts = data.sort(function(a, b){  
            if(a.studentId < b.studentId) { return -1; }
            if(a.studentId > b.studentId) { return 1; }
            return 0;
            }) 

            break;
        }
  
        break;

      case 'name':
 
        switch(this.state.name){       
          case 1:
            this.setState({ name: 2 });

            var filterCerts = data.sort(function(a, b){  
            if(a.name < b.name) { return -1; }
            if(a.name > b.name) { return 1; }
            return 0;
            }).reverse() 
            break;

          default:
            this.setState({ name: 1 });

            var filterCerts = data.sort(function(a, b){  
            if(a.name < b.name) { return -1; }
            if(a.name > b.name) { return 1; }
            return 0;
            }) 

            break;
        }
  
        break;

      case 'email':
      
      switch(this.state.email){       
        case 1:
          this.setState({ email: 2 });

          var filterCerts = data.sort(function(a, b){  
          if(a.email < b.email) { return -1; }
          if(a.email > b.email) { return 1; }
          return 0;
          }).reverse() 
          break;

        default:
          this.setState({ email: 1 });

          var filterCerts = data.sort(function(a, b){  
          if(a.email < b.email) { return -1; }
          if(a.email > b.email) { return 1; }
          return 0;
          }) 

          break;
      }

      break;

      default:
        this.setState({ name: 2 });

        var filterCerts = data.sort(function(a, b){  
          if(a.name < b.name) { return -1; }
          if(a.name > b.name) { return 1; }
          return 0;
        }).reverse();
        console.log(`default triggered`);
        break;

    }
    


    let formatedData = filterCerts.map((cert) => {
      const formatedCert = Object.assign({}, cert);
      if(cert.issuedOn === 0){
        formatedCert.issuedOn = "Pending"
      }
      else{
        let monthNames =["Jan","Feb","Mar","Apr",
                      "May","Jun","Jul","Aug",
                      "Sep", "Oct","Nov","Dec"];

        let issuedDate = new Date(cert.issuedOn * 1000);
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

        formatedCert.issuedOn = `${date} ${month} ${year}, ${hour}:${mins} ${timeType}`;
      }
      return formatedCert;
    });

    this.setState({ formatedCert: formatedData });

  }

  handleFilterChange = (startDate, endDate) => {
    let data = this.props.data

    if (startDate === null && endDate === null){
      this.setState({ filteredCerts: data });
      this.formatCertificateData(data);
      this.toggleChangeValue();
    }
    else if (startDate !== null && endDate === null){
      let unixStartDate = startDate.getTime() / 1000
      let filteredData = data.filter((cert) => {
        return (cert.issuedOn >= unixStartDate)
      })

      this.setState({ filteredCerts: filteredData });
      this.formatCertificateData(filteredData);
      this.toggleChangeValue();
      
    }
    else if (startDate === null && endDate !== null){
      let unixEndDate = endDate.getTime() / 1000
      let filteredData = data.filter((cert) => {
        return (cert.issuedOn <= unixEndDate)
      })

      this.setState({ filteredCerts: filteredData });
      this.formatCertificateData(filteredData);
      this.toggleChangeValue();
      
    }
    else if (startDate !== null && endDate !== null){
      let unixStartDate = startDate.getTime() / 1000
      let unixEndDate = endDate.getTime() / 1000
      let filteredData = data.filter((cert) => {
        return (cert.issuedOn >= unixStartDate && cert.issuedOn <= unixEndDate)
      })

      this.setState({ filteredCerts: filteredData });
      this.formatCertificateData(filteredData);
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

  goToSalesQuotation = () => {
    this.props.history.push("/createDocument/TVCertificate")
  };

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

  sortByHeader = (columnId) => {
    console.log(`Column Header {${columnId}} Clicked!`);
    this.SortCertificateData(this.props.data, columnId);
    this.toggleChangeValue();

  }

  render() {
    if(this.props.changeValue !== this.state.previousSearchValue) {
      this.handleFilterChange(this.state.startDate, this.state.endDate);
      this.setState({ previousSearchValue: this.props.changeValue });
    }

    const nameColumn = [
      {
        Header: "S.",
        Cell: row => {
          return <div className="dot">{row.original.sNo}</div>;
        },
        width: 45
      }
    ];
  
    
    const columns = nameColumn.concat(BatchDetailsList.columns);
    return (
      <div>
        <BackdropLoader open={this.props.loader} />
          <div className="PaymentCertificateTable">
            <div>
             
              {this.props.parentPage === 'CertificateMenu' 
                && <Button onClick={this.goToSalesQuotation} className="createSalesQtnBtn">CREATE CERTIFICATE</Button>
              }
            </div>
            <div className="salesOverviewTable PaymentCertificatePurchases PaymentCertificatePurchaseTable">
              {this.props.data && (
                <NewReactTableComponent
                  listData={this.state.formatedCert ? this.state.formatedCert : []}
                  listConfig={BatchDetailsList}
                  columns={columns}
                  onHeaderClick={this.sortByHeader}
                //   onRowClick={this.props.onOpenModalQuotation}
                  forSerialNo={{
                    pageNo: this.state.pageNo,
                    pageSize: this.state.rows
                  }}
                  filterChangeValue={this.state.changeValue}
                />
              )}           
            </div>
            {this.state.openDeclinedModal && (
              <ConfirmationPopUp
                openDeclinedModal={this.state.openDeclinedModal}
                onCancelClick={this.handleCancel}
                title={'Revoke Certificate'}
                message="Are you sure you want to revoke this certificate?"
                onConfirmClick={this.handleConfirmClick}
              />
            )}
            
          </div>
      </div>
    );
  }
}

export default withRouter(BatchDetailsTab);

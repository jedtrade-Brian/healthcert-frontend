import React, { Component } from "react";
import { salesQuotationSale } from "./SalesQuotationConfig";
import ReactTableComponent from "../../ReactTable/ReactTable";
import { Switch, withRouter } from "react-router-dom";
import { Button } from '@material-ui/core';
import SettingsBackupRestoreIcon from '@material-ui/icons/SettingsBackupRestore';
import { BackdropLoader } from '../../services/loader';
import "./salesQuotation.css";
import NewReactTableComponent from '../../ReactTable/NewReactTable';
import ConfirmationPopUp from "../Shared/Documents/ConfirmationPopUp";
import FilterBar from '../Shared/FilterBar';

class SalesQuotationSales extends Component {
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
      transcriptId: 0,
      studentId: 0,
      studentName: 0,
      studentLastName: 0,
      courseName: 0,
      issuedOn: 0,
    };
  }

  

  componentDidMount() {
    this.formatCertificateData(this.props.data);
    this.toggleChangeValue();

    
  }

  componentDidUpdate() {
    if(this.props.changeValue !== this.state.previousSearchValue) {
      this.handleFilterChange(this.state.startDate, this.state.endDate);
      this.setState({ previousSearchValue: this.props.changeValue });
    }
  }

  headerSortOrder() {
    if(this.state.transcriptId === 1 || 2){
      this.setState({ studentId: 0,
        studentName: 0,
        studentLastName: 0,
        courseName: 0,
        issuedOn: 0, });
    }
    if(this.state.studentId === 1 || 2){
      this.setState({ transcriptId: 0,
        studentName: 0,
        studentLastName: 0,
        courseName: 0,
        issuedOn: 0, });
    }
    if(this.state.studentName === 1 || 2){
      this.setState({ transcriptId: 0,
        studentId: 0,
        studentLastName: 0,
        courseName: 0,
        issuedOn: 0, });
    }
    if(this.state.studentLastName === 1 || 2){
      this.setState({ transcriptId: 0,
        studentId: 0,
        studentName: 0,
        courseName: 0,
        issuedOn: 0, });
    }
    if(this.state.courseName === 1 || 2){
      this.setState({ transcriptId: 0,
        studentId: 0,
        studentName: 0,
        studentLastName: 0,
        issuedOn: 0, });
    }
    if(this.state.issuedOn === 1 || 2){
      this.setState({ transcriptId: 0,
        studentId: 0,
        studentName: 0,
        studentLastName: 0,
        courseName: 0, });
    }
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
    let filterCerts = data.sort((a, b) => a.issuedOn - b.issuedOn).reverse();

    

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

  SortCertificateData = (data, columnId) => {

    //var filterCerts = data.sort((a, b) => a.issuedOn - b.issuedOn);

    switch(columnId){
      case 'transcriptId': 

        switch(this.state.transcriptId){       
          case 1:
            this.setState({ transcriptId: 2 });

            var filterCerts = data.sort(function(a, b){  
            if(a.transcriptId < b.transcriptId) { return -1; }
            if(a.transcriptId > b.transcriptId) { return 1; }
            return 0;
            }).reverse() 
            break;

          default:
            this.setState({ transcriptId: 1 });

            var filterCerts = data.sort(function(a, b){  
            if(a.transcriptId < b.transcriptId) { return -1; }
            if(a.transcriptId > b.transcriptId) { return 1; }
            return 0;
            }) 

            break;
        }
  
        break;

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

      case 'studentName':
      
      switch(this.state.studentName){       
        case 1:
          this.setState({ studentName: 2 });

          var filterCerts = data.sort(function(a, b){  
          if(a.studentName < b.studentName) { return -1; }
          if(a.studentName > b.studentName) { return 1; }
          return 0;
          }).reverse() 
          break;

        default:
          this.setState({ studentName: 1 });

          var filterCerts = data.sort(function(a, b){  
          if(a.studentName < b.studentName) { return -1; }
          if(a.studentName > b.studentName) { return 1; }
          return 0;
          }) 

          break;
      }

      break;

      case 'studentLastName':

        switch(this.state.studentLastName){       
          case 1:
            this.setState({ studentLastName: 2 });

            var filterCerts = data.sort(function(a, b){  
            if(a.studentLastName < b.studentLastName) { return -1; }
            if(a.studentLastName > b.studentLastName) { return 1; }
            return 0;
            }).reverse() 
            break;

          default:
            this.setState({ studentLastName: 1 });

            var filterCerts = data.sort(function(a, b){  
            if(a.studentLastName < b.studentLastName) { return -1; }
            if(a.studentLastName > b.studentLastName) { return 1; }
            return 0;
            }) 

            break;
        }
  
        break;

      case 'courseName':

        switch(this.state.courseName){       
          case 1:
            this.setState({ courseName: 2 });

            var filterCerts = data.sort(function(a, b){  
            if(a.courseName < b.courseName) { return -1; }
            if(a.courseName > b.courseName) { return 1; }
            return 0;
            }).reverse() 
            break;

          default:
            this.setState({ courseName: 1 });

            var filterCerts = data.sort(function(a, b){  
            if(a.courseName < b.courseName) { return -1; }
            if(a.courseName > b.courseName) { return 1; }
            return 0;
            }) 

            break;
        }
  
        break;

        case 'issuedOn':

          switch(this.state.issuedOn){       
            case 1:
              this.setState({ issuedOn: 2 });
  
              var filterCerts = data.sort(function(a, b){  
              if(a.issuedOn < b.issuedOn) { return -1; }
              if(a.issuedOn > b.issuedOn) { return 1; }
              return 0;
              }).reverse() 
              break;
  
            default:
              this.setState({ issuedOn: 1 });
  
              var filterCerts = data.sort(function(a, b){  
              if(a.issuedOn < b.issuedOn) { return -1; }
              if(a.issuedOn > b.issuedOn) { return 1; }
              return 0;
              }) 
  
              break;
          }
    
          break;

      default:
        this.setState({ issuedOn: 2 });

        var filterCerts = data.sort(function(a, b){  
          if(a.issuedOn < b.issuedOn) { return -1; }
          if(a.issuedOn > b.issuedOn) { return 1; }
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
              disabled={row.original.revoked !== 0}
              className={row.original.revoked !== 0 ? 'revokeBtnDisabled' : 'revokeBtn'}
              variant="contained"
              color="secondary"
              startIcon={
                <SettingsBackupRestoreIcon></SettingsBackupRestoreIcon>
              }
            >
              Revoke
            </Button>
          )
          // if(!row.original.revoked){
            
          // } else {
          //   return (null)
          // }
        }
      }
    ];
    
    const columns = nameColumn.concat(salesQuotationSale.columns).concat(actionColumn);
    return (
      <div>
        
        <BackdropLoader open={this.props.loader} />
          <div className="salesQtnTable">
            <div>
              <FilterBar 
                startDate={this.state.startDate} 
                endDate={this.state.endDate} 
                setStartDate={this.setStartDate} 
                setEndDate={this.setEndDate}
              />
              {this.props.parentPage === 'CertificateMenu' 
                && <Button onClick={this.goToSalesQuotation} className="createSalesQtnBtn">CREATE CERTIFICATE</Button>
              }
            </div>
            <div className="salesOverviewTable SalesQuotationSalesTable">
            
              {this.props.data && (
                <NewReactTableComponent
                  listData={this.state.formatedCert ? this.state.formatedCert : []}  
                  
                  listConfig={salesQuotationSale}
                  columns={columns}
                  onHeaderClick={this.sortByHeader}
                  onRowClick={this.props.onOpenModalQuotation}
                  forSerialNo={{
                    pageNo: this.state.pageNo,
                    pageSize: this.state.rows
                  }}
                  filterChangeValue={this.state.changeValue}
                />
              )
              } 
                       
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

export default withRouter(SalesQuotationSales);

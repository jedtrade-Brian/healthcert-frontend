import React, { Component } from "react";
import { saleTabList } from "./DeliveryOrderConfig";
import { DotLoader } from "react-spinners";
import ReactTableComponent from "../../ReactTable/ReactTable";
import {getStudents} from "../../services/createDocumentService";

import { withRouter, useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import SettingsBackupRestoreIcon from '@material-ui/icons/SettingsBackupRestore';
import NewReactTableComponent from '../../ReactTable/NewReactTable';
import {Link} from 'react-router-dom';

import "./DeliveryOrder.css";
import { CallToActionSharp } from "@material-ui/icons";
import { data } from "jquery";

class DeliveryOrderSales extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNo: 0,
      rows: 5,
      count: 4,
      formatedCert: [],
      changeValue:0,
      studentId:0,
      nric:0,
      email:0,
      name:0,
      dob:0,
      noOfDocs:0,
    };
  }


  componentDidMount() {
    this.formatStudentData(this.props.data);
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

  goToStudentDetails = (row) => {

    const location = {
      pathname: `/Students/${row.original._id}`,
      state: {id: row.original._id }
    }
    
    this.props.history.push(location)

  }

  formatStudentData = (data) => {
    let filterStudents = data.sort(function(a, b){  
      if(a.name < b.name) { return -1; }
      if(a.name > b.name) { return 1; }
      return 0;
      }) 
    let formatedData = filterStudents.map((student) => {
      const formatedStudent = Object.assign({}, student);
      const monthNames =["Jan","Feb","Mar","Apr",
                      "May","Jun","Jul","Aug",
                      "Sep", "Oct","Nov","Dec"];

      var issuedDate = new Date(student.graduationDate * 1000);
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

      formatedStudent.graduationDate = `${date} ${month} ${year}, ${hour}:${mins} ${timeType}`;

      var issuedDate = new Date(student.dob * 1000);
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

      formatedStudent.dob = `${date} ${month} ${year}, ${hour}:${mins} ${timeType}`;

      return formatedStudent;
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
            console.log("working")
            var filterCerts = data.sort(function(a, b){  
            if(a.studentId < b.studentId) { return -1; }
            if(a.studentId > b.studentId) { return 1; }
            return 0;
            }) 

            break;
        }
  
        break;

      case 'nric':
 
        switch(this.state.nric){       
          case 1:
            this.setState({ nric: 2 });

            var filterCerts = data.sort(function(a, b){  
            if(a.nric < b.nric) { return -1; }
            if(a.nric > b.nric) { return 1; }
            return 0;
            }).reverse() 
            break;

          default:
            this.setState({ nric: 1 });

            var filterCerts = data.sort(function(a, b){  
            if(a.nric < b.nric) { return -1; }
            if(a.nric > b.nric) { return 1; }
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

            case 'dob':
 
              switch(this.state.dob){       
                case 1:
                  this.setState({ dob: 2 });
      
                  var filterCerts = data.sort(function(a, b){  
                  if(a.dob < b.dob) { return -1; }
                  if(a.dob > b.dob) { return 1; }
                  return 0;
                  }).reverse() 
                  break;
      
                default:
                  this.setState({ dob: 1 });
      
                  var filterCerts = data.sort(function(a, b){  
                  if(a.dob < b.dob) { return -1; }
                  if(a.dob > b.dob) { return 1; }
                  return 0;
                  }) 
      
                  break;
              }
        
              break;

              case 'noOfDocs':
 
                switch(this.state.noOfDocs){       
                  case 1:
                    this.setState({ noOfDocs: 2 });
        
                    var filterCerts = data.sort(function(a, b){  
                    if(a.noOfDocs < b.noOfDocs) { return -1; }
                    if(a.noOfDocs > b.noOfDocs) { return 1; }
                    return 0;
                    }).reverse() 
                    break;
        
                  default:
                    this.setState({ noOfDocs: 1 });
        
                    var filterCerts = data.sort(function(a, b){  
                    if(a.noOfDocs < b.noOfDocs) { return -1; }
                    if(a.noOfDocs > b.noOfDocs) { return 1; }
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
    


    let formatedData = filterCerts.map((student) => {
      const formatedStudent = Object.assign({}, student);
      const monthNames =["Jan","Feb","Mar","Apr",
                      "May","Jun","Jul","Aug",
                      "Sep", "Oct","Nov","Dec"];

      var issuedDate = new Date(student.graduationDate * 1000);
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

      formatedStudent.graduationDate = `${date} ${month} ${year}, ${hour}:${mins} ${timeType}`;

      var issuedDate = new Date(student.dob * 1000);
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

      formatedStudent.dob = `${date} ${month} ${year}, ${hour}:${mins} ${timeType}`;

      return formatedStudent;
    });

    this.setState({ formatedCert: formatedData });
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



    const columns = nameColumn.concat(saleTabList.columns);
    return (
      <div>
        
        {this.props.data ? (
          
          <div className="DeliveryOrderTable">

            <div className=" DeliverySalesTable">
              <NewReactTableComponent
                listData={this.state.formatedCert ? this.state.formatedCert : []}
                listConfig={saleTabList}
                columns={columns}
                onHeaderClick={this.sortByHeader}
                onRowClick={this.goToStudentDetails}
                forSerialNo={{
                  pageNo: this.state.pageNo,
                  pageSize: this.state.rows
                }}
                studentChangeValue={this.state.changeValue}
              />
            </div>
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

export default withRouter(DeliveryOrderSales);

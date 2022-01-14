import React, { Component } from 'react';
import { AppBar, Tabs, Tab, Typography, Box } from '@material-ui/core';
import PropTypes from 'prop-types';
import { DotLoader } from 'react-spinners';
import {getStudentCertificates, getStudentsList} from '../../services/studentsService';
import {getLocalDocumentsList} from "../../services/authService";
import {getCertificateList} from "../../services/createDocumentService";
import {filterOnDocType} from "../Shared/Documents/DocumentsDataFormat"
import {getTimeFromUnixTimestamp, unixTimestampToDate} from "../Shared/dateTimeFormat"
import {revokeDocument} from "../../services/createDocumentService"
import {getDocumentListFun} from '../Shared/Documents/getDocumentsList'
import { BackdropLoader } from '../../services/loader';
import { Dialog, IconButton } from '@material-ui/core';
// import { salesOverviewList } from './SalesOverviewConfig';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import { withStyles } from '@material-ui/core/styles';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import signDocService from '../../services/signDocument';
import SaleModalTemplate from '../Dashboard/DashboardTabSetup/SaleModalTemplate';
import TvCertModalIFrame from '../Dashboard/DashboardTabSetup/TvCertModaIFrame';
import RefreshIcon from '@material-ui/icons/Refresh';
import Tooltip from '@material-ui/core/Tooltip';
import { formatAmount, numberWithCommas } from '../Shared/amountFormat';
import SearchBar from '../Shared/SearchBar'
import { QueryBuilderOutlined } from '@material-ui/icons';
import FilterBar from '../Shared/FilterBar';

import DeliveryOrderPurchase from './DeliveryOrderPurchase';
import DeliveryOrderSales from './DeliveryOrderSales';
import './DeliveryOrder.css';
import '../SalesQuotation/salesQuotation.css';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component='div'
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


class DeliveryOrderTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      studentsList: [],
      filteredStudents: [],
      changeValue: 0, 
      loader: true,
      loader1: false,
      searchQuery: '',
    };
  }

  async componentDidMount() {
    this.getStudentsData()
  }

  handleQueryChange = (query) => {
    this.filterStudents(this.state.studentsList, query);
    this.setState({ searchQuery: query });
    this.toggleChangeValue();
  }

  filterStudents = (students, query) => {
    if (!query) {
      let allStudents = this.state.studentsList
      this.setState({ filteredStudents: allStudents });
    }

    let filteredStudents = students.filter((student) => {
        const studentName = student.name.toLowerCase();
        const email = student.email.toLowerCase();
        const studentId = student.studentId.toString().toLowerCase();
        const nric = student.nric.toString().toLowerCase();
        query = query.toString().toLowerCase();
        return (studentName.includes(query) || email.includes(query) || nric.includes(query) || studentId.includes(query));
    });

    this.setState({ filteredStudents: filteredStudents });
  };

  toggleChangeValue = () => {
    if(this.state.changeValue === 0){
      this.setState({ changeValue: 1 });
    }
    else {
      this.setState({ changeValue: 0 });
    }
  }

  handleTabs = (event, newValue) => {
    this.setState({
      value: newValue,
    });
  };















  getStudentsData = async (docHash = null) => {
    const response = await getStudentsList()
    console.log("response", response)
    if(response) {
      let students = response.data.studentArr ? response.data.studentArr : []
      console.log('students',students);
      // students=[]
      var i;
      for (i in students){
        var splitNRIC = students[i].patientNRIC.split("");
        var censoredNRIC = "*****" + splitNRIC[splitNRIC.length-4] + splitNRIC[splitNRIC.length-3] + splitNRIC[splitNRIC.length-2] + splitNRIC[splitNRIC.length-1]
        students[i].patientNRIC = censoredNRIC;
      }
      
      if(students){
        students = students.filter((student) => {
          return student !== null;
        }).sort(function(a, b){ 
          return new Date(b.graduationDate) - new Date(a.graduationDate); 
        })
      }
      this.setState({loader: false, studentsList: students, filteredStudents: students })
      this.toggleChangeValue();
    }
  }

















  
  onRefresh = async (evt) => {
    this.setState({loader: true})
    try {
      await this.getStudentsData()
    } catch (error) {
      this.setState({loader: false})
      console.log('Error : ',error);
    }
  }

  render() {
    if(this.state.loader){
      return <BackdropLoader open={this.state.loader} />
    }

    return (
      <div className='DeliveryOrderTab'>
        <div className="salesHeader row">
          <h3>Students</h3>
          <Tooltip title='refresh' placement="right-end">
              <IconButton aria-label="upload picture" onClick={this.onRefresh}>
                <RefreshIcon htmlColor='#15A063'/>
              </IconButton>
          </Tooltip>
        </div>
        
        <AppBar position='static'>
          <Tabs
            variant='scrollable'
            indicatorColor='primary'
            className='tab-appbar'
            style={{ color: 'black' }}
            value={this.state.value}
            onChange={this.handleTabs}
            aria-label='simple tabs example'
          >
            <Tab className='tab' label='Students' {...a11yProps(0)} />
            {/* <Tab className='tab' label='Purchases' {...a11yProps(1)} /> */}
          </Tabs>
        </AppBar>
        <TabPanel value={this.state.value} index={0}>
          <SearchBar searchContent="Students" onSearchHandler={this.handleQueryChange} searchQuery={this.state.searchQuery} />
          <DeliveryOrderSales data={this.state.filteredStudents} changeValue={this.state.changeValue} />
        </TabPanel>
      </div>
    );
  }
}

export default DeliveryOrderTab;

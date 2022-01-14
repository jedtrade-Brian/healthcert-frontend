import React, { Component } from 'react';
import { AppBar, Tabs, Tab, Typography, Box } from '@material-ui/core';
import PropTypes from 'prop-types';
import InvoicesFinancialOverview from './InvoicesFinancialOverview';
import InvoicesFinancialDeclined from './InvoicesFinancialDeclined';
import './InvoicesFinancial.css';
import authService from '../../services/authService';
import {
  getDashboardInvoiceCount,
  getDashboardDeclineCount,
} from '../../services/financierService';
import { BackdropLoader } from '../../services/loader';

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

class InvoicesFinancialTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      overview: null,
      // supplier: undefined,
      // declined: null,
      loader: false,
      via: '',
    };
  }

  async componentDidMount() {
    // console.log('Props 1111 : ',this.props);
    if (authService.getSelectedInvoices()) {
      authService.removeSelectedInvoices();
    }
    let supplier = '';
    if (this.props.location && this.props.location.search) {
      supplier = new URLSearchParams(this.props.location.search).get(
        'supplier'
      );
    }
    if (supplier) {
      this.setState({ via: 'dashboard' });
    }
    if (!supplier) {
      this.getInvoicesList()
    }
  }

  async getInvoicesList() {
    this.setState({ loader: true });
    let invoiceOverviewData = [];
    let declineOverviewData = [];
    try {
      const response = await Promise.all([
        getDashboardInvoiceCount(),
        // getDashboardDeclineCount(),
      ]);

      if (response[0] && response[0].data) {
        invoiceOverviewData = response[0].data.invoices
          ? response[0].data.invoices
          : [];
      }
      // if (response[1] && response[1].data) {
      //   declineOverviewData = response[1].data.declineArr
      //     ? response[1].data.declineArr
      //     : [];
      // }
      this.setState(
        {
          loader: false,
          overview: invoiceOverviewData,
          // declined: declineOverviewData, // SampleData.declined,
        },
        () => console.log('Satte : ', this.state)
      );
    } catch (error) {
      console.log('Invoice error', error);
      this.setState({ loader: false });
    }
  }

  handleTabs = (event, newValue) => {
    this.setState({
      value: newValue,
    });
  };

  goToDecline = () => {
    if(this.state.via === 'dashboard'){
      this.props.history.push('/dashboardFinancial')
    } else {
      this.componentDidMount()
    }
    // this.setState({
    //   value: 1,
    // });
  };

  render() {
    // if (!this.state.overview || !this.state.declined) {
    //   return <BackdropLoader open={this.state.loader} />;
    // }

    return (
      <div className='salesQtnTab invoicefinanceLogin'>
        <BackdropLoader open={this.state.loader} />
        <h2>Invoices</h2>
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
            <Tab className='tab' label='Invoice Overview' {...a11yProps(0)} />
            {/* {this.state.via !== 'dashboard' && (
              <Tab className='tab' label='Declined' {...a11yProps(1)} />
            )} */}
          </Tabs>
        </AppBar>
        <TabPanel value={this.state.value} index={0}>
          {(this.state.overview || this.state.via === 'dashboard') && (
            <InvoicesFinancialOverview
              overviewData={this.state.overview}
              // supplierData={this.state.supplier}
              onDeclineConfirmClick={this.goToDecline}
            />
           )} 
        </TabPanel>
        {/* {this.state.via !== 'dashboard' && this.state.declined && (
          <TabPanel
            value={this.state.value}
            index={1}
            className='invoicefinanceDeclinedTab'
          >
            <InvoicesFinancialDeclined declinedData={this.state.declined} />
          </TabPanel>
        )} */}
      </div>
    );
  }
}

export default InvoicesFinancialTab;

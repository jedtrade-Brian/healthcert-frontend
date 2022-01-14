import React, { Component } from 'react';
import { AppBar, Tabs, Tab, Typography, Box } from '@material-ui/core';
import PropTypes from 'prop-types';
import FinancialDeclinedOverview from './DashboardTabSetup/FinancialDeclinedOverview';

import './dashboard.css';
import FinancialInvoiceOverview from './DashboardTabSetup/FinancialInvoiceOverview';

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

class DashboardFinanceTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
  }

  handleTabs = (event, newValue) => {
    if (newValue === 1) {
      this.props.showSpanPurchaseData();
    }
    if (newValue === 0) {
      this.props.showSpanSaleData();
    }
    this.setState({
      value: newValue,
    });
  };

  render() {
    return (
      <div className='dashboardTabComponent'>
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
            {/* <Tab className='tab' label='Declined' {...a11yProps(1)} /> */}
          </Tabs>
        </AppBar>
        <TabPanel value={this.state.value} index={0}>
          <FinancialInvoiceOverview
            onOverviewTabsClick={this.props.onOverviewTabsClick}
            history={this.props.history}
            data={
              this.props.dashboardFinacialTabsData.invoiceOverviewData
                ? this.props.dashboardFinacialTabsData.invoiceOverviewData
                : null
            }
          />
        </TabPanel>
        {/* <TabPanel value={this.state.value} index={1} className='dashDeclined'>
          <FinancialDeclinedOverview
            onOverviewTabsClick={this.props.onOverviewTabsClick}
            history={this.props.history}
            data={
              this.props.dashboardFinacialTabsData.declineOverviewData
                ? this.props.dashboardFinacialTabsData.declineOverviewData
                : null
            }
          />
        </TabPanel> */}
      </div>
    );
  }
}

export default DashboardFinanceTab;

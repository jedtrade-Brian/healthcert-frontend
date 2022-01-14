import React, { Component } from 'react';
import { AppBar, Tabs, Tab, Typography, Box } from '@material-ui/core';
import PropTypes from 'prop-types';
import SalesOverview from './DashboardTabSetup/SalesOverview.js';
import PurchasesOverview from './DashboardTabSetup/PurchasesOverview.js';
import './dashboard.css';

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

class DashboardTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      salesOverviewData: [],
      salesPendingDocs: [],
      purchasesOverviewData: [],
      purchasePendingDocs: [],
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
            <Tab className='tab' label='Sales Overview' {...a11yProps(0)} />
            <Tab className='tab' label='Purchases Overview' {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <TabPanel value={this.state.value} index={0}>
          <SalesOverview
            //  onOverviewTabsClick={this.props.onOverviewTabsClick}
            data={
              this.props.dashboardTabsData.salesTableData
                ? this.props.dashboardTabsData.salesTableData.salesOverviewData
                : null
            }
            pendingData={
              this.props.dashboardTabsData.salesTableData
                ? this.props.dashboardTabsData.salesTableData.salesPendingDocs
                : null
            }
          />
        </TabPanel>
        <TabPanel
          value={this.state.value}
          index={1}
          className='purchaseoverviewTab'
        >
          <PurchasesOverview
            // onOverviewTabsClick={this.props.onOverviewTabsClick}
            data={
              this.props.dashboardTabsData.purchaseTableData
                ? this.props.dashboardTabsData.purchaseTableData
                    .purchasesOverviewData
                : null
            }
            pendingData={
              this.props.dashboardTabsData.purchaseTableData
                ? this.props.dashboardTabsData.purchaseTableData
                    .purchasePendingDocs
                : null
            }
          />
        </TabPanel>
      </div>
    );
  }
}

export default DashboardTab;

import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import { FormControl, Select, MenuItem } from '@material-ui/core';
import { Bar, Line } from 'react-chartjs-2';
import DashboardTab from './DashboardTab.js';
// import {getDocumentList} from '../../services/createDocumentService'
import { getDocumentListFun } from '../Shared/Documents/getDocumentsList';
import { getLocalDocumentsList } from '../../services/authService';
import { BackdropLoader } from '../../services/loader';
import { filterOnDocType } from '../Shared/Documents/DocumentsDataFormat';
import {
  getInvoiceRawData
} from "../../services/invoiceService"

import dashboardModel from './model';
import './dashboard.css';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: true,
      buttonClick: 'Monthly',
      showPurchaseSpan: false,
      showSalesSpan: true,
      graphLine: 'Bar',
      allGraphData: {
        salesGraphData: null,
        purchaseGraphData: null,
      },
      graphData: {
        salesGraphData: [],
        salesGraphLabel: [],
        purchaseGraphData: [],
        purchaseGraphLabel: [],
      },
      dashboardTabsData: {
        salesTableData: null,
        purchaseTableData: null,
      },
      exposure: dashboardModel.docName.quotation,
      exposureid: dashboardModel.docName.invoice,
      filteredSalesDocData: null,
      filteredPurchaseDocData: null,
      financedAmountSum: null,
      financingAmountSum: null,
      financedCount: null,
      financingCount: null,
      defaultLabel: null,
    };
  }

async componentDidMount() {
      getInvoiceRawData().then(response => {
        console.log('Invoice Raw Data Response : ',response);
        if(response && response.data){
          let financedCount = 0;
          let financingCount = 0;
          let financedAmountSum = 0;
          let financingAmountSum = 0;
          response.data.invoices.map(item => {
            if(item.financingStatus === 1){
              financingCount += 1;
              financingAmountSum += +item.amount
            }
            if(item.financingStatus === 2){
              financedCount += 1;
              financedAmountSum += +item.amount
            }
          })
          this.setState({
            financedCount,
            financingCount,
            financedAmountSum,
            financingAmountSum
          })
        }
      }).catch(err => {
        console.log('Invoice Raw Data Error');
      })
      await getDocumentListFun()
      // const response = dashboardModel.testData 
      const response = getLocalDocumentsList()
    // getDocumentList().then(response => {
      console.log('response2 : ',response);
      let salesOverviewData = [];
      let purchasesOverviewData = [];
      let salesPendingDocs = [];
      let purchasePendingDocs = [];
      let salesGraphData = null;
      let purchaseGraphData = null ;
      let filteredSalesDocData = null;
      let filteredPurchaseDocData = null;
      if(response){
        if(response.salesDoc){
          filteredSalesDocData = filterOnDocType(response.salesDoc)
          
          for (const key in filteredSalesDocData) {
            if (filteredSalesDocData.hasOwnProperty(key)) {
              filteredSalesDocData[key] = filteredSalesDocData[key].filter(item => !item.revoked)
            }
          }
          // console.log('&&&&&&& : ',filteredSalesDocData);
          salesGraphData = dashboardModel.graphDataFormatting(filteredSalesDocData,'monthly')
          // console.log('salesGraphData : ',salesGraphData);
          const sortedIssuedBy = response.salesDoc.sort(function(a, b){ 
            return new Date(b.createdAt) - new Date(a.createdAt); 
          });
          for (const data of sortedIssuedBy) {
            const finalData = dashboardModel.getFinalData(data,'sales')
            if(finalData.status === 'Pending'){ // || finalData.status === 'Issued'
              salesPendingDocs = [...salesPendingDocs,finalData]
            }
            salesOverviewData = [...salesOverviewData , finalData] 
          }
        }
        if (response.purchaseDoc) {
          filteredPurchaseDocData = filterOnDocType(response.purchaseDoc);

          for (const key in filteredPurchaseDocData) {
            if (filteredPurchaseDocData.hasOwnProperty(key)) {
              filteredPurchaseDocData[key] = filteredPurchaseDocData[key].filter(item => !item.revoked)
            }
          }
          purchaseGraphData = dashboardModel.graphDataFormatting(
            filteredPurchaseDocData,
            'monthly'
          );
          // console.log('purchaseGraphData : ', purchaseGraphData);
          const sortedIssuedTo = response.purchaseDoc.sort(function(a, b){ 
            return new Date(b.createdAt) - new Date(a.createdAt); 
          });
          for (const data of sortedIssuedTo) {
            const finalData = dashboardModel.getFinalData(data, 'purchase');
            if (finalData.status === 'Pending') { // || finalData.status === 'Issued'
              purchasePendingDocs = [...purchasePendingDocs, finalData];
            }
            purchasesOverviewData = [...purchasesOverviewData, finalData];
          }
        }
      }
    const sales = dashboardModel.getSelectedDocumentData(
      salesGraphData,
      this.state.exposure
    );
    // console.log('Sales : ',sales);
    const purchase = dashboardModel.getSelectedDocumentData(
      purchaseGraphData,
      this.state.exposureid
    );
    this.setState(
      {
        defaultLabel: dashboardModel.monthLabel,
        loader: false,
        filteredSalesDocData,
        filteredPurchaseDocData,
        allGraphData:{
          salesGraphData,
          purchaseGraphData,
        },
        graphData: {
          salesGraphData: dashboardModel.copiedGraphData(sales.graphData),
          salesGraphLabel: sales.graphLabel ? [...sales.graphLabel] : [],
          purchaseGraphData: dashboardModel.copiedGraphData(purchase.graphData),
          purchaseGraphLabel: purchase.graphLabel
            ? [...purchase.graphLabel]
            : [],
        },
        dashboardTabsData: {
          salesTableData: {
            salesOverviewData,
            salesPendingDocs,
          },
          purchaseTableData: {
            purchasesOverviewData,
            purchasePendingDocs,
          },
        },
      },
      () => console.log(this.state)
    );

    // })
  }

  numberWithCommas(x) {
    if(x){
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
      return '';
    }
  }

  handleProductChange = (e) => {
    let { name, value } = e.target;
    if (value != null && typeof value !== 'string') {
      value = value.toString();
    }
    let sales = null;
    let purchase = null;
    if (name === 'exposure') {
      sales = dashboardModel.getSelectedDocumentData(
        this.state.allGraphData.salesGraphData,
        value
      );
    } else {
      purchase = dashboardModel.getSelectedDocumentData(
        this.state.allGraphData.purchaseGraphData,
        value
      );
    }

    this.setState({
      [name]: value,
      graphData: {
        salesGraphData: sales
          ? dashboardModel.copiedGraphData(sales.graphData)
          : this.state.graphData.salesGraphData,
        salesGraphLabel: sales
          ? sales.graphLabel
          : this.state.graphData.salesGraphLabel,
        purchaseGraphData: purchase
          ? dashboardModel.copiedGraphData(purchase.graphData)
          : this.state.graphData.purchaseGraphData,
        purchaseGraphLabel: purchase
          ? purchase.graphLabel
          : this.state.graphData.purchaseGraphLabel,
      },
    });
  };

  monthButton = () => {
    let salesGraphData = dashboardModel.graphDataFormatting(this.state.filteredSalesDocData,'monthly')
    console.log('Monthly salesGraphData',salesGraphData);
    let purchaseGraphData = dashboardModel.graphDataFormatting(this.state.filteredPurchaseDocData,'monthly')
    console.log('Monthly purchaseGraphData',purchaseGraphData);
    const sales = dashboardModel.getSelectedDocumentData(salesGraphData, this.state.exposure)
    const purchase = dashboardModel.getSelectedDocumentData(purchaseGraphData, this.state.exposureid)
    this.setState({
       defaultLabel: dashboardModel.monthLabel,
       buttonClick: "Monthly",
       allGraphData:{
        salesGraphData,
        purchaseGraphData
      },
      graphData : {
        salesGraphData: dashboardModel.copiedGraphData(sales.graphData),
        salesGraphLabel: sales.graphLabel ? [...sales.graphLabel] : [],
        purchaseGraphData: dashboardModel.copiedGraphData(purchase.graphData),
        purchaseGraphLabel: purchase.graphLabel ? [...purchase.graphLabel]: []
      },
    });
  };
  
  quarterButton = () => {
    let salesGraphData = dashboardModel.graphDataFormatting(this.state.filteredSalesDocData,'quarterly')
    console.log('Quarterly salesGraphData',salesGraphData);
    let purchaseGraphData = dashboardModel.graphDataFormatting(this.state.filteredPurchaseDocData,'quarterly')
    console.log('Quarterly purchaseGraphData',purchaseGraphData);
    const sales = dashboardModel.getSelectedDocumentData(salesGraphData, this.state.exposure)
    const purchase = dashboardModel.getSelectedDocumentData(purchaseGraphData, this.state.exposureid)
    this.setState({
       defaultLabel: dashboardModel.quarterLabel,
       buttonClick: "Quarter",
       allGraphData:{
        salesGraphData,
        purchaseGraphData
      },
      graphData : {
        salesGraphData: dashboardModel.copiedGraphData(sales.graphData),
        salesGraphLabel: sales.graphLabel ? [...sales.graphLabel] : [],
        purchaseGraphData: dashboardModel.copiedGraphData(purchase.graphData),
        purchaseGraphLabel: purchase.graphLabel ? [...purchase.graphLabel]: []
      },
    });
  };

  halfButton = () => {
    let salesGraphData = dashboardModel.graphDataFormatting(this.state.filteredSalesDocData,'halfYearly')
    console.log('Half Yearly salesGraphData',salesGraphData);
    let purchaseGraphData = dashboardModel.graphDataFormatting(this.state.filteredPurchaseDocData,'halfYearly')
    console.log('Half Yearly purchaseGraphData',purchaseGraphData);
    const sales = dashboardModel.getSelectedDocumentData(salesGraphData, this.state.exposure)
    const purchase = dashboardModel.getSelectedDocumentData(purchaseGraphData, this.state.exposureid)
    this.setState({
       defaultLabel: dashboardModel.halfYearlyLabel,
       buttonClick: "Half Yearly",
       allGraphData:{
        salesGraphData,
        purchaseGraphData
      },
      graphData : {
        salesGraphData: dashboardModel.copiedGraphData(sales.graphData),
        salesGraphLabel: sales.graphLabel ? [...sales.graphLabel] : [],
        purchaseGraphData: dashboardModel.copiedGraphData(purchase.graphData),
        purchaseGraphLabel: purchase.graphLabel ? [...purchase.graphLabel]: []
      },
    });
    // this.setState({ buttonClick: "Half Yearly" });
  };
  
  yearButton = () => {
    let salesGraphData = dashboardModel.graphDataFormatting(this.state.filteredSalesDocData,'yearly')
    console.log('Yearly salesGraphData',salesGraphData);
    let purchaseGraphData = dashboardModel.graphDataFormatting(this.state.filteredPurchaseDocData,'yearly')
    console.log('Yearly purchaseGraphData',purchaseGraphData);
    const sales = dashboardModel.getSelectedDocumentData(salesGraphData, this.state.exposure)
    const purchase = dashboardModel.getSelectedDocumentData(purchaseGraphData, this.state.exposureid)
    this.setState({
       defaultLabel: dashboardModel.yearlyLabel,
       buttonClick: "Yearly",
       allGraphData:{
        salesGraphData,
        purchaseGraphData
      },
      graphData : {
        salesGraphData: dashboardModel.copiedGraphData(sales.graphData),
        salesGraphLabel: sales.graphLabel ? [...sales.graphLabel] : [],
        purchaseGraphData: dashboardModel.copiedGraphData(purchase.graphData),
        purchaseGraphLabel: purchase.graphLabel ? [...purchase.graphLabel]: []
      },
    });
    // this.setState({ buttonClick: "Yearly" });
  };



  showSpanPurchaseData = () => {
    this.setState({ showPurchaseSpan: true, showSalesSpan: false });
    // const purchaseGraphData = dashboardModel.getSingleGraphData(
    //   [23, 43, 43, 23, 34, 54, 33, 40, 76, 46, 76, 34],
    //   this.state.exposureid
    // )

    // const graphData = { ...this.state.graphData };
    // graphData["purchaseGraphData"] = purchaseGraphData;
    // this.setState({ graphData });
  };

  showSpanSaleData = () => {
    this.setState({ showPurchaseSpan: false, showSalesSpan: true });
    // let salesGraphData = []
    // if(this.state.exposure === dashboardModel.docName.invoice){
    //   salesGraphData = [
    //     {
    //       backgroundColor: "#ff2366",
    //       stack: 1,
    //       data: [23, 43, 43, 23, 34, 54, 33, 40, 76, 46, 76, 34],
    //       label : 1
    //     },
    //     {
    //       backgroundColor: "#F5F5F5",
    //       stack: 1,
    //       data: [13, 33, 43, 10, 15, 24, 31, 16, 19, 10, 30, 34],
    //       label: 2
    //     }
    //   ]
    // } else {
    //   salesGraphData = dashboardModel.getSingleGraphData(
    //     [23, 43, 43, 23, 34, 54, 33, 40, 76, 46, 76, 34],
    //     this.state.exposure
    //   )
    // }

    // const graphData = { ...this.state.graphData };
    // graphData["salesGraphData"] = salesGraphData;
    // this.setState({ graphData });
  };

  invoiceRouting = () => {
    this.props.history.push('/invoices');
  };

  barGraph = () => {
    this.setState({ graphLine: 'Bar' });
  };

  lineGraph = () => {
    this.setState({ graphLine: 'Line' });
  };

  render() {
    return (
      <div className='dashboardSection'>
        <BackdropLoader open={this.state.loader} />
        <div className='dashboardHeader'>
          <h3>Dashboard</h3>
          <div className='dashboardHeaderAction'>
            <div className='dashboardHeaderBtn'>
              <Button
                onClick={() => this.yearButton()}
                className={
                  this.state.buttonClick === 'Yearly' ? 'highlightButton' : ''
                }
              >
                Yearly
              </Button>
              <Button
                onClick={() => this.halfButton()}
                className={
                  this.state.buttonClick === 'Half Yearly'
                    ? 'highlightButton'
                    : ''
                }
              >
                Half Yearly
              </Button>
              <Button
                onClick={() => this.quarterButton()}
                className={
                  this.state.buttonClick === 'Quarter' ? 'highlightButton' : ''
                }
              >
                Quarterly
              </Button>
              <Button
                onClick={() => this.monthButton()}
                className={
                  this.state.buttonClick === 'Monthly' ? 'highlightButton' : ''
                }
              >
                Monthly
              </Button>
            </div>
            <div className='dashHeaderPeformance'>
              <Button onClick={this.barGraph}>
                <span>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='19.999'
                    height='19.999'
                    viewBox='0 0 19.999 19.999'
                  >
                    <g transform='translate(14.218 4.77)'>
                      <path
                        className='a'
                        d='M369,131.3a.781.781,0,0,0,.781-.781v-5.507a2.89,2.89,0,0,0-5.781,0v9.448a2.89,2.89,0,1,0,5.781,0,.781.781,0,1,0-1.562,0,1.328,1.328,0,0,1-2.656,0v-9.448a1.328,1.328,0,0,1,2.656,0v5.507A.781.781,0,0,0,369,131.3Z'
                        transform='translate(-364 -122.122)'
                      />
                    </g>
                    <g transform='translate(0 7.153)'>
                      <path
                        className='a'
                        d='M2.89,183.122A2.894,2.894,0,0,0,0,186.012v7.065a2.89,2.89,0,0,0,5.781,0v-7.065A2.894,2.894,0,0,0,2.89,183.122Zm1.328,9.956a1.328,1.328,0,0,1-2.656,0v-7.065a1.328,1.328,0,1,1,2.656,0Z'
                        transform='translate(0 -183.122)'
                      />
                    </g>
                    <g transform='translate(7.109)'>
                      <path
                        className='a'
                        d='M184.89,0A2.894,2.894,0,0,0,182,2.89V17.108a2.89,2.89,0,0,0,5.781,0V2.89A2.894,2.894,0,0,0,184.89,0Zm1.328,17.108a1.328,1.328,0,0,1-2.656,0V2.89a1.328,1.328,0,0,1,2.656,0Z'
                        transform='translate(-182)'
                      />
                    </g>
                  </svg>
                </span>
              </Button>
              <Button onClick={this.lineGraph}>
                <span>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='22.217'
                    height='19.999'
                    viewBox='0 0 22.217 19.999'
                  >
                    <g className='a'>
                      <g transform='translate(0 0)'>
                        <path
                          d='M20,25.55a2.216,2.216,0,0,0-1.6,3.758l-4.058,8.12a1.823,1.823,0,0,0-.269-.026,2.216,2.216,0,0,0-.838.165l-3.151-3.546a2.217,2.217,0,1,0-4.158-1.068,2.2,2.2,0,0,0,.547,1.441L2.617,41.143a2.031,2.031,0,0,0-.395-.039,2.253,2.253,0,1,0,1.675.781l3.854-6.749a2.089,2.089,0,0,0,1.228-.126l3.151,3.546a2.22,2.22,0,1,0,3.537-.469l4.058-8.12a1.823,1.823,0,0,0,.269.026,2.222,2.222,0,0,0,0-4.444Z'
                          transform='translate(0 -25.55)'
                        />
                      </g>
                    </g>
                  </svg>
                </span>
              </Button>
            </div>
          </div>
        </div>
        <div className='bargrapSections'>
          <div className='salesGraph'>
            <div className='headDropdown'>
              <h5>Sales</h5>
              <div>
                <FormControl variant='outlined'>
                  <Select
                    value={
                      this.state.exposure !== null ? this.state.exposure : ''
                    }
                    name='exposure'
                    onChange={this.handleProductChange}
                  >
                    <MenuItem value={dashboardModel.docName.quotation}>
                      <span className='quotations'></span>
                      <span>Quotation</span>
                    </MenuItem>
                    <MenuItem
                      value={dashboardModel.docName.delivery_order}
                      disabled
                    >
                      <span className='deliveryOrder'></span>
                      <span>Delievery Orders</span>
                    </MenuItem>
                    <MenuItem
                      value={dashboardModel.docName.payment_certificate}
                    >
                      <span className='paymentCertificate'></span>
                      <span>Payment Certificate</span>
                    </MenuItem>
                    <MenuItem value={dashboardModel.docName.invoice}>
                      <span className='invoice'></span>
                      <span>Invoice</span>
                    </MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
            {this.state.showSalesSpan === true && this.state.exposure === dashboardModel.docName.invoice ? (
              <div className='financeStatement'>
                <div className='availableFinance'>
                  <span></span>
                  <span>Financed : </span>
                  <span>{this.state.financedCount ? this.state.financedCount : 0}</span>
                </div>
                <ul className='finance'>
                  <li>
                    <span>Requested for financing {' '}</span>
                    <span>{this.state.financingCount ? this.state.financingCount : 0}</span>
                  </li>
                  <li>/</li>
                  <li>
                    <span>Amount{' '}</span>
                    <span>${this.state.financingAmountSum ? this.numberWithCommas(this.state.financingAmountSum) : 0}</span>
                  </li>
                </ul>
              </div>
            ) : (
              <div className='financeStatement'></div>
            )}
            {this.state.graphLine === 'Bar' ? (
              <Bar
                data={{
                  labels: this.state.graphData.salesGraphLabel
                    ? this.state.graphData.salesGraphLabel.length
                      ? this.state.graphData.salesGraphLabel
                      : this.state.defaultLabel
                    : this.state.defaultLabel,
                  datasets: this.state.graphData.salesGraphData
                    ? this.state.graphData.salesGraphData
                    : [],
                }}
                options={{
                  title: {
                    display: false,
                  },
                  legend: {
                    display: false,
                  },
                }}
              />
            ) : (
              <Line
                data={{
                  labels: this.state.graphData.salesGraphLabel
                    ? this.state.graphData.salesGraphLabel.length
                      ? this.state.graphData.salesGraphLabel
                      : this.state.defaultLabel
                    : this.state.defaultLabel,
                  datasets: this.state.graphData.salesGraphData
                    ? this.state.graphData.salesGraphData
                    : [], // this.state.graphData.salesGraphData
                }}
                options={{
                  title: {
                    display: false,
                  },
                  legend: {
                    display: false,
                  },
                }}
              />
            )}
          </div>
          <div className='purchaseGraph'>
            <div className='headDropdown'>
              <h5>Purchases</h5>
              <div>
                <FormControl variant='outlined'>
                  <Select
                    value={
                      this.state.exposureid !== null
                        ? this.state.exposureid
                        : ''
                    }
                    name='exposureid'
                    onChange={this.handleProductChange}
                  >
                    <MenuItem value={dashboardModel.docName.quotation}>
                      <span className='quotations'></span>
                      <span>Quotation</span>
                    </MenuItem>
                    <MenuItem
                      value={dashboardModel.docName.delivery_order}
                      disabled
                    >
                      <span className='deliveryOrder'></span>
                      <span>Delievery Orders</span>
                    </MenuItem>
                    <MenuItem
                      value={dashboardModel.docName.payment_certificate}
                    >
                      <span className='paymentCertificate'></span>
                      <span>Payment Certificate</span>
                    </MenuItem>
                    <MenuItem value={dashboardModel.docName.invoice}>
                      <span className='invoice'></span>
                      <span>Invoice</span>
                    </MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
            {/* {this.state.showPurchaseSpan === true ? (
              <ul className="finance">
                <div className="liData" onClick={this.invoiceRouting}>
                  <li>
                    <span>Available for Financing:</span>
                    <span>3</span>
                  </li>
                  <li>/</li>
                  <li>
                    <span>Amount:</span>
                    <span>$980890.00</span>
                  </li>
                </div>
              </ul>
            ) : ( */}
            <div className='finance'></div>
            {/* )} */}
            {this.state.graphLine === 'Bar' ? (
              <Bar
                data={{
                  labels: this.state.graphData.purchaseGraphLabel
                    ? this.state.graphData.purchaseGraphLabel.length
                      ? this.state.graphData.purchaseGraphLabel
                      : this.state.defaultLabel
                    : this.state.defaultLabel,
                  datasets: this.state.graphData.purchaseGraphData
                    ? this.state.graphData.purchaseGraphData
                    : [], // this.state.graphData.salesGraphData
                }}
                ref={this.chartReference}
                options={{
                  title: {
                    display: false,
                  },
                  // tooltips: {
                  //   enabled: true,
                  //   backgroundColor: "#000"
                  // },
                  legend: {
                    display: false,
                  },
                }}
              />
            ) : (
              <Line
                data={{
                  labels: this.state.graphData.purchaseGraphLabel
                    ? this.state.graphData.purchaseGraphLabel.length
                      ? this.state.graphData.purchaseGraphLabel
                      : this.state.defaultLabel
                    : this.state.defaultLabel,
                  datasets: this.state.graphData.purchaseGraphData
                    ? this.state.graphData.purchaseGraphData
                    : [], // this.state.graphData.salesGraphData
                }}
                options={{
                  title: {
                    display: false,
                  },
                  // tooltips: {
                  //   enabled: true,
                  //   backgroundColor: "#000"
                  // },
                  legend: {
                    display: false,
                  },
                }}
              />
            )}
          </div>
        </div>
        {!this.state.loader && (
          <DashboardTab
            showSpanPurchaseData={this.showSpanPurchaseData}
            showSpanSaleData={this.showSpanSaleData}
            dashboardTabsData={this.state.dashboardTabsData}
            // onOverviewTabsClick={this.handleOverviewTabsClick}
          />
        )}
      </div>
    );
  }
}

export default Dashboard;

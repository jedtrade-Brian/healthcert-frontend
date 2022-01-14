import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import { Bar, Line } from 'react-chartjs-2';
import DashboardFinanceTab from './DashboardFinanceTab';
import './dashboard.css';
import authService from '../../services/authService';
import { BackdropLoader } from '../../services/loader';
import {
  getDashboardInvoiceCount,
  getDashboardDeclineCount,
  getFinancierChartData
} from '../../services/financierService';
import {
  filterFinancingData,
  filterOnCurrentYearMonth,
  filterOnQuarterly,
  filterOnHalfYearly,
  filterOnYearly,
  monthLabel,
  quarterLabel,
  halfYearlyLabel,
  yearlyLabel
} from "./financialModel"

const salesLabel = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

class DashboardFinancial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: true,
      buttonClick: 'Monthly',
      showPurchaseSpan: true,
      showSalesSpan: true,
      graphLine: 'Bar',
      initialGraphData: {
        financing : null,
        financed : null
      },
      graphData: {
        financedData: [],
        financedLabel: [],
        financingData: [],
        financingLabel: []
      },
      tablesData: {
        salesTableData: [],
        purchaseTableData: [],
      },
      defaultLabel: null,
      dashboardFinacialTabsData: {
        invoiceOverviewData: null,
        // declineOverviewData: null,
      },
      actualInvoiceData: null,
      actualDeclinedData: null
    };
  }
  async componentDidMount() {
    if (authService.getSelectedInvoices()) {
      authService.removeSelectedInvoices();
    }

    let invoiceOverviewData = [];
    // let declineOverviewData = [];
    try {
      const response = await Promise.all([
        getDashboardInvoiceCount(),
        // getDashboardDeclineCount(),
        getFinancierChartData()
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
      if (response[1] && response[1].data) {
        const filteredData = filterFinancingData(response[1].data.invoices)
        let financedData = null;
        let financingData = null;
        if(filteredData) {
          financedData = filterOnCurrentYearMonth(filteredData.financed);
          financingData = filterOnCurrentYearMonth(filteredData.financing)
        } 
        this.setState(
        {
          defaultLabel: monthLabel,
          initialGraphData: {
            financing : filteredData.financing,
            financed : filteredData.financed
          },
          graphData: {
            financedData: financedData ? [ {
              backgroundColor: '#FF2366',
              stack: 1,
              data: financedData.graphData,
            } ] : [],
            financedLabel: financedData ? financedData.graphLabel : [],
            financingData: financingData ? [ {
              backgroundColor: '#4791FF',
              stack: 1,
              data: financingData.graphData,
            } ] : [],
            financingLabel: financingData ? financingData.graphLabel : []
          }
        },() => console.log('State : ',this.state))
      }
      this.setState({
        loader: false,
        // graphData: {
        //   salesGraphData,
        //   purchaseGraphData,
        // },
        dashboardFinacialTabsData: {
          invoiceOverviewData: invoiceOverviewData,
          // declineOverviewData: declineOverviewData,
        },
      });
    } catch (error) {
      console.log('Invoice error', error);
      this.setState({ loader: false });
    }
  }

  // getSupplierInvoicesCount = (dataArr) => {
  //   if(dataArr) {
  //     let supplierEmails = [];
  //     let tempObj = {};
  //     let penFinData = []
  //     let declinedData = []
  //     for (const data of dataArr) {
  //       if(supplierEmails.includes(data.email)){
  //         tempObj[data.email]['arrData'] = [...(tempObj[data.email]['arrData']), data]
  //       } else {
  //         supplierEmails.push(data.email);
  //         tempObj[data.email] = {companyName: data.companyName, arrData: [data]};
  //       }
  //     }
  //     for (const [key, value] of Object.entries(tempObj)) {
  //       let pending = 0;
  //       let financed = 0;
  //       let declined = 0;
  //       value.arrData.map(item => {
  //         if(item.financingStatus === 1) {
  //           pending += 1
  //         }
  //         if(item.financingStatus === 2) {
  //           financed += 1
  //         }
  //         if(item.financingStatus === 3) {
  //           declined += 1
  //         }
  //       })
  //       penFinData = [...penFinData , {
  //         companyName: value.companyName,
  //         email: key,
  //         pendingCount: pending,
  //         approvedCount: financed
  //       }];
  //       declinedData = [...declinedData, {
  //         companyName: value.companyName,
  //         email: key,
  //         declineCount: declined
  //       }]
  //     }
  //     return {
  //       invoiceOverviewData: penFinData,
  //       declineOverviewData: declinedData
  //     };
  //   }
  //   return null
  // }

  

  handleOverviewTabsClick = (tablename, tabs) => {
    // console.log('Table Name : ',tablename);
    // console.log('Tabs Name : ',tabs);
  };

  monthButton = () => {
    let financedData = null;
    let financingData = null;
    if(this.state.initialGraphData){
      financedData = filterOnCurrentYearMonth(this.state.initialGraphData.financed);
      financingData = filterOnCurrentYearMonth(this.state.initialGraphData.financing)
    }
    this.setState(
      {
        defaultLabel: monthLabel,
        buttonClick: 'Monthly',
        graphData: {
          financedData: financedData ? [ {
            backgroundColor: '#FF2366',
            stack: 1,
            data: financedData.graphData,
          } ] : [],
          financedLabel: financedData ? financedData.graphLabel : [],
          financingData: financingData ? [ {
            backgroundColor: '#4791FF',
            stack: 1,
            data: financingData.graphData,
          } ] : [],
          financingLabel: financingData ? financingData.graphLabel : []
        }
      },() => console.log('State Month Click: ',this.state))

  };
  yearButton = () => {
    let financedData = null;
    let financingData = null;
    if(this.state.initialGraphData){
      financedData = filterOnYearly(this.state.initialGraphData.financed);
      financingData = filterOnYearly(this.state.initialGraphData.financing)
    }
    this.setState(
      {
        defaultLabel: yearlyLabel,
        buttonClick: 'Yearly',
        graphData: {
          financedData: financedData ? [ {
            backgroundColor: '#FF2366',
            stack: 1,
            data: financedData.graphData,
          } ] : [],
          financedLabel: financedData ? financedData.graphLabel : [],
          financingData: financingData ? [ {
            backgroundColor: '#4791FF',
            stack: 1,
            data: financingData.graphData,
          } ] : [],
          financingLabel: financingData ? financingData.graphLabel : []
        }
      },() => console.log('State Yearly Click: ',this.state))
  };
  halfButton = () => {
    let financedData = null;
    let financingData = null;
    if(this.state.initialGraphData){
      financedData = filterOnHalfYearly(this.state.initialGraphData.financed);
      financingData = filterOnHalfYearly(this.state.initialGraphData.financing)
    }
    this.setState(
      {
        defaultLabel: halfYearlyLabel,
        buttonClick: 'Half Yearly',
        graphData: {
          financedData: financedData ? [ {
            backgroundColor: '#FF2366',
            stack: 1,
            data: financedData.graphData,
          } ] : [],
          financedLabel: financedData ? financedData.graphLabel : [],
          financingData: financingData ? [ {
            backgroundColor: '#4791FF',
            stack: 1,
            data: financingData.graphData,
          } ] : [],
          financingLabel: financingData ? financingData.graphLabel : []
        }
      },() => console.log('State Half Yearly Click: ',this.state))
  };
  quarterButton = () => {
    let financedData = null;
    let financingData = null;
    if(this.state.initialGraphData){
      financedData = filterOnQuarterly(this.state.initialGraphData.financed);
      financingData = filterOnQuarterly(this.state.initialGraphData.financing)
    }
    this.setState(
      {
        defaultLabel: quarterLabel,
        buttonClick: 'Quarter',
        graphData: {
          financedData: financedData ? [ {
            backgroundColor: '#FF2366',
            stack: 1,
            data: financedData.graphData,
          } ] : [],
          financedLabel: financedData ? financedData.graphLabel : [],
          financingData: financingData ? [ {
            backgroundColor: '#4791FF',
            stack: 1,
            data: financingData.graphData,
          } ] : [],
          financingLabel: financingData ? financingData.graphLabel : []
        }
      },() => console.log('State Quarter Click: ',this.state))
  };
  showSpanPurchaseData = () => {
    this.setState({ showPurchaseSpan: true, showSalesSpan: false });
    const salesGraphData = [
      {
        backgroundColor: '#4791FF',
        stack: 1,
        data: [65, 59, 80, 81, 56, 45, 76, 44, 65, 87, 23, 65],
      },
    ];
    const graphData = { ...this.state.graphData };
    graphData['salesGraphData'] = salesGraphData;
    this.setState({ graphData });
  };
  showSpanSaleData = () => {
    this.setState({ showPurchaseSpan: false, showSalesSpan: true });
    const salesGraphData = [
      {
        backgroundColor: '#4791FF',
        stack: 1,
        label: 1,
        data: [23, 43, 43, 23, 34, 54, 33, 40, 76, 46, 76, 34],
      },
      {
        backgroundColor: '#F5F5F5',
        stack: 1,
        label: 2,
        data: [13, 33, 43, 10, 15, 24, 31, 16, 19, 10, 30, 34],
      },
    ];
    const graphData = { ...this.state.graphData };
    graphData['salesGraphData'] = salesGraphData;
    this.setState({ graphData });
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
            <div className='financeGraph'>
              <h5 style={{ paddingLeft: '10px' }}>
                Amount requested for financing
              </h5>
            </div>
            {this.state.graphLine === 'Bar' ? (
              <Bar
                data={{
                  labels: this.state.graphData ? this.state.graphData.financingLabel.length ? this.state.graphData.financingLabel : this.state.defaultLabel : this.state.defaultLabel,
                  datasets: this.state.graphData ? this.state.graphData.financingData : []
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
                  labels: this.state.graphData ? this.state.graphData.financingLabel.length ? this.state.graphData.financingLabel : this.state.defaultLabel : this.state.defaultLabel,
                  datasets: this.state.graphData ? this.state.graphData.financingData : []
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
            <div className='financeGraph'>
              <h5 style={{ paddingLeft: '10px' }}>Financed Amount</h5>
            </div>
            {this.state.graphLine === 'Bar' ? (
              <Bar
                data={{
                  labels: this.state.graphData ? this.state.graphData.financedLabel.length ? this.state.graphData.financedLabel : this.state.defaultLabel : this.state.defaultLabel,
                  datasets: this.state.graphData ? this.state.graphData.financedData : []
                }}
                ref={this.chartReference}
                options={{
                  title: {
                    display: false,
                  },
                  tooltips: {
                    enabled: true,
                    backgroundColor: '#000',
                  },
                  legend: {
                    display: false,
                  },
                }}
              />
            ) : (
              <Line
                data={{
                  labels: this.state.graphData ? this.state.graphData.financedLabel.length ? this.state.graphData.financedLabel : this.state.defaultLabel : this.state.defaultLabel,
                  datasets: this.state.graphData ? this.state.graphData.financedData : []
                }}
                options={{
                  title: {
                    display: false,
                  },
                  tooltips: {
                    enabled: true,
                    backgroundColor: '#000',
                  },
                  legend: {
                    display: false,
                  },
                }}
              />
            )}
          </div>
        </div>
        {!this.state.loader && (
          <DashboardFinanceTab
            showSpanPurchaseData={this.showSpanPurchaseData}
            showSpanSaleData={this.showSpanSaleData}
            onOverviewTabsClick={this.handleOverviewTabsClick}
            dashboardFinance={true}
            history={this.props.history}
            dashboardFinacialTabsData={this.state.dashboardFinacialTabsData}
          />
        )}
      </div>
    );
  }
}

export default DashboardFinancial;

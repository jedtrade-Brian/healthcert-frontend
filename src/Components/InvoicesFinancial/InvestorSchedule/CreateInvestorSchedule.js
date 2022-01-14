import React, { Component } from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
// import "./InvestorSchedule.css";
import SelectNOA from './SelectNOA';
import SelectInvestorTemplate from './SelectInvestorTemplate';
import ConfirmInvestorSchedule from './ConfirmInvestorSchedule';
import { Button } from '@material-ui/core';
import authService from '../../../services/authService';
import { getFinancierCompanyDetails } from '../../../services/financierService';
import { BackdropLoader } from '../../../services/loader';
import financierServ from '../../../services/financierService';
// import createAcountService from '../../../services/createAcountService';
import { messagePopup } from '../../../services/messagePopupService';

class CreateInvestorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
      activeStep: 0,
      originalData: {},
      buyerData: {},
      selectedBuyer: {},
      finalTemplate: [],
      isLastElement: false,
      data: [],
      user: authService.getUserInfo(),
    };
  }

  componentDidMount() {
    const selectedInvoices = authService.getSelectedInvoices();
    if (selectedInvoices) {
      console.log('selectedInvoices', selectedInvoices);
      this.dataFormatting(selectedInvoices);
    }
  }

  async dataFormatting(dataArr) {
    let financierDetailsObj = {};
    await getFinancierCompanyDetails(this.state.user.companyName)
      .then((resp) => {
        console.log('getFinancierCompanyDetails resp', resp);
        if (resp && resp.data && resp.data.financierDetails) {
          financierDetailsObj = resp.data.financierDetails;
        }
      })
      .catch((error) => {
        console.log('getFinancierCompanyDetails error', error);
        this.setState({ loader: false });
      });

    let buyerId = [];
    let finalData = {};
    for (const data of dataArr) {
      if (buyerId.includes(data.buyerEmail)) {
        const tempData = { ...finalData[data.buyerEmail] };
        tempData['selectedInvoices'] = [
          ...tempData['selectedInvoices'],
          {
            ...data,
            creditTerm: data.creditTerm,
            invNo: data.invNo,
            amount: data.invAmt,
            invDate: data.invDate,
            invoiceDueDate: data.invDueDate,
          },
        ];
        finalData[data.buyerEmail] = tempData;
      } else {
        buyerId.push(data.buyerEmail);
        const buyer = {
          buyerIndividualName: data.buyerIndividualName,
          buyerId: data.buyerEmail,
          buyerName: data.buyerName,
          document: data.docInfo,
          financierDetails: financierDetailsObj,
          selectedInvoices: [
            {
              ...data,
              creditTerm: data.creditTerm,
              invNo: data.invNo,
              amount: data.invAmt,
              invDate: data.invDate,
              invoiceDueDate: data.invDueDate,
            },
          ],
        };
        finalData[data.buyerEmail] = buyer;
      }
    }
    // for (const item in finalData) {
    //   console.log('item', finalData[item]);

    // }

    // console.log('finalData', finalData);

    if (Object.keys(finalData).length === 1) {
      this.setState({ buyerData: finalData,originalData: finalData, isLastElement: true });
    } else {
      this.setState({ buyerData: finalData, originalData: finalData });
    }
  }

  getFinalTemplate = (selectedBuyerRecord, investorRecord) => {
    return {
      template: (
        <ConfirmInvestorSchedule
          data={investorRecord}
          handleNext={this.handleNext4}
          buyerData={selectedBuyerRecord}
        />
      ),
      templateData: {
        buyerData: selectedBuyerRecord,
        investorData: investorRecord,
      },
    };
  };

  handleNext1 = (selectedBuyer) => {
    this.setState({ activeStep: 1, selectedBuyer });
  };

  handleCancel = (steps) => {
    this.setState({activeStep: 0})
  }

  handleAmend = () => {
    let data = {...this.state.originalData}
    const temp = [...this.state.finalTemplate]
    const temp1 = temp.pop()
    const key = temp1.templateData.buyerData.buyerId;
    const value = data[temp1.templateData.buyerData.buyerId]
    this.setState({activeStep: 1,buyerData:{[key]: value}, finalTemplate :temp}) //  buyerData: this.state.originalData,
  }

  handleNext2 = (data) => {
    this.setState({ data }, () => {
      if (this.state.isLastElement) {
        let finalTemplate = [...this.state.finalTemplate];
        let buyerData = { ...this.state.buyerData };
        delete buyerData[this.state.selectedBuyer.buyerId];
        finalTemplate = [
          ...finalTemplate,
          this.getFinalTemplate(this.state.selectedBuyer, this.state.data),
        ];
        this.setState({ activeStep: 2, finalTemplate, buyerData });
      } else {
        this.setState({ activeStep: 2 });
      }
    });
  };

  handleNext3 = (data) => {
    let finalTemplate = [...this.state.finalTemplate];
    let buyerData = { ...this.state.buyerData };
    delete buyerData[this.state.selectedBuyer.buyerId];
    finalTemplate = [
      ...finalTemplate,
      this.getFinalTemplate(this.state.selectedBuyer, this.state.data),
    ];
    this.setState({ activeStep: 0, finalTemplate, buyerData }, () => {
      if (Object.keys(buyerData).length === 1) {
        this.setState({ isLastElement: true });
      }
    });
  };

  // {
  //   "noa": [
  //     {
  //       "recipient": {
  //         "buyerEmail": "string"
  //       },
  //       "invInfo": [
  //         {
  //           "docHash": "string"
  //         }
  //       ],
  //       "noaDetails": [
  //         {
  //           "invtId": "string",
  //           "invtCpy": "string",
  //           "invtPercent": "string",
  //           "transBrief": "string",
  //           "transNo": "string"
  //         }
  //       ]
  //     }
  //   ]
  // }

  handleNext4 = () => {
    let finalNoaData = [];
    for (const item of this.state.finalTemplate) {
      if (item.templateData) {
        let noaDetails = [];
        let recipient = {
          buyerEmail: item.templateData.buyerData.buyerId,
        };
        let invInfo = [];
        for (const item2 of item.templateData.buyerData.selectedInvoices) {
          invInfo = [
            ...invInfo,
            {
              docHash: item2.docHash,
            },
          ];
        }
        for (const item1 of item.templateData.investorData) {
          noaDetails = [
            ...noaDetails,
            {
              invtId: item1.invtId,
              invtCpy: item1.invtCpy,
              invtPercent: item1.invtPercent,
              transBrief: item1.transBrief,
              transNo: item1.transNo,
            },
          ];
        }
        finalNoaData = [...finalNoaData, { recipient, invInfo, noaDetails }];
      }
    }
    const { mobileNo, email } = this.state.user;
    this.setState({ loader: true });
    financierServ
      .createNOA({ noa: finalNoaData })
      .then((response) => {
        console.log('Response : ', response);
        this.setState({ loader: false });
        messagePopup('', 'Please input OTP to verify registered mobile number.', 'success');
        this.props.history.push({
          pathname: '/verificationCode/financial',
          search: `?mobileNo=${mobileNo}&email=${email}`,
        });
      })
      .catch((err) => {
        this.setState({ loader: false });
        console.log('Error : ', err);
      });
  };

  handleBack = (data) => {
    this.setState({ activeStep: 1 });
  };

  getSteps = () => {
    return [
      'Select NOA',
      'Details',
      this.state.isLastElement ? 'Confirmation' : 'Next Document',
    ];
  };

  render() {
    const steps = this.getSteps();
    return (
      <div className='createsaleSection'>
        <BackdropLoader open={this.state.loader} />
        <h3>Create Investor Schedule</h3>
        <div>
          <Stepper activeStep={this.state.activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </div>
        {this.state.activeStep === 0 ? (
          <SelectNOA
            handleNext={this.handleNext1}
            buyerData={this.state.buyerData}
          />
        ) : this.state.activeStep === 1 ? (
          <SelectInvestorTemplate handleNext={this.handleNext2} onCancel={() => this.handleCancel(0)}/>
        ) : !this.state.isLastElement ? (
          <SelectInvestorTemplate
            data={this.state.data}
            isLastElement={this.state.isLastElement}
            handleNext={this.handleNext3}
            onCancel={() => this.handleCancel(1)}
          />
        ) : (
          <div>
            <div className='saleTempImgBo;x'>
              <h3>Review & Confirm</h3>
              <div className='row'>
                {this.state.finalTemplate.map((item, index) => (
                  <div className='col-xl-6' key={index}>
                    <div
                      style={{
                        border: '1px #5451511f solid',
                        margin: '5px',
                        padding: '15px',
                      }}
                    >
                      {item.template}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className='saleAction'>
              <Button className='cancelBtn' onClick={this.handleAmend }>AMEND</Button>
              <Button onClick={this.handleNext4} className='manualBtn'>
                CONFIRM & CREATE
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default CreateInvestorSchedule;

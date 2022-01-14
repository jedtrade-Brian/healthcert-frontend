import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import '../../CreateDocument/CreateDocument.css';
import NOATemplate from '../../Invoices/InvoicesTab/NOATemplate';
import authService from '../../../services/authService';
import { withRouter } from 'react-router'

class SelectNOA extends Component {
  constructor() {
    super();
    this.state = {
      isDisabled: '',
      selectedBuyer: {},
      user: authService.getUserInfo(),
    };
    this.enableButtons = this.enableButtons.bind(this);
  }

  enableButtons(key, data) {
    if (this.state.isDisabled === key) {
      this.setState({ isDisabled: '', selectedBuyer: {} });
    } else {
      this.setState({ isDisabled: key, selectedBuyer: data });
    }
  }

  render() {
    // console.log('this.props.buyerData XXXXXX', this.props.buyerData);

    return (
      <div>
        <div className='saleTempImgBox'>
          <h3>Select NOA</h3>
          <div className='row'>
            {Object.keys(this.props.buyerData).map((key) => (
              <div className='col-xl-6' key={key}>
                <div
                  className={
                    this.state.isDisabled === `${key}`
                      ? 'saleTemplateImgBorder'
                      : 'saleTemplateImg'
                  }
                  style={{ padding: '12px' }}
                  onClick={() =>
                    this.enableButtons(`${key}`, this.props.buyerData[key])
                  }
                >
                  {/* <NOATemplate /> */}
                  {/* {console.log('this.props.buyerData[key].document.recipient : ',this.props.buyerData[key])} */}
                  <NOATemplate
                    issuer={{
                      signDate: new Date(),
                      email: this.props.buyerData[key].document ? this.props.buyerData[key].document.issuers ? this.props.buyerData[key].document.issuers.length ? this.props.buyerData[key].document.issuers[0].email : '' : '' : '',
                      name: this.props.buyerData[key].document ? this.props.buyerData[key].document.issuers ? this.props.buyerData[key].document.issuers.length ? this.props.buyerData[key].document.issuers[0].name : '' : '' : '',
                      individualName: this.props.buyerData[key].document ? this.props.buyerData[key].document.issuers ? this.props.buyerData[key].document.issuers.length ? this.props.buyerData[key].document.issuers[0].individualName : '' : '' : '',
                      designation: this.props.buyerData[key].document ? this.props.buyerData[key].document.issuers ? this.props.buyerData[key].document.issuers.length ? this.props.buyerData[key].document.issuers[0].designation : '' : '' : '',
                    }}
                    user={this.state.user}
                    document={{recipientDetails : {...this.props.buyerData[key].document.recipient, name: this.props.buyerData[key].buyerIndividualName}}}
                    financierCompanyDetails={{financierDetails : this.props.buyerData[key].financierDetails}}
                    selectedData={{selectedInvoices : this.props.buyerData[key].selectedInvoices}}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='saleAction'>
          <Button
            disabled={!this.state.isDisabled}
            className={!this.state.isDisabled ? 'disabledcancel' : 'cancelBtn'}
            onClick={() => this.props.history.goBack()}
          >
            BACK
          </Button>
          <Button
            disabled={!this.state.isDisabled}
            onClick={() => this.props.handleNext(this.state.selectedBuyer)}
            className={!this.state.isDisabled ? 'disabledmanual' : 'manualBtn'}
          >
            PROCEED
          </Button>
        </div>
      </div>
    );
  }
}
export default withRouter(SelectNOA);

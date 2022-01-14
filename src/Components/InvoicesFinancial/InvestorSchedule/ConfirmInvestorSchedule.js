import React, { Component } from 'react';
import '../../CreateDocument/CreateDocument.css';
import NOATemplate from '../../Invoices/InvoicesTab/NOATemplate';
import InvestorTemplate from './InvestorTemplate';
import authService from '../../../services/authService';

class ConfirmInvestorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: authService.getUserInfo(),
    };
    // console.log('this.props.buyerData', this.props.buyerData);
    // console.log('this.props.data',this.props.data);
  }

  render() {
    return (
      <div>
        <NOATemplate
          investorDetails={this.props.data}
          issuer={{
            signDate: new Date(),
            email: this.props.buyerData.document ? this.props.buyerData.document.issuers ? this.props.buyerData.document.issuers.length ? this.props.buyerData.document.issuers[0].email : '' : '' : '',
            name: this.props.buyerData.document ? this.props.buyerData.document.issuers ? this.props.buyerData.document.issuers.length ? this.props.buyerData.document.issuers[0].name : '' : '' : '',
            individualName: this.props.buyerData.document ? this.props.buyerData.document.issuers ? this.props.buyerData.document.issuers.length ? this.props.buyerData.document.issuers[0].individualName : '' : '' : '',
            designation: this.props.buyerData.document ? this.props.buyerData.document.issuers ? this.props.buyerData.document.issuers.length ? this.props.buyerData.document.issuers[0].designation : '' : '' : '',
          }}
          user={this.state.user}
          document= {{recipientDetails : { ...this.props.buyerData.document.recipient, name: this.props.buyerData.buyerIndividualName}}} // {this.props.buyerData ? this.props.buyerData.document : null} // {Object.values(this.props.buyerData)[0]}
          financierCompanyDetails= {{financierDetails : this.props.buyerData ? this.props.buyerData.financierDetails : null}} // {this.props.buyerData ? this.props.buyerData.financierDetails : null} // {Object.values(this.props.buyerData)[0]}
          selectedData= {{selectedInvoices : this.props.buyerData ? this.props.buyerData.selectedInvoices : null}} // {this.props.buyerData ? { selectedInvoices : this.props.buyerData.selectedInvoices } : null} // {Object.values(this.props.buyerData)[0]}
        />
        {/* <InvestorTemplate data={this.props.data} purchaseDate={new Date()}/> */}
      </div>
    );
  }
}
export default ConfirmInvestorSchedule;

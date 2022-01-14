import React, { Component } from 'react';
import { formatAmount } from '../../Shared/amountFormat';
import { formatDate } from '../../Shared/dateTimeFormat';
import './salesOverview.css';

class SaleModalTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      document: this.props.document
        ? this.props.document
        : {
            doc: null,
            issuerDetails: null,
            recipientDetails: null,
          },
    };
  }

  numberWithCommas(x) {
    if (x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    } else {
      return '';
    }
  }

  // componentDidMount(){
  //   console.log('this.props.document : ',this.props.document);
  // }

  render() {
    return (
      <div className='saleTemplatebody'>
        {/* <h3>Quotation</h3> */}
        <div className='companySection'>
          <h4>
            <b>
              {this.state.document.issuerDetails
                ? this.state.document.issuerDetails.companyName
                : ''}
            </b>
          </h4>
          <ul>
            <li>
              <span>
                {this.state.document.issuerDetails
                  ? this.state.document.issuerDetails.address1
                  : ''}
              </span>
            </li>
            {this.state.document.issuerDetails && this.state.document.issuerDetails.address2 && (
              <li>
                <span>
                  { this.state.document.issuerDetails.address2 }
                </span>
              </li>
            )}
            {this.state.document.issuerDetails && (this.state.document.issuerDetails.country || this.state.document.issuerDetails.zipcode) && (
              <li>
                <span>
                  {(this.state.document.issuerDetails.country ? this.state.document.issuerDetails.country : '') + (this.state.document.issuerDetails.zipcode ? ' ' + this.state.document.issuerDetails.zipcode : '')}
                </span>
              </li>
            )}
            
            <li>
              <span>
                {this.state.document.issuerDetails
                  ? this.state.document.issuerDetails.mobileNo
                  : ''}
              </span>
            </li>
          </ul>
        </div>
        <div className='flexbox'>
          <div className='billpart'>
            <span>Bill To:</span>
            <ul>
              <li>
                <span>
                  {this.state.document.recipientDetails
                    ? this.state.document.recipientDetails.name
                    : ''}
                </span>
              </li>
            </ul>
            <h4>
              <b>
                {this.state.document.recipientDetails
                  ? this.state.document.recipientDetails.companyName
                  : ''}
              </b>
            </h4>

            <ul>
              <li>
                <span>
                  {this.state.document.recipientDetails
                    ? this.state.document.recipientDetails.fullAddress.address
                    : ''}
                </span>
              </li>
              <li>
                <span>
                  {this.state.document.recipientDetails
                    ? this.state.document.recipientDetails.fullAddress.city
                    : ''}
                </span>
              </li>
              <li>
                <span>
                  {this.state.document.recipientDetails
                    ? (this.state.document.recipientDetails.fullAddress.state ? this.state.document.recipientDetails.fullAddress.state : '') +
                      (this.state.document.recipientDetails.fullAddress.zipcode ? ' ' + this.state.document.recipientDetails.fullAddress.zipcode : '')                      
                    : ''}
                </span>
              </li>
              <li>
                <span>Phone : </span>
                <span>
                  {this.state.document.recipientDetails
                    ? this.state.document.recipientDetails.phoneNumber
                    : ''}
                </span>
              </li>
              <li>
                <span>Email : </span>
                <span>
                  {this.state.document.recipientDetails
                    ? this.state.document.recipientDetails.emailAddress
                    : ''}
                </span>
              </li>
              {/* <li>
                <span>{this.state.document.recipientDetails ? this.state.document.recipientDetails.phoneNumber : ''}</span>
              </li> */}
            </ul>
          </div>
          <div className='datepart'>
            <ul className='itemfirst'>
              <li>
                <span>DATE: </span>
                <span>
                  <b>
                    {this.state.document.doc &&
                    this.state.document.doc.docInfo.docDetails
                      ? formatDate(
                          this.state.document.doc.docInfo.docDetails.quoteDate
                        )
                      : ''}
                  </b>
                </span>
              </li>
              <li>
                <span>QUOTATION #: </span>
                <span>
                  <b>
                    {this.state.document.doc &&
                    this.state.document.doc.docInfo.docDetails
                      ? this.state.document.doc.docInfo.docDetails.quoteNumber
                      : ''}
                  </b>
                </span>
              </li>
              <li>
                <span>CUSTOMER ID: </span>
                <span>
                  <b>
                    {this.state.document.recipientDetails
                      ? this.state.document.recipientDetails.customerId
                      : ''}
                  </b>
                </span>
              </li>
            </ul>
            <ul>
              <li>
                <span>QUOTATION VALID UNTIL: </span>
                <span>
                  <b>
                    {this.state.document.doc &&
                    this.state.document.doc.docInfo.docDetails
                      ? formatDate(
                          this.state.document.doc.docInfo.docDetails
                            .validityPeriod
                        )
                      : ''}
                  </b>
                </span>
              </li>
              <li>
                <span>PREPARED BY: </span>
                <span>
                  <b>
                    {this.state.document.issuerDetails
                      ? this.state.document.issuerDetails.name
                      : ''}
                  </b>
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className='commentpart'>
          <span>Comments or special instructions :</span>
          <span>
            {this.state.document.doc &&
            this.state.document.doc.docInfo.docDetails
              ? this.state.document.doc.docInfo.docDetails.comments
              : ''}
          </span>
        </div>

        <div>
          <table className='SalesQuotationassignmentTable'>
            <thead>
              <tr>
                <th>S. No.</th>
                <th>DESCRIPTION</th>
                <th style={{textAlign: 'right'}}>Amount(S$)</th>
              </tr>
            </thead>
            <tbody>
              {this.state.document.doc &&
                this.state.document.doc.docInfo.docDetails &&
                this.state.document.doc.docInfo.docDetails.orderInfo &&
                this.state.document.doc.docInfo.docDetails.orderInfo.map(
                  (item, i) => (
                    <tr key={i}>
                      <td>
                        <span className='label'>S. No.</span>
                        <span>{i + 1}</span>
                      </td>
                      <td>
                        <span className='label'>DESCRIPTION</span>
                        <span>{item.itemDesc}</span>
                      </td>
                      <td>
                        <span className='label'>Amount(S$)</span>
                        <span className='amount'>
                          {this.numberWithCommas(formatAmount(item.itemAmt))}
                        </span>
                      </td>
                    </tr>
                  )
                )}
              <tr className='totalPart'>
                <td>
                  <span>
                    <b>Total</b>
                  </span>
                </td>
                <td>
                  <span className='amount'>
                    {this.state.document.doc &&
                    this.state.document.doc.docInfo.docDetails
                      ? this.numberWithCommas(
                          formatAmount(
                            this.state.document.doc.docInfo.docDetails.finalAmt
                          )
                        )
                      : ''}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className='questionstatement'>
          <p>
            If you have any questions concerning this quotation, contact
            <span>
              {' '}
              {this.state.document.issuerDetails
                ? this.state.document.issuerDetails.title +
                  ' ' +
                  this.state.document.issuerDetails.name
                : ''}{' '}
            </span>
            via phone number{' '}
            <span>
              {this.state.document.issuerDetails
                ? this.state.document.issuerDetails.mobileNo + ' '
                : ''}
            </span>{' '}
            or email at{' '}
            <span>
              {this.state.document.issuerDetails
                ? ' ' + this.state.document.issuerDetails.email
                : ''}
            </span>
          </p>
        </div>
        <div className='termscondition'>
          <span>Terms & Conditions:</span>
          <ul>
            <li>
              <span> 1.</span>
              <span>
                The prices quoted above are subject to prevailing GST/Government
                Tax/Withholding Tax.
              </span>
            </li>
            <li>
              <span>2.</span>
              <span>
                No cancellation and refund on confirmed order and/or PO
                recieved.
              </span>
            </li>
            <li>
              <span> 3.</span>
              <span>
                Professional services is based on standard installation &
                configuration (unless otherwise stated), hosting fee will be
                quoted separately if required.
              </span>
            </li>
            <li>
              <span>4.</span>
              <span>
                Professional services quoted above does include travel and
                accomodation charges for implementation outside Singapore.
              </span>
            </li>
            <li>
              <span>5.</span>
              <span>
                Professional services job will be executed during office hours
                (Mon-Fri 9am-5pm) excluding weekends & public holidays.
              </span>
            </li>
            <li>
              <span> 6.</span>
              <span>
                Additional charges apply for professional services executed on
                Mon-Fri(5pm onwards), weekend & public holidays.
              </span>
            </li>
            <li>
              <span> 7.</span>
              <span>
                {this.state.document.issuerDetails
                  ? this.state.document.issuerDetails.companyName + ' '
                  : ''}{' '}
                reserve the right ay any time after reciept of your order to
                accept to decline your order for any reason.
              </span>
            </li>
            <li>
              <span>8.</span>
              <span>
                Financing charges of 2% per month will commence upon invoice due
                for late payment.
              </span>
            </li>
          </ul>
        </div>
        <div>
          <p className='bottomStatement'>
            This document is electronically generated. The document hash has
            been recorded on Blockchain. To verify the authentically of this
            document, please verify at {' '}
            <a href='https://renderer.consentrade.io' target='_blank'>
              https://renderer.consentrade.io
            </a>
          </p>
        </div>
        <div>
          <ul className='signedSection'>
            <li>
              <span>
                <b>Digitally Confirmed and Signed By:</b>
              </span>
            </li>
            <li>
              <span>
                <b>Name:</b>
              </span>
              <span style={{paddingLeft: '5px'}}>
                {this.state.document.issuerDetails
                  ? this.state.document.issuerDetails.name
                  : ''}
              </span>
            </li>
            <li>
              <span>
                <b>Email: </b>
              </span>
              <span style={{paddingLeft: '5px'}}>
                {this.state.document.issuerDetails
                  ? this.state.document.issuerDetails.email
                  : ''}
              </span>
            </li>
            <li>
              <span>
                <b>Date:</b>
              </span>
              <span style={{paddingLeft: '5px'}}>
                {this.state.document.doc
                  ? formatDate(this.state.document.doc.createdAt)
                  : ''}
              </span>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default SaleModalTemplate;

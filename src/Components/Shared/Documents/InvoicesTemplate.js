import React, { Component } from 'react';
import { formatAmount } from '../amountFormat';
import { formatDate } from '../dateTimeFormat';
import './Documents.css';

class InvoicesTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTerms: this.props.showTerms ? this.props.showTerms : null,
      showDigitalSign: this.props.showDigitalSign
        ? this.props.showDigitalSign
        : null,
      via: this.props.via ? this.props.via : null,
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

  calculateGst = (amount, gst) => {
    var gstAmt = (+gst / 100) * +amount;
    return gstAmt.toFixed(2);
  };

  totalAmount = (gstAmt, amount) => {
    console.log('gstAmt : ', gstAmt, amount);
    var totalAmount = +amount + +gstAmt;
    return totalAmount;
  };

  render() {
    return (
      <div className='invoiceQuotationTemplate'>
        <div className='invoiceQuotationLogo'>
          <span className='logo'>Logo</span>
          <h3>
            {this.state.document.issuerDetails
              ? this.state.document.issuerDetails.companyName
              : ''}
          </h3>
          <div className='addresspart'>
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
                    {this.state.document.issuerDetails.address2}
                  </span>
                </li>
              )}
              {this.state.document.issuerDetails && (
                <li>
                  <span>
                    {(this.state.document.issuerDetails.country ? this.state.document.issuerDetails.country : '') + (this.state.document.issuerDetails.zipcode ? ' ' + this.state.document.issuerDetails.zipcode : '')}
                  </span>
                </li>
              )}
              
            </ul>
          </div>
        </div>
        <h3 className='centerhead'>TAX INVOICE</h3>
        <div className='billpart'>
          <div className='addressPart'>
            <span>CUSTOMER</span>
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
                    ? this.state.document.recipientDetails.fullAddress.city +
                      ', ' +
                      this.state.document.recipientDetails.fullAddress.state +
                      ' ' + (this.state.document.recipientDetails.fullAddress.zipcode ? this.state.document.recipientDetails.fullAddress.zipcode : '')                      
                    : ''}
                </span>
                {/* <span>
                  {this.state.props.formData.city}, {this.state.props.formData.state}{" "}
                  {this.state.props.formData.zipCode}
                </span> */}
              </li>
              <li>
                <span>
                  {this.state.document.recipientDetails
                    ? this.state.document.recipientDetails.phoneNumber
                    : ''}
                </span>
              </li>
              <li>
                <span>
                  {this.state.document.recipientDetails
                    ? this.state.document.recipientDetails.emailAddress
                    : ''}
                </span>
              </li>
            </ul>
          </div>
          <div className='deliveryInfo'>
            <ul>
              <li>
                <span>TAX INVOICE NO: </span>
                <span>
                  <b>
                    {this.state.document.doc && this.state.document.doc.docInfo
                      ? this.state.document.doc.docInfo.docDetails.invNo
                      : ''}
                  </b>
                </span>
              </li>
              <li>
                <span>DATE: </span>
                <span>
                  <b>
                    {this.state.document.doc && this.state.document.doc.docInfo
                      ? formatDate(
                          this.state.document.doc.docInfo.docDetails.date
                        )
                      : ''}
                  </b>
                </span>
              </li>
              <li>
                <span>TERMS: </span>
                <span>
                  <b>
                    {this.state.document.doc && this.state.document.doc.docInfo
                      ? this.state.document.doc.docInfo.docDetails.terms + ' days'
                      : ''}
                  </b>
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <table className='saleModalTable'>
            <thead>
              <tr>
                <th>S No.</th>
                <th>Description</th>
                <th>Quantity</th>
                <th style={{textAlign: 'right'}}>Unit Price (S$)</th>
                <th style={{textAlign: 'right'}}>AMOUNT (S$)</th>
              </tr>
            </thead>
            <tbody>
              {this.state.document.doc &&
                this.state.document.doc.docInfo &&
                this.state.document.doc.docInfo.docDetails.invoiceInfo.map(
                  (item, i) => (
                    <tr key={i}>
                      <td>
                        <span className='label'>S No.</span>
                        <span>{item.serialNo}</span>
                      </td>
                      <td>
                        <span className='label'>Description</span>
                        <span>{item.invDesc}</span>
                      </td>
                      <td>
                        <span className='label'>Quantity</span>
                        <span>{item.invQty}</span>
                      </td>
                      <td>
                        <span className='label'>Unit Price (S$)</span>
                        <span className='amount'>
                          {this.numberWithCommas(formatAmount(item.unitPrice))}
                        </span>
                      </td>
                      <td>
                        <span className='label'>AMOUNT (S$)</span>
                        <span className='amount'>
                          {this.numberWithCommas(formatAmount(item.productAmt))}
                        </span>
                      </td>
                    </tr>
                  )
                )}

              <div className='totalpart'>
                <tr>
                  <td>
                    <b>Total</b>
                  </td>
                  <td>
                    <span className='amount'>
                      {this.state.document.doc &&
                      this.state.document.doc.docInfo
                        ? this.numberWithCommas(
                            formatAmount(
                              this.state.document.doc.docInfo.docDetails
                                .totalAmt
                            )
                          )
                        : ''}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>
                      ADD{' '}
                      {this.state.document.doc &&
                      this.state.document.doc.docInfo
                        ? this.state.document.doc.docInfo.docDetails.gst
                        : ''}
                      % GST
                    </b>
                  </td>
                  <td>
                    <span className='amount'>
                      {this.state.document.doc &&
                      this.state.document.doc.docInfo
                        ? this.numberWithCommas(
                            formatAmount(
                              this.calculateGst(
                                this.state.document.doc.docInfo.docDetails
                                  .totalAmt,
                                this.state.document.doc.docInfo.docDetails.gst
                              )
                            )
                          )
                        : ''}
                    </span>
                  </td>
                </tr>
                <tr>
                  {/* <td>
                    ${" "}{(this.state.document.doc && this.state.document.doc.docInfo) ? this.numberWithCommas(this.totalAmount(this.calculateGst(this.state.document.doc.docInfo.docDetails.totalAmt, this.state.document.doc.docInfo.docDetails.gst),this.state.document.doc.docInfo.docDetails.totalAmt))
                     : ''}
                  </td> */}
                  <td>
                    <b>AMOUNT</b>
                  </td>
                  <td>
                    <span className='amount'>
                      {this.state.document.doc &&
                      this.state.document.doc.docInfo
                        ? this.numberWithCommas(
                            formatAmount(
                              this.state.document.doc.docInfo.docDetails
                                .finalAmt
                            )
                          )
                        : ''}
                    </span>
                  </td>
                </tr>
              </div>
            </tbody>
          </table>
        </div>

        {this.state.via === 'signDocument' && (
          <div>
            <div className='questionstatement'>
              <p>
                If you have any questions concerning this invoice, contact
                <span>
                  {this.state.document.issuerDetails
                    ? this.state.document.issuerDetails.title +
                      ' ' +
                      this.state.document.issuerDetails.name
                    : ''}
                </span>
                via phone number
                <span>
                  {this.state.document.issuerDetails
                    ? this.state.document.issuerDetails.mobileNo
                    : ''}
                </span>
                or email at
                <span>
                  {this.state.document.issuerDetails
                    ? this.state.document.issuerDetails.email
                    : ''}
                </span>
              </p>
            </div>
            <h5 className='thankstatement'>Thank you for your business!</h5>
          </div>
        )}

        {this.state.showDigitalSign && (
          <div className='chequestatement'>
            <span>Cheques should be crossed and made payable to </span>
            <span className='underline'>
              {this.state.document.issuerDetails
                ? this.state.document.issuerDetails.companyName + ' '
                : ''}
            </span>
          </div>
        )}

        {this.state.showTerms && (
          <div className='termscondition'>
            <span>Terms & Conditions:</span>
            <ul>
              <li>
                <span> 1.</span>
                <span>
                  The prices quoted above are subject to prevailing
                  GST/Government Tax/Withholding Tax.
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
                <span>3.</span>
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
                    : ''}
                  reserve the right ay any time after reciept of your order to
                  accept to decline your order for any reason.
                </span>
              </li>
              <li>
                <span>8.</span>
                <span>
                  Financing charges of 2% per month will commence upon invoice
                  due for late payment.
                </span>
              </li>
            </ul>
          </div>
        )}

        {this.state.showDigitalSign && (
          <div className='signedSection'>
            <ul>
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
        )}

        {this.state.showDigitalSign && (
          <div>
            <p className='bottomstatment'>
              <span>
                This document is electronically generated. The document hash has
                been recorded on Blockchain. To verify the authentically of this
                document, please verify at {' '}
                <a href='https://renderer.consentrade.io' target='_blank'>
                  https://renderer.consentrade.io
                </a>
              </span>
            </p>
          </div>
        )}
      </div>
    );
  }
}

export default InvoicesTemplate;

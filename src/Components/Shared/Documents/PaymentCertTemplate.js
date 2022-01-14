import React, { Component } from 'react';
import { formatDate } from '../dateTimeFormat';
import './Documents.css';
import { formatAmount } from './../../Shared/amountFormat';

class PaymentCertTemplate extends Component {
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

  render() {
    return (
      <div className='paymentCertificateQuotationShared'>
        <div className='paymentCertificateQuotationLogo'>
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
                    { this.state.document.issuerDetails.address2 }
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
        <h3 className='centerhead'>Payment Certificate</h3>
        <div className='billpart'>
          <div className='addressPart'>
            <span>To:</span>
            <h4>
              <b>
                {this.state.document.recipientDetails
                  ? this.state.document.recipientDetails.name
                  : ''}
              </b>
            </h4>
            <ul>
              <li>
                <span>
                  {this.state.document.recipientDetails
                    ? this.state.document.recipientDetails.companyName
                    : ''}
                </span>
              </li>
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
                <span>CERTIFICATE NO.: </span>
                <span>
                  <b>
                    {this.state.document.doc && this.state.document.doc.docInfo
                      ? this.state.document.doc.docInfo.docDetails.certNo
                      : ''}
                  </b>
                </span>
              </li>
              <li>
                <span>DATE OF ISSUANCE: </span>
                <span>
                  <b>
                    {this.state.document.doc && this.state.document.doc.docInfo
                      ? formatDate(
                          this.state.document.doc.docInfo.docDetails.issueDate
                        )
                      : ''}
                  </b>
                </span>
              </li>
              <li>
                <span>INVOICE / CLAIM NO.: </span>
                <span>
                  <b>
                    {this.state.document.doc && this.state.document.doc.docInfo
                      ? this.state.document.doc.docInfo.docDetails &&
                        this.state.document.doc.docInfo.docDetails.claimNo
                        ? this.state.document.doc.docInfo.docDetails.claimNo
                        : ''
                      : ''}
                  </b>
                </span>
              </li>
              <li>
                <span>INVOICE / CLAIM DATE: </span>
                <span>
                  <b>
                    {this.state.document.doc && this.state.document.doc.docInfo
                      ? formatDate(
                          this.state.document.doc.docInfo.docDetails.claimDate
                        )
                      : ''}
                  </b>
                </span>
              </li>
              <li>
                <span>PAYMENT TERM: </span>
                <span>
                  <b>
                    {this.state.document.doc && this.state.document.doc.docInfo
                      ? this.state.document.doc.docInfo.docDetails.paymentTerm +' days'
                      : ''}
                  </b>
                </span>
              </li>
            </ul>
          </div>
        </div>
        <span className='claimSummary'>Summary Of Claim</span>
        <div>
          <table className='saleModalTable'>
            <thead>
              <tr>
                <th>s/n</th>
                <th>Description</th>
                <th style={{textAlign: 'right'}}>Contract Amount(S$)</th>
                <th style={{textAlign: 'right'}}>Previous Claim(S$)</th>
                <th style={{textAlign: 'right'}}>Current Claim(S$) (Approved)</th>
                <th style={{textAlign: 'right'}}>Accumulative Claim(S$)</th>
                <th style={{textAlign: 'right'}}>Balance Contract Amount(S$)</th>
              </tr>
            </thead>
            <tbody>
              {this.state.document.doc &&
                this.state.document.doc.docInfo &&
                this.state.document.doc.docInfo.docDetails &&
                this.state.document.doc.docInfo.docDetails.claimSummary.map(
                  (item, i) => (
                    <tr key={i}>
                      <td>
                        <span className='label'>S No.</span>
                        <span>{item.serialNo}</span>
                      </td>
                      <td>
                        <span className='label'>Description</span>
                        <span>{item.claimDesc}</span>
                      </td>
                      <td>
                        <span className='label'>Contract Amount(S$)</span>
                        <span className='amount'>
                          {this.numberWithCommas(formatAmount(item.contAmt))}
                        </span>
                      </td>
                      <td>
                        <span className='label'>Previous Claim(S$)</span>
                        <span className='amount'>
                          {this.numberWithCommas(formatAmount(item.prevClaim))}
                        </span>
                      </td>
                      <td>
                        <span className='label'>
                          Current Claim(S$) (Approved)
                        </span>
                        <span className='amount'>
                          {this.numberWithCommas(formatAmount(item.currClaim))}
                        </span>
                      </td>
                      <td>
                        <span className='label'>Accumulative Claim(S$)</span>
                        <span className='amount'>
                          {this.numberWithCommas(formatAmount(item.accumClaim))}
                        </span>
                      </td>
                      <td>
                        <span className='label'>
                          Balance Contract Amount(S$)
                        </span>
                        <span className='amount'>
                          {this.numberWithCommas(formatAmount(item.balanceAmt))}
                        </span>
                      </td>
                    </tr>
                  )
                )}
              <tr className='totalpart'>
                <td>Total Amount Due (excluding GST)</td>
                <td>
                  <span className='amount'>
                    {this.state.document.doc && this.state.document.doc.docInfo
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
                  Financing charges of 2% per month will commence upon invoice
                  due for late payment.
                </span>
              </li>
            </ul>
          </div>
        )}

        {this.state.via === 'signDocument' && (
          <div>
            <div className='questionstatement'>
              <p>
                If you have any questions concerning this invoice, contact
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
                    ? this.state.document.issuerDetails.mobileNo
                    : ''}
                </span>{' '}
                or email at{' '}
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
          <div>
            <div>
              <div className='signedSection'>
                <div className='notepart'>
                  <span>Note: Please Issue an Invoice / Tax Invoice in </span>
                  <span>accordance to the approved amount in this </span>
                  <span>payment certificate.</span>
                </div>
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
            </div>
            <div>
              <p className='bottomstatment'>
                <span>
                  This document is electronically generated. The document hash
                  has been recorded on Blockchain. To verify the authentically
                  of this document, please verify at{' '}
                  <a href='https://renderer.consentrade.io' target='_blank'> 
                    https://renderer.consentrade.io
                  </a>
                </span>
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default PaymentCertTemplate;

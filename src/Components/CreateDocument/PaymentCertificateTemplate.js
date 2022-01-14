import React, { Component } from 'react';
import { formatAmount } from '../Shared/amountFormat';
import { formatDate } from '../Shared/dateTimeFormat';
import './paymentCertificateTemplate.css';

class PaymentCertificateTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
    };
  }

  numberWithCommas(x) {
    if (x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    } else {
      return '';
    }
  }

  // getTotalAmount = () => {
  //   if(this.props.formData){
  //     let totalAmt = 0
  //     for (const item of this.props.formData.orderInfo) {
  //       totalAmt += +item.currClaim
  //     }
  //     return totalAmt;
  //   }
  // }

  render() {
    return (
      <div className='paymentCertificateQuotationTemplate'>
        <div className='paymentCertificateQuotationLogo'>
          <span className='logo'>Logo</span>
          <h3>
            {this.state.user.companyName ? this.state.user.companyName : ''}
          </h3>
          <div className='addresspart'>
            <ul>
              <li>
                <span>
                  {this.state.user && this.state.user.address1
                    ? this.state.user.address1
                    : ''}
                </span>
              </li>
              {this.state.user && this.state.user.address2 && (
                <li>
                  <span>
                    {' '}
                    {this.state.user.address2}
                  </span>
                </li>
              )}
              <li>
                <span>
                  {this.state.user
                    ? (this.state.user.country ? this.state.user.country : '') + ' ' + (this.state.user.zipcode ? this.state.user.zipcode : '')
                    : ''}
                </span>
              </li>
            </ul>
          </div>
        </div>
        <h3 className='centerhead'>Payment Certificate</h3>
        <div className='billpart'>
          <div className='addressPart'>
            <span>To:</span>
            <h4>
              <b>{this.props.formData ? this.props.formData.fullName : ''}</b>
            </h4>
            <ul>
              <li>
                <span>
                  {this.props.formData ? this.props.formData.companyName : ''}
                </span>
              </li>
              <li>
                <span>
                  {this.props.formData ? this.props.formData.streetAddress : ''}
                </span>
              </li>
              <li>
                <span>
                  {this.props.formData ? this.props.formData.city : ''}
                </span>
              </li>
              <li>
                <span>
                  {this.props.formData
                    ? this.props.formData.state +
                      ' ' +
                      this.props.formData.zipCode
                    : ''}
                </span>
              </li>
              <li>
                <span>
                  {this.props.formData ? this.props.formData.phoneNumber : ''}
                </span>
              </li>
              <li>
                <span>
                  {this.props.formData ? this.props.formData.emailAddress : ''}
                </span>
              </li>
            </ul>
          </div>
          <div className='deliveryInfo'>
            <ul>
              <li>
                <span>CERTIFICATE NO.: </span>
                <span>
                  <b>{this.props.formData ? this.props.formData.certNo : ''}</b>
                </span>
              </li>
              <li>
                <span>DATE OF ISSUANCE: </span>
                <span>
                  <b>
                    {this.props.formData
                      ? formatDate(this.props.formData.issueDate)
                      : ''}
                  </b>
                </span>
              </li>
              <li>
                <span>INVOICE / CLAIM NO.: </span>
                <span>
                  <b>
                    {this.props.formData ? this.props.formData.claimNo : ''}
                  </b>
                </span>
              </li>
              <li>
                <span>INVOICE / CLAIM DATE: </span>
                <span>
                  <b>
                    {this.props.formData
                      ? formatDate(this.props.formData.claimDate)
                      : ''}
                  </b>
                </span>
              </li>
              <li>
                <span>PAYMENT TERM: </span>
                <span>
                  <b>
                    {this.props.formData ? this.props.formData.paymentTerm + ' days' : ''}
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
                <th>S No.</th>
                <th>Description</th>
                <th style={{textAlign: 'right'}}>Contract Amount(S$)</th>
                <th style={{textAlign: 'right'}}>Previous Claim(S$)</th>
                <th style={{textAlign: 'right'}}>Current Claim(S$) (Approved)</th>
                <th style={{textAlign: 'right'}}>Accumulative Claim(S$)</th>
                <th style={{textAlign: 'right'}}>Balance Contract Amount(S$)</th>
              </tr>
            </thead>
            <tbody>
              {this.props.formData &&
                this.props.formData.orderInfo.map((item, i) => (
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
                      <span className='label'>Balance Contract Amount(S$)</span>
                      <span className='amount'>
                        {this.numberWithCommas(formatAmount(item.balanceAmt))}
                      </span>
                    </td>
                  </tr>
                ))}
              <tr className='totalpart'>
                <td>Total Amount Due (excluding GST)</td>
                <td>
                  <span className='amount'>
                    {this.props.formData
                      ? this.numberWithCommas(
                          formatAmount(this.props.formData.finalAmt)
                        )
                      : ''}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
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
                <span style={{paddingLeft: '5px'}}>{this.state.user ? this.state.user.name : ''}</span>
              </li>
              <li>
                <span>
                  <b>Email: </b>
                </span>
                <span style={{paddingLeft: '5px'}}>
                  {this.state.user ? this.state.user.email : ''}
                </span>
              </li>
              <li>
                <span>
                  <b>Date:</b>
                </span>
                <span style={{paddingLeft: '5px'}}>{formatDate(new Date())}</span>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <p className='bottomstatment'>
            <span>
              This document is electronically generated. The document hash has
              been recorded on Blockchain. To verify the authentically of this
              document, please verify at{' '}
              <a href='https://renderer.consentrade.io' target='_blank'>
                https://renderer.consentrade.io
              </a>
            </span>
          </p>
        </div>
      </div>
    );
  }
}

export default PaymentCertificateTemplate;

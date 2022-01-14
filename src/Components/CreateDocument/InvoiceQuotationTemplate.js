import React, { Component } from 'react';
import { formatAmount } from '../Shared/amountFormat';
import { formatDate } from '../Shared/dateTimeFormat';
import './invoiceQuotationTemplate.css';

class InvoiceQuotationTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
    };
  }

  // formatDate = date => {
  //   date = new Date(date);
  //   let dd = date.getDate();
  //   let mm = date.getMonth();

  //   let yyyy = date.getFullYear();
  //   if (dd < 10) {
  //     dd = "0" + dd;
  //   }
  //   if (mm < 10) {
  //     mm = "0" + mm;
  //   }

  //   date = `${dd}/${mm}/${yyyy}`;
  //   return date;
  // };

  numberWithCommas(x) {
    if (x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    } else {
      return '';
    }
  }

  calculateGst = (amount, gst) => {
    var gstAmt = (+gst / 100) * amount;
    return gstAmt.toFixed(2);
  };

  totalAmount = (gstAmt, amount) => {
    var totalAmount = +gstAmt + +amount;
    return totalAmount;
  };

  render() {
    return (
      <div className='invoiceQuotationTemplate'>
        <div className='invoiceQuotationLogo'>
          <span className='logo'>Logo</span>
          <h3>
            {this.state.user.companyName ? this.state.user.companyName : ''}
          </h3>
          <div className='addresspart'>
            <ul>
              <li>
                <span>{this.state.user.address1}</span>
              </li>
              {this.state.user.address2 && (
                <li>
                  <span>{this.state.user.address2}</span>
                </li>
              )}
              
              {/* <li>
                <span>LaunchPad @ One-North</span>
              </li> */}
              <li>
                <span>
                  {this.state.user.country ? this.state.user.country : ''} {this.state.user.zipcode ? ' ' + this.state.user.zipcode : ''}
                </span> 
              </li>
            </ul>
          </div>
        </div>
        <h3 className='centerhead'>TAX INVOICE</h3>
        <div className='billpart'>
          <div className='addressPart'>
            <span>CUSTOMER</span>
            <h4>
              <b>{this.props.formData.companyName}</b>
            </h4>
            <ul>
              <li>
                <span>{this.props.formData.streetAddress}</span>
              </li>
              <li>
                <span>
                  {this.props.formData.city}, {this.props.formData.state}{' '}
                  {this.props.formData.zipCode}
                </span>
              </li>
              <li>
                <span>{this.props.formData.phoneNumber}</span>
              </li>
              <li>
                <span>{this.props.formData.emailAddress}</span>
              </li>
            </ul>
          </div>
          <div className='deliveryInfo'>
            <ul>
              <li>
                <span>TAX INVOICE NO: </span>
                <span>
                  <b>{this.props.formData ? this.props.formData.invNo : ''}</b>
                </span>
              </li>
              <li>
                <span>DATE: </span>
                <span>
                  <b>{formatDate(this.props.formData.date)}</b>
                </span>
              </li>
              <li>
                <span>TERMS: </span>
                <span>
                  <b>{this.props.formData ? this.props.formData.terms + ' days' : ''}</b>
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
                <th style={{textAlign: 'right'}}>Unit Price(S$)</th>
                <th style={{textAlign: 'right'}}>AMOUNT(S$)</th>
              </tr>
            </thead>
            <tbody>
              {this.props.formData.orderInfo.map((item, i) => (
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
                    <span className='label'>Unit Price(S$)</span>
                    <span className='amount'>
                      {this.numberWithCommas(formatAmount(item.unitPrice))}
                    </span>
                  </td>
                  <td>
                    <span className='label'>AMOUNT(S$)</span>
                    <span className='amount'>
                      {this.numberWithCommas(formatAmount(item.productAmt))}
                    </span>
                  </td>
                </tr>
              ))}
              <div className='totalpart'>
                <tr>
                  <td>
                    <b>Total</b>
                  </td>
                  <td>
                    <span className='amount'>
                      {this.numberWithCommas(
                        formatAmount(this.props.formData.finalAmt)
                      )}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>ADD {this.props.formData.gst}% GST</b>
                  </td>
                  <td>
                    <span className='amount'>
                      {this.numberWithCommas(
                        formatAmount(
                          this.calculateGst(
                            this.props.formData.finalAmt,
                            this.props.formData.gst
                          )
                        )
                      )}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>AMOUNT</b>
                  </td>
                  <td>
                    <span className='amount'>
                      {this.numberWithCommas(
                        formatAmount(
                          this.totalAmount(
                            this.calculateGst(
                              this.props.formData.finalAmt,
                              this.props.formData.gst
                            ),
                            this.props.formData.finalAmt
                          )
                        )
                      )}
                    </span>
                  </td>
                </tr>
              </div>
            </tbody>
          </table>
        </div>
        <div className='chequestatement'>
          <span>Cheques should be crossed and made payable to </span>
          <span className='underline'>
            {this.state.user ? ' ' + this.state.user.companyName : ''}
          </span>
        </div>
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
              <span style={{paddingLeft: '5px'}}>{this.state.user ? this.state.user.name : ''}</span>
            </li>
            <li>
              <span>
                <b>Email: </b>
              </span>
              <span style={{paddingLeft: '5px'}}>{this.state.user ? this.state.user.email : ''}</span>
            </li>
            <li>
              <span>
                <b>Date:</b>
              </span>
              <span style={{paddingLeft: '5px'}}>{formatDate(new Date())}</span>
            </li>
          </ul>
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

export default InvoiceQuotationTemplate;

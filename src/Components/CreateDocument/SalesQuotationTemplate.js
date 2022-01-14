import React, { Component } from 'react';
import './salesQuotationTemplate.css';
import Grid from '@material-ui/core/Grid';
import { formatDate } from '../Shared/dateTimeFormat';
import { formatAmount, numberWithCommas } from '../Shared/amountFormat';

class SalesQuotationTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
    };
  }

  //  numberWithCommas(x) {
  //    if(x) {
  //     return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  //    } else {
  //     return '';
  //    }

  // }

  render() {
    return (
      <div>
        <div className='SalesQuotationDetailsSection'>
          <h2 className='quotationHead'>Quotation</h2>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <div className='SalesQuotationDetailHead'>
                <ul className='createSaleaddress'>
                  <li>
                    <h2>
                      {this.state.user.companyName
                        ? this.state.user.companyName
                        : ''}
                    </h2>
                  </li>
                  <li>
                    <span>{this.state.user.name}</span>
                  </li>
                  <li>
                    <span>
                      {this.state.user.address1 + (this.state.user.address2 ? ', ' + this.state.user.address2 : '')}
                    </span>
                  </li>
                  <li>
                    <span>
                      {this.state.user.country ? this.state.user.country : ''} {this.state.user.zipcode ? ' ' + this.state.user.zipcode : ''}
                    </span>
                  </li>
                  <li>
                    <span>{this.state.user.mobileNo}</span>
                  </li>
                </ul>
                <span className='billto'>Bill To: </span>
                <ul className='billingAdress'>
                  <li>
                    <span>{this.props.formData.fullName}</span>
                  </li>
                  <li>
                    <h3>{this.props.formData.companyName}</h3>
                  </li>
                  {/* <li>companyName
                    <span>Jed Trade Pte Ltd2</span>
                  </li> */}
                  <li>
                    <span>
                      {this.props.formData.streetAddress},
                      {this.props.formData.city}
                    </span>
                  </li>
                  <li>
                    <span>
                      {this.props.formData.state} {this.props.formData.zipCode}
                    </span>
                  </li>
                  <li>
                    <span>Phone : {this.props.formData.phoneNumber}</span>
                  </li>
                  <li>
                    <span>Email : {this.props.formData.emailAddress}</span>
                  </li>
                </ul>
                {/* <p className='commentpart'>
                  <span>Comments or special instructions :</span>
                  <span> {this.props.formData.comments}</span>
                </p> */}
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className='SalesQuotationDetailHead'>
                <ul>
                  <li>
                    <span> DATE:</span>
                    <span>{formatDate(this.props.formData.quoteDate)}</span>
                  </li>
                  <li>
                    <span>QUOTATION #:</span>
                    <span> {this.props.formData.quoteNumber}</span>
                  </li>
                  <li>
                    <span>CUSTOMER ID #:</span>
                    <span>{this.props.formData.customerId} </span>
                  </li>
                </ul>

                <ul>
                  <li className='quotationDate'>
                    <span>QUOTATION VALID UNTIL:</span>
                    <span>
                      {formatDate(this.props.formData.validityPeriod)}
                    </span>
                  </li>
                  <li>
                    <span>PREPARED BY:</span>
                    <span>{this.state.user.name.toUpperCase()}</span>
                  </li>
                </ul>
              </div>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
           <Grid item xs={12}>
              <div>
                <p className='commentpart'>
                  <span>Comments or special instructions :</span>
                  <span> {this.props.formData.comments}</span>
                </p>
              </div>
            </Grid>
          </Grid>

          <div className='SalesQuotationDetailBody'>
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
                  {this.props.formData.orderInfo.map((item, i) => (
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
                          {numberWithCommas(formatAmount(item.itemAmt))}
                        </span>
                      </td>
                    </tr>
                  ))}
                  <tr className='totalPart'>
                    <td>
                      <span className='label'>
                        <b>Total</b>
                      </span>
                    </td>
                    <td>
                      <span className='amount'>
                        {numberWithCommas(
                          formatAmount(this.props.formData.finalAmt)
                        )}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div>
              <p>
                If you have any question concerning the quotation, contact{' '}
                {this.state.user.name + ' '}
                via phone number {this.state.user.mobileNo} or email at{' '}
                {this.state.user.email}
              </p>
            </div>
            <div>
              <h3 className='thankstatement'>Thank you for your business! </h3>
              <p className='bottomStatement'>
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
                  <span style={{paddingLeft: '5px'}}>{this.state.user.name}</span>
                </li>
                <li>
                  <span>
                    <b>Designation: </b>
                  </span>
                  <span style={{paddingLeft: '5px'}}>{this.state.user.designation}</span>
                </li>
                <li>
                  <span>
                    <b>Date:</b>
                  </span>
                  <span style={{paddingLeft: '5px'}}>{formatDate(this.props.formData.quoteDate)}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className='signatorySecion'>
          <fieldset className='SalesQuotationDetailsSection'>
            <legend>Signatory</legend>

            <ul className='signatoryaddressDetails'>
              <li>
                <h4>
                  <b>Email</b>
                </h4>
                <span>{this.props.formData.emailAddress}</span>
              </li>
              <li>
                <h4>
                  <b>Name</b>
                </h4>
                <span>{this.props.formData.fullName}</span>
              </li>
              <li>
                <h4>
                  <b>Organisation</b>
                </h4>
                <span>{this.props.formData.companyName}</span>
              </li>
            </ul>

            <div className='publicadressSeciton'>
              <h4>Public Address</h4>
              <ul>
                <li>
                  <span>{this.props.formData.companyName}</span>
                </li>
                <li>
                  <span>
                    {this.props.formData.streetAddress},{' '}
                    {this.props.formData.city}
                  </span>
                </li>
                <li>
                  <span>
                    {this.props.formData.state} {this.props.formData.zipCode}
                  </span>
                </li>
              </ul>
            </div>
          </fieldset>
        </div>
      </div>
    );
  }
}

export default SalesQuotationTemplate;

import React, { Component } from "react";
import "./deliveryQuotationTemplate.css";

class DelieveryQuotationTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  formatDate = date => {
    date = new Date(date);
    let dd = date.getDate();
    let mm = date.getMonth();

    let yyyy = date.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }

    date = `${dd}/${mm}/${yyyy}`;
    return date;
  };

  render() {
    return (
      <div className="deliveryQuotationTemplate">
        <div className="deliveryQuotationLogo">
          <span className="logo">Logo</span>
          <h3>Supplier Pte Ltd</h3>
          <div className="addresspart">
            <ul>
              <li>
                <span>79 Ayer Rajah Crescent</span>
              </li>
              <li>
                <span>#01-03</span>
              </li>
              <li>
                <span>LaunchPad @ One-North</span>
              </li>
              <li>
                <span>Singapore 139955</span>
              </li>
            </ul>
          </div>
        </div>
        <h3 className="centerhead">Delivery Order</h3>
        <div className="billpart">
          <div className="addressPart">
            <span>Bill To:</span>
            <h4>
              <b>{this.props.formData.fullName}</b>
            </h4>
            <ul>
              <li>
                <span>{this.props.formData.companyName}</span>
              </li>
              <li>
                <span>{this.props.formData.streetAddress}</span>
              </li>
              <li>
                <span>
                  {this.props.formData.city}, {this.props.formData.state}
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
          <div className="deliveryInfo">
            <ul>
              <li>
                <span>DELIVERY NOTE NUMBER: </span>
                <span>
                  <b> {this.props.formData.noteNo}</b>
                </span>
              </li>
              <li>
                <span>DATE: </span>
                <span>
                  <b>{this.formatDate(this.props.formData.issueDate)}</b>
                </span>
              </li>
              <li>
                <span>TERM: </span>
                <span>
                  <b> {this.props.formData.term}</b>
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="attentionPart">
          <span>ATTENTION: </span>
          <span> {this.props.formData.attention}</span>
        </div>
        <div>
          <table className="saleModalTable">
            <thead>
              <tr>
                <th>Description</th>
                <th>Quantity</th>
                <th>UOM</th>
              </tr>
            </thead>
            {this.props.formData.orderInfo.map((item, i) => (
              <tbody key={i}>
                <tr>
                  <td><span className="label">Description</span><span>{item.deliveryDesc}</span></td>
                  <td><span className="label">Quantity</span><span>{item.deliveryQty}</span></td>
                  <td><span className="label">UOM</span><span>{item.deliveryUOM}</span></td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
        <div className="explanation">
          <span>EXPLANATION: </span>
          <span>{this.props.formData.explanation}</span>
        </div>
        <div className="other">
          <span>OTHERS: </span>
          <span>{this.props.formData.others}</span>
        </div>
        <div className="paynumber">
          <span>PAYMENT CERTIFICATE NUMBER: </span>
          <span>{this.props.formData.certNo}</span>
        </div>
        <div className="signedSection">
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
            </li>
            <li>
              <span>
                <b>Email: </b>
              </span>
            </li>
            <li>
              <span>
                <b>Date:</b>
              </span>
            </li>
          </ul>
        </div>
        <div>
          <p className="bottomstatment">
            <span>
              This document is electronically generated. The document hash has
              been recorded on Blockchain. To verify the authentically of this
              document, please verify at{" "}
              <a href="https://renderer.consentrade.io" target="_blank" style={{paddingLeft: '5px',paddingRight: '5px'}}>https://renderer.consentrade.io</a>
            </span>
          </p>
        </div>
      </div>
    );
  }
}

export default DelieveryQuotationTemplate;

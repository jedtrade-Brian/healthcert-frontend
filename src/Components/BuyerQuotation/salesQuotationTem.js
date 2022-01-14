import React from 'react';
import { formatAmount } from '../Shared/amountFormat';
import { formatDate } from '../Shared/dateTimeFormat';

export default function SalesQuotationTemp({ document }) {
  // console.log('document : ',document);

  const numberWithCommas = (x) => {
    if (x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    } else {
      return '';
    }
  };

  return (
    <div>
      <div className='buyerSignedTemplatebody'>
        <h3>Quotation</h3>
        <div className='companySection'>
          <h4>
            <b>
              {document.issuerDetails ? document.issuerDetails.companyName : ''}
            </b>
          </h4>
          <ul>
            <li>
              <span>
                {document.issuerDetails ? document.issuerDetails.address1 : ''}
              </span>
            </li>
            {document.issuerDetails && document.issuerDetails.address2 && (
              <li>
                <span>
                  {document.issuerDetails.address2}
                </span>
              </li>
            )}   
            {document.issuerDetails && document.issuerDetails.country || document.issuerDetails.zipcode && (
              <li>
                <span>
                  {(document.issuerDetails.country ? document.issuerDetails.country : '') +
                      ' ' + (document.issuerDetails.zipcode ? document.issuerDetails.zipcode : '')                    
                    }
                </span>
              </li>
            )}
            <li>
              <span>
                {document.issuerDetails ? document.issuerDetails.mobileNo : ''}
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
                  {document.recipientDetails
                    ? document.recipientDetails.name
                    : ''}
                </span>
              </li>
            </ul>
            <h4>
              <b>
                {document.recipientDetails
                  ? document.recipientDetails.companyName
                  : ''}
              </b>
            </h4>

            <ul>
              <li>
                <span>
                  {document.recipientDetails
                    ? document.recipientDetails.fullAddress.address
                    : ''}
                </span>
              </li>
              <li>
                <span>
                  {document.recipientDetails
                    ? document.recipientDetails.fullAddress.city
                    : ''}
                </span>
              </li>
              <li>
                <span>
                  {document.recipientDetails
                    ? (document.recipientDetails.fullAddress.state ? document.recipientDetails.fullAddress.state : '') +
                      ' ' +
                      (document.recipientDetails.fullAddress.zipcode ? document.recipientDetails.fullAddress.zipcode : '')
                    : ''}
                </span>
              </li>
              <li>
                <span>Phone : </span>
                <span style={{paddingLeft: '5px'}}>
                  {document.recipientDetails
                    ? document.recipientDetails.phoneNumber
                    : ''}
                </span>
              </li>
              <li>
                <span>Email : </span>
                <span style={{paddingLeft: '5px'}}>
                  {document.recipientDetails
                    ? document.recipientDetails.emailAddress
                    : ''}
                </span>
              </li>
            </ul>
          </div>
          <div className='datepart'>
            <ul className='itemfirst'>
              <li>
                <span>DATE: </span>
                <span>
                  <b>
                    {document.doc && document.doc.docInfo.docDetails
                      ? formatDate(document.doc.docInfo.docDetails.quoteDate)
                      : ''}
                  </b>
                </span>
              </li>
              <li>
                <span>QUOTATION #: </span>
                <span>
                  <b>{document.doc ? document.doc.quoteNumber : ''}</b>
                </span>
              </li>
              <li>
                <span>CUSTOMER ID: </span>
                <span>
                  <b>
                    {document.recipientDetails
                      ? document.recipientDetails.customerId
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
                    {document.doc && document.doc.docInfo.docDetails
                      ? formatDate(
                          document.doc.docInfo.docDetails.validityPeriod
                        )
                      : ''}
                  </b>
                </span>
              </li>
              <li>
                <span>PREPARED BY: </span>
                <span>
                  <b>
                    {document.issuerDetails ? document.issuerDetails.name : ''}
                  </b>
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className='commentpart'>
          <span>Comments or special instructions :</span>
          <span>
            {document.doc && document.doc.docInfo.docDetails
              ? document.doc.docInfo.docDetails.comments
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
              {document.doc &&
                document.doc.docInfo &&
                document.doc.docInfo.docDetails &&
                document.doc.docInfo.docDetails.orderInfo.map((item, i) => (
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
                  <span>
                    <b>Total</b>
                  </span>
                </td>
                <td>
                  <span className='amount'>
                    {document.doc &&
                    document.doc.docInfo &&
                    document.doc.docInfo.docDetails
                      ? numberWithCommas(
                          formatAmount(document.doc.docInfo.docDetails.finalAmt)
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
              {document.issuerDetails
                ? document.issuerDetails.title +
                  ' ' +
                  document.issuerDetails.name
                : ''}{' '}
            </span>
            via phone number{' '}
            <span>
              {document.issuerDetails ? document.issuerDetails.mobileNo : ''}
            </span>{' '}
            or email at{' '}
            <span>
              {document.issuerDetails ? document.issuerDetails.email : ''}
            </span>
          </p>
        </div>
        <h5 className='thankstatement'>Thank you for your business!</h5>
      </div>
    </div>
  );
}

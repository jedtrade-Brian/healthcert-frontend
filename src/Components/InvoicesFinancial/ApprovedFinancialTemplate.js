import React, { Component } from 'react';
import { formatAmount } from '../Shared/amountFormat';
import { getTimeFromUnixTimestamp, getTimeFromUnixTimestampNew, unixTimestampToDate } from '../Shared/dateTimeFormat';

class ApprovedFinancialTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
      <div>
        <div className='salesDocumentHead'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='60'
            height='60'
            viewBox='0 0 60 60'
          >
            <g transform='translate(0 0)'>
              <g transform='translate(6.381 0)'>
                <g transform='translate(0 0)'>
                  <path
                    className='a'
                    d='M107.028.154a1.171,1.171,0,0,0-1.176.009L84.4,12.846A1.17,1.17,0,1,0,85.59,14.86l15.393-9.1L72.311,35.5,58.051,31.14l18.61-11a1.17,1.17,0,1,0-1.192-2.015L54.574,30.476a1.17,1.17,0,0,0,.253,2.127l17.03,5.209,7.513,13.672a.277.277,0,0,0,.024.037,1.168,1.168,0,0,0,1.82.237l8.639-8.441,16.25,4.97a1.171,1.171,0,0,0,1.513-1.119v-46A1.17,1.17,0,0,0,107.028.154ZM79.435,38.533a1.171,1.171,0,0,0-.208.666v7.159L74.1,37.023l22.7-23.55Zm2.133,9.606V40.781L87.3,42.535Zm23.709-2.555-23-7.036,23-33.2Z'
                    transform='translate(-53.999 0)'
                  />
                </g>
              </g>
              <g transform='translate(6.381 40.224)'>
                <path
                  className='a'
                  d='M67.048,344.994a1.182,1.182,0,0,0-1.671,0L54.345,356.026a1.182,1.182,0,0,0,1.671,1.671l11.032-11.032A1.182,1.182,0,0,0,67.048,344.994Z'
                  transform='translate(-53.999 -344.648)'
                />
              </g>
              <g transform='translate(0 54.918)'>
                <path
                  className='a'
                  d='M4.735,469.347a1.182,1.182,0,0,0-1.671,0L.346,472.065a1.182,1.182,0,1,0,1.671,1.671l2.718-2.718A1.182,1.182,0,0,0,4.735,469.347Z'
                  transform='translate(0 -469.001)'
                />
              </g>
              <g transform='translate(14.712 57.567)'>
                <path
                  className='a'
                  d='M127.6,491.756a1.181,1.181,0,1,0,.346.835A1.19,1.19,0,0,0,127.6,491.756Z'
                  transform='translate(-125.58 -491.41)'
                />
              </g>
              <g transform='translate(17.618 48.774)'>
                <path
                  className='a'
                  d='M158.395,417.352a1.182,1.182,0,0,0-1.671,0L150.88,423.2a1.182,1.182,0,0,0,1.671,1.671l5.843-5.843A1.182,1.182,0,0,0,158.395,417.352Z'
                  transform='translate(-150.534 -417.006)'
                />
              </g>
              <g transform='translate(37.574 48.326)'>
                <path
                  className='a'
                  d='M328.93,413.557a1.182,1.182,0,0,0-1.671,0l-5.859,5.859a1.182,1.182,0,1,0,1.671,1.671l5.859-5.859A1.182,1.182,0,0,0,328.93,413.557Z'
                  transform='translate(-321.053 -413.211)'
                />
              </g>
              <g transform='translate(31.212 15.625)'>
                <path
                  className='a'
                  d='M268.447,133.726a1.181,1.181,0,1,0,.346.837A1.191,1.191,0,0,0,268.447,133.726Z'
                  transform='translate(-266.43 -133.38)'
                />
              </g>
            </g>
          </svg>

          
          <h5>Successfully Approved</h5>
          <ul>
            <li>
              <span>
                Thank you! Financing has been created successfully Approved.
              </span>
            </li>
          </ul>
        </div>
        <div className='salesDocumentOrder'>
          <div className='successfullmessageBodytitle'>
            <h3>
              <span>Order Details</span>
            </h3>
          </div>
          {this.props.noaResponse && this.props.noaResponse.map((item,index) => (
            <ul key={index}>
              <li>
                <span>Recipient</span>
                <span>:</span>
                <span>{item ? item.recipient : ''}</span>
              </li>
              <li>
                <span>Amount</span>
                <span>:</span>
                <span>{item ? this.numberWithCommas(formatAmount(item.finalAmt)) : ''}</span>
              </li>
              <li>
                <span>Currency</span>
                <span>:</span>
                <span>{item ? item.currency : ''}</span>
              </li>
              <li>
                <span>Date & Time</span>
                <span>:</span>
                <span>{item ? unixTimestampToDate(item.dateTime) + ' ' + getTimeFromUnixTimestamp(item.dateTime) : ''}</span>
              </li>
            </ul>
          ))}
          
        </div>
      </div>
    );
  }
}

export default ApprovedFinancialTemplate;

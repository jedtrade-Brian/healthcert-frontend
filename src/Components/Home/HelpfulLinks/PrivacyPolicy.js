import React, { Component } from 'react';
import './helpfulLinks.css';
import { Link } from 'react-router-dom';

export default class PrivacyPolicy extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div className='privacySection'>
        <div className=''>
          <header id='scrollHeader'>
            <div className='row'>
              <div className='col-sm-12' style={{ width: '100%' }}>
                <div className='flex' style={{ width: '100%' }}>
                  <Link to='/'>
                    <div className='logo'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='274.163'
                        height='60'
                        viewBox='0 0 274.163 60'
                      >
                        <g id='logo' transform='translate(-180.545 -55.733)'>
                          <g
                            id='Group_1069'
                            data-name='Group 1069'
                            transform='translate(-1535.172 -43.822)'
                          >
                            <path
                              id='Oval-3'
                              className='oval'
                              d='M19.284,0a22.946,22.946,0,0,0,3.66,45.6'
                              transform='translate(1710.5 129.582) rotate(-45)'
                              fill='none'
                              stroke='#fff'
                              strokeLinecap='square'
                              strokeWidth='5'
                              fillRule='evenodd'
                            ></path>
                            <path
                              id='Oval-3-2'
                              className='oval'
                              data-name='Oval-3'
                              d='M6.522,16.024A22.971,22.971,0,0,0,0,0'
                              transform='translate(1743.229 106.434) rotate(-45)'
                              fill='none'
                              stroke='#fff'
                              strokeLinecap='square'
                              strokeWidth='5'
                              fillRule='evenodd'
                            ></path>
                            <path
                              id='Path_435'
                              className='path'
                              data-name='Path 435'
                              d='M.06.43l6-2.338L6.044,17.3h12.62l-.019,5.987H6.015v2.416s-.022,3.234,4.689,4.42a9.267,9.267,0,0,0,6.805-1.117L21.2,32.772a16.153,16.153,0,0,1-13.458,2.1C-.149,31.349,0,25.708,0,25.708Z'
                              transform='translate(1730.652 106.299)'
                              fill='#fff'
                            ></path>
                          </g>
                          <path
                            id='Path_462'
                            className='path'
                            data-name='Path 462'
                            d='M14.112.432a12.446,12.446,0,0,1-9-3.474,11.884,11.884,0,0,1-3.6-8.946,11.884,11.884,0,0,1,3.6-8.946,12.446,12.446,0,0,1,9-3.474,10.582,10.582,0,0,1,9.612,5.364L20.16-17.172a7,7,0,0,0-2.538-2.52,6.763,6.763,0,0,0-3.51-.972A7.879,7.879,0,0,0,8.19-18.216a8.611,8.611,0,0,0-2.358,6.228A8.627,8.627,0,0,0,8.19-5.778a7.85,7.85,0,0,0,5.922,2.466,6.67,6.67,0,0,0,3.51-.99A7.245,7.245,0,0,0,20.16-6.8L23.76-5A10.845,10.845,0,0,1,14.112.432ZM41.364-2.214A8.408,8.408,0,0,1,34.884.432,8.408,8.408,0,0,1,28.4-2.214a9.213,9.213,0,0,1-2.448-6.5,9.132,9.132,0,0,1,2.448-6.5,8.467,8.467,0,0,1,6.48-2.61,8.467,8.467,0,0,1,6.48,2.61,9.132,9.132,0,0,1,2.448,6.5A9.213,9.213,0,0,1,41.364-2.214Zm-6.48-.7A4.434,4.434,0,0,0,38.556-4.59a6.412,6.412,0,0,0,1.332-4.122A6.357,6.357,0,0,0,38.556-12.8a4.434,4.434,0,0,0-3.672-1.674A4.447,4.447,0,0,0,31.23-12.8a6.3,6.3,0,0,0-1.35,4.086A6.356,6.356,0,0,0,31.23-4.59,4.447,4.447,0,0,0,34.884-2.916ZM63.216,0h-3.78V-10.872a3.585,3.585,0,0,0-.918-2.772,3.764,3.764,0,0,0-2.61-.828,5.075,5.075,0,0,0-2.52.666,6.366,6.366,0,0,0-1.944,1.638V0h-3.78V-17.388h3.78v2.34a7.979,7.979,0,0,1,2.61-1.962,7.89,7.89,0,0,1,3.546-.81,5.644,5.644,0,0,1,4.194,1.44,5.646,5.646,0,0,1,1.422,4.14ZM74.088.432A10.221,10.221,0,0,1,66.636-2.3L68.364-5a7.888,7.888,0,0,0,2.61,1.71,8.218,8.218,0,0,0,3.258.7,4.419,4.419,0,0,0,2.556-.63,1.95,1.95,0,0,0,.9-1.674,1.608,1.608,0,0,0-1.08-1.458,10.942,10.942,0,0,0-2.628-.828q-1.548-.306-3.1-.756a5.724,5.724,0,0,1-2.628-1.6,4.242,4.242,0,0,1-1.08-3.024,4.668,4.668,0,0,1,1.836-3.744,7.639,7.639,0,0,1,5-1.512,9.816,9.816,0,0,1,6.732,2.412l-1.584,2.664a6.631,6.631,0,0,0-5.148-2.088,4,4,0,0,0-2.322.612,1.826,1.826,0,0,0-.882,1.548q0,.828,1.08,1.3a13.013,13.013,0,0,0,2.628.774q1.548.306,3.1.774a5.606,5.606,0,0,1,2.628,1.692A4.559,4.559,0,0,1,81.324-5,4.776,4.776,0,0,1,79.416-1.08,8.378,8.378,0,0,1,74.088.432Zm19.08,0a8.939,8.939,0,0,1-6.552-2.52A8.887,8.887,0,0,1,84.06-8.712a9.055,9.055,0,0,1,2.5-6.462A8.324,8.324,0,0,1,92.88-17.82a7.863,7.863,0,0,1,6.192,2.646,9.864,9.864,0,0,1,2.34,6.786v.936H88.02a5.26,5.26,0,0,0,1.692,3.42,5.391,5.391,0,0,0,3.816,1.368A6.728,6.728,0,0,0,98.5-4.608l1.728,2.484A9.922,9.922,0,0,1,93.168.432Zm4.608-10.584a5.116,5.116,0,0,0-1.35-3.186,4.56,4.56,0,0,0-3.582-1.386,4.481,4.481,0,0,0-3.492,1.386,5.072,5.072,0,0,0-1.368,3.186ZM120.708,0h-3.78V-10.872a3.585,3.585,0,0,0-.918-2.772,3.764,3.764,0,0,0-2.61-.828,5.075,5.075,0,0,0-2.52.666,6.366,6.366,0,0,0-1.944,1.638V0h-3.78V-17.388h3.78v2.34a7.979,7.979,0,0,1,2.61-1.962,7.89,7.89,0,0,1,3.546-.81,5.644,5.644,0,0,1,4.194,1.44,5.646,5.646,0,0,1,1.422,4.14Zm11.34,0h-4.212V-20.3h-7.272v-3.708H139.32V-20.3h-7.272Zm11.808,0h-3.78V-17.388h3.78v2.52a8.536,8.536,0,0,1,2.538-2.124,6.338,6.338,0,0,1,3.114-.828v3.744a5.53,5.53,0,0,0-1.152-.108,5.588,5.588,0,0,0-2.574.7,4.753,4.753,0,0,0-1.926,1.638Zm24.732,0h-3.78V-2.376a6.729,6.729,0,0,1-5.58,2.808,7.059,7.059,0,0,1-5.544-2.448,9.766,9.766,0,0,1-2.16-6.7,9.739,9.739,0,0,1,2.16-6.624,7.014,7.014,0,0,1,5.544-2.484,6.64,6.64,0,0,1,5.58,2.844v-2.412h3.78Zm-8.244-2.916A5.3,5.3,0,0,0,162.9-3.6a5.221,5.221,0,0,0,1.908-1.656v-6.876a5.221,5.221,0,0,0-1.908-1.656,5.3,5.3,0,0,0-2.556-.684,4.451,4.451,0,0,0-3.582,1.6,6.233,6.233,0,0,0-1.35,4.158,6.3,6.3,0,0,0,1.35,4.176A4.43,4.43,0,0,0,160.344-2.916ZM189.5,0h-3.78V-2.376a6.729,6.729,0,0,1-5.58,2.808A7.059,7.059,0,0,1,174.6-2.016a9.766,9.766,0,0,1-2.16-6.7,9.739,9.739,0,0,1,2.16-6.624,7.014,7.014,0,0,1,5.544-2.484,6.58,6.58,0,0,1,5.58,2.844v-9.036h3.78ZM181.26-2.916a5.3,5.3,0,0,0,2.556-.684,5.221,5.221,0,0,0,1.908-1.656v-6.876a5.221,5.221,0,0,0-1.908-1.656,5.3,5.3,0,0,0-2.556-.684,4.451,4.451,0,0,0-3.582,1.6,6.233,6.233,0,0,0-1.35,4.158,6.3,6.3,0,0,0,1.35,4.176A4.43,4.43,0,0,0,181.26-2.916Zm21.2,3.348a8.939,8.939,0,0,1-6.552-2.52,8.887,8.887,0,0,1-2.556-6.624,9.055,9.055,0,0,1,2.5-6.462,8.324,8.324,0,0,1,6.318-2.646,7.863,7.863,0,0,1,6.192,2.646,9.864,9.864,0,0,1,2.34,6.786v.936H197.316a5.26,5.26,0,0,0,1.692,3.42,5.391,5.391,0,0,0,3.816,1.368,6.728,6.728,0,0,0,4.968-1.944l1.728,2.484A9.922,9.922,0,0,1,202.464.432Zm4.608-10.584a5.116,5.116,0,0,0-1.35-3.186,4.56,4.56,0,0,0-3.582-1.386,4.481,4.481,0,0,0-3.492,1.386,5.072,5.072,0,0,0-1.368,3.186Z'
                            transform='translate(235 99)'
                            fill='#fff'
                          ></path>
                        </g>
                      </svg>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </header>
        </div>
        <div id='container'>
          <div className='container'>
            <div className='row'>
              <div className='col-ms-12'>
                <article>
                  <h2>Privacy Policy</h2>
                  <p>
                    ConsenTrade Application is maintained and operated by
                    Jedtrade Pte Ltd (the “Company”), with office located at 158
                    Kallang Way #07-01/02 Performance Building, Singapore
                    349245. References to JEDTRADE in this privacy policy is to
                    the Company. JEDTRADE has in place measures to protect your
                    privacy and personal data. This policy describes how we may
                    collect, use, disclose and process personal data which is
                    provided to us and applies to any individual’s personal data
                    which is in our possession and over which we have control.
                    By using the Portal, subscribing to any of the services
                    therein or accepting the Terms and Conditions of use of the
                    Portal, you agree to this Privacy Policy
                  </p>
                  <h2>1. General</h2>
                  <p>
                    <b>1.1.</b> From time to time, JEDTRADE may collect data
                    which enables an individual to be identified (“personal
                    data”) in connection with the use of the Portal. This
                    includes information such as names, contact details,
                    addresses and other identification details of individuals
                    who access or use this website and the services provided on
                    it (the “Portal”). <br /> <b>1.2.</b> JEDTRADE may also
                    collect information from or about the devices which are used
                    to access the Portal. Such information includes, but is not
                    limited to: <br /> <b>(a)</b> Attributes such as the
                    operating system of the device, hardware version, settings,
                    file and software names and types and device identifiers;
                    <br /> <b>(b)</b> Device locations; and <br /> <b>(c)</b>{' '}
                    Connection information such as the name of the ISP or mobile
                    operator through the Portal is accessed, browser type and IP
                    address.
                  </p>
                  <br />
                  <h2>2. Information provided to JEDTRADE</h2>
                  <p>
                    <b>2.1.</b> Where personal data is provided as required by,
                    pursuant to, or in connection with the use of the Portal,
                    you represent and warrant to JEDTRADE that <br /> <b>(i)</b>{' '}
                    The relevant individual has been notified of the purposes
                    for which data will be collected, processed, used or
                    disclosed; and
                    <br /> <b>(ii)</b> Such individual’s consent for the
                    collection, processing, use and disclosure of such personal
                    data by JEDTRADE has been obtained and authorised by such
                    individual. <br /> <b>2.2.</b> JEDTRADE must be promptly
                    informed upon becoming aware of the withdrawal by the
                    relevant individual of his/her consent to the collection,
                    processing, use and/or disclosure by JEDTRADE of any
                    personal data provided to JEDTRADE. The withdrawal of such
                    consent may affect the services which JEDTRADE is able to
                    provide to you. To make a request to withdraw consent
                    previously given, please contact JEDTRADE at
                    support@jedtrade.com. All requests to have personal data
                    removed from JEDTRADE’s databases or physical storage
                    facilities will be entertained and performed within its
                    reasonable abilities. <br /> <b>2.3.</b> Any consent given
                    in relation to personal data shall, subject to all
                    applicable laws and regulations, survive death, incapacity,
                    bankruptcy or insolvency of any such individual and the
                    termination or expiration of any account in connection with
                    the use of the Portal.
                    <br /> <b>2.4.</b>The Portal uses tracking technologies to
                    provide services therein. These enable JEDTRADE to
                    understand how you use the Portal and its services therein
                    which, in turn, helps JEDTRADE to provide and improve them.
                    However, the tracking technologies do not access, receive or
                    collect information which can be used to identify you. Below
                    are some examples of the tracking technologies used on the
                    Portal: <br /> <b>(a)</b> Cookies. A cookie is a small data
                    file sent from a website to your browser that is stored on
                    your device. Cookies are used for a number of purposes,
                    including to display the most appropriate content based on
                    your interests and activity on the Portal, estimate and
                    report the total audience size and traffic on the Portal,
                    and conduct research to improve the services on the Portal.
                    You can configure your device's settings to reflect your
                    preference to accept or reject cookies. If you reject all
                    cookies, you will not be able to take full advantage of the
                    full services on the Portal. <br /> <b>(b)</b> Flash
                    cookies. The Portal may use Flash cookies (a.k.a local
                    shared objects or LSOs) to store some of your viewing
                    preferences. These are used to collect and store
                    information, but differ from browser cookies in the amount,
                    type and manner in which data is stored.
                  </p>
                  <br />
                  <h2>3. Use of personal data</h2>
                  <p>
                    <b>3.1.</b> JEDTRADE may collect, store, process, disclose,
                    access, review and/or use personal data in accordance with
                    the Personal Data Protection Act 2012 or any other written
                    law. <br /> <b>3.2.</b> Without prejudice to the foregoing,
                    JEDTRADE may use personal data for any of its business
                    purposes, which include, and is not limited to, the
                    following purposes: <br /> <b>(a)</b>
                    To operate, administer any account and/or offer the products
                    and services available on, the Portal; <br /> <b>(b)</b> To
                    verify the identity or authority of representatives of
                    registered clients of the Portal,
                    <br /> <b>(c)</b> To carry out or respond to requests,
                    questions or instructions from verified or authorised
                    representatives or other individuals pursuant to the current
                    security procedures; <br /> <b>(d)</b> To facilitate
                    transactions on the Portal; <br /> <b>(e)</b> To carry out,
                    monitor and analyse JEDTRADE’s business; <br /> <b>(f)</b>{' '}
                    For the marketing of products and services ancillary or
                    related to the use of the Portal; <br /> <b>(g)</b> In
                    connection with any sale, merger, or similar change of
                    JEDTRADE’s business; <br /> <b>(h)</b> To comply with any
                    applicable laws, rules, or regulations in any country; and
                    <br /> <b>(i)</b> To detect, prevent and investigate fraud.{' '}
                    <br /> <b>3.3.</b> JEDTRADE may also retain personal data
                    for so long as it may deem necessary for the purposes of
                    record retention and for its own business purposes in
                    connection with the operation of the Portal.
                  </p>
                  <br />
                  <h2>4. Disclosure of Data</h2>
                  <p>
                    <b>4.1.</b> JEDTRADE may from time to time also disclose
                    personal data to the following (whether inside or outside of
                    Singapore) for the purposes listed above:
                    <br /> <b>(a)</b> Any agent, contractor, or third party
                    services provider which provides operation, administrative
                    or other services to JEDTRADE in connection with JEDTRADE’s
                    business operations and/or the Portal; <br /> <b>(b)</b> Any
                    person or entity employed by or on behalf of JEDTRADE or is
                    a part of or related to any group of companies of which
                    JEDTRADE forms part; <br /> <b>(c)</b> Any actual or
                    proposed assignee of JEDTRADE or transferee of JEDTRADE’s
                    rights in respect of all or any part of the assets or
                    business of JEDTRADE; and <br /> <b>(d)</b> Any credit
                    bureau as well as the members of such credit bureau and
                    other relevant third parties in connection with the use of
                    the Portal (e.g.; banks, financial intermediaries, insurers,
                    reinsurers, escrow agents and other P2P platforms). <br />{' '}
                    <b>4.2</b> Personal data which you make available on your
                    profile may be viewed by other users of the Portal. Other
                    users of the Portal may also view the content and eDocuments
                    which you upload on the Portal or the smart contracts which
                    you create on Ethereum. JEDTRADE shall however remove all
                    links between the personal data made available on your
                    profile and your Ethereum address.
                    <br /> <b>4.3</b> Without prejudice to the foregoing,
                    JEDTRADE may disclose personal data to any person or entity
                    to whom JEDTRADE is under an obligation or otherwise
                    required to make disclosure pursuant to any applicable laws,
                    including disclosure to courts, tribunals, and/or legal,
                    regulatory, tax and government authorities.
                  </p>
                  <br />{' '}
                  <h2>5. Visiting Our Platform From Outside Singapore</h2>
                  <p>
                    This Privacy Policy is intended to cover collection and use
                    of information on the Portal within Singapore. If you are
                    visiting the Portal from outside Singapore, please be aware
                    that your information may be transferred to, stored and
                    processed in Singapore where JEDTRADE’s servers are located
                    and the central database is operated. The data protection
                    and other laws of Singapore and other countries might not be
                    as comprehensive as those in your country. Please be assured
                    that JEDTRADE seeks to take reasonable steps to ensure that
                    your privacy is protected. By using the Portal and the
                    services therein, you understand that your information may
                    be transferred to JEDTRADE’s facilities and those third
                    parties with whom JEDTRADE shares it as described in this
                    Privacy Policy.
                  </p>
                  <br />
                  <h2>6. European Union Privacy Rights</h2>
                  <p>
                    Under the General Data Protection Regulation (Regulation EU
                    2016/679) (also known as GDPR), if you are an individual
                    protected by the GDPR you may have certain rights as a data
                    subject. To request information about or avail yourself of
                    those rights, please send an email to support@jedtrade.com
                    with “GDPR Request” in the subject line. In the email please
                    describe, with specificity, the GDPR right you are
                    requesting assistance with. Please note additional
                    information may be requested prior to initiation of a
                    request and that we reserve the right to charge a fee with
                    respect to certain requests. Upon completion of Our review,
                    you will be notified if your request has been granted,
                    denied, or exemptions apply.
                  </p>
                  <br />
                  <h2>7. Access and correction; amendments and updates</h2>
                  <p>
                    <b>7.1.</b> You may access, update or make corrections to
                    personal data held by JEDTRADE. To do so, please contact us
                    (at legal@jedtrade.com). <br /> <b>7.2.</b> JEDTRADE
                    reserves the right to charge such fees as it made, in its
                    sole and absolute discretion, deem appropriate for the grant
                    of such access and to correct any personal data. <br />{' '}
                    <b>7.3.</b> This privacy policy may be amended and updated
                    by JEDTRADE from time to time. Any such amendment or update
                    will be made available on the Portal. All communications,
                    transactions and dealings with JEDTRADE will be subject to
                    the latest version of this policy in force at the relevant
                    time.
                  </p>
                </article>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

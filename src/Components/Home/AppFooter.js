import React from 'react';
import { Link } from 'react-router-dom';
import facebook from './assets/img/facebook.svg';
import instagram from './assets/img/instagram.svg';
import linkedIn from './assets/img/linkedIn.svg';
import jedSmall from './assets/img/jed-small.png';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

export default function AppFooter() {
  return (
    <footer>
        <div className="container">
            <div className="row">
                <div className="col-lg-10 col-md-offset-1">
                    <div className="row">
                        <div className="col-md-6">
                            <img src={jedSmall} className="footerLogo" alt="JEDTrade" />
                            <p>&copy; Copyright 2020</p>
                            <p>JEDTrade Pte Ltd | All Rights Reserved.</p>
                        </div>
                        <div className="col-md-6">
                            <p className="socialIcons">
                                <a href="https://www.facebook.com/JEDTrade/" target="_blank" style={{marginRight: '5px'}}>
                                    <FacebookIcon />
                                </a>
                                <a href="https://www.instagram.com/jed.enterprise/" target="_blank" style={{marginRight: '5px'}}>
                                    <InstagramIcon color="secondary"/>
                                </a>
                                <a href="https://www.linkedin.com/company/jedtrade" target="_blank">
                                    <LinkedInIcon color="primary"/>
                                </a>
                                {/* <a href="https://www.facebook.com" target="_blank"><img src={facebook} alt="Share us on Facebook" /></a>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-10 col-md-offset-1'>
            <div className='row'>
              <div className='col-md-6'>
                <img src={jedSmall} className='footerLogo' alt='JEDTrade' />
                <p>&copy; Copyright 2020</p>
                <p>JEDTrade Pte Ltd | All Rights Reserved.</p>
              </div>
              <div className='col-md-6'>
                <p className='socialIcons'>
                  <a
                    href='https://www.facebook.com'
                    target='_blank'
                    style={{ marginRight: '5px' }}
                  >
                    <FacebookIcon />
                  </a>
                  <a
                    href='https://www.instagram.com'
                    target='_blank'
                    style={{ marginRight: '5px' }}
                  >
                    <InstagramIcon color='secondary' />
                  </a>
                  <a href='https://www.linkedin.com' target='_blank'>
                    <LinkedInIcon color='primary' />
                  </a>
                  {/* <a href="https://www.facebook.com" target="_blank"><img src={facebook} alt="Share us on Facebook" /></a>
                                <a href="https://www.instagram.com" target="_blank"><img src={instagram} alt="Follow us on Instagram" /></a>
                                <a href="https://www.linkedin.com" target="_blank"><img src={linkedIn} alt="Follow us on LinkedIn" /></a> */}
                </p>
                <p className='links'>
                  <Link to='/faq'>FAQs</Link> |
                  <Link to='/privacyPolicy'>Privacy Policy</Link> |
                  <Link to='/termsNConditions'>Terms and Conditions</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

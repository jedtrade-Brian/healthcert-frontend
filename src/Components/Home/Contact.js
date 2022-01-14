import React from 'react';
import { Button } from '@material-ui/core';

function Contact() {
  return (
    <div id="subscribe">
        <div className="container">
            <div className="row">
                <div className="col-xs-12">
                    <h6></h6>
                    <p>Contact Us</p>
                </div>
            </div>
        </div>
        <div className="blueBg">
          <div className="container">
            <div className="row">
                <div className="col-lg-10 col-md-offset-1">
                    <form>
                        <div className="row">
                            <div className="col-lg-6">
                                <ul>
                                    <li>
                                        <input type="text" name="" placeholder="Full Name" />
                                    </li>
                                    <li>
                                        <input type="text" name="" placeholder="Email Address" />
                                    </li>
                                    <li>
                                        <input type="text" name="" placeholder="Organization (optional)" />
                                    </li>
                                </ul>
                            </div>
                            <div className="col-lg-6">
                                <ul>
                                    <li><textarea placeholder="Comments (if any)"></textarea></li>
                                </ul>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                              <Button className="submit">Send</Button>
                              {/* <input className="submit" type="Submit" value={'Send'} name="" /> */}
                            </div>
                        </div>
                    </form>
                </div>
              </div>
           </div>
        </div>
    </div>

   );
}

export default Contact
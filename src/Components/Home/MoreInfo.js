import React from 'react';
import jedLogo from './assets/img/jedLogo.png'


function MoreInfo(props) {
  return (
    <div id="jedtrade">

        <div className="container">
            <div className="row">
                <div className="col-xs-12">
                    <h5>About Us</h5>
                    <p>JEDTrade Pte Ltd ("JED")</p>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-5">
                    <div className="map"><img src={jedLogo} alt="JEDTrade"/></div>
                </div>
                <div className="col-lg-7">
                    <p className="text">JEDTrade is the Company behind ConsenTrade and is a leading technology company that builds business solutions powered by leading-edge technology such as blockchain and data analytics. Our Company aims to operationalize the use of blockchain
                        for enterprises through consultation, design, architecture and implementation.
                    </p>
                    <p className="text">With a strong belief in technology built around business use cases, JEDTrade uses its expertise and knowledge in blockchain to provide objective guidance, insights and create solutions tailored to each client’s industry and needs.
                        In terms of industry verticals, we are focused on supply chain, financial services and data privacy projects.</p>
                </div>
            </div>
        </div>
    </div>
  );
}


export default MoreInfo
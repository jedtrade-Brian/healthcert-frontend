import React from 'react';
import banner from './assets/img/banner.jpg'
import bannerCut from './assets/img/bannerCut.svg'

function Banner() {
  return (
    <div id="banner">
        <div className="topDeco"><svg xmlns="http://www.w3.org/2000/svg" width="90" height="153" viewBox="0 0 90 153">
            <path id="circleGrid" d="M84,150a3,3,0,1,1,3,3A3,3,0,0,1,84,150Zm-21,0a3,3,0,1,1,3,3A3,3,0,0,1,63,150Zm-21,0a3,3,0,1,1,3,3A3,3,0,0,1,42,150Zm-21,0a3,3,0,1,1,3,3A3,3,0,0,1,21,150ZM0,150a3,3,0,1,1,3,3A3,3,0,0,1,0,150Zm84-21a3,3,0,1,1,3,3A3,3,0,0,1,84,129Zm-21,0a3,3,0,1,1,3,3A3,3,0,0,1,63,129Zm-21,0a3,3,0,1,1,3,3A3,3,0,0,1,42,129Zm-21,0a3,3,0,1,1,3,3A3,3,0,0,1,21,129ZM0,129a3,3,0,1,1,3,3A3,3,0,0,1,0,129Zm84-21a3,3,0,1,1,3,3A3,3,0,0,1,84,108Zm-21,0a3,3,0,1,1,3,3A3,3,0,0,1,63,108Zm-21,0a3,3,0,1,1,3,3A3,3,0,0,1,42,108Zm-21,0a3,3,0,1,1,3,3A3,3,0,0,1,21,108ZM0,108a3,3,0,1,1,3,3A3,3,0,0,1,0,108ZM84,87a3,3,0,1,1,3,3A3,3,0,0,1,84,87ZM63,87a3,3,0,1,1,3,3A3,3,0,0,1,63,87ZM42,87a3,3,0,1,1,3,3A3,3,0,0,1,42,87ZM21,87a3,3,0,1,1,3,3A3,3,0,0,1,21,87ZM0,87a3,3,0,1,1,3,3A3,3,0,0,1,0,87ZM84,66a3,3,0,1,1,3,3A3,3,0,0,1,84,66ZM63,66a3,3,0,1,1,3,3A3,3,0,0,1,63,66ZM42,66a3,3,0,1,1,3,3A3,3,0,0,1,42,66ZM21,66a3,3,0,1,1,3,3A3,3,0,0,1,21,66ZM0,66a3,3,0,1,1,3,3A3,3,0,0,1,0,66ZM84,45a3,3,0,1,1,3,3A3,3,0,0,1,84,45ZM63,45a3,3,0,1,1,3,3A3,3,0,0,1,63,45ZM42,45a3,3,0,1,1,3,3A3,3,0,0,1,42,45ZM21,45a3,3,0,1,1,3,3A3,3,0,0,1,21,45ZM0,45a3,3,0,1,1,3,3A3,3,0,0,1,0,45ZM84,24a3,3,0,1,1,3,3A3,3,0,0,1,84,24ZM63,24a3,3,0,1,1,3,3A3,3,0,0,1,63,24ZM42,24a3,3,0,1,1,3,3A3,3,0,0,1,42,24ZM21,24a3,3,0,1,1,3,3A3,3,0,0,1,21,24ZM0,24a3,3,0,1,1,3,3A3,3,0,0,1,0,24ZM84,3a3,3,0,1,1,3,3A3,3,0,0,1,84,3ZM63,3a3,3,0,1,1,3,3A3,3,0,0,1,63,3ZM42,3a3,3,0,1,1,3,3A3,3,0,0,1,42,3ZM21,3a3,3,0,1,1,3,3A3,3,0,0,1,21,3ZM0,3A3,3,0,1,1,3,6,3,3,0,0,1,0,3Z" fill="#fff"/>
          </svg>
        </div>
        <div className="inner">
            <img src={banner} alt="ConsenTrade"/>
            <div className="bannerContent">
                <h1>Connecting and Managing your Business Process with TradeTrust</h1>
                <p>Improve your supply chain procedures and establish trust in your business network by issuing and signing trade documents that can be attested for financing </p>
            </div>
            <img src={bannerCut} className="deco" alt="ConsenTrade"/>
        </div>
        <div className="botDeco"><svg xmlns="http://www.w3.org/2000/svg" width="90" height="153" viewBox="0 0 90 153">
            <path id="circleGrid" d="M84,150a3,3,0,1,1,3,3A3,3,0,0,1,84,150Zm-21,0a3,3,0,1,1,3,3A3,3,0,0,1,63,150Zm-21,0a3,3,0,1,1,3,3A3,3,0,0,1,42,150Zm-21,0a3,3,0,1,1,3,3A3,3,0,0,1,21,150ZM0,150a3,3,0,1,1,3,3A3,3,0,0,1,0,150Zm84-21a3,3,0,1,1,3,3A3,3,0,0,1,84,129Zm-21,0a3,3,0,1,1,3,3A3,3,0,0,1,63,129Zm-21,0a3,3,0,1,1,3,3A3,3,0,0,1,42,129Zm-21,0a3,3,0,1,1,3,3A3,3,0,0,1,21,129ZM0,129a3,3,0,1,1,3,3A3,3,0,0,1,0,129Zm84-21a3,3,0,1,1,3,3A3,3,0,0,1,84,108Zm-21,0a3,3,0,1,1,3,3A3,3,0,0,1,63,108Zm-21,0a3,3,0,1,1,3,3A3,3,0,0,1,42,108Zm-21,0a3,3,0,1,1,3,3A3,3,0,0,1,21,108ZM0,108a3,3,0,1,1,3,3A3,3,0,0,1,0,108ZM84,87a3,3,0,1,1,3,3A3,3,0,0,1,84,87ZM63,87a3,3,0,1,1,3,3A3,3,0,0,1,63,87ZM42,87a3,3,0,1,1,3,3A3,3,0,0,1,42,87ZM21,87a3,3,0,1,1,3,3A3,3,0,0,1,21,87ZM0,87a3,3,0,1,1,3,3A3,3,0,0,1,0,87ZM84,66a3,3,0,1,1,3,3A3,3,0,0,1,84,66ZM63,66a3,3,0,1,1,3,3A3,3,0,0,1,63,66ZM42,66a3,3,0,1,1,3,3A3,3,0,0,1,42,66ZM21,66a3,3,0,1,1,3,3A3,3,0,0,1,21,66ZM0,66a3,3,0,1,1,3,3A3,3,0,0,1,0,66ZM84,45a3,3,0,1,1,3,3A3,3,0,0,1,84,45ZM63,45a3,3,0,1,1,3,3A3,3,0,0,1,63,45ZM42,45a3,3,0,1,1,3,3A3,3,0,0,1,42,45ZM21,45a3,3,0,1,1,3,3A3,3,0,0,1,21,45ZM0,45a3,3,0,1,1,3,3A3,3,0,0,1,0,45ZM84,24a3,3,0,1,1,3,3A3,3,0,0,1,84,24ZM63,24a3,3,0,1,1,3,3A3,3,0,0,1,63,24ZM42,24a3,3,0,1,1,3,3A3,3,0,0,1,42,24ZM21,24a3,3,0,1,1,3,3A3,3,0,0,1,21,24ZM0,24a3,3,0,1,1,3,3A3,3,0,0,1,0,24ZM84,3a3,3,0,1,1,3,3A3,3,0,0,1,84,3ZM63,3a3,3,0,1,1,3,3A3,3,0,0,1,63,3ZM42,3a3,3,0,1,1,3,3A3,3,0,0,1,42,3ZM21,3a3,3,0,1,1,3,3A3,3,0,0,1,21,3ZM0,3A3,3,0,1,1,3,6,3,3,0,0,1,0,3Z" fill="#fff"/>
          </svg>
        </div>
    </div>
  );
}

export default Banner
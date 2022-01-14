import React, { useState, useEffect } from 'react';
import ItemsCarousel from 'react-items-carousel';
import { Button } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

function Process() {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [numberOfCard, setNumberOfCard] = useState(2)

  useEffect(()=>{
    let width = window.innerWidth
    setCard(width)
    window.addEventListener('resize', (event)=>{
      setCard(event.target.innerWidth)
    });
  },[])
  const setCard = (width)=> {
    // console.log(width);
    if(width > 1366){
      setNumberOfCard(5)
    } else if(width > 999){
      setNumberOfCard(4)
    } else if(width > 769){
      setNumberOfCard(3)
    } else if(width > 578){
      setNumberOfCard(2)
    } else {
      setNumberOfCard(1)
    }
  }
  return (
    <div id="process">
        <div className="deco"><svg xmlns="http://www.w3.org/2000/svg" width="90" height="153" viewBox="0 0 90 153">
            <path id="circleGrid" d="M84,150a3,3,0,1,1,3,3A3,3,0,0,1,84,150Zm-21,0a3,3,0,1,1,3,3A3,3,0,0,1,63,150Zm-21,0a3,3,0,1,1,3,3A3,3,0,0,1,42,150Zm-21,0a3,3,0,1,1,3,3A3,3,0,0,1,21,150ZM0,150a3,3,0,1,1,3,3A3,3,0,0,1,0,150Zm84-21a3,3,0,1,1,3,3A3,3,0,0,1,84,129Zm-21,0a3,3,0,1,1,3,3A3,3,0,0,1,63,129Zm-21,0a3,3,0,1,1,3,3A3,3,0,0,1,42,129Zm-21,0a3,3,0,1,1,3,3A3,3,0,0,1,21,129ZM0,129a3,3,0,1,1,3,3A3,3,0,0,1,0,129Zm84-21a3,3,0,1,1,3,3A3,3,0,0,1,84,108Zm-21,0a3,3,0,1,1,3,3A3,3,0,0,1,63,108Zm-21,0a3,3,0,1,1,3,3A3,3,0,0,1,42,108Zm-21,0a3,3,0,1,1,3,3A3,3,0,0,1,21,108ZM0,108a3,3,0,1,1,3,3A3,3,0,0,1,0,108ZM84,87a3,3,0,1,1,3,3A3,3,0,0,1,84,87ZM63,87a3,3,0,1,1,3,3A3,3,0,0,1,63,87ZM42,87a3,3,0,1,1,3,3A3,3,0,0,1,42,87ZM21,87a3,3,0,1,1,3,3A3,3,0,0,1,21,87ZM0,87a3,3,0,1,1,3,3A3,3,0,0,1,0,87ZM84,66a3,3,0,1,1,3,3A3,3,0,0,1,84,66ZM63,66a3,3,0,1,1,3,3A3,3,0,0,1,63,66ZM42,66a3,3,0,1,1,3,3A3,3,0,0,1,42,66ZM21,66a3,3,0,1,1,3,3A3,3,0,0,1,21,66ZM0,66a3,3,0,1,1,3,3A3,3,0,0,1,0,66ZM84,45a3,3,0,1,1,3,3A3,3,0,0,1,84,45ZM63,45a3,3,0,1,1,3,3A3,3,0,0,1,63,45ZM42,45a3,3,0,1,1,3,3A3,3,0,0,1,42,45ZM21,45a3,3,0,1,1,3,3A3,3,0,0,1,21,45ZM0,45a3,3,0,1,1,3,3A3,3,0,0,1,0,45ZM84,24a3,3,0,1,1,3,3A3,3,0,0,1,84,24ZM63,24a3,3,0,1,1,3,3A3,3,0,0,1,63,24ZM42,24a3,3,0,1,1,3,3A3,3,0,0,1,42,24ZM21,24a3,3,0,1,1,3,3A3,3,0,0,1,21,24ZM0,24a3,3,0,1,1,3,3A3,3,0,0,1,0,24ZM84,3a3,3,0,1,1,3,3A3,3,0,0,1,84,3ZM63,3a3,3,0,1,1,3,3A3,3,0,0,1,63,3ZM42,3a3,3,0,1,1,3,3A3,3,0,0,1,42,3ZM21,3a3,3,0,1,1,3,3A3,3,0,0,1,21,3ZM0,3A3,3,0,1,1,3,6,3,3,0,0,1,0,3Z" fill="#304FFE"/>
          </svg>
        </div>
        <div className="container">
            <div className="row">
                <div className="col-sm-12">
                    <h4>The Process</h4>
                    <p>How Do We Do...</p>
                </div>
            </div>
        </div>
        <div className="container">
        <div id="processSlider">
          <ItemsCarousel
              requestToChangeActive={setActiveItemIndex}
              activeItemIndex={activeItemIndex}
              numberOfCards={numberOfCard}
              gutter={20}
              showSlither={true}
              leftChevron={<Button size="large"><ArrowBackIosIcon color="primary"/></Button>}
              rightChevron={<Button size="large"><ArrowForwardIosIcon color="primary" /></Button>}
              // infiniteLoop={true}
            >
            <div className="item" style={{height:'100%'}}>
                <div className="count"><svg id="secure" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">
                    <g id="Group_1235" data-name="Group 1235" transform="translate(20.565 6.429)">
                      <g id="Group_1234" data-name="Group 1234" transform="translate(0 0)">
                        <circle id="Ellipse_116" data-name="Ellipse 116" cx="1.5" cy="1.5" r="1.5" fill="#304ffe"/>
                      </g>
                    </g>
                    <g id="Group_1237" data-name="Group 1237" transform="translate(0 0)">
                      <g id="Group_1236" data-name="Group 1236">
                        <path id="Path_480" data-name="Path 480" d="M29.676,9.788a17.1,17.1,0,0,0-3.686-5.8A16.7,16.7,0,0,0,20.236.376a4.71,4.71,0,0,0-5,1.06l-4.6,4.581a4.691,4.691,0,0,0-.978,5.2c.242.543.5,1.075.785,1.588l-10.1,10.1A1.172,1.172,0,0,0,0,23.737v5.158a1.172,1.172,0,0,0,1.172,1.172H6.328A1.172,1.172,0,0,0,7.5,28.895v-2.11H9.609a1.172,1.172,0,0,0,1.172-1.172V23.5h2.109a1.172,1.172,0,0,0,0-2.344H9.609a1.172,1.172,0,0,0-1.172,1.172v2.11H6.328a1.172,1.172,0,0,0-1.172,1.172v2.11H2.344v-3.5L12.736,13.828a1.172,1.172,0,0,0,.173-1.437A18.971,18.971,0,0,1,11.8,10.265a2.334,2.334,0,0,1,.49-2.586l4.6-4.581A2.364,2.364,0,0,1,19.4,2.566a14.347,14.347,0,0,1,4.937,3.086,14.748,14.748,0,0,1,3.158,4.993,2.328,2.328,0,0,1-.525,2.5l-4.657,4.637a2.359,2.359,0,0,1-2.579.5,15.209,15.209,0,0,1-2.109-1.076,1.172,1.172,0,0,0-1.226,2,17.562,17.562,0,0,0,2.435,1.243,4.7,4.7,0,0,0,5.132-1.006l4.657-4.637A4.672,4.672,0,0,0,29.676,9.788Z" transform="translate(0 -0.067)" fill="#304ffe"/>
                      </g>
                    </g>
                  </svg>
                </div>
                <p>Users can easily issue trade documents to their trade partners using our available templates or import their existing file. Documents issued via the platform can be checked for authenticity.</p>
            </div>

            <div className="item" style={{height:'100%'}}>
                <div className="count"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">
                    <g id="signature" transform="translate(0 0.02)">
                      <path id="Path_465" data-name="Path 465" d="M25.572,9.568l-.937.936a10.8,10.8,0,0,0-3.712-.649A10.952,10.952,0,0,0,9.985,20.781a10.764,10.764,0,0,0,.65,3.708L9.11,26.012,5.8,22.7,2.56,19.47l.1-.1L18.322,3.737l.688-.687L22.172,6.2,25.56,9.555Z" transform="translate(0.64 0.767)" fill="#304ffe"/>
                      <path id="Path_466" data-name="Path 466" d="M2.678,17.2.05,24.438a.96.96,0,0,0,.225.988.937.937,0,0,0,.662.275.979.979,0,0,0,.325-.05l7.242-2.627Z" transform="translate(0 4.279)" fill="#304ffe"/>
                      <path id="Path_467" data-name="Path 467" d="M24.5,1.33A4.832,4.832,0,0,0,21.208-.02a4.631,4.631,0,0,0-3.262,1.387L16.419,2.926a.031.031,0,0,0,.009.005l3.163,3.15,3.386,3.36s0,.006.006.009l1.55-1.582A4.569,4.569,0,0,0,25.87,4.63V4.58A4.539,4.539,0,0,0,24.5,1.33Z" transform="translate(4.105)" fill="#304ffe"/>
                      <path id="Subtraction_1" data-name="Subtraction 1" d="M-624-3328.02a9.01,9.01,0,0,1-9-9,9.01,9.01,0,0,1,9-9,9.01,9.01,0,0,1,9,9A9.01,9.01,0,0,1-624-3328.02Zm-1.657-6.57h2.376l-.233,1.209a.678.678,0,0,0,.145.61.765.765,0,0,0,.608.251.762.762,0,0,0,.485-.154.638.638,0,0,0,.239-.4l.292-1.517h.94a.871.871,0,0,0,.558-.18.569.569,0,0,0,.224-.463.637.637,0,0,0-.224-.5.814.814,0,0,0-.558-.2h-.681l.431-2.237h.772a.867.867,0,0,0,.558-.181.568.568,0,0,0,.224-.462.64.64,0,0,0-.224-.5.817.817,0,0,0-.558-.2h-.514l.223-1.157a.68.68,0,0,0-.145-.61.748.748,0,0,0-.594-.251.817.817,0,0,0-.492.147.608.608,0,0,0-.247.405l-.283,1.466h-2.375l.223-1.157a.682.682,0,0,0-.145-.61.766.766,0,0,0-.609-.251.793.793,0,0,0-.478.147.611.611,0,0,0-.247.405l-.283,1.466h-.934a.864.864,0,0,0-.558.18.566.566,0,0,0-.225.462.638.638,0,0,0,.225.5.81.81,0,0,0,.558.2h.676l-.431,2.237h-.781a.868.868,0,0,0-.558.18.57.57,0,0,0-.225.464.637.637,0,0,0,.225.495.814.814,0,0,0,.558.2h.523l-.233,1.209a.726.726,0,0,0,.152.61.727.727,0,0,0,.587.251.791.791,0,0,0,.492-.154.618.618,0,0,0,.247-.4l.292-1.517Zm2.634-1.337H-625.4l.432-2.237h2.375l-.431,2.236Z" transform="translate(645 3358)" fill="#304ffe"/>
                    </g>
                  </svg>
                </div>
                <p>A unique hash (file signature) is created for the trade document and registered using IMDA’s TradeTrust Open Attestation Framework. Every action is updated to provide immutable audit trails.</p>
            </div>

            <div className="item" style={{height:'100%'}}>
                <div className="count"><svg id="verify" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">
                    <g id="Group_1229" data-name="Group 1229" transform="translate(10 10.625)">
                      <g id="Group_1228" data-name="Group 1228">
                        <path id="Path_477" data-name="Path 477" d="M139.511,136.368a1.25,1.25,0,0,0-1.767,0l-5.366,5.366-2.241-2.241a1.25,1.25,0,0,0-1.767,1.767l3.125,3.125a1.249,1.249,0,0,0,1.767,0l6.25-6.25A1.25,1.25,0,0,0,139.511,136.368Z" transform="translate(-128.002 -136.002)" fill="#304ffe"/>
                      </g>
                    </g>
                    <g id="Group_1231" data-name="Group 1231" transform="translate(0 0)">
                      <g id="Group_1230" data-name="Group 1230">
                        <path id="Path_478" data-name="Path 478" d="M28.75,13.75A1.25,1.25,0,0,0,27.5,15a12.5,12.5,0,1,1-3.629-8.807,1.25,1.25,0,1,0,1.774-1.761A15,15,0,1,0,30,15,1.25,1.25,0,0,0,28.75,13.75Z" transform="translate(0 0)" fill="#304ffe"/>
                      </g>
                    </g>
                  </svg>
                </div>
                <p>The platform checks the trade document’s unique file signature against the smart contract to provide attestation and ensuring that the document is not being tampered.</p>
            </div>

            <div className="item" style={{height:'100%'}}>
                <div className="count"><svg id="edit" xmlns="http://www.w3.org/2000/svg" width="34" height="30" viewBox="0 0 34 30">
                    <path id="Path_481" data-name="Path 481" d="M191.827,383.826H172.165a1.512,1.512,0,1,1,0-3.025h19.662a1.512,1.512,0,1,1,0,3.025Zm0,0" transform="translate(-159.34 -353.826)" fill="#304ffe"/>
                    <path id="Path_482" data-name="Path 482" d="M285.97,3.322l-2.139-2.139a3.1,3.1,0,0,0-4.277,0l-3.128,3.128,6.416,6.416L285.97,7.6a3.023,3.023,0,0,0,0-4.277Zm0,0" transform="translate(-257.614 -0.326)" fill="#304ffe"/>
                    <path id="Path_483" data-name="Path 483" d="M17.458,86.719,1.87,102.307a.742.742,0,0,0-.2.361l-1.649,7a.757.757,0,0,0,.909.911l7-1.649a.752.752,0,0,0,.361-.2L23.874,93.137Zm0,0" transform="translate(0 -80.594)" fill="#304ffe"/>
                  </svg>
                </div>
                <p>Contents in the document can be edited by the users for the recipients acceptance. The changes will then be updated in the file signature for future attestation.</p>
            </div>

            <div className="item" style={{height:'100%'}}>
                <div className="count"><svg id="temepered" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">
                    <path id="Path_469" data-name="Path 469" d="M200.024,10.279a.583.583,0,0,0,.824,0L205.7,5.425a3.711,3.711,0,0,1,5.249,5.247L206.1,15.528a.579.579,0,0,0,0,.819l1.994,1.993a.583.583,0,0,0,.824,0l5.11-5.107A7.692,7.692,0,0,0,203.142,2.357l-5.112,5.11a.579.579,0,0,0,0,.819Z" transform="translate(-186.277 -0.104)" fill="#304ffe"/>
                    <path id="Path_470" data-name="Path 470" d="M16.062,209.4a.583.583,0,0,0-.824,0l-4.665,4.663a3.711,3.711,0,0,1-5.249-5.247l4.667-4.665a.579.579,0,0,0,0-.819L8,201.337a.583.583,0,0,0-.824,0l-4.919,4.917A7.692,7.692,0,0,0,13.135,217.13l4.921-4.919a.579.579,0,0,0,0-.819Z" transform="translate(-0.001 -189.383)" fill="#304ffe"/>
                    <path id="Path_471" data-name="Path 471" d="M.878,140.578l4.13,1.032a.879.879,0,0,0,.426-1.706L1.3,138.872a.879.879,0,0,0-.426,1.706Z" transform="translate(-0.2 -130.715)" fill="#304ffe"/>
                    <path id="Path_472" data-name="Path 472" d="M62.4,63.72a.879.879,0,0,0,1.243-1.243l-3.2-3.2A.879.879,0,1,0,59.2,60.52Z" transform="translate(-55.486 -55.567)" fill="#304ffe"/>
                    <path id="Path_473" data-name="Path 473" d="M139.859,5.539a.879.879,0,0,0,1.706-.427L140.532.985a.879.879,0,0,0-1.706.427Z" transform="translate(-130.669 -0.306)" fill="#304ffe"/>
                    <path id="Path_474" data-name="Path 474" d="M416.635,326.7l-4.13-1.032a.879.879,0,0,0-.426,1.706l4.13,1.032a.879.879,0,1,0,.426-1.706Z" transform="translate(-387.314 -306.563)" fill="#304ffe"/>
                    <path id="Path_475" data-name="Path 475" d="M370.051,368.75a.879.879,0,1,0-1.243,1.243l3.2,3.2a.879.879,0,0,0,1.243-1.243Z" transform="translate(-346.963 -346.903)" fill="#304ffe"/>
                    <path id="Path_476" data-name="Path 476" d="M327.41,412a.879.879,0,0,0-1.706.427l1.032,4.128a.879.879,0,0,0,1.706-.427Z" transform="translate(-306.6 -387.237)" fill="#304ffe"/>
                  </svg>
                </div>
                <p>The platform will indicate if the trade document does not match with the original file signature, thus there’s a likelihood that the content in the document has been tampered.</p>
            </div>
         </ItemsCarousel>
      
        </div>
  
        </div>
      </div>
  );
}

export default Process
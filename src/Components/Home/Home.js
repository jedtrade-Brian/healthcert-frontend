import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import AppAppBar from "./AppBar"
import AppFooter from "./AppFooter"
import Banner from "./Banner"
import About from './About'
import Benefits from './Benefits'
import Process from './Process'
import Contact from './Contact'
import MoreInfo from './MoreInfo'
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './assets/css/style.css'
import "./Home.css"
export function Home(props) {

  useEffect(()=>{
    // var cont = $('.container').width()
    //     var winWidth = $(window.outerWidth)[0];
    //     var margin = (winWidth - cont) / 2;
    //     $('.bannerContent, #processSlider').css('margin-left', margin);
    //     $(setTimeout(function() {
    //         $('.owl-nav').css('right', margin * 1.5);
    //     }, 2000));

    //     $('.navbar-toggler').click(function() {
    //         $(this).toggleClass('active');
    //     })

        // $("#menu a").click(function(e) {
        //     var elem = $(this).attr('href');
        //     $('#menu').removeClass('show');
        //     $('.navbar-toggler').removeClass('active');
        //     if (elem == "#home") {
        //         $('html, body').animate({
        //             scrollTop: 0
        //         }, 'slow');
        //     } else if (elem != "#home" && elem != "#close") {
        //         $('html, body').animate({
        //             scrollTop: $(elem).offset().top - 80
        //         }, 'slow');
        //     } else {
        //         e.preventDefault();
        //     }
        // });
        
        
          window.addEventListener('scroll', () => {
              let header = document.getElementById('scrollHeader')
              if(header){
                if(window.scrollY>100){
                  header.classList.add('fixed')
                }else{
                  header.classList.remove('fixed')
                }
              }
        });
  },[])
 
  return (
    <div >
      <AppAppBar></AppAppBar>
      <Banner></Banner>
      <About></About>
      <Benefits></Benefits>
      <Process></Process>
      <MoreInfo></MoreInfo>
      <Contact></Contact>
      {/* <Subscribe></Subscribe> */}
      <AppFooter></AppFooter>
    </div>
  );
}

export default withRouter(Home)

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import authService from '../../services/authService';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

function AppAppBar() {
  const [token, setToken] = useState(null)
  const [user , setUser] = useState(null)
  useEffect(() => {
    const token = authService.getAuthToken()
    const userData = authService.getUserInfo()
    setUser(userData)
    setToken(token)
    var header = document.getElementById('menu');
    var btns = header.getElementsByClassName('btn');
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener('click', function () {
        var current = document.getElementsByClassName('active');
        current[0].className = current[0].className.replace(' active', '');
        this.className += ' active';
      });
    }
  },[]);

  const handleClick = (ids) => {
    onCloseClick();
    if (ids === 'home') {
      const scrollToTop = () => {
        const c = document.documentElement.scrollTop || document.body.scrollTop;
        if (c > 0) {
          window.requestAnimationFrame(scrollToTop);
          window.scrollTo(0, c - c / 20);
        }
      };
      scrollToTop();
    } else {
      const element = document.getElementById(ids);
      const offset = 45;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const onCloseClick = () => {
    var element = document.getElementById('menu');
    element.classList.remove('collapse');
    element.classList.remove('show');
  };

  return (
    <header id='scrollHeader'>
      <div className='container'>
        <div className='row'>
          <div className='col-sm-12' style={{ width: '100%' }}>
            <div className='flex' style={{ width: '100%' }}>
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
              <div className='nav' id='menu'>
                <ul>
                  <li>
                    <a onClick={() => onCloseClick()}>
                      <span>Menu</span>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='19'
                        height='17.54'
                        viewBox='0 0 19 17.54'
                      >
                        <g
                          id='Group_1238'
                          data-name='Group 1238'
                          transform='translate(-901 -7472.73)'
                        >
                          <g
                            id='Rectangle_407'
                            data-name='Rectangle 407'
                            transform='translate(901 7473)'
                            fill='#fff'
                            stroke='#707070'
                            strokeWidth='1'
                            opacity='0'
                          >
                            <rect width='19' height='17' stroke='none' />
                            <rect
                              x='0.5'
                              y='0.5'
                              width='18'
                              height='16'
                              fill='none'
                            />
                          </g>
                          <g
                            id='menuIcon'
                            transform='translate(-8907 3009.844)'
                          >
                            <line
                              id='Line_1'
                              data-name='Line 1'
                              x2='17.137'
                              y2='1.248'
                              transform='translate(9824 4466.039) rotate(135)'
                              fill='none'
                              stroke='#424242'
                              strokeLinecap='round'
                              strokeWidth='3'
                            />
                            <line
                              id='Line_2'
                              data-name='Line 2'
                              y1='1.248'
                              x2='17.137'
                              transform='translate(9811.883 4465.157) rotate(45)'
                              fill='none'
                              stroke='#424242'
                              strokeLinecap='round'
                              strokeWidth='3'
                            />
                          </g>
                        </g>
                      </svg>
                    </a>
                  </li>
                  <li>
                    <Link
                      to='/'
                      onClick={() => handleClick('home')}
                      className='btn active'
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to='/'
                      onClick={() => handleClick('benefits')}
                      className='btn'
                    >
                      Benefits
                    </Link>
                  </li>
                  <li>
                    <Link
                      to='/'
                      onClick={() => handleClick('process')}
                      className='btn'
                    >
                      Process
                    </Link>
                  </li>
                  <li>
                    <Link
                      to='/'
                      onClick={() => handleClick('jedtrade')}
                      className='btn'
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      to='/'
                      onClick={() => handleClick('subscribe')}
                      className='btn'
                    >
                      Contact Us
                    </Link>
                  </li>
                  {!token ? (
                    <>
                      <li className="loginList">
                        <Link to='/login' className='menuBtn'>
                          Login
                        </Link>
                      </li>
                      <li className="signupList">
                        <Link to='/createAccount' className='menuBtn'>
                          Sign Up
                        </Link>
                      </li>
                    </>
                  ) : (
                    <>
                     
                      <li className="menuBtnList">
                        <Link to={authService.getRole() === 'enterprise' ? '/Certificate' : authService.getRole() === 'financier' ? '/Certificate' : ''} className='menuBtn'>
                          Dashboard
                        </Link>
                      </li>
                      <li className="userinfoSection">
                        {/* <AccountCircleIcon color="secondary"></AccountCircleIcon> */}
                        <span className="userInfo">Welcome</span>
                        <span className="userName">{user.name.split(' ')[0]}</span>
                        {/* <Link to='/login' className='menuBtn'>
                          Login
                        </Link> */}
                      </li>
                    </>
                  )}
                  
                </ul>
              </div>

              <button
                className='navbar-toggler'
                type='button'
                data-toggle='collapse'
                data-target='#menu'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='navIcon'
                  width='19'
                  height='17'
                  viewBox='0 0 19 17'
                >
                  <g id='menuIcon' transform='translate(-9807 -4467)'>
                    <line
                      id='Line_1'
                      className='line'
                      data-name='Line 1'
                      x2='16'
                      transform='translate(9808.5 4468.5)'
                      fill='none'
                      stroke='#fff'
                      strokeLinecap='round'
                      strokeWidth='3'
                    />
                    <line
                      id='Line_2'
                      data-name='Line 2'
                      x2='16'
                      transform='translate(9808.5 4475.5)'
                      fill='none'
                      className='line'
                      stroke='#fff'
                      strokeLinecap='round'
                      strokeWidth='3'
                    />
                    <line
                      id='Line_3'
                      data-name='Line 3'
                      x2='8'
                      transform='translate(9808.5 4482.5)'
                      fill='none'
                      className='line'
                      stroke='#fff'
                      strokeLinecap='round'
                      strokeWidth='3'
                    />
                  </g>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default AppAppBar;

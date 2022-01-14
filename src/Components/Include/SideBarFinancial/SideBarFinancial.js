import React, { useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  CssBaseline,
  List,
  Drawer,
  Collapse,
  Avatar,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import CopyrightIcon from '@material-ui/icons/Copyright';
import { routingList } from './RouteContent';
import { Link, useHistory } from 'react-router-dom';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import authService from "../../../services/authService";
import { getUsers } from "../../../services/userService";
import { BackdropLoader } from "../../../services/loader";

import './SideBarFinancial.css';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  sectionDesktop: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    // marginLeft: drawerWidth,
    // width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  headerShift: {
    // marginLeft: drawerWidth,
    // width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    // width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    // width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingLeft: '20px',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  title: {
    flexGrow: 0,
    // padding: theme.spacing(3)
  },
  nested: {
    paddingLeft: theme.spacing(3),
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
  },
}));

function SideBarFinancial(props) {
  let listConfig = routingList;
  const history = useHistory();
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [close, setClose] = React.useState(false);
  const [customClass, setCustomClass] = React.useState(null);
  const [customNewClass, setNewCustomClass] = React.useState(null);
  const [sublist, sublistOpen] = React.useState(true);
  const [loader, setLoader] = React.useState(false);
  const [loginUser, setLoginUser] = React.useState({});
  const [userInitials, setUserInitials] = React.useState("");

  const sidebarHeader = 'sidebarHeader';
  const handleClick = () => {
    sublistOpen(!sublist);
  };
  const handleDrawerOpen = () => {
    setCustomClass('drawerOpenClass');
    setNewCustomClass("Sidebar sidebarslide")
    setOpen(true);
    setClose(false);
  };
  const handleDrawerClose = () => {
    setCustomClass('mainContent');
    setNewCustomClass("Sidebar")
    setOpen(false);
    setClose(true);
  };
  window.addEventListener('storage', (e) => {
    if (e.key === 'token' && e.oldValue && e.newValue === null) {
      authService.logout()
    }
  });

  useEffect(() => {
    const userData = authService.getUserInfo()
    if(userData){
      setLoginUser({
        name: capital_letter(userData.name),
        email: userData.email
      });
    } else {
      getUser();
    }
  }, []);

  const getUser = async () => {
    setLoader(true);
    try {
      const response = await getUsers();
      setLoader(false);
      if (response && response.data) {
        authService.setUserInfo(response.data);
        setLoginUser({
          name: capital_letter(response.data.name),
          email: response.data.email
        });
      }
    } catch (error) {
      setLoader(false);
    }
  };

  const capital_letter = str => {
    str = str.split(" ");
    let letter = "";
    for (var i = 0, x = str.length; i < x; i++) {
      str[i] = str[i][0].toUpperCase() + str[i].substr(1);
      letter = letter + str[i][0].toUpperCase();
    }
    setUserInitials(letter);
    return str.join(" ");
  };

  const profileScreen = () => {
    props.children.props.history.push('/profileFinancial');
  };

  return (
    <div className={classes.root}>
      <BackdropLoader open={loader} />
      <CssBaseline />
      <div className={customNewClass ? customNewClass : "Sidebar"}>
        <IconButton
          color='inherit'
          aria-label='open d+rawer'
          onClick={handleDrawerOpen}
          edge='start'
          className={clsx(classes.menuButton, {
            [classes.hide]: open,
          })}
          style={{ color: '#4169e1' }}
        >
          <MenuIcon />
        </IconButton>
        <Drawer
          variant='persistent'
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
          open={open}
          anchor='left'
        >
          <div className={(classes.toolbar, sidebarHeader)}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              xlink='http://www.w3.org/1999/xlink'
              width='78'
              height='87'
              viewBox='0 0 78 87'
              style={{cursor: 'pointer'}}
              onClick={() => history.push('')}
            >
              <defs>
                <clipPath id='clip-path'>
                  <rect
                    id='Rectangle_371'
                    data-name='Rectangle 371'
                    width='78'
                    height='87'
                    transform='translate(-2269 -5850)'
                    fill='#fff'
                    opacity='0.2'
                  />
                </clipPath>
              </defs>
              <g
                id='logo'
                transform='translate(2269 5850)'
                clipPath='url(#clip-path)'
              >
                <g
                  id='Group_1069'
                  data-name='Group 1069'
                  transform='translate(-3989.496 -5953.821)'
                >
                  <path
                    id='Oval-3'
                    d='M37.529,6.955a38.144,38.144,0,0,0,6.084,75.8'
                    transform='translate(1701.713 146.92) rotate(-45)'
                    fill='none'
                    stroke='#fff'
                    strokeLinecap='square'
                    strokeWidth='9'
                    fillRule='evenodd'
                  />
                  <path
                    id='Oval-3-2'
                    data-name='Oval-3'
                    d='M81.755,44.614A38.187,38.187,0,0,0,70.912,17.976'
                    transform='translate(1702.054 146.92) rotate(-45)'
                    fill='none'
                    stroke='#fff'
                    strokeLinecap='square'
                    strokeWidth='9'
                    fillRule='evenodd'
                  />
                  <path
                    id='Path_435'
                    data-name='Path 435'
                    d='M.1,1.979l9.979-3.887-.031,31.94H31.026l-.031,9.953H10V44s-.037,5.375,7.8,7.348a15.406,15.406,0,0,0,11.313-1.856l6.127,6.252a26.852,26.852,0,0,1-22.372,3.5C-.248,53.378,0,44,0,44Z'
                    transform='translate(1744 108)'
                    fill='#fff'
                  />
                </g>
              </g>
            </svg>
            <span onClick={() => history.push('')} style={{cursor: 'pointer'}}>ConsenTrade</span>
            <IconButton
              style={{ color: '#4169e1' }}
              className={clsx(classes.menuButton, {
                [classes.hide]: close,
              })}
              onClick={handleDrawerClose}
            >
              <ArrowBackIosIcon />
            </IconButton>
          </div>
          <div className='profilePart' onClick={profileScreen}>
            <Avatar>{userInitials}</Avatar>
            <div>
              <h5>{loginUser.name}</h5>
              <span>{loginUser.email}</span>
            </div>
          </div>
          <div className='outerDivForLists'>
            <List className='lists'>
              {listConfig.map((items, index) => (
                <div
                  key={index}
                  className={items.className ? items.className : ''}
                >
                  {items.type === 'subListType' ? (
                    <div className='subListHeadings'>
                      <ListItem button onClick={handleClick}>
                        <ListItemIcon>
                          <span className={items.icon}></span>
                        </ListItemIcon>
                        <ListItemText primary={items.title} />
                        {sublist ? <ExpandLess /> : <ExpandMore />}
                      </ListItem>
                      <Collapse in={sublist} timeout='auto' unmountOnExit>
                        <List component='div' disablePadding>
                          {items.item.map((subitem, index) => (
                            <div>
                              <ListItem
                                button
                                className={classes.nested}
                                key={subitem.title}
                                component={Link}
                                to={`${subitem.path}`}
                              >
                                <ListItemIcon>
                                  <span className={items.icon}></span>
                                </ListItemIcon>
                                <ListItemText primary={subitem.title} />
                              </ListItem>
                            </div>
                          ))}
                        </List>
                      </Collapse>
                    </div>
                  ) : (
                    <div
                      className={
                        props &&
                        props.children &&
                        props.children.props &&
                        props.children.props.location.pathname == items.path
                          ? 'active'
                          : ''
                      }
                    >
                      <span key={index}>
                        <ListItem
                          button
                          // onClick={sidebarClick}
                          key={items.title}
                          component={Link}
                          to={`${items.path}`}
                        >
                          <ListItemIcon>
                            <span className='icons'>{items.image} </span>
                          </ListItemIcon>
                          <ListItemText primary={items.title} />
                        </ListItem>
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </List>
          </div>
          <div className='sidebarFotter'>
            <CopyrightIcon />
            <span>{' 2021 JupytonCert'}</span>
          </div>
        </Drawer>
      </div>
      {/*  */}
      <div className={customClass ? customClass : 'drawerOpenClass'}>
        <div>
          <main
            className={clsx(classes.content, {
              [classes.contentShift]: open,
            })}
          >
            {props.children}
          </main>
        </div>
      </div>
    </div>
  );
}

export default SideBarFinancial;

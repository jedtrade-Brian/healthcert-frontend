import React, { useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
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
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import CopyrightIcon from "@material-ui/icons/Copyright";
import { routingList } from "./RouteContent";
import { Link, useHistory } from "react-router-dom";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import authService from "../../../services/authService";
import { getUsers } from "../../../services/userService";
import { BackdropLoader } from "../../../services/loader";

import "./Sidebar.css";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  sectionDesktop: {
    display: "flex",
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    // marginLeft: drawerWidth,
    // width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  headerShift: {
    // marginLeft: drawerWidth,
    // width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    // width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    // width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingLeft: "20px",
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
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
  },
}));

function SideBar(props) {
  let listConfig = routingList;
  const history = useHistory();
  // const userInitials = localStorage.getItem('userInitials');
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [close, setClose] = React.useState(false);
  const [customClass, setCustomClass] = React.useState(null);
  const [customNewClass, setNewCustomClass] = React.useState(null);
  const [sublist, sublistOpen] = React.useState(true);
  const [loginUser, setLoginUser] = React.useState({});
  const [userInitials, setUserInitials] = React.useState("");
  const [loader, setLoader] = React.useState(false);
  const sidebarHeader = "sidebarHeader";
  const handleClick = () => {
    sublistOpen(!sublist);
  };
  const handleDrawerOpen = () => {
    setCustomClass("drawerOpenClass");
    setNewCustomClass("Sidebar sidebarslide");
    setOpen(true);
    setClose(false);
  };
  const handleDrawerClose = () => {
    setCustomClass("mainContent");
    setNewCustomClass("Sidebar");
    setOpen(false);
    setClose(true);
  };

  const getUser = async () => {
    setLoader(true);
    try {
      const response = await getUsers();
      setLoader(false);
      if (response && response.data) {
        authService.setUserInfo(response.data);
        setLoginUser({
          name: capital_letter(response.data.name),
          email: response.data.email,
        });
      }
    } catch (error) {
      setLoader(false);
    }
  };

  const capital_letter = (str) => {
    str = str.split(" ");
    let letter = "";
    for (var i = 0, x = str.length; i < x; i++) {
      str[i] = str[i][0].toUpperCase() + str[i].substr(1);
      letter = letter + str[i][0].toUpperCase();
    }
    setUserInitials(letter);
    return str.join(" ");
  };

  useEffect(() => {
    const userData = authService.getUserInfo();
    if (userData) {
      setLoginUser({
        name: capital_letter(userData.name),
        email: userData.email,
      });
    } else {
      getUser();
    }
  }, []);

  window.addEventListener("storage", (e) => {
    if (e.key === "token" && e.oldValue && e.newValue === null) {
      LogOut();
    }
  });
  const LogOut = () => {
    authService.logout();
    return (window.location = "");
  };
  const profileScreen = () => {
    props.children.props.history.push("/profile");
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <BackdropLoader open={loader} />
      <div className={customNewClass ? customNewClass : "Sidebar"}>
        <IconButton
          color="inherit"
          aria-label="open d+rawer"
          onClick={handleDrawerOpen}
          edge="start"
          className={clsx(classes.menuButton, {
            [classes.hide]: open,
          })}
          style={{ color: "#4169e1" }}
        >
          <MenuIcon />
        </IconButton>
        <Drawer
          variant="persistent"
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
          anchor="left"
        >
          <div className={(classes.toolbar, sidebarHeader)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="543"
              height="602"
              viewBox="0 0 543 602"
            >
            <path
                id="Color_Fill_1"
                fill="#fff"
                data-name="Color Fill 1"
                className="cls-1"
                d="M234,3c26,1.872,65.051,54.05,82,71,47.63,47.634,108.52,91.129,135,159,35.527,91.06-20.658,214.785-93,231-19.873,4.454-67.266-43.775-60-64,4.9-13.636,23.266-17,34-25,26.076-19.432,48.022-67.265,31-111-11.838-30.416-37.736-49.74-59-71l-67-69L204,90c-5.745-10.2,6.515-69.353,13-78C221.005,6.659,227.542,6.079,234,3ZM189,136c20.278,0.184,63.659,38.3,56,60-4.988,14.133-23.119,17.579-34,26-23.163,17.927-46.131,59.292-33,103,8.9,29.638,28.838,45.839,48,65L340,506c12.146,18.2-13.834,81.284-30,85-18.6,4.276-26.419-11.419-34-19l-70-70c-36.353-36.356-83.242-70.923-105-121-32.593-75.013-8.672-177.162,41-217C156.607,152.285,171.376,145.567,189,136Z"
              />
            </svg>
            <span
              onClick={() => history.push("/")}
              style={{ cursor: "pointer" }}
            >
              HealthCert
            </span>
            <IconButton
              style={{ color: "#4169e1" }}
              className={clsx(classes.menuButton, {
                [classes.hide]: close,
              })}
              onClick={handleDrawerClose}
            >
              <ArrowBackIosIcon />
            </IconButton>
          </div>
          <div className="profilePart" onClick={profileScreen}>
            <Avatar>{userInitials}</Avatar>
            <div>
              <h5>{loginUser.name}</h5>
              <span>{loginUser.email}</span>
            </div>
          </div>



          <div className="outerDivForLists">
            <List className="lists">
              {listConfig.map((items, index) => (
                <div
                  key={index}
                  className={items.className ? items.className : ""}
                >
                  {items.type === "subListType" ? (
                    <div className="subListHeadings">
                      <ListItem button onClick={handleClick}>
                        <ListItemIcon>
                          <span className={items.icon}></span>
                        </ListItemIcon>
                        <ListItemText primary={items.title} />
                        {sublist ? <ExpandLess /> : <ExpandMore />}
                      </ListItem>
                      <Collapse in={sublist} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
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
                        props.children.props.location.pathname === items.path
                          ? "sidebarColor"
                          : ""
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
                            <span className="icons">{items.image} </span>
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
          


          
          <div className="sidebarFotter">
            <CopyrightIcon />
            <span>{" 2021 HealthCert"}</span>
          </div>
        </Drawer>
      </div>
      {/*  */}
      <div className={customClass ? customClass : "drawerOpenClass"}>
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

export default SideBar;

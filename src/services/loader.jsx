import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { LinearProgress } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  colorPrimary: {
    backgroundColor: '#e8eaf6'
  },
  barColorPrimary: {
    backgroundColor: '#03a9f4'
  }
}));

export function BackdropLoader(props) {
  const classes = useStyles(); 
  return (
    <div>
      <Backdrop className={classes.backdrop} open={props.open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export function ColoredLinearProgress() {
  const classes = useStyles(); 

    return (
      <LinearProgress
        classes={{
          colorPrimary: classes.colorPrimary,
          barColorPrimary: classes.barColorPrimary
        }}
      />
    );
}
// withStyles(styles)(ColoredLinearProgress)

export default { ColoredLinearProgress, BackdropLoader }
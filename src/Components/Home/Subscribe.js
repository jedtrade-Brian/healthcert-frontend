import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Container from '@material-ui/core/Container';
import { Typography, TextField, Button } from '@material-ui/core';
import clsx from 'clsx';
import './Home.css'

const styles = (theme) => ({
  root: {
    marginTop: theme.spacing(10),
    marginBottom: '50px',
    display: 'flex',
  },
  cardWrapper: {
    zIndex: 1,
  },
  card: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#ffc071',// theme.palette.warning.main,
    padding: theme.spacing(8, 3),
  },
  cardContent: {
    maxWidth: 400,
  },
  textField: {
    width: '100%',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  button: {
    width: '100%',
  },
  imagesWrapper: {
    position: 'relative',
  },
  image: {
    position: 'absolute',
    top: -28,
    left: -28,
    right: 0,
    bottom: 0,
    width: '100%',
    maxWidth: 600,
  },
});

function Subscribe(props) {
  const { classes } = props;
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Subscribe Button Clicked');
  };

  return (
    <Container className={classes.root} component="section">
      <Grid container>
        <Grid item xs={12} md={6} className={classes.cardWrapper}>
          <div className={classes.card}>
            <form onSubmit={handleSubmit} className={classes.cardContent}>
              <Typography variant="h4" component="h2" gutterBottom>
                Subscribe for Email Notifications
              </Typography>
              <TextField className={clsx(classes.textField,'MuiOutlinedInput-root')} variant="outlined" placeholder="Your email" />
              <Button type="submit" color="primary" variant="contained" className={classes.button}>
                Subscribe
              </Button>
            </form>
          </div>
        </Grid>
        <Grid item xs={12} md={6} className={classes.imagesWrapper}>
          <Hidden smDown>
            {/* <div className={classes.imageDots} /> */}
            <img
              src="https://images.unsplash.com/photo-1527853787696-f7be74f2e39a?auto=format&fit=crop&w=750&q=80"
              alt="call to action"
              className={classes.image}
            />
          </Hidden>
        </Grid>
      </Grid>
    </Container>
  );
}

Subscribe.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Subscribe);
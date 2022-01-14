import React, { Component } from 'react';
import { Button, Dialog, IconButton, Typography, withStyles} from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import ConfirmDeclineIcon from '../../../assets/confirm.svg';
import CloseIcon from '@material-ui/icons/Close';


const styles = (theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });
  
  const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        {onClose ? (
          <IconButton
            aria-label='close'
            className={classes.closeButton}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
        <Typography variant='h6'>{children}</Typography>
      </MuiDialogTitle>
    );
  });
  
  const DialogContent = withStyles((theme) => ({
    root: {
      padding: theme.spacing(2),
    },
  }))(MuiDialogContent);

export class ConfirmationPopUp extends Component {
    render() {
      return (
        <div>
        <Dialog
          open={this.props.openDeclinedModal}
          onClose={this.props.onCancelClick}
          aria-labelledby='simple-modal-title'
          ariadescribedby='simple-modal-description'
          className='confirmationPopup'
        >
          <DialogTitle
            id='customized-dialog-title'
            onClose={this.props.onCancelClick}
          ></DialogTitle>
          <DialogContent>
            <div className='confirmDeclinePopup'>
              <img
                src={ConfirmDeclineIcon}
                alt='Confirm Revoked'
                className='confirmDeclineIcon'
              />
              <div>
                <h3>{this.props.title}</h3>
                <small>{this.props.message}</small>
              </div>
              <div className='actionBtns'>
                <Button
                  className='cancelBtn'
                  onClick={this.props.onCancelClick}
                >
                  CANCEL
                </Button>

                <Button
                  className='confirmBtn'
                  onClick={this.props.onConfirmClick}
                >
                  CONFIRM
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      )
    }
}

export default ConfirmationPopUp
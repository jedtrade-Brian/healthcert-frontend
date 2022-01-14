import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { DateRange as UiDateRange} from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import "./shared.css"


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
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });  
  const DialogContent = withStyles((theme) => ({
    root: {
      padding: theme.spacing(2),
    },
  }))(MuiDialogContent);
  
  const DialogActions = withStyles((theme) => ({
    root: {
      margin: 12,
      padding: theme.spacing(1),
    },
  }))(MuiDialogActions);  

class DateRange extends Component{
    constructor(props) {
        super(props);
        this.state = {
          showDateRange : false,
          selectedDate : null,
          dateRange : [
            {
              startDate: new Date(),
              endDate: new Date(),
              key: 'selection'
            }
          ]
        };
      }
    openDateRange = () => {
       this.setState({showDateRange:true})
    }
    handleClose = () => {
       this.setState({showDateRange:false})
    };
    handleSave = () => {
        const startDate = this.GetFormattedDate(this.state.dateRange[0].startDate)
        const endDate = this.GetFormattedDate(this.state.dateRange[0].endDate)
        const selectedDate = startDate + ' to ' + endDate
        this.props.onSave({startDate: this.state.dateRange[0].startDate,endDate: this.state.dateRange[0].endDate})
        this.setState({selectedDate,showDateRange:false})
    }
    handleClear = () => {
      this.props.onSave(null)
      this.setState({
        selectedDate:null,
        showDateRange:false, 
        dateRange:[
        {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection'
        }
       ]}
      ) 
    }
    GetFormattedDate = (date) => {   
        const month = date.getMonth() + 1
        const day = date.getDate()
        const year = date.getFullYear()
        return month + "/" + day + "/" + year;
    }
    render() {
        return (
            <div>
               <div className='dashboardDateRangeBtn' onClick={this.openDateRange}>
                <span>{this.state.selectedDate? this.state.selectedDate :"Date Range"}</span>
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='20.5'
                    height='20'
                    viewBox='0 0 31.5 36'
                >
                <path
                    id='Icon_awesome-calendar-alt'
                    data-name='Icon awesome-calendar-alt'
                    d='M0,32.625A3.376,3.376,0,0,0,3.375,36h24.75A3.376,3.376,0,0,0,31.5,32.625V13.5H0ZM22.5,18.844A.846.846,0,0,1,23.344,18h2.813a.846.846,0,0,1,.844.844v2.813a.846.846,0,0,1-.844.844H23.344a.846.846,0,0,1-.844-.844Zm0,9A.846.846,0,0,1,23.344,27h2.813a.846.846,0,0,1,.844.844v2.813a.846.846,0,0,1-.844.844H23.344a.846.846,0,0,1-.844-.844Zm-9-9A.846.846,0,0,1,14.344,18h2.813a.846.846,0,0,1,.844.844v2.813a.846.846,0,0,1-.844.844H14.344a.846.846,0,0,1-.844-.844Zm0,9A.846.846,0,0,1,14.344,27h2.813a.846.846,0,0,1,.844.844v2.813a.846.846,0,0,1-.844.844H14.344a.846.846,0,0,1-.844-.844Zm-9-9A.846.846,0,0,1,5.344,18H8.156A.846.846,0,0,1,9,18.844v2.813a.846.846,0,0,1-.844.844H5.344a.846.846,0,0,1-.844-.844Zm0,9A.846.846,0,0,1,5.344,27H8.156A.846.846,0,0,1,9,27.844v2.813a.846.846,0,0,1-.844.844H5.344a.846.846,0,0,1-.844-.844ZM28.125,4.5H24.75V1.125A1.128,1.128,0,0,0,23.625,0h-2.25A1.128,1.128,0,0,0,20.25,1.125V4.5h-9V1.125A1.128,1.128,0,0,0,10.125,0H7.875A1.128,1.128,0,0,0,6.75,1.125V4.5H3.375A3.376,3.376,0,0,0,0,7.875V11.25H31.5V7.875A3.376,3.376,0,0,0,28.125,4.5Z'
                />
                </svg>
               </div> 
               <Dialog onClose={this.handleClose} aria-labelledby="customized-dialog-title" open={this.state.showDateRange} className="customeDatePicker">
                    <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
                       Date Range
                    </DialogTitle>
                    <DialogContent dividers>
                        <UiDateRange
                            editableDateInputs={true}
                            onChange={item => this.setState({dateRange: [item.selection] })}
                            moveRangeOnFirstSelection={false}
                            ranges={this.state.dateRange}
                        />
                    </DialogContent>
                    <DialogActions>  
                      <Button onClick={this.handleClear} color="secondary">Clear Range</Button>
                      <Button onClick={this.handleSave}>Save Range</Button>
                    </DialogActions>
               </Dialog>
            </div>
        )
    }
}
export default DateRange
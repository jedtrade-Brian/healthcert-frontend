import React, { Component } from 'react'
import FormControl from '@material-ui/core/FormControl';
import 'bootstrap/dist/css/bootstrap.min.css';
import './settings.css'
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Checkmark } from 'react-checkmark';
import Switch from "react-switch";
import { format } from 'date-fns';
import { enGB } from 'date-fns/locale';
import { DatePickerCalendar } from 'react-nice-dates';
import 'react-nice-dates/build/style.css';


export class SectionOptions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0
        }
    }

    componentDidMount() {
        this.setState({ value: this.props.value });
    }

    handleChange = (event) => {
        this.setState({ value: event.target.value });
    }

    handleSlider = (checked) => {
        this.props.onSubmit(checked);
    }

    handleDate = (date) => {
        this.setState({ value: date });
    }

    getDate = (time) => {
        // Define function to get superscript ordinals of date
        let getSuperscriptOrdinals = (dateOfMonth) => {
            if(typeof dateOfMonth === "number" && dateOfMonth !== 0){
                let remainder = dateOfMonth % 10;
                switch(remainder){
                    case 1:
                        return dateOfMonth.toString() + "st";
                    case 2:
                        return dateOfMonth.toString() + "nd";
                    case 3:
                        return dateOfMonth.toString() + "rd";
                    default:
                        return dateOfMonth.toString() + "th";
                }
            } else {
                return dateOfMonth;
            }
        }
        //if time is 0 or null then display None
        if(!time) {
            return "None";
        }
        let date = new Date(time * 1000);
        return getSuperscriptOrdinals(date.getDate());
    }

    ensureDate = (date) => {
        if(typeof date === "object"){
            return date;
        }
        else {
            return null;
        }
    }

    formatData = (value) => {
        if (!value && typeof value !== "number"){
            return "None";
        } else {
            return value;
        }
    }

    render() {
        return (
            <>
                <div className="row">
                    <div className="col-sm-12">
                        <details>
                            <summary>
                                <hr/>
                                <div className="row optionDetails">
                                    <div className="col-sm-10">
                                        <div className="row removePadding">
                                            <div className="col-sm-5 removePadding">
                                                {this.props.config.title}
                                            </div>
                                            <div className="col-sm-7 removePadding">
                                                {
                                                    this.props.config.type === "TextInput"
                                                        ? <div>{this.props.config.inputAdornment} {this.formatData(this.props.value)}</div>
                                                        : this.props.config.type === "SliderInput"
                                                            ? this.props.value
                                                                ? <Checkmark size='24px' color='#23DC3D' />
                                                                :   <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="26px" height="26px" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20">
                                                                        <path d="M10 1.6a8.4 8.4 0 1 0 0 16.8a8.4 8.4 0 0 0 0-16.8zm4.789 11.461L13.06 14.79L10 11.729l-3.061 3.06L5.21 13.06L8.272 10L5.211 6.939L6.94 5.211L10 8.271l3.061-3.061l1.729 1.729L11.728 10l3.061 3.061z" fill="#626262"/>
                                                                    </svg>
                                                            : this.props.config.type === "DateInput"
                                                              ? <div>{this.getDate(this.props.value)}</div>
                                                              : <div>Invalid Option Type</div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-1 removePadding">
                                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="2.3em" height="2.3em" className="arrowRight" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                                            <path d="M8.593 18.157L14.25 12.5L8.593 6.843l-.707.707l4.95 4.95l-4.95 4.95l.707.707z" fill="#626262"/>
                                        </svg>
                                    </div>
                                </div>
                            </summary>
                            { this.props.config.type === "TextInput" 
                              ? <div className="row optionForm">
                                    <div className="col-sm-3 removePadding">
                                        <FormControl fullWidth>
                                            <InputLabel htmlFor="input">New {this.props.config.title}</InputLabel>
                                                <Input
                                                    id="input"
                                                    value={this.state.value}
                                                    onChange={this.handleChange}
                                                    startAdornment={<InputAdornment position="start">{this.props.config.inputAdornment}</InputAdornment>}
                                                />
                                        </FormControl>
                                    </div>
                                    <div className="col-sm-1 removePadding"><div id="heightSpacing"></div></div>
                                    <div className="col-sm-3 removePadding">
                                        <button className="btn btn-outline-primary" onClick={() => this.props.onSubmit(this.state.value)}>Update</button>
                                    </div>
                                </div>
                              : this.props.config.type === "SliderInput"
                                ? <div className="row optionForm">
                                        <div className="col-sm-3 removePadding">
                                            <Switch
                                                checked={this.props.value}
                                                onChange={this.handleSlider}
                                                onColor="#86d3ff"
                                                onHandleColor="#2693e6"
                                                handleDiameter={30}
                                                uncheckedIcon={false}
                                                checkedIcon={false}
                                                boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                                activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                                height={20}
                                                width={48}
                                                className="react-switch"
                                            />
                                        </div>
                                    </div>
                                : this.props.config.type === "DateInput"
                                  ? <div className="row optionForm">
                                        <div className="col-sm-7 removePadding">
                                            <p>
                                                Selected date: {this.state.value ? format(this.state.value, 'dd MMM yyyy', { locale: enGB }) : 'none'}.
                                            </p>
                                            <DatePickerCalendar date={this.ensureDate(this.state.value)} onDateChange={this.handleDate} locale={enGB} />
                                        </div>
                                        <div className="col-sm-1 removePadding"><div id="heightSpacing"></div></div>
                                        <div className="col-sm-3 removePadding">
                                            <button className="btn btn-outline-primary" onClick={() => this.props.onSubmit(this.state.value)}>Update</button>
                                        </div>
                                    </div>
                                  : <div className="optionForm"></div>
                            }
                        </details>
                    </div>
                </div>
            </>
        )
    }
}

export default SectionOptions

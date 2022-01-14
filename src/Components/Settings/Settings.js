import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import billingDrawing from '../../assets/BillingIllustration.png'
import './settings.css'
import { SettingsConfig } from "./OptionConfig"
import SectionOptions from "./SectionOptions"
import superuserService from "../../services/superuserService"
import { messagePopup } from '../../services/messagePopupService.jsx';
import { BackdropLoader } from '../../services/loader';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


export class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            RecipientEmail: "",
            MonthlyBilling: false,
            BillingDate: 0,
            UnitPrice: 0,
            Surcharge: 0,
            RevokePrice: "Under Maintenance",
            SelectedAccount: "TrainingVision",
            loader: true,
        }
    }

    componentDidMount() {
        this.retrieveConfig();
    }

    // handleChange = (prop) => (event) => {
    //     this.setState({ [prop]: event.target.value });
    // };

    // handleSwitch = (check) => {
    //     this.setState({ monthlybilling: check });
    // }

    retrieveConfig = async () => {
        let response = await superuserService.getConfigurations();
        if (response && response.status == 200) {
            let data = response.data[0];
            this.setState({ 
                MonthlyBilling: data.automatedMonthlyBill, 
                BillingDate: data.automatedEmailDate,
                Surcharge: data.billingSurCharge/100, 
                UnitPrice: data.certIssueUnitPrice/100, 
                RecipientEmail: data.adminEmail,
                loader: false,
            });
        } else {
            this.setState({ loader: false });
            messagePopup('Oops, something isn\'t working well', `Unable to retrieve current configuration`, 'error');
        }
    }

    handleSubmit = (prop) => async (newValue) => {
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
        // Start loader
        this.setState({ loader: true });
        // Assign specific function to updateFn based on prop value
        let accessor = prop.accessor
        let messageDisplyValue = newValue;
        try {
            if(prop.type === "DateInput"){
                messageDisplyValue = `${getSuperscriptOrdinals(newValue.getDate())} of every month`
                newValue = new Date(newValue).getTime() / 1000;
            }
            let response = await this.setConfiguration(accessor, newValue);
            if (response && response.status == 201){
                this.setState({ [accessor]: newValue, loader: false })
                messagePopup('Configurations Updated', `${prop.title} has been updated to ${prop.inputAdornment}${messageDisplyValue}`, 'success')
            } else {
                this.setState({ loader: false })
                messagePopup('Oops, something isn\'t working well', `Failed to update ${prop.title}`, 'error')
            }
        } catch(error) {
            this.setState({ loader: false });
            messagePopup('Oops, something isn\'t working well', `Failed to update ${prop.title}`, 'error');
            console.error(error);
        }
    }

    setConfiguration = (accessor, value) => {
        switch (accessor) {
            case "RecipientEmail":
                return superuserService.updateRecipientEmail(value.toString());
            case "UnitPrice":
                return superuserService.updateUnitPrice(value*100);
            case "Surcharge":
                return superuserService.updateSurcharge(value*100);
            case "MonthlyBilling":
                return superuserService.updateMonthlyBilling(value);
            case "BillingDate":
                return superuserService.updateBillingDate(value);
            case "RevokePrice":
                return { status: 201 };
            default:
                return;
        }
    };


    getValue = (accessor) => {
        switch (accessor) {
            case "RecipientEmail":
                return this.state.RecipientEmail;
            case "UnitPrice":
                return this.state.UnitPrice;
            case "Surcharge":
                return this.state.Surcharge;
            case "MonthlyBilling":
                return this.state.MonthlyBilling;
            case "BillingDate":
                return this.state.BillingDate;
            case "RevokePrice":
                return this.state.RevokePrice;
            default:
                return;
        }
    }

    handleAccountChange = (event) => {
        this.setState({ SelectedAccount: event.target.value });
    }

    render() {
        let options = SettingsConfig.options
        return (
            <>
                <BackdropLoader open={this.state.loader} />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-3">
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel id="accounts-select">Admin Account</InputLabel>
                                <Select
                                labelId="accounts-select"
                                value={this.state.SelectedAccount}
                                onChange={this.handleAccountChange}
                                label="Admin Account"
                                >
                                    <MenuItem value="TrainingVision">Training Vision</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <h2 className="title">Settings</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12 subtitle">
                            <div className="subtitle">Configurations and control panel for JupytonCert Web Portal</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="container-fluid section">
                                <div className="row sectionHead">
                                    <div className="col-sm-7">
                                        <h3 className="sectionHeader">Billing & Charges</h3>
                                        <div className="sectionSubHeader">Set unit price, surcharge and billing date for monthly billing</div>
                                    </div>
                                    <div className="col-sm-5">
                                        <img src={billingDrawing} className="drawing" alt="Payment Drawings" />
                                    </div>
                                </div>

                                {/* Add setting option */
                                    options.map((config) => {
                                        return <SectionOptions config={config} value={this.getValue(config.accessor)} onSubmit={this.handleSubmit(config)} />
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Settings;

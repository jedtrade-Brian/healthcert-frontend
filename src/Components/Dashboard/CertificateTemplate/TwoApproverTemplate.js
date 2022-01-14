import React, { Component } from 'react'
import certBackground from '../../../assets/43d70e329eccff324df7aac26017d4e3.png'
import opencertsLogo from '../../../assets/aaab203210feb25570cdd124a79370ff.svg'
import { openCertLogo, dummyLogo } from './SvgData'
import "./TemplateStyle.css"

export class TwoApproverTemplate extends Component {
    constructor (props) {
        super(props);
    }
    
    render() {
        const containerStyle = {
            backgroundImage: `url(${certBackground})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            border: "10px solid rgb(50, 67, 83)",
            height: "auto",
            width: "1100px",
        }
    
        const logoStyle = {
            width: "60%", 
            height: "auto",
            maxWidth: "1000px"
        }
    
        const bottomLogoStyle = {
            width: "100%", 
            height: "auto", 
            minWidth: "100px",
        }
    
        const hrStyle = {
            border: "none",
            height: "1px",
            backgroundColor: "rgb(51, 51, 51)"
        }

        let approver1 = this.props.data.docInfo.approvers[0];
        let approver2 = this.props.data.docInfo.approvers[1];

        return (
            <div style={containerStyle}>
                <div style={{border: "0px solid rgb(50, 67, 83)"}}>
                    <div className="my-5 m-lg-5 text-center">
                        <img src={openCertLogo} alt="OpenCerts Logo" className="certificate-asset" style={logoStyle} id="openCert" />
                    </div>
                    <div className="mb-4 mb-lg-5 d-flex justify-content-center cert-body" style={{textAlign: "center"}}>
                        <i>This is to certify that</i>
                    </div>
                    <div className="mb-4 mb-lg-5 d-flex justify-content-center cert-title">
                        <b>{this.props.data.docInfo.recipient.name}, {this.props.data.docInfo.recipient.lastName}</b>
                    </div>
                    <div className="mb-4 mb-lg-5 d-flex justify-content-center cert-body" style={{textAlign: "center"}}>
                        <i>has successfully completed the</i>
                    </div>
                    <div className="mb-4 mb-lg-5 d-flex justify-content-center cert-title" style={{textAlign: "center"}}>
                        {this.props.data.docInfo.recipient.courseName.toUpperCase()}
                    </div>
                    <div className="mb-4 mb-lg-5 d-flex justify-content-center cert-body" style={{textAlign: "center"}}>
                        <i>certification through training administered by</i>
                    </div>
                    <div className="row">
                        <div className="col"></div>
                        <div className="col">
                            <img className="w-100 certificate-asset" src={dummyLogo} alt="JupytonCerts Dummy Logo" style={bottomLogoStyle} id="trainvision" />
                        </div>
                        <div className="col"></div>
                    </div>
                    <div className="row" style={{paddingLeft: "8%", paddingRight: "8%", paddingTop: "5%", paddingBottom: "10%"}}>
                        <div className="col text-center transcript">
                            <img 
                                src={approver1.signature} style={{width: "auto", height: "auto", maxWidth: "100%", maxHeight: 128}} 
                                className={approver1.signature ? 'certificate-asset' : 'certificate-asset spacebox'}
                            />
                            <hr style={hrStyle} />
                            <div><b>{approver1.name}</b><br />{approver1.designation}<br />{approver1.companyName}</div>
                        </div>
                        <div className="col"></div>
                        <div className="col text-center transcript">
                            <img 
                                src={approver2.signature} style={{width: "auto", height: "auto", maxWidth: "100%", maxHeight: 128}} 
                                className={approver2.signature ? 'certificate-asset' : 'certificate-asset spacebox'}
                            />
                            <hr style={hrStyle} />
                            <div><b>{approver2.name}</b><br />{approver2.designation}<br />{approver2.companyName}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default TwoApproverTemplate;


import React, { Component } from 'react'
import certBackground from '../../../assets/43d70e329eccff324df7aac26017d4e3.png'
import opencertsLogo from '../../../assets/aaab203210feb25570cdd124a79370ff.svg'
import { openCertLogo, dummyLogo } from './SvgData'
import "./TemplateStyle.css"

export class CertificateGenerator extends Component {
    constructor (props) {
        super(props);
    }
    
    render() {
        const containerStyle = {
            backgroundImage: `url(${certBackground})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            border: "10px solid rgb(50, 67, 83)",
            height: "1100px",
            width: "1200px",
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

        let approver1 = this.props.approvers[0];
        let approver2 = this.props.approvers[1];

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
                        <b>Jason Tan</b>
                    </div>
                    <div className="mb-4 mb-lg-5 d-flex justify-content-center cert-body" style={{textAlign: "center"}}>
                        <i>has successfully completed the</i>
                    </div>
                    <div className="mb-4 mb-lg-5 d-flex justify-content-center cert-title" style={{textAlign: "center"}}>
                        ADVANCE DIPLOMA in Cyber Security
                    </div>
                    <div className="mb-4 mb-lg-5 d-flex justify-content-center cert-body" style={{textAlign: "center"}}>
                        <i>certification through training administered by</i>
                    </div>
                    <div className="row">
                        <div className="col"></div>
                        <div className="col">
                            <img className="w-100 certificate-asset" src={dummyLogo} alt="Training Vision Logo" style={bottomLogoStyle} id="trainvision" />
                        </div>
                        <div className="col"></div>
                    </div>
                    <div className="row" style={{paddingLeft: "8%", paddingRight: "8%", paddingTop: "5%", paddingBottom: "10%"}}>
                        <div className="col text-center transcript">
                            <img src={this.props.signature_1} style={{width: "auto", height: "auto", maxWidth: "100%", maxHeight: 128}} className="certificate-asset" />
                            <hr style={hrStyle} />
                            <div><b>{approver1.approverFirstName} {approver1.approverLastName}</b><br />{approver1.approverDesignation}</div>
                        </div>
                        <div className="col"></div>
                        <div className="col text-center transcript">
                            <img src={this.props.signature_2} style={{width: "auto", height: "auto", maxWidth: "100%", maxHeight: 128}} className="certificate-asset" />
                            <hr style={hrStyle} />
                            <div><b>{approver2.approverFirstName} {approver2.approverLastName}</b><br />{approver2.approverDesignation}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CertificateGenerator


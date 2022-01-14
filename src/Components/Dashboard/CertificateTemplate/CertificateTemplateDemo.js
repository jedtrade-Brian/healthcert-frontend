import React, { Component } from 'react'
import certBackground from '../../../assets/43d70e329eccff324df7aac26017d4e3.png'
import opencertsLogo from '../../../assets/aaab203210feb25570cdd124a79370ff.svg'
import { demoSignature, openCertLogo, dummyLogo } from './SvgData'

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

        let certificate = this.props.certificate
        let date = new Date(certificate.issuedOn)
        let dateIssued = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`

        // let certDOM = document.getElementById("rendered-certificate")


        return (
            <div style={containerStyle}>
                <div style={{border: "0px solid rgb(50, 67, 83)"}}>
                    <div className="my-5 m-lg-5 text-center">
                        <img src={openCertLogo} alt="OpenCerts Logo" style={logoStyle} id="openCert" />
                    </div>
                    <div className="mb-4 mb-lg-5 d-flex justify-content-center cert-body" style={{textAlign: "center"}}>
                        <i>This is to certify that</i>
                    </div>
                    <div className="mb-4 mb-lg-5 d-flex justify-content-center cert-title">
                        <b>{certificate.studentName}</b>
                    </div>
                    <div className="mb-4 mb-lg-5 d-flex justify-content-center cert-body" style={{textAlign: "center"}}>
                        <i>has successfully completed the</i>
                    </div>
                    <div className="mb-4 mb-lg-5 d-flex justify-content-center cert-title" style={{textAlign: "center"}}>
                        {certificate.courseName}
                    </div>
                    <div className="mb-4 mb-lg-5 d-flex justify-content-center cert-body" style={{textAlign: "center"}}>
                        <i>certification through training administered by</i>
                    </div>
                    <div className="row">
                        <div className="col"></div>
                        <div className="col">
                            <img className="w-100" src={dummyLogo} alt="Training Vision Logo" style={bottomLogoStyle} id="trainvision" />
                        </div>
                        <div className="col"></div>
                    </div>
                    <div className="row" style={{paddingLeft: "8%", paddingTop: "5%"}}>
                        <div className="col text-center transcript">
                            <img src={demoSignature} style={{width: "100%", height: "auto"}} />
                            <hr style={hrStyle} />
                            <div><b>John Demo</b><br />Dean of Demos, JupytonCerts</div>
                        </div>
                        <div className="col"></div>
                        <div className="d-flex flex-row-reverse col transcript" style={{paddingTop: "5%", paddingRight: "5%"}}>
                            Dated {dateIssued}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CertificateGenerator


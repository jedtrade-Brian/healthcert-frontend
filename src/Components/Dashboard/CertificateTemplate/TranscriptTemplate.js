import React, { Component } from 'react'
import { demoSignature, trainingVisionLogo } from './SvgData'
import transcriptBackground from '../../../assets/transcriptBackground.png'
import 'bootstrap/dist/css/bootstrap.min.css';

export class TranscriptTemplate extends Component {
    constructor (props) {
        super(props);
    }

    retrieveCourseName = (certificate) => {
        let courseName;
        switch(certificate.docType){
            case 'ADSM':
                courseName = "Advance Diploma in Service Management";
                break;
            case 'ADCS':
                courseName = "Advance Diploma in Cyber Security";
                break;
            case 'PDDMCS':
                courseName = "Professional Diploma in Digital Marketing and Campaign Strategy";
                break;
            case 'DICT':
                courseName = "Diploma in Infocomm Technology";
                break;
            case 'PGDSLI':
                courseName = "Postgraduate Diploma in Digital Strategy Leadership and Innovation";
                break;
            case 'HCPCR':
                courseName = "PCR test";
                break;
            default:
                break;
        }
        return courseName
    }

    render() {
        const containerStyle = {
            backgroundImage: `url(${transcriptBackground})`, 
            backgroundRepeat: "repeat",
            height: '1000px',
            width: '800px'
        }

        const rowTranscriptStyle = {
            paddingTop: "3%",
            paddingLeft: "2%",
        }

        const detailsStyle = {
            paddingLeft: "3%",
            paddingTop: "5%",
        }

        const inline = {
            display: "inline-block",
        }

        const tvLogoStyle = {
            paddingTop: "30%",
            paddingLeft: "5%", 
            width: "100%", 
            height: "auto",
        }

        const signatureStyle = {
            paddingTop: "5%", 
            paddingRight: "5%", 
            width: "100%",
            height: "auto",
        }

        console.log("Full Cert Info", this.props.certificate)
        let certificate = this.props.certificate.data.document.docInfo

  console.log(certificate);

        return (
            <div className="p-2 container" style={containerStyle}>
                <div className="row root cert-title" style={{paddingLeft: '3%', fontSize: '24px'}}>
                    <b>Training Vision Certificate</b>
                </div>
                <div className="row transcript" style={rowTranscriptStyle}>
                    <div className="col">
                        <div className="row">
                            <div className="col">NAME:&nbsp;</div>
                            <div className="col">{certificate.patientFirstName} {certificate.patientLastName}</div>
                        </div>
                        <div className="row">
                            <div className="col">NRIC/FIN:&nbsp;</div>
                            <div className="col">
                                XXXX{certificate.fhirBundle.entry[0].identifier[1].value.toString().substring(certificate.fhirBundle.entry[0].identifier[1].value.length - 4)}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">STUDENT ID:&nbsp;</div>
                            <div className="col">{certificate.patientId}</div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="row">
                            <div className="col">DOCUMENT ID:&nbsp;</div>
                            <div className="col">{certificate.Id}</div>
                        </div>
                        <div className="row">
                            <div className="col">COURSE:&nbsp;</div>
                            <div className="col">{this.props.certificate.title}</div>
                        </div>
                        <div className="row">
                            <div className="col">DATE OF ISSUANCE:&nbsp;</div>
                            <div className="col">{this.props.issuedDateTime}</div>
                        </div>
                    </div>
                </div>
                <div className="row mb-4" style={detailsStyle}>
                    <div className="root cert-title" style={{fontSize: '24px'}}>
                        <b>Transcript</b>
                    </div>
                    <table className="w-100 transcript">
                        <tbody>
                            <tr>
                                <th style={{marginBottom: '5px'}}><b>Name</b></th>
                                <th style={{marginBottom: '5px'}}><b>Grade</b></th>
                            </tr>
                            {/* {
                                certificate.transcript.map((module) => {
                                    return (
                                        <tr>
                                            <td>
                                                <div style={inline}>{module.moduleName} </div>
                                            </td>
                                            <td>
                                                <div style={inline}>{module.grade} </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            } */}
                        </tbody>
                    </table>
                </div>
                <div className="row">
                    <div className="col">
                        <img className="w-100" src={trainingVisionLogo} alt="Training Vision Logo" style={tvLogoStyle} />
                    </div>
                    <div className="col"></div>
                    <div className="col text-center" style={signatureStyle}>
                        <img className="w-100" src={demoSignature} />
                        <hr className="m-1" />
                        <div className="transcript">
                            <b>John Demo</b>
                            <br />
                            Dean of Demos, Training Vision
                        </div>
                    </div>
                </div>
            </div>
                            
        )
    }
}

export default TranscriptTemplate

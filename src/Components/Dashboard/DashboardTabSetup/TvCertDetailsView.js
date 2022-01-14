import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './TvCertDetailsView.css';
import QRCode from 'qrcode.react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PdfDocument from './PdfDocument';
import * as htmlToImage from 'html-to-image';
import { toPng, toBlob, toSvg } from 'html-to-image';
import CertificateTemplateDemo from '../CertificateTemplate/CertificateTemplateDemo'
import ReactDOM from 'react-dom'
import {emailCertificatePDF} from '../../../services/createDocumentService'
import { messagePopup } from '../../../services/messagePopupService.jsx';

export default class TvCertDetailsView extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            qrURL: null,
        }
    }

    downloadJSON = async () => {
        let wrapDocString = JSON.stringify(this.props.wrapDocInfo)
        const blob = new Blob([wrapDocString], {type: "application/json"});
        const jsonUrl = URL.createObjectURL(blob);

        let downloadLink = document.createElement("a");
        downloadLink.href = jsonUrl;
        downloadLink.download = `${this.props.certificate.transcriptId}-${this.props.certificate.docType}.json`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(jsonUrl);
    }

    emailPDF = async () => {
        console.log('email PDF Clicked!');
        let response = await emailCertificatePDF(this.props.certificate.docHash);
        console.log('RESPONSE', response)
        if(response.status == 200){
            messagePopup('Certificate PDF Email Sent', 'Certificate PDF is sent to recipient\'s email', 'success')
        }
        else {
            messagePopup(`Error Occurred - ${response.status}`, `${response.statusText}`, 'error')
        }
    }
    emailJSON = () => {
        console.log('email JSON Clicked!');
        const blob = new Blob([this.props.certificate.wrapDocInfo], {type: "application/json"});
        const jsonUrl = URL.createObjectURL(blob);
    }
    emailQRCode = () => {
        console.log('email QR Code Clicked!');
        let certificate = this.props.certificate
        const canvas = document.getElementById(certificate.docHash);
        const qrURL = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    }

    retrieveUrl = () => {
        let certificate = this.props.certificate
        const canvas = document.getElementById(certificate.docHash);
        const qrURL = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        this.setState({ qrURL: qrURL })
    }

    convertFromUnix = (dateTime) => {
        if(dateTime === 0){
            return "Pending"
        }
        else {
            let unixTime = new Date(dateTime * 1000)
            let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
            let date = unixTime.getDate();
            let month = months[unixTime.getMonth()];
            let year = unixTime.getFullYear();
            let hour = unixTime.getHours();
            let mins = unixTime.getMinutes();
            let timeType = 'am'

            // Converting 24-hr format to 12-hr format
            if(hour >= 12){
                timeType = 'pm'
                if(hour === 12){
                    hour = 12;
                }
                else{
                    hour -= 12;
                }
            } 
            else if(hour === 0){
                hour = 12;
            }

            // Add '0' to mins prefix if less than 10
            if(mins < 10){
                mins = '0' + mins.toString();
            }
            return `${date} ${month} ${year}, ${hour}:${mins} ${timeType}`
        }
      }

    render () {
        let certificate = this.props.certificate
        return (
            <div className="container widthMatchParent">
                <div className="row detailsBox">
                    <div className="col-sm-9">
                        <div className="detailsRow">
                            <span className="detailsTitle">Patient ID:</span> 
                            <span className="detailsValue">{certificate.PatientId}</span>
                        </div>
                        <div className="detailsRow">
                            <span className="detailsTitle">Patient Name:</span>
                            <span className="detailsValue">{certificate.patientFirstName}</span>
                        </div>
                        <div className="detailsRow">
                            <span className="detailsTitle">Issued On:</span>
                            <span className="detailsValue">{this.convertFromUnix(certificate.issuedOn)}</span>
                        </div>
                        <div className="detailsRow">
                            <span className="detailsTitle">Course Name</span>
                            <span className="detailsValue">{certificate.title}</span>
                        </div>
                        <div className="detailsRow">
                            <div className="dropdown">
                                <button 
                                    className="btn btn-primary dropdown-toggle" 
                                    type="button" id="downloadDropdown" 
                                    data-toggle="dropdown" 
                                    aria-haspopup="true" 
                                    aria-expanded="false"
                                    onClick={() => this.retrieveUrl()}
                                    disabled={certificate.revoked !== 0}
                                    >
                                    Download
                                </button>
                                <div className="dropdown-menu" aria-labelledby="downloadDropdown">
                                    <PDFDownloadLink 
                                        document={<PdfDocument certificate={this.props.certificate} qrURL={this.state.qrURL} certURL={this.props.certURL} />}
                                        fileName={`${certificate.Id}-${certificate.docType}.pdf`}
                                        className='dropdown-item'
                                        >
                                        Download PDF
                                    </PDFDownloadLink>
                                    <button className="dropdown-item" onClick={() => this.downloadJSON()}>Download JSON</button>
                                </div>
                            </div>

                            <div className="dropdown">
                                <button 
                                    className="btn btn-secondary dropdown-toggle" 
                                    type="button" 
                                    id="emailDropdown" 
                                    data-toggle="dropdown" 
                                    aria-haspopup="true" 
                                    aria-expanded="false"
                                    disabled={certificate.revoked !== 0}
                                >
                                    Email
                                </button>
                                <div className="dropdown-menu" aria-labelledby="emailDropdown">
                                    <button className="dropdown-item"  onClick={() => this.emailPDF()} >Email PDF</button>
                                    <button className="dropdown-item" onClick={() => this.emailJSON()} >Email JSON</button>
                                    <button className="dropdown-item" onClick={() => this.emailQRCode()} >Email QR Code</button>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <QRCode 
                            id= {certificate.docHash}
                            value= {`https://jviewer.sandbox158.run/?docHash=${certificate.docHash}`}
                            size={140}
                            level={"M"}
                            includeMargin={true}
                        />
                    </div>
                </div>
            </div>
        )
    }
}
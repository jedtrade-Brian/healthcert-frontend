import React, { Component } from 'react'
import { demoSignature } from './SvgData'
import certificateBackground from '../../../assets/2ab1473d5476ffc92043d8b1a57e229e.png'

export class ADSMTemplate extends Component {
    constructor (props) {
        super(props);
    }

    render() {
        let certificate = this.props.certificate
        let date = new Date(certificate.issuedOn)
        let month = date.toLocaleString('default', { month: 'long' });
        let year = date.getFullYear();

        const contentStyles = {
            backgroundImage: `url(${certificateBackground})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            textAlign: "center",
            padding: "100px 0 100px 0",
            height: "850px",
            width: "1000px",
            border: "5px solid black",
        }

        const topPortion = {
            paddingBottom: "100px"
        }

        const bottomSection = {
            marginTop: "100px"
        }
        
        return (
            <>
                <div className='p-2 container'>
                    <div style={contentStyles}>
                        <div style={topPortion}>
                            <span className='hereby'>It is hereby certified that</span>
                            <p style={{fontSize: '28px'}}>
                                <b> {certificate.studentName}, {certificate.studentLastName} </b>
                            </p>
                            <span> has been granted the </span>
                        </div>
                        <h1 style={{color: 'red'}}>ADVANCED DIPLOMA</h1>
                        <h2 style={{color: 'red'}}>in Service Management</h2>
                        <p>in <b>{month}, {year}</b> having been examined</p>
                        <p>in accordance with the Regulations of the Institution</p>
                        <br></br>
                        <div style={bottomSection}>
                            <img src={demoSignature} alt='Signature'></img>
                        </div>
                        <p>Demo, Tan</p>
                        <p>JupytonCerts</p>
                    </div>
                </div>
            </>
        )
    }
}

export default ADSMTemplate

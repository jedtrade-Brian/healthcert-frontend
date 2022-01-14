import React, { Component } from 'react'
import DemoCertificate from '../Dashboard/CertificateTemplate/SignatureTemplateDemo'

export class SigningDocument extends Component {
    constructor (props) {
        super(props);
    }

    render() {
        return (
            <div>
                <DemoCertificate approvers={this.props.approvers} signature_1={this.props.signature_1} signature_2={this.props.signature_2} />
            </div>
        )
    }
}

export default SigningDocument

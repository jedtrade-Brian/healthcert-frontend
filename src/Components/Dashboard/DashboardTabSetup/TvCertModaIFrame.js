import React, { Component } from 'react';
import { BackdropLoader } from '../../../services/loader';

export default class TvCertModalIFrame extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            loader: true,
            viewer:process.env.REACT_APP_Viewer_URL??'https://jcert-viewer-enhanced.sandbox158.run',
        }
        console.log("TVCertModalFrame: this.props.docHash: ",this.props.docHash);
        console.log("TVCertModalFrame: this.state.viewer: ",this.state.viewer);
    }

    closeLoader = () => {
        this.setState({ loader: false })
    }

    render () {
        return (
        <>
            <BackdropLoader open={this.state.loader} />
            <iframe 
                style={{height:"500px", width:"700px"}} 
                src={`https://rinkeby.opencerts.io/?docHash=${this.props.docHash}`} 
                //src={`${this.state.viewer}/?docHash=${this.props.docHash}`} 
                onLoad={() => this.closeLoader()}
            >
            </iframe>
        </>
        )
    }
}
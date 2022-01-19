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
            
            <iframe scrolling="no" 
            
                style={{height:"1550px", width:"98.5%", marginTop:"-430px", marginLeft:"6.5px", marginRight:"6.5px"}} 
                src={`https://dev.opencerts.io/?q=%7B%22type%22%3A%22DOCUMENT%22%2C%22payload%22%3A%7B%22uri%22%3A%22https%3A%2F%2Fjedtrade-eugene.github.io%2Fffb1e61f-30ec-419c-9e0c-baa844d876b1-HCPCR.json%22%2C%22key%22%3A%222b1236683c3a842ed4a0bb032c1cf668e24bcaf8ce599aeef502c93cb628152c%22%7D%7D`} 
                //src={`${this.state.viewer}/?docHash=${this.props.docHash}`} 
                onLoad={() => this.closeLoader()}
            >
            </iframe>
           
        </>
              
        )
    }
}
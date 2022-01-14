import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import signDocService from "../../services/signDocument" 
import {BackdropLoader} from "../../services/loader";
import DocumentTemplate from "./DocumentTemplate"
import './buyerQuotation.css';
import NoaDocumentTemplate from './NoaDocumentTemplate';
import authService from '../../services/authService';

class BuyerSignedDocument extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
      document : {
        doc: null,
        issuerDetails: null,
        recipientDetails: null,
        isSigned: false,
        isRevoked: false,
        oaStatus: null
      },
      isNoa: false,
      noaDocumentData: null,
      noaDocument: null,
      financierCompanyDetails: null,
      selectedData: null ,
      user: authService.getUserInfo(),
      issuer: null,
      investorDetails: null
    };
  }
  componentDidMount(){
    console.log('Props : ',this.props);
    const docHash = this.props.match ? this.props.match.params.docHash : '';
    const url = this.props.match.path.split('/')
    if(url.includes('buyerSignedNOADocument')){
      //  console.log('XXXXX',url);
       if(docHash && docHash!== '') {
        this.setState({loader:true});
        signDocService.getNOADocHash(docHash).then((response) => {
          // console.log('Response &&&&& : ',response);
          const noaDocumentData = response.data;
          const tempFinancial = response.data.docInfo.financierDetails
          const financierCompanyDetails = {
            financierDetails: {
              accountName: tempFinancial.bankDetails.accName,
              accountNumber: tempFinancial.bankDetails.accNum,
              bankName: tempFinancial.bankDetails.bankName,
              swiftNumber: tempFinancial.bankDetails.swiftNo
            },
            email: tempFinancial.email
          }

          const noaDocument = {
            recipientDetails: {
              ...response.data.docInfo.recipient,
              companyName: response.data.docInfo.recipient.cpyName,
              fullAddress: {
                address: response.data.docInfo.recipient.address,
                zipcode: response.data.docInfo.recipient.zipcode
              },
              phoneNumber: response.data.docInfo.recipient.phoneNo,

            }
          }
          const selectedData = {
            selectedInvoices: response.data.docInfo.reqInfo.map(item => {
              return {
                invNo: item.invNo,
                invDate: item.date,
                amount: item.amt
              }
            })
          }
          const investorDetails = response.data.docInfo.noaDetails;
          const issuer =  {...response.data.docInfo.issuers[0], signDate: response.data.docInfo.recipient.date}
          this.setState({loader: false,issuer,investorDetails, financierCompanyDetails,noaDocument,selectedData,noaDocumentData, isNoa: true},() => console.log('State : ',this.state))
        }).catch(err => {
          this.setState({loader: false})
          console.log('Error : ',err);
        })
       }
    } else {
      if(docHash && docHash !== '' ){
        this.setState({loader:true})
        signDocService.getDocHash(this.props.match.params.docHash)
        .then(response => {
          if(response && response.data){
            // console.log('response.data : ',response.data);
            const {recipientDetails, issuerDetails , doc ,isRevoked,isSigned, oaStatus} = response.data
            const docInfo = JSON.parse(response.data.doc.docInfo) 
            doc['docInfo'] = docInfo
            this.setState({
            loader: false,
            document: {
              doc,
              issuerDetails,
              recipientDetails,
              isRevoked,
              isSigned,
              oaStatus
            }},()=> console.log('State : ',this.state))
          }   
      })
      .catch(error => {
        console.log('Error : ',error);
        this.setState({loader: false})
      })
      }
    }
  }

  VerifyDoc = () => {
    // console.log('Doc Info ',this.state.document.docInfo.recipient.phoneNumber);
    if(!this.state.isNoa) {
      let mobNo = ''
      if(this.state.document && this.state.document.recipientDetails){
        mobNo = this.state.document.recipientDetails.phoneNumber
      }
      if(this.state.document.doc.docHash && mobNo){
        this.props.history.push({
          pathname: '/VerifyDoc/buyer',
          search: `?mobileNo=${mobNo}&docHash=${this.state.document.doc.docHash}`,
        })
      }
    } else {
      let mobNo = ''
      if(this.state.noaDocumentData && this.state.noaDocumentData.docInfo){
        mobNo = this.state.noaDocumentData.docInfo.recipient.phoneNo
      }
      if(this.state.noaDocumentData.docHash && mobNo){
        this.props.history.push({
          pathname: '/VerifyDoc/financialAcknowledged',
          search: `?mobileNo=${mobNo}&docHash=${this.state.noaDocumentData.docHash}`,
        })
      }
    }
  };

  render() {
    return (
      <div className='buyerSignedDocument'>
        <BackdropLoader open={this.state.loader} />
        <div className={`buyerSignedDocumentMain ${ this.state.document.isSigned || this.state.document.isRevoked ? 'disabled' : 'active'}`}>
          {this.state.document.doc && !this.state.isNoa ? (
            <DocumentTemplate document={this.state.document}/>
          ) : this.state.isNoa && (
            <NoaDocumentTemplate investorDetails={this.state.investorDetails} oaStatus={this.state.noaDocumentData ? this.state.noaDocumentData.oaStatus : null} issuer={this.state.issuer} user={this.state.user} document={this.state.noaDocument} financierCompanyDetails={this.state.financierCompanyDetails} selectedData={this.state.selectedData}></NoaDocumentTemplate>
          )}
          {this.props.via !== 'financial' && (this.state.isNoa || this.state.document.doc) ? (
            <Button disabled={this.state.document ? this.state.document.isSigned || this.state.document.isRevoked : false} onClick={this.VerifyDoc} className='signbtn'>
              {this.state.isNoa ? 'ACKNOWLEDGE' : 'Sign Document'}
            </Button>
          ) : (
            ''
          )}
        </div>
      </div>
    );
  }
}

export default BuyerSignedDocument;

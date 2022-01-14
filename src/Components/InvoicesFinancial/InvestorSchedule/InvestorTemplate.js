import React, { Component } from "react";
import { Button, Typography } from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
import salesQuotationTemplateFile  from "../../../assets/document-template/Investor-Template.xlsx"
import { formatDate } from "../../Shared/dateTimeFormat";

class InvestorTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      templateFile: salesQuotationTemplateFile ? salesQuotationTemplateFile : null,
      purchaseDate: this.props.purchaseDate ? this.props.purchaseDate : ''
    };
  }

  modalOpenData = () => {
    this.setState({ openModal: true });
  };

  handleClose = () => {
    this.setState({ openModal: false });
  };

  onAckClick = () => {
    this.props.history.push("/verifyDoc/financialAcknowledged");
  };

  render() {
    return (
      // <div className="buyerSignedDocument">
        <div className="investorImportTemplate">
          <div className="investorDetailsSection" id="investor">
            <div className="noaDetailBody">
                {/* <div className="row"> */}
                  <Typography align="center" style={{fontWeight:800,}}>Schedule of Assignees</Typography> 
                  <Typography align="center" style={{fontWeight:800,}}>Purchase Date : {formatDate(this.state.purchaseDate)}</Typography>
                  {!this.props.data && (
                    <Typography align="right" >
                        <a  style={{display:"inline-block"}} href={this.state.templateFile ? this.state.templateFile : null} download='investor-template.xlsx'>
                          <Button
                           style={{marginRight:"10px"}}
                            variant="outlined"
                            color="default"
                            component="button"
                            startIcon={<GetAppIcon />}
                          >
                            Download
                          </Button>
                        </a>
                        
                    </Typography>
                  )}
                {/* </div> */}
                <table className="noaassignmentTable">   
                  <thead>
                    <tr style={{backgroundColor: '#0e060645'}}>
                      <th style={{width:'20%'}}>Investor Id</th>
                      <th style={{width:'20%'}}>Investor: Company Name</th>
                      <th style={{width:'20%',borderRight: '1px solid #ccc'}}>Investor Percentage</th>
                      <th style={{width:'20%',borderRight: '1px solid #ccc'}}>Transaction Brief</th>
                      <th style={{width:'20%'}}>Transaction Number</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.data ? this.props.data.map((item,index)=>(
                      <tr key={index}>
                        {/* item.transactionBrief */}
                        <td style={{width:'20%'}} onClick={this.modalOpenData}><span className="label">Investor Id:</span><span>{item.invtId}</span></td>
                        <td style={{width:'20%'}} onClick={this.modalOpenData}><span className="label">Investor: Company Name </span><span>{item.invtCpy}</span></td>
                        <td style={{width:'20%',borderRight: '1px solid #ccc'}} onClick={this.modalOpenData}><span className="label">Investor Percentage </span><span>{item.invtPercent }</span></td>
                        <td style={{width:'20%',borderRight: '1px solid #ccc'}} onClick={this.modalOpenData}><span className="label">Transaction Brief</span><span>{item.transBrief}</span></td>  
                        <td style={{width:'20%'}} onClick={this.modalOpenData}><span className="label">Transaction Number </span><span>{item.transNo}</span></td>
                     </tr>
                    )) : (
                      <tr>
                        <td style={{width:'20%'}} onClick={this.modalOpenData}><span className="label">Investor Id:</span>{""}</td>
                        <td style={{width:'20%'}} onClick={this.modalOpenData}><span className="label">Investor: Company Name </span>{""}</td>
                        <td style={{width:'20%',borderRight: '1px solid #ccc'}} onClick={this.modalOpenData}><span className="label">Investor Percentage </span>{""}</td>
                        <td style={{width:'20%',borderRight: '1px solid #ccc'}} onClick={this.modalOpenData}><span className="label">Transaction Brief</span>{""}</td>
                        <td style={{width:'20%'}} onClick={this.modalOpenData}><span className="label">Transaction Number </span>{""}</td>
                     </tr>
                    )}
                    
                  </tbody>
                </table>
              </div>  
          </div>
        </div>
      // </div>
    );
  }
}

export default InvestorTemplate;

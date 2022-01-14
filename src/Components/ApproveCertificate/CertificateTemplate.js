import React from 'react';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import TwoApproverTemplate from '../Dashboard/CertificateTemplate/TwoApproverTemplate';

export default function CertificateTemplate({certificate, oaStatus}) {
    console.log('document : ', certificate);
    return (
      <div>
        <div className='supplierpart'>
            <span><h5>Created by:&nbsp;&nbsp;</h5></span>
            <span><h4>{certificate ? certificate.docInfo.issuers[0].name : ''}</h4></span>
        </div> 
        {certificate && (<TwoApproverTemplate data={certificate} />)}
      </div>
    );
  }
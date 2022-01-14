import React from 'react';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import SalesQuotationTemp from './salesQuotationTem';
import InvoicesTemplate from "../Shared/Documents/InvoicesTemplate"
import PaymentCertTemplate from '../Shared/Documents/PaymentCertTemplate';

export default function DocumentTemplate({document}) {
    console.log('document : ',document);
    return (
      <div>
         <div className='supplierpart'>
            <h4>Issued by:</h4>
            <h5>{document.issuerDetails ? document.issuerDetails.companyName : ''}</h5>
            <ul className='documentpart'>
              <li>
                {document && document.oaStatus && document.oaStatus.docIntegrity ? (
                  <>
                    <span className='check'>
                      <CheckIcon />
                    </span>
                    <span>Document has not been tempered with</span>
                  </>
                 ) : (
                   <>
                    <span className='check'>
                      <ClearIcon/>
                    </span>
                    <span>Document has been tempered with</span>
                   </> 
                )}
              </li>
              <li>
                 {document && document.oaStatus && document.oaStatus.docStatus ? (
                   <>
                      <span className='check'>
                        <CheckIcon />
                      </span>
                      <span>Document has been issued</span>
                   </>
                  ) : (
                   <>
                      <span className='check'>
                        <ClearIcon/>
                      </span>
                      <span>Document has not been issued</span>
                   </>
                  )}  
              </li>
              <li>
                 {document && document.oaStatus && document.oaStatus.issuerIdentity ? (
                  <>
                    <span className='check'>
                      <CheckIcon />
                    </span>
                    <span>Document issuer has been identified</span>
                  </>
                  ) : (
                   <>
                      <span className='check'>
                        <ClearIcon/>
                      </span>
                      <span>Document issuer has not been identified</span>
                   </>
                  )}  
              </li>
            </ul>
        </div> 
        {document.doc.docType === 'SQ' ? (
            <SalesQuotationTemp document={document}/>
          ) : document.doc.docType === 'Inv' ? (
            <InvoicesTemplate document={document} showTerms={false} showDigitalSign={false} via={'signDocument'}/>
          ) : document.doc.docType === 'PC' ? (
            <PaymentCertTemplate document={document} showTerms={false} showDigitalSign={false} via={'signDocument'}/>
          ) : (null)
        }
       
      </div>
    );
  }
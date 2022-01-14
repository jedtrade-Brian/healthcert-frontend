import React from 'react';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import NOATemplate from '../Invoices/InvoicesTab/NOATemplate';

export default function NoaDocumentTemplate(props) {
    return (
      <div>
         <div className='supplierpart'>
            <h4>Issued by:</h4>
            <h5>{props.issuer ? props.issuer.name : ''}</h5>
            <ul className='documentpart'>
              <li>
                {props && props.oaStatus && props.oaStatus.docIntegrity ? (
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
                 {props && props.oaStatus && props.oaStatus.docStatus ? (
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
                 {props && props.oaStatus && props.oaStatus.issuerIdentity ? (
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
            {/* <ul className='documentpart'>
              <li>
                <span className='check'>
                  <CheckIcon />
                </span>
                <span>NOA has not been tempered with</span>
              </li>
              <li>
                <span className='check'>
                  <CheckIcon />
                </span>
                <span>NOA has been issued</span>
              </li>
              <li>
                <span className='check'>
                  <CheckIcon />
                </span>
                <span>NOA issuer has been identified</span>
              </li>
              <li>
                <span className='check'>
                  <CheckIcon />
                </span>
                <span>NOA has been assigned and financed by Financial Institute</span>
              </li>
            </ul> */}
        </div> 
        {props && (
            <NOATemplate investorDetails={props.investorDetails} user={props.user} issuer={props.issuer} document={props.document} financierCompanyDetails={props.financierCompanyDetails ? props.financierCompanyDetails : null} selectedData={props.selectedData}/>
        )}
      </div>
    );
  }
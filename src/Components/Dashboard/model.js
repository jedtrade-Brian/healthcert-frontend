import {unixTimestampToDate , getTimeFromUnixTimestampNew, getTimeFromUnixTimestamp} from '../Shared/dateTimeFormat';

export const testData = {
	issuedBy: [
    {
      companyName: "Qss Technosoft",
      createdAt: 'Wed Jan 21 2018 02:59:39 GMT+0530',
      docHash: "0xb0e36d16dc725a7433e57b5a9ca423fe3283c9be957468b3517e26d115f3767f",
      docType: "SQ",
      finalAmt: 130,
      revoked: false,
      signed: true,
      updatedAt: 1601977389010
    },
    {
      companyName: "Qss Technosoft",
      createdAt: 'Wed Feb 21 2018 02:59:39 GMT+0530',
      docHash: "0xb0e36d16dc725a7433e57b5a9ca423fe3283c9be957468b3517e26d115f3767f",
      docType: "SQ",
      finalAmt: 130,
      revoked: false,
      signed: true,
      updatedAt: 1601977389010
    },
    {
      companyName: "Qss Technosoft",
      createdAt: 'Wed Mar 21 2018 02:59:39 GMT+0530',
      docHash: "0xb0e36d16dc725a7433e57b5a9ca423fe3283c9be957468b3517e26d115f3767f",
      docType: "SQ",
      finalAmt: 130,
      revoked: false,
      signed: true,
      updatedAt: 1601977389010
    },
    {
      companyName: "Qss Technosoft",
      createdAt: 'Wed Apr 21 2018 02:59:39 GMT+0530',
      docHash: "0xb0e36d16dc725a7433e57b5a9ca423fe3283c9be957468b3517e26d115f3767f",
      docType: "SQ",
      finalAmt: 130,
      revoked: false,
      signed: true,
      updatedAt: 1601977389010
    },
    {
      companyName: "Qss Technosoft",
      createdAt: 'Wed May 21 2018 02:59:39 GMT+0530',
      docHash: "0xb0e36d16dc725a7433e57b5a9ca423fe3283c9be957468b3517e26d115f3767f",
      docType: "SQ",
      finalAmt: 130,
      revoked: false,
      signed: true,
      updatedAt: 1601977389010
    },
    {
      companyName: "Qss Technosoft",
      createdAt: 'Wed Jun 21 2018 02:59:39 GMT+0530',
      docHash: "0xb0e36d16dc725a7433e57b5a9ca423fe3283c9be957468b3517e26d115f3767f",
      docType: "SQ",
      finalAmt: 130,
      revoked: false,
      signed: true,
      updatedAt: 1601977389010
    },
    {
      companyName: "Qss Technosoft",
      createdAt: 'Wed Jul 21 2018 02:59:39 GMT+0530',
      docHash: "0xb0e36d16dc725a7433e57b5a9ca423fe3283c9be957468b3517e26d115f3767f",
      docType: "SQ",
      finalAmt: 130,
      revoked: false,
      signed: true,
      updatedAt: 1601977389010
    },
    {
      companyName: "Qss Technosoft",
      createdAt: 'Wed Aug 21 2018 02:59:39 GMT+0530',
      docHash: "0xb0e36d16dc725a7433e57b5a9ca423fe3283c9be957468b3517e26d115f3767f",
      docType: "SQ",
      finalAmt: 130,
      revoked: false,
      signed: true,
      updatedAt: 1601977389010
    },
    {
      companyName: "Qss Technosoft",
      createdAt: 'Wed Sep 21 2018 02:59:39 GMT+0530',
      docHash: "0xb0e36d16dc725a7433e57b5a9ca423fe3283c9be957468b3517e26d115f3767f",
      docType: "SQ",
      finalAmt: 130,
      revoked: false,
      signed: true,
      updatedAt: 1601977389010
    },
      {
        companyName: "Qss Technosoft",
        createdAt: 'Wed Oct 21 2018 02:59:39 GMT+0530',
        docHash: "0xb0e36d16dc725a7433e57b5a9ca423fe3283c9be957468b3517e26d115f3767f",
        docType: "SQ",
        finalAmt: 130,
        revoked: false,
        signed: true,
        updatedAt: 1601977389010
      },
      {
        companyName: "Qss Technosoft",
        createdAt: 'Wed Oct 21 2018 02:59:39 GMT+0530',
        docHash: "0xb0e36d16dc725a7433e57b5a9ca423fe3283c9be957468b3517e26d115f3767f",
        docType: "SQ",
        finalAmt: 130,
        revoked: false,
        signed: true,
        updatedAt: 1601977389010
      },
      {
        companyName: "Qss Technosoft",
        createdAt: 'Wed Nov 21 2018 02:59:39 GMT+0530',
        docHash: "0xb0e36d16dc725a7433e57b5a9ca423fe3283c9be957468b3517e26d115f3767f",
        docType: "SQ",
        finalAmt: 130,
        revoked: false,
        signed: true,
        updatedAt: 1601977389010
      },
      {
        companyName: "Qss Technosoft",
        createdAt: 'Wed Dec 21 2018 02:59:39 GMT+0530',
        docHash: "0xb0e36d16dc725a7433e57b5a9ca423fe3283c9be957468b3517e26d115f3767f",
        docType: "SQ",
        finalAmt: 130,
        revoked: false,
        signed: false,
        updatedAt: 1601977389010
      },
    {
      companyName: "Qss Technosoft",
      createdAt: 'Wed Jan 21 2019 02:59:39 GMT+0530',
      docHash: "0xb0e36d16dc725a7433e57b5a9ca423fe3283c9be957468b3517e26d115f3767f",
      docType: "SQ",
      finalAmt: 130,
      revoked: false,
      signed: true,
      updatedAt: 1601977389010
    },
    {
      companyName: "Qss Technosoft",
      createdAt: 'Wed Feb 21 2019 02:59:39 GMT+0530',
      docHash: "0xb0e36d16dc725a7433e57b5a9ca423fe3283c9be957468b3517e26d115f3767f",
      docType: "SQ",
      finalAmt: 130,
      revoked: false,
      signed: true,
      updatedAt: 1601977389010
    },
    {
      companyName: "Qss Technosoft",
      createdAt: 'Wed Mar 21 2019 02:59:39 GMT+0530',
      docHash: "0xb0e36d16dc725a7433e57b5a9ca423fe3283c9be957468b3517e26d115f3767f",
      docType: "SQ",
      finalAmt: 130,
      revoked: false,
      signed: true,
      updatedAt: 1601977389010
    },
    {
      companyName: "Qss Technosoft",
      createdAt: 'Wed Apr 21 2019 02:59:39 GMT+0530',
      docHash: "0xb0e36d16dc725a7433e57b5a9ca423fe3283c9be957468b3517e26d115f3767f",
      docType: "SQ",
      finalAmt: 130,
      revoked: false,
      signed: true,
      updatedAt: 1601977389010
    },
    {
      companyName: "Qss Technosoft",
      createdAt: 'Wed May 21 2019 02:59:39 GMT+0530',
      docHash: "0xb0e36d16dc725a7433e57b5a9ca423fe3283c9be957468b3517e26d115f3767f",
      docType: "SQ",
      finalAmt: 130,
      revoked: false,
      signed: true,
      updatedAt: 1601977389010
    },
    {
      companyName: "Qss Technosoft",
      createdAt: 'Wed Jun 21 2019 02:59:39 GMT+0530',
      docHash: "0xb0e36d16dc725a7433e57b5a9ca423fe3283c9be957468b3517e26d115f3767f",
      docType: "SQ",
      finalAmt: 130,
      revoked: false,
      signed: true,
      updatedAt: 1601977389010
    },
    {
      companyName: "Qss Technosoft",
      createdAt: 'Wed Jul 21 2019 02:59:39 GMT+0530',
      docHash: "0xb0e36d16dc725a7433e57b5a9ca423fe3283c9be957468b3517e26d115f3767f",
      docType: "SQ",
      finalAmt: 130,
      revoked: false,
      signed: true,
      updatedAt: 1601977389010
    },
    {
      companyName: "Qss Technosoft",
      createdAt: 'Wed Aug 21 2019 02:59:39 GMT+0530',
      docHash: "0xb0e36d16dc725a7433e57b5a9ca423fe3283c9be957468b3517e26d115f3767f",
      docType: "SQ",
      finalAmt: 130,
      revoked: false,
      signed: true,
      updatedAt: 1601977389010
    },
    {
      companyName: "Qss Technosoft",
      createdAt: 'Wed Sep 21 2019 02:59:39 GMT+0530',
      docHash: "0xb0e36d16dc725a7433e57b5a9ca423fe3283c9be957468b3517e26d115f3767f",
      docType: "SQ",
      finalAmt: 130,
      revoked: false,
      signed: true,
      updatedAt: 1601977389010
    },
      {
        companyName: "Qss Technosoft",
        createdAt: 'Wed Oct 21 2019 02:59:39 GMT+0530',
        docHash: "0xb0e36d16dc725a7433e57b5a9ca423fe3283c9be957468b3517e26d115f3767f",
        docType: "SQ",
        finalAmt: 130,
        revoked: false,
        signed: true,
        updatedAt: 1601977389010
      },
      {
        companyName: "Qss Technosoft",
        createdAt: 'Wed Oct 21 2019 02:59:39 GMT+0530',
        docHash: "0xb0e36d16dc725a7433e57b5a9ca423fe3283c9be957468b3517e26d115f3767f",
        docType: "SQ",
        finalAmt: 130,
        revoked: false,
        signed: true,
        updatedAt: 1601977389010
      },
      {
        companyName: "Qss Technosoft",
        createdAt: 'Wed Nov 21 2019 02:59:39 GMT+0530',
        docHash: "0xb0e36d16dc725a7433e57b5a9ca423fe3283c9be957468b3517e26d115f3767f",
        docType: "SQ",
        finalAmt: 130,
        revoked: false,
        signed: true,
        updatedAt: 1601977389010
      },
      {
        companyName: "Qss Technosoft",
        createdAt: 'Wed Dec 21 2019 02:59:39 GMT+0530',
        docHash: "0xb0e36d16dc725a7433e57b5a9ca423fe3283c9be957468b3517e26d115f3767f",
        docType: "SQ",
        finalAmt: 130,
        revoked: false,
        signed: false,
        updatedAt: 1601977389010
      },
      {
        companyName: "Qss Technosoft",
        createdAt: 'Wed Jan 21 2020 02:59:39 GMT+0530',
        docHash: "0xb0e36d16dc725a7433e57b5a9ca423fe3283c9be957468b3517e26d115f3767f",
        docType: "SQ",
        finalAmt: 130,
        revoked: false,
        signed: false,
        updatedAt: 1601977389010
      },
      {
        companyName: "Qss Technosoft",
        createdAt: 'Wed jan 21 2020 02:59:39 GMT+0530',
        docHash: "0xb0e36d16dc725a7433e57b5a9ca423fe3283c9be957468b3517e26d115f3767f",
        docType: "SQ",
        finalAmt: 130,
        revoked: false,
        signed: false,
        updatedAt: 1601977389010
      },
      {
        companyName: "Qss Technosoft",
        createdAt: 'Wed Feb 21 2020 02:59:39 GMT+0530',
        docHash: "0xb0e36d16dc725a7433e57b5a9ca423fe3283c9be957468b3517e26d115f3767f",
        docType: "SQ",
        finalAmt: 130,
        revoked: false,
        signed: false,
        updatedAt: 1601977389010
      },
      {
        companyName: "Qss Technosoft",
        createdAt: 'Wed Mar 21 2020 02:59:39 GMT+0530',
        docHash: "0xb0e36d16dc725a7433e57b5a9ca423fe3283c9be957468b3517e26d115f3767f",
        docType: "SQ",
        finalAmt: 130,
        revoked: false,
        signed: false,
        updatedAt: 1601977389010
      },
      {
        companyName: "Qss Technosoft",
        createdAt: 'Wed Apr 21 2020 02:59:39 GMT+0530',
        docHash: "0xb0e36d16dc725a7433e57b5a9ca423fe3283c9be957468b3517e26d115f3767f",
        docType: "SQ",
        finalAmt: 130,
        revoked: false,
        signed: false,
        updatedAt: 1601977389010
      },
      {
        companyName: "Qss Technosoft",
        createdAt: 'Wed May 21 2020 02:59:39 GMT+0530',
        docHash: "0xb0e36d16dc725a7433e57b5a9ca423fe3283c9be957468b3517e26d115f3767f",
        docType: "SQ",
        finalAmt: 130,
        revoked: false,
        signed: false,
        updatedAt: 1601977389010
      },
      {
        companyName: "Qss Technosoft",
        createdAt: 'Wed Jun 21 2020 02:59:39 GMT+0530',
        docHash: "0xb0e36d16dc725a7433e57b5a9ca423fe3283c9be957468b3517e26d115f3767f",
        docType: "SQ",
        finalAmt: 130,
        revoked: false,
        signed: false,
        updatedAt: 1601977389010
      },
      {
        companyName: "Qss Technosoft",
        createdAt: 'Wed Jul 21 2020 02:59:39 GMT+0530',
        docHash: "0xb0e36d16dc725a7433e57b5a9ca423fe3283c9be957468b3517e26d115f3767f",
        docType: "SQ",
        finalAmt: 130,
        revoked: false,
        signed: false,
        updatedAt: 1601977389010
      },
      {
        companyName: "Qss Technosoft",
        createdAt: 'Wed Aug 21 2020 02:59:39 GMT+0530',
        docHash: "0xb0e36d16dc725a7433e57b5a9ca423fe3283c9be957468b3517e26d115f3767f",
        docType: "SQ",
        finalAmt: 130,
        revoked: false,
        signed: false,
        updatedAt: 1601977389010
      },
      {
        companyName: "Qss Technosoft",
        createdAt: 'Wed Sep 21 2020 02:59:39 GMT+0530',
        docHash: "0xb0e36d16dc725a7433e57b5a9ca423fe3283c9be957468b3517e26d115f3767f",
        docType: "SQ",
        finalAmt: 130,
        revoked: false,
        signed: false,
        updatedAt: 1601977389010
      },
      {
        companyName: "Qss Technosoft",
        createdAt: 'Wed Oct 21 2020 02:59:39 GMT+0530',
        docHash: "0xb0e36d16dc725a7433e57b5a9ca423fe3283c9be957468b3517e26d115f3767f",
        docType: "SQ",
        finalAmt: 130,
        revoked: false,
        signed: false,
        updatedAt: 1601977389010
       },
       {
        companyName: "Qss Technosoft",
        createdAt: 'Wed Oct 21 2020 02:59:39 GMT+0530',
        docHash: "0xb0e36d16dc725a7433e57b5a9ca423fe3283c9be957468b3517e26d115f3767f",
        docType: "SQ",
        finalAmt: 130,
        revoked: false,
        signed: false,
        updatedAt: 1601977389010
       },
       {
        companyName: "Qss Technosoft",
        createdAt: 'Wed Oct 21 2020 02:59:39 GMT+0530',
        docHash: "0xb0e36d16dc725a7433e57b5a9ca423fe3283c9be957468b3517e26d115f3767f",
        docType: "SQ",
        finalAmt: 130,
        revoked: false,
        signed: false,
        updatedAt: 1601977389010
       },
       {
        companyName: "Qss Technosoft",
        createdAt: 'Wed Oct 21 2020 02:59:39 GMT+0530',
        docHash: "0xb0e36d16dc725a7433e57b5a9ca423fe3283c9be957468b3517e26d115f3767f",
        docType: "SQ",
        finalAmt: 130,
        revoked: false,
        signed: false,
        updatedAt: 1601977389010
       },
       {
        companyName: "Qss Technosoft",
        createdAt: 'Wed Nov 21 2020 02:59:39 GMT+0530',
        docHash: "0xb0e36d16dc725a7433e57b5a9ca423fe3283c9be957468b3517e26d115f3767f",
        docType: "SQ",
        finalAmt: 130,
        revoked: false,
        signed: false,
        updatedAt: 1601977389010
       }

	],
	issuedTo: [
       {
        companyName: "Qss Technosoft",
        createdAt: 'Wed Oct 21 2020 02:59:39 GMT+0530',
        docHash: "0xb0e36d16dc725a7433e57b5a9ca423fe3283c9be957468b3517e26d115f3767f",
        docType: "SQ",
        finalAmt: 130,
        revoked: false,
        signed: false,
        updatedAt: 1601977389010
       }
	]
}

export const monthLabel = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
export const quarterLabel = [`I(${new Date().getFullYear() - 1})`,`II(${new Date().getFullYear() - 1})`,`III(${new Date().getFullYear() - 1})`,`IV(${new Date().getFullYear() - 1})`,`I(${new Date().getFullYear()})`,`II(${new Date().getFullYear()})`,`III(${new Date().getFullYear()})`,`IV(${new Date().getFullYear()})`]
export const halfYearlyLabel = [`I(${new Date().getFullYear() - 2})`,`II(${new Date().getFullYear() - 2})`,`I(${new Date().getFullYear() - 1})`,`II(${new Date().getFullYear() - 1})`,`I(${new Date().getFullYear()})`,`II(${new Date().getFullYear()})`]
export const yearlyLabel = [`${new Date().getFullYear() - 3}`,`${new Date().getFullYear() - 2}`,`${new Date().getFullYear() - 1}`,`${new Date().getFullYear()}`]


export const docName = {
    quotation : 'QUOTATION',
    invoice : 'INVOICE',
    delivery_order : 'DELIVERY_ORDER',
    payment_certificate : 'PAYMENT_CERTIFICATE'
}

export const backgroundColor = {
    QUOTATION : '#4791FF',
    INVOICE : '#ff2366',
    DELIVERY_ORDER : '#eec73d',
    PAYMENT_CERTIFICATE : '#02bc77'
}

export const getSingleGraphData = (dataArr , selectedDoc) => {
   return [
      {
        backgroundColor: backgroundColor[selectedDoc],
        stack: 1,
        data: dataArr
      }
   ]
}

export function getMonthlyDataArray (dataArr) {
   for (const data of dataArr) {
        
   } 
}

export const getFinalData = (data , flag) => {
    //  console.log('Quote No : ',data.documentNo,'Create Date: ',data.createdAt,'Update date : ',data.updatedAt);
     const finaldata = {
        documentName: "",
        companyName: "",
        documentType: "",
        createdAt: "",
        unixCreatedAt: 0,
        updatedAt: "",
        status: "",
        noa: "",
        docHash: '',
        isRevoked: false,
        documentNo: '',
        financierId: "",
        financingStatus: 0,
        invNo: "",
        supplierEmail: ''
      }

      if(data.supplierEmail){
        finaldata.supplierEmail = data.supplierEmail;
      }
      
      if(data.companyName){
       finaldata.companyName = data.companyName
      }
      if(data.documentNo){
        finaldata.documentNo = data.documentNo
      }

      if(data.financierId){
        finaldata.financierId = data.financierId
       }
       if(data.financingStatus){
         finaldata.financingStatus = data.financingStatus
       }
       if(data.invNo){
        finaldata.invNo = data.invNo
       }
      
      if(data.createdAt){
        finaldata.createdAt = unixTimestampToDate(data.createdAt) + ' ' + getTimeFromUnixTimestamp(data.createdAt)
        finaldata.unixCreatedAt = data.createdAt
      }
      if(data.updatedAt){
        finaldata.updatedAt = unixTimestampToDate(data.updatedAt) + ' ' + getTimeFromUnixTimestamp(data.updatedAt)
      }
      if(data.docHash){
        finaldata.docHash = data.docHash
      }
      if(data.docType){
         switch(data.docType){
           case 'SQ' : 
              finaldata.documentName = 'Sales Quotation';
              finaldata.documentType = 'Sales Quotation'
              break ;  
           case 'Inv' : 
              finaldata.documentName = 'Invoices';
              finaldata.documentType = 'Invoices';
              if(data.financingStatus === 2 && !data.revoked) {
                finaldata.noa = 'view'
              }
              
              break ; 
           case 'PC' : 
              finaldata.documentName = 'Payment Certificate';
              finaldata.documentType = 'Payment Certificate';
              break ;    
           default :
         }
      }
      if(data.revoked){
        finaldata.status = 'Revoked'
      } else {
        if(data.docType === 'Inv'){
          if(flag === 'sales') {
            finaldata.status = data.financingStatus === 1 ? 'Requested' 
            : (data.financingStatus === 2 ? 'Financed' 
             : (data.financingStatus === 3 ? 'Declined'   
               : (data.financingStatus === 0 ? 'Issued' : '')))
          } else {
            finaldata.status = data.financingStatus === 1 ? 'Issued' 
             : (data.financingStatus === 2 ? 'Financed' 
              : (data.financingStatus === 3 ? 'Issued'   
                : (data.financingStatus === 0 ? 'Issued' : '')))
          }
          
        }
        if(data.docType !== 'Inv') {
           if(data.signed) {
             finaldata.status = 'Accepted'
           } else {
             finaldata.status = 'Pending'
           }
        }
      }  
      return finaldata
  }


export function filterOnCurrentYearMonth(arrData){
   const graphLabel = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
   let finalData = {
     graphLabel : [],
     graphData: []
   }
   let maxMonth = 0 ;
   let monthData = {}
  //  console.log('arrData : ',arrData);
   if(arrData.length){
    arrData.map((item,index) => {
      const currentY = new Date().getFullYear()
      const date = new Date(item.createdAt);
      const month = date.getMonth()
      if(+currentY === +date.getFullYear()){
       monthData[`${month}`] = monthData[`${month}`] ? [...monthData[`${month}`],item] : [item];
       if(+month > maxMonth) {
         maxMonth = month;
       }
      }
    })
    let tempArr = []
    for(let i=0; i<= maxMonth ; i++){
      tempArr[i] = monthData[`${i}`] ? monthData[`${i}`].length : 0;
    }
    finalData.graphLabel = graphLabel// graphLabel.slice(0,maxMonth + 1)
    finalData.graphData = tempArr;
   }
   return finalData
}

export function filterOnQuarterly(arrData){
  const currentY = new Date().getFullYear()
  const graphLabel = ["I","II","III","IV"]
  let finalData = {
    graphLabel : [],
    graphData: []
  }
  let maxMonth = 0 ;
  let quartData = {};
  let preYearQuartData = {}
  // console.log('arrData : ',arrData);
  if(arrData && arrData.length){
     arrData.map((item,index) => {
    //  const currentY = new Date().getFullYear()
     const date = new Date(item.createdAt);
     const quart = Math.floor((date.getMonth())/3)
     if(+currentY === +date.getFullYear()){
      quartData[`${quart}`] = quartData[`${quart}`] ? [...quartData[`${quart}`],item] : [item];
      if(+quart > maxMonth) {
        maxMonth = quart;
      }
     } else {
       if(+date.getFullYear() === currentY - 1){
         preYearQuartData[`${quart}`] = preYearQuartData[`${quart}`] ? [...preYearQuartData[`${quart}`] , item] : [item];
       }
     }
   })
   let tempArr = [];
   let tempArr1 = [];
   for(let i=0; i<= maxMonth ; i++){
     tempArr[i] = quartData[`${i}`] ? quartData[`${i}`].length : 0;
   }
   for(let i=0; i<=3; i++){
     tempArr1[i] = preYearQuartData[`${i}`] ? preYearQuartData[`${i}`].length : 0;
   }
  //  finalData.graphLabel = graphLabel.map((item) => item + ' (' + (currentY - 1) + ')').concat(graphLabel.slice(0,maxMonth + 1).map((item) => item + ' ('+ currentY + ')'))
   finalData.graphLabel = graphLabel.map((item) => item + ' (' + (currentY - 1) + ')').concat(graphLabel.map((item) => item + ' ('+ currentY + ')'))
   finalData.graphData = tempArr1.concat(tempArr);
  }
  // console.log('Final Data : ',finalData);
  return finalData
}

export function filterOnHalfYearly(arrData){
  const currentY = new Date().getFullYear()
  const graphLabel = ["I","II"]
  let finalData = {
    graphLabel : [],
    graphData: []
  }
  let maxMonth = 0 ;
  let halfData = {};
  let preYearHalfData1 = {}
  let preYearHalfData2 = {}
  if(arrData && arrData.length){
     arrData.map((item,index) => {
     const date = new Date(item.createdAt);
     const half = Math.floor((date.getMonth())/6)
     if(+currentY === +date.getFullYear()){
      halfData[`${half}`] = halfData[`${half}`] ? [...halfData[`${half}`],item] : [item];
      if(+half > maxMonth) {
        maxMonth = half;
      }
     } else {
       if(+date.getFullYear() === currentY - 1){
         preYearHalfData1[`${half}`] = preYearHalfData1[`${half}`] ? [...preYearHalfData1[`${half}`] , item] : [item];
       }
       if(+date.getFullYear() === currentY - 2){
         preYearHalfData2[`${half}`] = preYearHalfData2[`${half}`] ? [...preYearHalfData2[`${half}`] , item] : [item];
       }
     }
   })
   let tempArr = [];
   let tempArr1 = [];
   let tempArr2 = []
   for(let i=0; i<= maxMonth ; i++){
     tempArr[i] = halfData[`${i}`] ? halfData[`${i}`].length : 0;
   }
   for(let i=0; i<=1; i++){
     tempArr1[i] = preYearHalfData1[`${i}`] ? preYearHalfData1[`${i}`].length : 0;
     tempArr2[i] = preYearHalfData2[`${i}`] ? preYearHalfData2[`${i}`].length : 0;
   }
  //  finalData.graphLabel = graphLabel.map((item) => item + ' (' + (currentY - 2) + ')')
  //                        .concat(graphLabel.map((item) => item + ' (' + (currentY - 1) + ')'))
  //                        .concat(graphLabel.slice(0,maxMonth + 1).map((item) => item + ' ('+ currentY + ')'))
   finalData.graphLabel = graphLabel.map((item) => item + ' (' + (currentY - 2) + ')')
                         .concat(graphLabel.map((item) => item + ' (' + (currentY - 1) + ')'))
                         .concat(graphLabel.map((item) => item + ' ('+ currentY + ')'))
   finalData.graphData = tempArr2.concat(tempArr1.concat(tempArr));
  }
  // console.log('Final Data : ',finalData);
  return finalData
}

export function filterOnYearly(arrData){
  const currentY = new Date().getFullYear()
  const graphLabel = [`${currentY - 3}`,`${currentY - 2}`,`${currentY - 1}`,`${currentY}`]
  let finalData = {
    graphLabel : [],
    graphData: []
  }
  let yearly = {};
  if(arrData && arrData.length){
     arrData.map((item,index) => {
     const date = new Date(item.createdAt);
     if(+currentY === +date.getFullYear()){
       yearly[`3`] = yearly[`3`] ? [...yearly[`3`],item] : [item];
     }
     if(+date.getFullYear() === currentY - 1){
       yearly[`2`] = yearly[`2`] ? [...yearly[`2`] , item] : [item];
     }
     if(+date.getFullYear() === currentY - 2){
       yearly[`1`] = yearly[`1`] ? [...yearly[`1`] , item] : [item];
     }
     if(+date.getFullYear() === currentY - 3){
      yearly[`0`] = yearly[`0`] ? [...yearly[`0`] , item] : [item];
    }
   })
   let tempArr = [];
   for(let i=0; i<= 3 ; i++){
     tempArr[i] = yearly[`${i}`] ? yearly[`${i}`].length : 0;
   }
   finalData.graphLabel = graphLabel;
   finalData.graphData = tempArr;
  }
  // console.log('Final Data : ',finalData);
  return finalData
}

export function graphDataFormatting(filteredDocData , newFilter = ''){
  if(filteredDocData){
    let graphData = {}
    for (let [key, value] of Object.entries(filteredDocData)) {
      // console.log(`${key} : `,value);
      switch(key){
        case 'salesQuotation' :
          graphData[key] = secondFilter(value, newFilter, docName.quotation)
          break;
        case 'paymentCertificate' :
          graphData[key] = secondFilter(value, newFilter, docName.payment_certificate)
          break;
        case 'invoices' :
          graphData[key] = secondFilter(value, newFilter, docName.invoice)
          break;
        default :      
      }
    }
    // const finalData = {...graphData}
    return graphData;
  } else {
    return null;
  }
}

function secondFilter (value , filter ,docName){
  switch(filter){
    case 'monthly' :
      return {
        ...filterOnCurrentYearMonth(value),
        graphData : getSingleGraphData(filterOnCurrentYearMonth(value).graphData, docName)
      };
    case 'quarterly' :
      return {
        ...filterOnQuarterly(value),
        graphData : getSingleGraphData(filterOnQuarterly(value).graphData, docName)
      };
    case 'halfYearly' :
      return {
        ...filterOnHalfYearly(value),
        graphData : getSingleGraphData(filterOnHalfYearly(value).graphData, docName)
      };
    case 'yearly' :
      return {
        ...filterOnYearly(value),
        graphData : getSingleGraphData(filterOnYearly(value).graphData, docName)
      };
    default :
      return null        
  }
}

export function getSelectedDocumentData (data, flag) {
  const tempData = Object.assign({},data)
  switch(flag){
    case 'QUOTATION':
      return tempData ? Object.assign({}, tempData.salesQuotation) : {}
    case 'INVOICE':
      return  tempData ?  Object.assign({},tempData.invoices) : {}
    case 'PAYMENT_CERTIFICATE':
      return tempData ? Object.assign({},tempData.paymentCertificate) : {}
    default :      
  }
}

export function copiedGraphData(arrData) {
  let graphData = []
  if(arrData && arrData.length) {
    for (const item of arrData) {
      graphData = [...graphData , {
        ...item,
        data: [...item.data]
      }]
    }
  }
  return graphData;
} 


export default {
    // saleGraphLabel,
    // purchaseGraphLabel,
    testData,
    backgroundColor,
    getSingleGraphData,
    docName,
    getFinalData,
    // filterOnDocType,
    filterOnCurrentYearMonth,
    graphDataFormatting,
    getSelectedDocumentData,
    copiedGraphData,
    monthLabel,
    quarterLabel,
    halfYearlyLabel,
    yearlyLabel
}
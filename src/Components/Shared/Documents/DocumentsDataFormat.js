export function filterOnDocType(arrData , docType = null){
    if(arrData && arrData.length){
      let finalData = {
        salesQuotation: [],
        paymentCertificate: [],
        invoices: []
      }
      arrData.map((item,index) => {
        switch(item.docType){
          case 'SQ' :
            finalData.salesQuotation = [...finalData.salesQuotation, item]
            break;
          case 'Inv' :
            finalData.invoices = [...finalData.invoices, item]
            break;
          case 'PC' :
            finalData.paymentCertificate = [...finalData.paymentCertificate, item]
            break;
          default :        
        }
      })
      if(docType) {
          return finalData[docType]
      }
      return finalData;
    } else {
      return null;
    }
  }  

  export default {
    filterOnDocType 
  }
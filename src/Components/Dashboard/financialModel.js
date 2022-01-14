export const monthLabel = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
export const quarterLabel = [`I(${new Date().getFullYear() - 1})`,`II(${new Date().getFullYear() - 1})`,`III(${new Date().getFullYear() - 1})`,`IV(${new Date().getFullYear() - 1})`,`I(${new Date().getFullYear()})`,`II(${new Date().getFullYear()})`,`III(${new Date().getFullYear()})`,`IV(${new Date().getFullYear()})`]
export const halfYearlyLabel = [`I(${new Date().getFullYear() - 2})`,`II(${new Date().getFullYear() - 2})`,`I(${new Date().getFullYear() - 1})`,`II(${new Date().getFullYear() - 1})`,`I(${new Date().getFullYear()})`,`II(${new Date().getFullYear()})`]
export const yearlyLabel = [`${new Date().getFullYear() - 3}`,`${new Date().getFullYear() - 2}`,`${new Date().getFullYear() - 1}`,`${new Date().getFullYear()}`]

export function filterFinancingData(arrData) {
  if(arrData && arrData.length){
    let finalData = {
        financing : [],
        financed : []
    }
    arrData.map((item) => {
        if(item.financingStatus === 1) {
           finalData.financing = [...finalData.financing, item]
        }
        if(item.financingStatus === 2) {
           finalData.financed = [...finalData.financed, item]
        }
    })
    return finalData;
  } else {
      return null;
  }
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
       const date = new Date(item.date);
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
         let tempAmt = 0;
         if(monthData[`${i}`]) {
            monthData[`${i}`].map(item => {
                tempAmt += +item.amount
            })
         }
         tempArr[i] = tempAmt;
     }
     finalData.graphLabel = graphLabel // .slice(0,maxMonth + 1)
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
    if(arrData && arrData.length){
       arrData.map((item,index) => {
       const date = new Date(item.date);
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
        let tempAmt = 0;
        if(quartData[`${i}`]) {
            quartData[`${i}`].map(item => {
               tempAmt += +item.amount
           })
        }
        tempArr[i] = tempAmt;
    //    tempArr[i] = quartData[`${i}`] ? quartData[`${i}`].length : 0;
     }
     for(let i=0; i<= 3; i++){
        let tempAmt = 0;
        if(preYearQuartData[`${i}`]) {
            preYearQuartData[`${i}`].map(item => {
               tempAmt += +item.amount
           })
        }
        tempArr1[i] = tempAmt;
    //    tempArr1[i] = preYearQuartData[`${i}`] ? preYearQuartData[`${i}`].length : 0;
     }
     finalData.graphLabel = graphLabel.map((item) => item + ' (' + (currentY - 1) + ')').concat(graphLabel.map((item) => item + ' ('+ currentY + ')'))
    //  finalData.graphLabel = graphLabel.map((item) => item + ' (' + (currentY - 1) + ')').concat(graphLabel.slice(0,maxMonth + 1).map((item) => item + ' ('+ currentY + ')'))
     finalData.graphData = tempArr1.concat(tempArr);
    }
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
       const date = new Date(item.date);
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
        let tempAmt = 0;
        if(halfData[`${i}`]) {
            halfData[`${i}`].map(item => {
               tempAmt += +item.amount
           })
        }
        tempArr[i] = tempAmt;
    //    tempArr[i] = halfData[`${i}`] ? halfData[`${i}`].length : 0;
     }
     for(let i=0; i<=1; i++){
        let tempAmt = 0;
        let tempAmt1 = 0;
        if(preYearHalfData1[`${i}`]) {
            preYearHalfData1[`${i}`].map(item => {
               tempAmt += +item.amount
           })
        }
        if(preYearHalfData2[`${i}`]) {
            preYearHalfData2[`${i}`].map(item => {
                tempAmt1 += +item.amount
           })
        }
        tempArr1[i] = tempAmt;
        tempArr2[i] = tempAmt1;
    //    tempArr1[i] = preYearHalfData1[`${i}`] ? preYearHalfData1[`${i}`].length : 0;
    //    tempArr2[i] = preYearHalfData2[`${i}`] ? preYearHalfData2[`${i}`].length : 0;
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
       const date = new Date(item.date);
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
        let tempAmt = 0;
        if(yearly[`${i}`]) {
            yearly[`${i}`].map(item => {
               tempAmt += +item.amount
           })
        }
        tempArr[i] = tempAmt;
        // tempArr[i] = yearly[`${i}`] ? yearly[`${i}`].length : 0;
     }
     finalData.graphLabel = graphLabel;
     finalData.graphData = tempArr;
    }
    // console.log('Final Data : ',finalData);
    return finalData
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
   filterFinancingData,
   filterOnCurrentYearMonth,
   filterOnQuarterly,
   filterOnHalfYearly,
   filterOnYearly,
   copiedGraphData
}
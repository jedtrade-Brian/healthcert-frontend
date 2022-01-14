
export function formatAmount(amount){
    return (Math.round(amount * 100) / 100).toFixed(2);
}

export function numberWithCommas(x) {
    if(x) {
        // return x.toString().split('.')[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '.' + x.toString().split('.')[1];
     return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
     return '';
    } 
 }

 export default {
    formatAmount,
    numberWithCommas
 }
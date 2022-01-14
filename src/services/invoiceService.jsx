import http from './httpService'

export function createFinanceRequest(data,financierName,docName){
    return http.postMethod(`/api/v1/hash/financingReq/${financierName}/${docName}`,data,true)
}

export function getSalesInvoiceData(){
    return http.getMethod('/api/v1/hash/document/list/invoices',true)
}

export function getSalesNOAData(){
    return http.getMethod('/api/v1/hash/supplier/document/list/invoices',true)
}

export function getPurchaseInvoiceData(){
    return http.getMethod('/invoice')
}

export function getPurchaseNOAData(){
    return http.getMethod(`/api/v1/hash/buyer/document/list/invoices`,true)
}
// /api/v1/hash/enterprise/getNOA/{invDocHash}
export function getInvoiceNOA(invDocHash){
    return http.getMethod(`/api/v1/hash/enterprise/getNOA/${invDocHash}`,true)
}

export function getFinancingNOA(frDocHash){
    return http.getMethod(`/api/v1/hash/enterprise/getNOAByFR/${frDocHash}`,true)
}
export function getInvoiceRawData(){
    return http.getMethod(`/api/v1/hash/enterprise/dashboard/invChart`,true)
}

// export function createInvoice(data){
//     return http.postMethod('/api/v1/hash/invoice',data,true)
// }

export default {
    createFinanceRequest,
    getSalesInvoiceData,
    getSalesNOAData,
    getPurchaseInvoiceData,
    getPurchaseNOAData,
    getInvoiceNOA,
    getInvoiceRawData
    // getFinancierCompanyName
    // createInvoice
}


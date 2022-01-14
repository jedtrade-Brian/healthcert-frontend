import http from './httpService'

export function getSalesQuotationBuyer(){
    return http.getMethod('/api/v1/hash/document/list/salesquotation',true)
}

export default {
    getSalesQuotationBuyer
}
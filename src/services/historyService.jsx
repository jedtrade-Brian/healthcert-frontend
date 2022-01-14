import http from './httpService'

export function getBatchHistory(){
    return http.getMethod(`/api/v1/hash/document/list/history`,true)
}

export function getBatchCertificates(batchId){
    return http.getMethod(`/api/v1/hash/document/students/${batchId}`,true)
}

export function getCertificateDetails(docHash){
    return http.getMethod(`/api/v1/hash/${docHash}`,true)
}



export function revokeBatch(docHash){
    return http.postMethod(`/api/v1/hash/revokeDocument/${docHash}`,true)
}


export default{
    getBatchHistory,
    getBatchCertificates,
    getCertificateDetails,
    revokeBatch
}
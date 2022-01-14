import http from './httpService'

export function createTVCertificates(data){
    return http.postMethod('/api/v1/hash/certificate',data,true)
}

export function createPDDMCSCert(data){
    return http.postMethod('/api/v1/hash/pddmcs',data,true)
}

export function createPGDSLICert(data) {
    return http.postMethod('/api/v1/hash/pgdsli',data,true)
}

export function createDICTCert(data){
    return http.postMethod(`/api/v1/hash/dict`,data,true)
}

export function createHCPCRCert(data){
    return http.postMethod(`/api/v1/hash/hcpcr`,data,true)
}

export function createADSMCert(data){
    return http.postMethod(`/api/v1/hash/adsm`,data,true)
}

export function createADCSCert(data){
    console.log(data);
    return http.postMethod(`/api/v1/hash/adcs`,data,true)
    
}

export function createTwoApproverCertificates(data){
    return http.postMethod('/api/v1/hash/twoApprover',data,true)
}

export function revokeDocument(docHash,isBatch){
    return http.postMethod(`/api/v1/hash/revokeDocument/${docHash}/${isBatch}`,null,true)
}

export function signDocument(docHash){
    return http.postMethod(`/api/v1/hash/sign/${docHash}`,null,true)
}

export function getCertificate(docHash){
    return http.getMethod(`/api/v1/hash/${docHash}`,true)
}

export function getCertificateList(){
    return http.getMethod(`/api/v1/hash/document/list/certificate`,true)
}

export function getStudentsList(){
    return http.getMethod(`/api/v1/hash/document/students`,true)
}

export function emailCertificatePDF(docHash){
    return http.getMethod(`/api/v1/hash/document/emailPdf/${docHash}`,true)
}

export default {
    createTVCertificates,
    createPDDMCSCert,
    createPGDSLICert,
    createDICTCert,
    createHCPCRCert,
    createADSMCert,
    createADCSCert,
    createTwoApproverCertificates,
    signDocument,
    getCertificate,
    getCertificateList,
    getStudentsList,
    emailCertificatePDF,
}
import http from './httpService'

export const verifyUserViaPass = (password) => {
    return http.postMethod(`/api/v1/hash/${password}`,null,true)
}

// export const signDocument = (docHash) => {
//     return http.getMethod(`/api/v1/hash/verifySignature/${docHash}`,true)
// }

export const verifyIsSign = (docHash) => {
    return http.getMethod(`​/api/v1/hash/verifySignature/${docHash}`,true)
}

export const getDocHash = (docHash) => {
    return http.getMethod(`/api/v1/hash/${docHash}`,true)
}

export const getNOADocHash = (docHash) => {
    return http.getMethod(`/api/v1/hash/financing/documents/${docHash}`,true)
}

export const verifyMobileOTP = (data ,docHash) => {
    return http.putMethod(`/api/v1/hash/${docHash}`, data, true) 
}

export default {
    verifyUserViaPass,
    verifyIsSign,
    getDocHash,
    verifyMobileOTP,
    getNOADocHash
}
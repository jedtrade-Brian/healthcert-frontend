import http from './httpService'

export function getStudentsList(){
    return http.getMethod(`/api/v1/hash/document/students`,true)
}

export function getStudentCertificates(Id){
    return http.getMethod(`/api/v1/hash/document/studentDetail/${Id}`,true)
}


export default{
    getStudentsList,
    getStudentCertificates
}
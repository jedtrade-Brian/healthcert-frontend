import http from "./httpService"

export function updateUnitPrice(unitPrice){
  return http.postMethod(`/api/v1/config/setUnitPrice/${unitPrice}`,null,true)
}

export function updateSurcharge(surcharge){
  return http.postMethod(`/api/v1/config/setSurCharge/${surcharge}`,null,true)
}

export function updateMonthlyBilling(automated){
  return http.postMethod(`/api/v1/config/setMonthlyBill/${automated}`,null,true)
}

export function updateBillingDate(date){
  return http.postMethod(`/api/v1/config/setAutoSendDate/${date}`,null,true)
}

export function updateRecipientEmail(email){
  return http.postMethod(`/api/v1/config/setAdminEmail/${email}`,null,true)
}

export function getConfigurations(){
  return http.getMethod(`/api/v1/config/viewConfig`,true)
}

export default {
    updateUnitPrice,
    updateSurcharge,
    updateMonthlyBilling,
    updateBillingDate,
    updateRecipientEmail,
    getConfigurations,
}
import http from './httpService';

export function createNOA(docData) {
  return http.postMethod(`/api/v1/hash/noa/create`, docData, true);
}

export function declineInvoiceRequest(data) {
  return http.postMethod('/api/v1/hash/finance/declineInvoice/', data, true);
}

export function verifyNoaOTP(otp) {
  return http.getMethod(`/api/v1/hash/issueNoa/verifyOTP/${otp}/`, true);
}

export function getDashboardInvoiceCount() {
  return http.getMethod(`/api/v1/hash/financier/invList/dashboard`, true);
}

export function getDashboardDeclineCount() {
  return http.getMethod(`/api/v1/hash/financier/declineList/dashboard`, true);
}

export const getSuplierInvoices = (supplierEmail) => {
  return http.getMethod(
    `/api/v1/hash/financier/document/list/invoices/${supplierEmail}`,
    true
  );
};

export const getDocHash = (docHash) => {
  return http.getMethod(`/api/v1/hash/${docHash}`, true);
};

/******************************************* */

export function getFinancierCompanyName() {
  return http.getMethod(`/api/v1/hash/all/financier/namelist`, true);
}

export function getFinancierCompanyDetails(companyName) {
  return http.getMethod(
    `/api/v1/hash/financier/bankDetails/${companyName}`,
    true
  );
}

export function getFinancierDetails(companyName) {
  return http.getMethod(
    `/api/v1/hash/financier/bankDetails/${companyName}`,
    true
  );
}

export function getFinancierDocumentDetails(docHash) {
  return http.getMethod(`/api/v1/hash/financing/documents/${docHash}`, true);
}

export function getFinancierChartData() {
  return http.getMethod(`/api/v1/hash/financier/dashboard/invChart`, true);
}
export function getInvoiceRelatedDocs(supplierEmail,invHash) {
  return http.getMethod(`/api/v1/hash/financier/invoice/related/documents/${supplierEmail}/${invHash}`, true);
}
export default {
  createNOA,
  declineInvoiceRequest,
  verifyNoaOTP,
  getDashboardInvoiceCount,
  getSuplierInvoices,
  getFinancierCompanyName,
  getFinancierDetails,
  getFinancierDocumentDetails,
  getFinancierChartData
};

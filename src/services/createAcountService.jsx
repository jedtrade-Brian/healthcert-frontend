import http from "./httpService";

export function createAccountEnterprise(data) {
  return http.postMethod("/api/v1/users", data);
}

export function createAccountFinancier(data) {
  return http.postMethod("/api/v1/users/FinancierSignup", data);
}

export function verifyMobileOTP(otp) {
  return http.getMethod(`/api/v1/auth/verifyOTP/${otp}`);
}

export function verifyEmail(encode) {
  return http.getMethod(`/api/v1/auth/verify/${encode}`);
}

export function resendMobileOTP(mobileNo) {
  return http.putMethod(`/api/v1/users/resendOTP/${mobileNo}`);
}

export function resendEmail(email) {
  return http.putMethod(`/api/v1/users/resendEmail/${email}`);
}

export default {
  createAccountEnterprise,
  createAccountFinancier,
  verifyMobileOTP,
  verifyEmail,
  resendMobileOTP,
  resendEmail
};

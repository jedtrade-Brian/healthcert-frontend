import http from './httpService';
export async function login(data) {
  const response = await http.postMethod('/api/v1/auth/login', {
    email: data.email,
    password: data.password,
  });
  if (response && response.data) {
    setAuthToken(response.data.authToken);
    await createApiToken();
  }
  if (response && response.data && response.data.role) {
    setRole(response.data.role);
  }
  return response;
}

function setRole(role) {
  localStorage.setItem('role', role);
}

export function getRole() {
  return localStorage.getItem('role');
}

export function logout() {
  localStorage.clear();
}

const createApiToken = async () => {
  try {
    const apiTokenResponse = await http.postMethod(
      '/api/v1/auth/keys',
      null,
      false,
      true
    );
    if (apiTokenResponse.data) {
      const apiToken = apiTokenResponse.data.token;
      await verifyApiToken(apiToken);
      setApiToken(apiToken);
    }
  } catch (ex) {}
};

export function verifyApiToken(apiToken) {
  http.getMethod(`/api/v1/auth/keys/${apiToken}`);
}

export function setApiToken(apiToken) {
  localStorage.setItem('apiToken', apiToken);
}

export function getApiToken() {
  return localStorage.getItem('apiToken');
}

export function setAuthToken(token) {
  localStorage.setItem('authToken', token);
}

export function getAuthToken() {
  return localStorage.getItem('authToken');
}

export function getUserInfo() {
  return JSON.parse(localStorage.getItem('user'));
}

export function setUserInfo(data) {
  return localStorage.setItem('user', JSON.stringify(data));
}

export function setSelectedInvoices(data) {
  return localStorage.setItem('selectedInvoices', JSON.stringify(data));
}

export function getSelectedInvoices() {
  return JSON.parse(localStorage.getItem('selectedInvoices'));
}

export function removeSelectedInvoices() {
  localStorage.removeItem('selectedInvoices');
}

export function setDocumentsList(data) {
  localStorage.setItem('documentsList', JSON.stringify(data));
}

export function getLocalDocumentsList() {
  return JSON.parse(localStorage.getItem('documentsList'));
}

export function verifyEmail(encode) {
  return http.getMethod(`/api/v1/auth/verify/${encode}`);
}

export function setBuyerEmail(data) {
  return localStorage.setItem('buyerEmail', JSON.stringify(data));
}
export function setDocHash(data) {
  return localStorage.setItem('docHash', JSON.stringify(data));
}
export function getBuyerEmail() {
  return JSON.parse(localStorage.getItem('buyerEmail'));
}
export function getDocHash() {
  return JSON.parse(localStorage.getItem('docHash'));
}

export function forgotPassword(email) {
  return http.postMethod(`/api/v1/users/forgetPassword/request/${email}`,null)
}

export function changePassword(data) {
  return http.putMethod(`/api/v1/users/Change/Password`,data,false,true)
}

export function updateUser(data) {
  return http.putMethod(`/api/v1/users`,data,false,true)
}

export function resetPassword (newPassword,authToken) {
  return http.putMethod(`/api/v1/users/forget/Password/update/${newPassword}`,null,false,false,authToken)
}

export function verifyForgetPasswordReq(encode) {
  return http.getMethod(`/api/v1/auth/forget/Password/verify/${encode}`);
}


export default {
  login,
  logout,
  setAuthToken,
  getAuthToken,
  getApiToken,
  setUserInfo,
  getUserInfo,
  getRole,
  setSelectedInvoices,
  getSelectedInvoices,
  removeSelectedInvoices,
  verifyEmail,
  setDocumentsList,
  getLocalDocumentsList,
  setBuyerEmail,
  setDocHash,
  getBuyerEmail,
  getDocHash,
  setApiToken,
  forgotPassword,
  changePassword,
  updateUser,
  resetPassword,
  verifyForgetPasswordReq
};

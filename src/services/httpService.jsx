import axios from "axios";
import swal from "sweetalert";
import authService from "./authService";

axios.defaults.baseURL ="http://localhost:3000";

axios.interceptors.response.use(null, error => {
  console.log('error.response: ',error) 
  swal("Contact Administrator!",  error.response.data.message, "error");
  // const expectedError =
  //   error.response &&
  //   error.response.status >= 400 &&
  //   error.response.status < 500;
  // if (!expectedError) {
  //   swal("Oops!", "Something went wrong!", "error");
  //   authService.logout();
  //   window.location = "#/login";
  // }
  // else if(error.response.status === 401){
  //   console.log('Error : ',error);
  //   authService.logout()
  //   window.location = "#/login"; 
  //   // window.history.pushState({}, null, '#/login');
  // }
  return Promise.reject(error);
});

const setApiTokenHeader = () => {
  const token = authService.getApiToken();
  if (!token) {
    window.location = "#/login";
    // window.history.pushState({}, null, '#/login');
    return null;
  }
  return {
    'Authorization': `Bearer ${token}`
  };
};

const setAuthTokenHeader = () => {
  const token = authService.getAuthToken();
  if (!token) {
    window.location = "#/login";
    // window.history.pushState({}, null, '#/login');
    return null;
  }
  return {
    'Authorization': `Bearer ${token}`
  };
};

export function getMethod(url, isApiToken = false, isAuthToken = false) {
  let header = {};
  isApiToken
    ? (header = setApiTokenHeader() ? { headers: setApiTokenHeader() } : null)
    : isAuthToken
    ? (header = setAuthTokenHeader() ? { headers: setAuthTokenHeader() } : null)
    : (header = null);

  if (header) {
    return axios.get(url, header);
  }
  return axios.get(url);
}

export function postMethod(url, data, isApiToken = false, isAuthToken = false) {
  let header = {};
  isApiToken
    ? (header = setApiTokenHeader() ? { headers: setApiTokenHeader() } : null)
    : isAuthToken
    ? (header = setAuthTokenHeader() ? { headers: setAuthTokenHeader() } : null)
    : (header = null);

  if (header) {
    return axios.post(url, data, header);
  }
  return axios.post(url, data);
}

export function putMethod(
  url,
  data = {},
  isApiToken = false,
  isAuthToken = false,
  authToken = null
) {
  let header = {};
  isApiToken
    ? (header = setApiTokenHeader() ? { headers: setApiTokenHeader() } : null)
    : isAuthToken
    ? (header = setAuthTokenHeader() ? { headers: setAuthTokenHeader() } : null)
    : (header = null);

  if (header) {
    return axios.put(url, data, header);
  } else if(authToken) {
    return axios.put(url, data, {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    });
  }
  return axios.put(url, data);
}

export default {
  putMethod,
  getMethod,
  postMethod
};

import axios from 'axios'

import { API_ROOT } from "./constants";
import { buildError } from './errors';
// instantiate axios
const httpClient = axios.create()


httpClient.getModel = function(token, model) {
  if (token) {
    axios.defaults.headers.common['Authorization'] = token;
  }
  return new Promise ((resolve, reject) => {
    axios.get(API_ROOT + model)
      .then( (response) => {
        if (response.status < 300) {
          resolve(response.data);
        } else {
          console.log("httpClient.getModel: Unexpected OK status ["+response.status+"]. See https://github.com/axios/axios#handling-errors");
        }
      })
      .catch( e => reject(buildError(e))) // check error.forceLogout to call api.logOut()
  })
}

httpClient.postModel = function(token, model, properties) {
  return new Promise ((resolve, reject) => {
    axios.post(API_ROOT + model, properties).then( (response) => {
      if (response.status < 300) {
        resolve(response.data);
      } else {
        console.log("httpClient.postModel: Unexpected OK status ["+response.status+"]. See https://github.com/axios/axios#handling-errors");
      }
    }).catch( e => reject(buildError(e)))
  })
}
/*
httpClient.logIn = function(credentials, callback) {
  let conf = {
    "auth": credentials
  }
  axios.get(API_ROOT + "auth/", conf)
    .then((serverResponse) => {
      //console.log("httpClient.logIn serverResponse: " + JSON.stringify(serverResponse));
      const token = serverResponse.data.Authorization;
      if (token) {
        api.setToken(token);
        // sets token as an included header for all subsequent api requests
        axios.defaults.headers.common['Authorization'] = token;
      }
      try {
        if (callback) {
          callback(serverResponse)
        }
      } catch (e) {
        console.log("Ignoring error on callback: " + e);
      }
    }).catch( e => reject(buildError(e)))
}
*/
httpClient.logOut = function() {
  delete axios.defaults.headers.common['Authorization']
  return true
}
httpClient.setAuthToken = function (token) {
  axios.defaults.headers.common['Authorization'] = token
}

export default httpClient
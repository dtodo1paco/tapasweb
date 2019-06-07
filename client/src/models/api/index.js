import { API_ROOT, TOKEN_KEY } from "./constants";
import httpClient from './client';


const api = {};

/** TOKEN RELATED **/
api.getToken = function() {
  return localStorage.getItem(TOKEN_KEY)
}
api.setToken = function(token) {
  localStorage.setItem(TOKEN_KEY, token)
  return token
}

api.logOut = function() {
  httpClient.logOut();
  localStorage.removeItem(TOKEN_KEY)
  return true
}
/** TOKEN RELATED **/


// During initial app load attempt to set a localStorage stored token
// as a default header for all api requests.
httpClient.setAuthToken(api.getToken());

/** SERVER RELATED **/
api.logIn = function(credentials, callback) {
  if (API_ROOT) {
    httpClient.logIn(credentials, callback);
  } else {
    console.log("READING FROM FILE logIn");
    /*
     const result = fileReader
     .parseJSONResponse('login');
     api.setToken(result.data.Authorization);
     result.data = api.getCurrentUser();
     if (callback) {
     callback(result);
     }
     }
     */
  }
}

api.getModel = function(model, callback) {
  if (API_ROOT) {
    httpClient.getModel(api.getToken(), model, callback);
  } else {
    console.log("READING FROM FILE getModel");
  }
}

api.postModel = function(model, properties) {
  if (API_ROOT) {
    return httpClient.postModel(api.getToken(), model, properties);
  } else {
    console.log("READING FROM FILE postModel");
    /*
    const result = fileReader.parseJSONResponse(model);
    if (callback) {
      callback(result);
    }
    */
  }

}

export default api;
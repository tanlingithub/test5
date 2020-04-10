import axios from 'axios';
import {Message} from 'element-ui';
import getSignature from '@/utils/signature.js';

const instance = axios.create({
  baseURL: window.location.origin +'/open-api', 
  timeout: 10000 * 6,
  headers: {
    'Content-Type': 'application/json',
  },
});
instance.interceptors.request.use(config => config);

instance.interceptors.response.use(
  response => {
    const res = response.data;
    return new Promise((resolve, reject) => {
      let code = res.code || res.errcode;
      let message = res.message || res.msg;
      if (code == 401) {
        Message({
          message: message,
            type: 'error',
          duration: 5 * 1000,
        });
        reject('Unauthorized');
      } else if (code !== 0) {
        Message({
          message: message,
          type: 'error',
          duration: 5 * 1000,
        });
        reject(message);
      } else {
        resolve(response);
      }
    });
  },
  error => {
    console.log(error); // for debug
    const res = error.response;
    const {msg, message} = res.data;
    Message({
      message: msg || message || error.message,
      type: 'error',
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  },
);

function handleUrl(url, params) {
  let keys = Object.keys(params);
  for (let key of keys) {
    url = url.replace(`{${key}}`, params[key]);
  }
  console.log('url', url);
  return url;
}

const http = async function({
  method = 'get',
  url = '',
  body = {},
  query = {},
  params = {},
  headers = {},
  appSecret,
  appKey,
}) {
  let urlHandled = handleUrl(url, params);
  let signature = getSignature({
    appSecret,
    url: urlHandled,
    body,
    method,
    query,
  });
  const {payload} = await instance({
    url,
    method,
    data: body,
    params: query,
    headers: {
      'X-Ca-Signature': signature,
      'X-Ca-Key': appKey,
      ...headers,
    },
  });
  return payload;
};

http.get = async (url, options) => http({method: 'get', url, ...options});
http.post = async (url, data, options) => http({method: 'post', data, url, ...options});
http.put = async (url, data, options) => http({method: 'put', data, url, ...options});
http.delete = async (url, options) => http({method: 'delete', url, ...options});
export default http;

import axios from 'axios';

import config from 'utils/config';
import storageService from 'services/storage.service';

const http = axios.create({ baseURL: `${config.baseUrl}/` });

function getAuthHeader(url) {
  let authHeader = {
    'Content-Type': 'application/json',
    Accept: 'application/vnd.github.v3+json',
  };
  if (url.indexOf('installations') > -1) {
    if (config.githubToken) {
      authHeader = {
        ...authHeader,
        Authorization: `Bearer ${config.githubToken}`,
      };
    }
  } else {
    const accessToken = storageService.getItem('access_token');
    if (accessToken) {
      authHeader = {
        ...authHeader,
        Authorization: `token ${accessToken}`,
      };
    }
  }
  return authHeader;
}

function get(url, headers = {}, params = {}) {
  return http.get(url, {
    params,
    headers: { ...getAuthHeader(url), ...headers },
  });
}

function post(url, data, headers = {}, options = {}) {
  return http.post(url, data, {
    ...options,
    headers: { ...getAuthHeader(url), ...headers },
  });
}

function put(url, data, headers = {}, options = {}) {
  return http.post(url, data, {
    ...options,
    headers: { ...getAuthHeader(url), ...headers },
  });
}

function remove(url, headers = {}, options = {}) {
  return http.delete(url, {
    ...options,
    headers: { ...getAuthHeader(url), ...headers },
  });
}

export default {
  http,
  get,
  post,
  put,
  remove,
};

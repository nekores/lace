import config from 'utils/config';
import axios from 'axios';
// import httpService from './http.service';

const url = '/api/cryptocurrencies/';

// eslint-disable-next-line import/prefer-default-export
export const getLaceTokenInfo = (symbol) => axios
  .get(`${config.baseUrl}${url}${symbol}/quotes`)
  .then((res) => res.data)
  .catch((e) => Promise.reject(e));

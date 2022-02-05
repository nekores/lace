import config from 'utils/config';
import httpService from './http.service';

const url = '/api/cryptocurrencies/';

// eslint-disable-next-line import/prefer-default-export
export const getLaceTokenInfo = (symbol) => httpService
  .get(`${config.baseUrl}${url}${symbol}/quotes`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

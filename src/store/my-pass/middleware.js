import axios from 'axios';

import config from './config';

const myPassApi = axios.create({
  baseURL: config.DEV.base_url,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});

export const register = async ({ name, pin, dataUri }) => {
  return myPassApi.post('/register', { name, pin, dataUri });
};

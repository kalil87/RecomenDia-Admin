

import axios from 'axios';

export const httpClient = axios.create({
  baseURL: 'http://127.0.0.1:8080/api',
});
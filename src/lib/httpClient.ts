import axios from 'axios';

const httpClient = axios.create({
  baseURL: import.meta.env.FINHAVA_API_URL,
});

export default httpClient;

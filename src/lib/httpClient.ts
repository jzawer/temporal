import axios from "axios";

const httpClient = axios.create({
  baseURL: import.meta.env.BASE_URL
});

export default httpClient;
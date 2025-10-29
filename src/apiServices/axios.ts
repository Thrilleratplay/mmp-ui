import axios from 'axios';

import { BACKEND_HTTP_URL_ROOT  } from "@/core//utils/constants";

const backendAxiosInstance = axios.create({
  baseURL: BACKEND_HTTP_URL_ROOT,
});

export default backendAxiosInstance;
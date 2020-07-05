import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export interface IHttpService {
  get(url: string): Promise<AxiosResponse>;

  post(url: string, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>;

  put(url: string, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>;
}

class HttpService implements IHttpService {
  private readonly client: AxiosInstance;

  private clientConfigs: AxiosRequestConfig = {
    baseURL: 'http://localhost:4000',
  };

  constructor() {
    const errorHandler = (error) => {
      return Promise.reject(error.response);
    };

    const successHandler = (response) => {
      if (response.data && response.data.data) {
        response = { ...response, ...response.data };
      }
      return response;
    };

    const axiosInstance = axios.create(this.clientConfigs);

    axiosInstance.interceptors.response.use(response => successHandler(response),
      error => errorHandler(error));

    axiosInstance.interceptors.request.use((config) => {
      // const token = getToken();
      // if (token) {
      //   config.headers.Authorization = `Bearer ${token}`;
      // }
      return config;
    });

    this.client = axiosInstance;
  }

  get(url: string) {
    return this.client.get(url);
  }

  post(url: string, data: any, options) {
    return this.client.post(url, data, options);
  }

  put(url: string, data: any, options) {
    return this.client.put(url, data, options);
  }
}

export default new HttpService();

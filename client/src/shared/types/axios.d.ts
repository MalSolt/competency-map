// eslint-disable-next-line @typescript-eslint/no-unused-vars
import axios from 'axios';

declare module 'axios' {
  export interface AxiosInstance {
    request<T = any>(config: AxiosRequestConfig): Promise<T>;
    get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
    delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
    head<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
    post<P = any, T = any>(
      url: string,
      data?: P,
      config?: AxiosRequestConfig
    ): Promise<T>;
    put<P = any, T = any>(
      url: string,
      data?: P,
      config?: AxiosRequestConfig
    ): Promise<T>;
    patch<P = any, T = any>(
      url: string,
      data?: P,
      config?: AxiosRequestConfig
    ): Promise<T>;
  }
}

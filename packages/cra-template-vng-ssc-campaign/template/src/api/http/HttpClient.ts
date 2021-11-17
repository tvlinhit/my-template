import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
  Method,
} from 'axios';
import qs from 'qs';

export class UnauthorizedError extends Error {}

export interface HttpOptions<T> {
  queryParams?: Record<string, unknown>;
  body?: T;
  timeout?: number;
  headers?: AxiosRequestHeaders;
}
function getUrl(config: AxiosRequestConfig) {
  return config.baseURL ? config?.url?.replace(config.baseURL, '') : config.url;
}

export class HttpClient {
  protected httpClient: AxiosInstance;

  constructor({ baseURL, ...props }: AxiosRequestConfig) {
    this.httpClient = axios.create({
      baseURL,
      withCredentials: true,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
      ...props,
    });

    // Interceptor to put authorization token
    this.httpClient.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        console.log(
          `%c ${config?.method?.toUpperCase()} - ${getUrl(config)}`,
          'color: #0086b3; font-weight: bold',
          config
        );
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );
  }

  getHttpClient(): AxiosInstance {
    return this.httpClient;
  }

  protected get<E>(url: string, options: HttpOptions<undefined> = {}): Promise<E> {
    return this.request<undefined, E>('GET', url, options);
  }

  protected head<T>(url: string, options: HttpOptions<T> = {}): Promise<void> {
    return this.request('HEAD', url, options);
  }

  protected put<T, E>(url: string, options: HttpOptions<T> = {}): Promise<E> {
    return this.request<T, E>('PUT', url, options);
  }

  protected patch<T, E>(url: string, options: HttpOptions<T> = {}): Promise<E> {
    return this.request<T, E>('PATCH', url, options);
  }

  protected post<T, E>(url: string, options: HttpOptions<T> = {}): Promise<E> {
    return this.request('POST', url, options);
  }

  protected postFormData<T, E>(url: string, options: HttpOptions<T | string> = {}): Promise<E> {
    if (options.body) {
      options.body = qs.stringify(options.body);
    }
    options.headers = {
      ...(options?.headers ?? {}),
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    };
    return this.request('POST', url, options);
  }

  protected delete<T, E>(url: string, options: HttpOptions<T> = {}): Promise<E> {
    return this.request('DELETE', url, options);
  }

  protected options<T, E>(url: string, options: HttpOptions<T> = {}): Promise<E> {
    return this.request('OPTIONS', url, options);
  }

  protected async request<T, E>(method: Method, url: string, options: HttpOptions<T> = {}): Promise<E> {
    if (options.body && (method === 'GET' || method === 'HEAD' || method === 'OPTIONS')) {
      const msg = 'GET, HEAD, OPTIONS, DELETE must not have request body !';
      throw new Error(msg);
    }

    if (!options.body && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
      const msg = 'POST, PUT, PATCH must have request body !';
      throw new Error(msg);
    }

    const { queryParams, body, timeout, headers } = options;

    try {
      const { data } = await this.httpClient.request<E, AxiosResponse<E>>({
        method,
        url,
        params: queryParams,
        data: body,
        timeout,
        headers,
      });
      return data;
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response && axiosError.response.status === 401) {
        throw new UnauthorizedError('Unauthorized request!');
      }
      throw error;
    }
  }
}

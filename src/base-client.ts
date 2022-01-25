import axios, {AxiosRequestConfig} from "axios";
import {DiveraResponse} from "./endpoints/divera-response.model";

const DEFAULT_DIVERA_API_BASE_URL = "https://app.divera247.com/api/"

export abstract class BaseClient {
  private readonly DIVERA_API_BASE_URL: string;
  private axiosConfig = {} as AxiosRequestConfig;

  constructor(accessKey: string, apiBaseUrl?: string) {
    this.DIVERA_API_BASE_URL = apiBaseUrl ? apiBaseUrl : DEFAULT_DIVERA_API_BASE_URL
    this.axiosConfig.params = {
      accesskey: accessKey,
    };
  }

  static getAccessToken(username: string, password: string): Promise<string> {
    return axios.get<DiveraResponse>('v2/auth/login', {
      data: {
        username,
        password,
        jwt: false
      }
    }).then(response => response.data.data.user?.access_token);
  }

  protected post<ResponseType = void>(resourcePath: string, payload: any): Promise<ResponseType> {
    return axios.post<ResponseType>(this.DIVERA_API_BASE_URL + resourcePath, payload, this.axiosConfig)
      .then(((response) => response.data));
  }

  protected get<ResponseType>(resourcePath: string, data?: {}): Promise<ResponseType> {
    // Divera has GET endpoints that expect a body :)
    return axios.get<ResponseType>(this.DIVERA_API_BASE_URL + resourcePath, {...this.axiosConfig, data})
      .then(((response) => response.data));
  }

  protected delete<ResponseType = void>(resourcePath: string): Promise<ResponseType> {
    return axios.delete<ResponseType>(this.DIVERA_API_BASE_URL + resourcePath, this.axiosConfig)
      .then(((response) => response.data));
  }

  protected patch<ResponseType>(resourcePath: string, payload: any): Promise<ResponseType> {
    return axios.patch<ResponseType>(this.DIVERA_API_BASE_URL + resourcePath, payload, this.axiosConfig)
      .then(((response) => response.data));
  }

  protected put<ResponseType>(resourcePath: string, payload: any = {}): Promise<ResponseType> {
    return axios.put<ResponseType>(this.DIVERA_API_BASE_URL + resourcePath, payload, this.axiosConfig)
      .then(((response) => response.data));
  }
}

import axios, { RawAxiosRequestHeaders } from 'axios';
import { ChargeResponse, MidtransModel } from '../domain/model/midtrans_model';
import { HttpException } from './exception';
import { Logging } from './logger';

export class ApiCaller {
  private baseUrl: string;
  private token: string;
  private logger: Logging;

  constructor(baseUrl: string, token: string, logger: Logging){
    this.baseUrl = baseUrl;
    this.token = token;
    this.logger = logger;
  }

  getApiCaller() {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'Application/json'
    };
    headers.Authorization = 'Basic ' + Buffer.from(this.token + ":").toString('base64');
    return axios.create({
      headers,
      baseURL: this.baseUrl
    });
  }

  async getHeader(): Promise<RawAxiosRequestHeaders> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'Application/json'
    };
    if (this.token !== "") {
      headers.Authorization = 'Basic ' + Buffer.from(this.token + ":").toString('base64');
    }
    return headers as RawAxiosRequestHeaders;
  }

  async post(route: string, data: MidtransModel): Promise<ChargeResponse> {
    const result = await this.getApiCaller().post(`/${route}`, data);
    if (!result.data) {
      this.logger.logError("ctx", "Cannot create data from " + this.baseUrl + "/"+ route);
      throw new HttpException(409, "Cannot create data from " + this.baseUrl + "/"+ route);
    }
    return result.data as ChargeResponse;
  }

  async get(route: string) {
    const result = await this.getApiCaller().post(`/${route}`);
    return result;
  }
}
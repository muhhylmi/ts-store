import axios, { RawAxiosRequestHeaders } from 'axios';
import { ChargeResponse, MidtransModel } from '../domain/model/midtrans_model';
import { HttpException } from './exception';

export class ApiCaller {
  private baseUrl: string;
  private token: string;

  constructor(baseUrl: string, token: string){
    this.baseUrl = baseUrl;
    this.token = token;
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
    const result = await axios.post(`${this.baseUrl}/${route}`, data, {
      headers: await this.getHeader()
    });
    if (!result.data) {
      throw new HttpException(409, "Cannot create data from " + this.baseUrl + "/"+ route);
    }
    return result.data as ChargeResponse;
  }

  async get(route: string) {
    const result = await axios.post(`${this.baseUrl}/${route}`, {
      headers: await this.getHeader()
    });
    return result;
  }
}
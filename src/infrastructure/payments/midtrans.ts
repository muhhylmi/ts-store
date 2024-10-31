import { ChargeResponse, MidtransModel, TransactionDetail } from "../../domain/model/midtrans_model";
import IPaymentRepo from "../../domain/repositories/payment_int";
import { ApiCaller } from "../../utils/apicaller";
import { bankType } from "../../utils/constant";
import config from "../config";

export class Midtrans implements IPaymentRepo {
  private apiCaller: ApiCaller;

  constructor(){
    this.apiCaller = new ApiCaller(config.MIDTRANS_BASE_URL, config.MIDTRANS_SERVER_KEY);
  }

  async getBaseBody(paymentType: string): Promise<MidtransModel> {
    const result: Partial<MidtransModel> = {
      payment_type: paymentType
    };
    return result as MidtransModel;
  }

  async BCA(data: TransactionDetail): Promise<MidtransModel>{
    const result = await this.getBaseBody('bank_transfer');
    result.bank_transfer = {
      bank: bankType.bca
    };
    result.transaction_details = data;
    return result;
  }

  async BRI(data: TransactionDetail): Promise<MidtransModel>{
    const result = await this.getBaseBody('bank_transfer');
    result.bank_transfer = {
      bank: bankType.bri
    };
    result.transaction_details = data;
    return result;
  }

  async permata(data: TransactionDetail): Promise<MidtransModel>{
    const result = await this.getBaseBody('permata');
    result.transaction_details = data;
    return result;
  }
    
  async charge(bank: string, data: TransactionDetail): Promise<ChargeResponse> {
    let midtransPayload: MidtransModel;
    switch (bank) {
    case bankType.bca:
      midtransPayload = await this.BCA(data);
      break;
    case bankType.bri:
      midtransPayload = await this.BRI(data);
      break;
    case bankType.permata:
      midtransPayload = await this.permata(data);
      break;
    default:
      midtransPayload = await this.BCA(data);
      break;
    }
    const result =  await this.apiCaller.post('charge', midtransPayload);

    return result;
  }
}
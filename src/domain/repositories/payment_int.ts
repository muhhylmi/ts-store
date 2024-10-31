/* eslint-disable no-unused-vars */
import { ChargeResponse, DetailData } from "../model/midtrans_model";

interface IPaymentRepo {
    charge: (bank: string, data: DetailData) => Promise<ChargeResponse>;
}
export default IPaymentRepo;
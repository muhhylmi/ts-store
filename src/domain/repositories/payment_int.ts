/* eslint-disable no-unused-vars */
import { ChargeResponse, TransactionDetail } from "../model/midtrans_model";

interface IPaymentRepo {
    charge: (bank: string, data: TransactionDetail) => Promise<ChargeResponse>;

}
export default IPaymentRepo;
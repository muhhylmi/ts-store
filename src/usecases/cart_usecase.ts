import { CartModel, ChargeInput, CreateCartInput, UpdateCartInput } from "../domain/model/cart_model";
import { CustomerDetail, DetailData, ItemDetail, TransactionDetail } from "../domain/model/midtrans_model";
import { OrderModel, OrderResponse } from "../domain/model/order_model";
import { UserModel } from "../domain/model/user_model";
import ICartRepo from "../domain/repositories/cart_repo_int";
import IOrderRepo from "../domain/repositories/order_repo_int";
import IPaymentRepo from "../domain/repositories/payment_int";
import { paymentStatus } from "../utils/constant";
import { HttpException } from "../utils/exception";
import ICartUsecase from "./cart_usecase_int";


class CartUsecase implements ICartUsecase {
  private readonly repository: ICartRepo;
  private readonly payment: IPaymentRepo;
  private readonly orderRepo: IOrderRepo;
  constructor(repository: ICartRepo, payment: IPaymentRepo, orderRepo: IOrderRepo) {
    this.repository = repository;
    this.payment = payment;
    this.orderRepo = orderRepo;
  }

  async createCart(item: CreateCartInput, user: UserModel){
    const input: CartModel = {
      itemId: item.itemId,
      count: item.count,
      userId: user.id
    };
    const existsCart = await this.repository.findOne({
      item_id: item.itemId,
      user_id: user.id
    });
    if (existsCart) {
      const updateCart: UpdateCartInput = {
        itemId: item.itemId,
        count: item.count + input.count,
        cartId: existsCart.id
      };
      return await this.updateCart(updateCart, user);
    }
    const newCart =  await this.repository.addCart(input);

    return newCart;
  }

  async updateCart(item: UpdateCartInput, user: UserModel){
    const input: Omit<CartModel, "price"> = {
      itemId: item.itemId,
      count: item.count,
      userId: user.id,
      cartId: item.cartId
    };
    const update = await this.repository.updateOne(item.cartId, input);
    if (!update) {
      throw new HttpException(400,'cart not found');
    }
    return update;
  }

  async getCart(): Promise<object> {
    const carts = await this.repository.getCart({});
    return carts;
  }

  async getCartDetail(id: number): Promise<object | null>{
    const item = await this.repository.findOne({
      id: id,
    });
    if (!item) {
      throw new HttpException(400, 'Cart Not Found');
    }
    return item;
  }

  async deleteCart(id: number) {
    const item = await this.getCartDetail(id);
    if (!item) {
      throw new HttpException(400, 'Item Not Found');
    }
    return this.repository.deleteCart(id);

  }


  async cartCharge(carts: ChargeInput, user: UserModel): Promise<OrderResponse> {

    const dataCarts = await this.repository.getCart({
      id: {
        in: carts.cartIds
      },
      status: paymentStatus.UNPAID
    });
    if (dataCarts.length === 0) {
      throw new HttpException(404, 'carts is not found');
    }
    const itemDetails: ItemDetail[] = dataCarts.map((cart) => {
      return {
        id: cart.itemId,
        price: cart.price,
        quantity: cart.count,
        name: cart.itemName
      };
    });
    const customerDetail: CustomerDetail = {
      first_name: user.username
    };
    const transactionDetail: TransactionDetail = {
      gross_amount: dataCarts.reduce((acc, item)=> acc + (item.price as number * item.count) ,0),
      order_id: new Date().getTime().toString()
    };
    const detailData: DetailData = {
      item_details: itemDetails,
      customer_details: customerDetail,
      transaction_details: transactionDetail
    };
    const midtransResult = await this.payment.charge(carts.bank, detailData);
    if (midtransResult.status_code !== "201") {
      throw new HttpException(Number(midtransResult.status_code), midtransResult.status_message);
    }
    const dataOrder: OrderModel = {
      id: Date.now().toString(),
      status: midtransResult.transaction_status,
      userId: user.id
    };
    const orderResult = await this.orderRepo.create(dataOrder);
    if (!orderResult) {
      throw new HttpException(409, 'Cannot create order');
    }
    const updateCart = await this.repository.updateMany(carts.cartIds,  {
      status: paymentStatus.PAID,
      order_id: orderResult.id
    });
    if (!updateCart) {
      throw new HttpException(409, 'Cannot update cart status');
    }

    const result: OrderResponse = {
      ...midtransResult,
      orderData: orderResult
    };
    return result;
  }
}


export default CartUsecase;
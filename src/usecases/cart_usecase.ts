import { CartModel, ChargeInput, CreateCartInput, UpdateCartInput } from "../domain/model/cart_model";
import { ChargeResponse, TransactionDetail } from "../domain/model/midtrans_model";
import { UserModel } from "../domain/model/user_model";
import ICartRepo from "../domain/repositories/cart_repo_int";
import IPaymentRepo from "../domain/repositories/payment_int";
import { HttpException } from "../utils/exception";
import ICartUsecase from "./cart_usecase_int";


class CartUsecase implements ICartUsecase {
  private readonly repository: ICartRepo;
  private readonly payment: IPaymentRepo;
  constructor(repository: ICartRepo, payment: IPaymentRepo) {
    this.repository = repository;
    this.payment = payment;
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


  async cartCharge(carts: ChargeInput): Promise<ChargeResponse> {

    const dataCarts = await this.repository.getCart({
      id: {
        in: carts.cartIds
      }
    });
    const grossAmount = dataCarts.reduce((acc, item)=> {
      return acc + (item.price as number * item.count);
    },0);

    const data: TransactionDetail = {
      gross_amount: grossAmount,
      order_id: new Date().toISOString()
    };
    return await this.payment.charge(carts.bank, data );
  }

}


export default CartUsecase;
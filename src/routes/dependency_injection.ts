import IItemRepo from '../domain/repositories/item_repo_int';
import IUserRepo from '../domain/repositories/user_repo_int'; // Assuming IUserRepo is defined
import ItemRepo from '../infrastructure/databases/item_repository';
import UserRepo from '../infrastructure/databases/user_repository'; // Assuming UserRepo is defined
import ItemUsecase from '../usecases/item_usecase';
import IItemUsecase from '../usecases/item_usecase_int';
import { ItemHandler } from '../handlers/item_handler';
import { Logging } from '../utils/logger';
import { basicAuthMiddleware, newJwtAuthMiddleware } from '../utils/middlewares';
import ICartRepo from '../domain/repositories/cart_repo_int';
import IOrderRepo from '../domain/repositories/order_repo_int';
import IPaymentRepo from '../domain/repositories/payment_int';
import CartRepo from '../infrastructure/databases/cart_repository';
import OrderRepo from '../infrastructure/databases/order_repository';
import { Midtrans } from '../infrastructure/payments/midtrans';
import ICartUsecase from '../usecases/cart_usecase_int';
import CartUsecase from '../usecases/cart_usecase';
import { CartHanlder } from '../handlers/cart_handler';
import IUserUsecase from '../usecases/user_usercase_int';
import UserUsecase from '../usecases/user_usecase';
import { UserHandler } from '../handlers/user_handler';
import RoleUsecase from '../usecases/role_usecase';
import IRoleRepo from '../domain/repositories/role_repo_int';
import RoleRepo from '../infrastructure/databases/role_repository';
import { RoleHandler } from '../handlers/role_handler';

// Dependency Injection Container
class DIContainer {
  private itemRepo: IItemRepo;
  private userRepo: IUserRepo;
  private logger: Logging;
  private cartRepo: ICartRepo;
  private orderRepo: IOrderRepo;
  private paymentRepo: IPaymentRepo;
  private roleRepo: IRoleRepo;

  constructor(logger: Logging) {
    this.itemRepo = new ItemRepo();
    this.userRepo = new UserRepo();
    this.cartRepo = new CartRepo();
    this.orderRepo = new OrderRepo();
    this.logger = logger;
    this.roleRepo = new  RoleRepo();
    this.paymentRepo = new Midtrans(logger);
  }

  // get repository
  public getUserRepo(): IUserRepo {
    return this.userRepo;
  }

  // create usecase
  public createItemUsecase(): IItemUsecase {
    return new ItemUsecase(this.itemRepo, this.logger);
  }
  public createCartUsecase(): ICartUsecase {
    return new CartUsecase(this.cartRepo, this.paymentRepo, this.orderRepo, this.logger);
  }
  public createUserUsecase(): IUserUsecase {
    return new UserUsecase(this.userRepo, this.logger);
  }
  public createRoleUsecase(): RoleUsecase {
    return new RoleUsecase(this.roleRepo, this.logger);
  }


  // create handler
  public createItemHandler(): ItemHandler {
    return new ItemHandler(this.createItemUsecase());
  }
  public createCartHandler(): CartHanlder {
    return new CartHanlder(this.createCartUsecase());
  }
  public createUserHandler(): UserHandler {
    return new UserHandler(this.createUserUsecase());
  }
  public createRoleHandler(): RoleHandler {
    return new RoleHandler(this.createRoleUsecase());
  }

  // create auth middleware
  public createJwtMiddleware() {
    return newJwtAuthMiddleware(this.userRepo);
  }
  public createBasicAuthMiddleware() {
    return basicAuthMiddleware;
  }
}

// Instantiate the DI container
const logger = new Logging();
const diContainer = new DIContainer(logger);

// Export instances
export const itemHandler = diContainer.createItemHandler();
export const cartHandler = diContainer.createCartHandler();
export const userHandler = diContainer.createUserHandler();
export const roleHandler = diContainer.createRoleHandler();
export const userRepo = diContainer.getUserRepo();
export const basicAuthMiddlewareDI = diContainer.createBasicAuthMiddleware();
export const jwtMiddlewareDI = diContainer.createJwtMiddleware();
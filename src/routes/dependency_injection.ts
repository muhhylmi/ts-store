import IItemRepo from '../domain/repositories/item_repo_int';
import IUserRepo from '../domain/repositories/user_repo_int'; // Assuming IUserRepo is defined
import ItemRepo from '../infrastructure/databases/item_repository';
import UserRepo from '../infrastructure/databases/user_repository'; // Assuming UserRepo is defined
import ItemUsecase from '../usecases/item_usecase';
import IItemUsecase from '../usecases/item_usecase_int';
import { ItemHandler } from '../handlers/item_handler';
import { Logging } from '../utils/logger';
import { newJwtAuthMiddleware } from '../utils/middlewares';

// Dependency Injection Container
class DIContainer {
  private itemRepo: IItemRepo;
  private userRepo: IUserRepo;
  private logger: Logging;

  constructor() {
    this.itemRepo = new ItemRepo();
    this.userRepo = new UserRepo();
    this.logger = new Logging();
  }

  // create usecase
  public createItemUsecase(): IItemUsecase {
    return new ItemUsecase(this.itemRepo, this.logger);
  }

  // create handler
  public createItemHandler(): ItemHandler {
    return new ItemHandler(this.createItemUsecase());
  }

  // create auth middleware
  public createJwtMiddleware() {
    return newJwtAuthMiddleware(this.userRepo);
  }
}

// Instantiate the DI container
const diContainer = new DIContainer();

// Export instances
export const itemHandler = diContainer.createItemHandler();
export const jwtMiddlewareDI = diContainer.createJwtMiddleware();
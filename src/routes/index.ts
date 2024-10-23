import { Router } from "express";
import userRouter from "./user_routes";
import roleRouter from "./role_routes";
import itemRouter from "./item_routes";

const router = (app: Router) => {
  app.use('/api/users', userRouter);
  app.use('/api/roles', roleRouter);
  app.use('/api/item', itemRouter);
};

export default router;
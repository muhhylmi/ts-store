import { Router } from "express";
import userRouter from "./user_routes";
import roleRouter from "./role_routes";

const router = (app: Router) => {
    app.use('/api/users', userRouter);
    app.use('/api/roles', roleRouter);
};

export default router;
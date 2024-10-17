import { Router } from "express";
import userRouter from "./user_routes";

const router = (app: Router) => {
    app.use('/api/users', userRouter);
};

export default router;
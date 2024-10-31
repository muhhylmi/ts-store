// src/routes/helloRoute.ts
import { Response, Router } from 'express';

const midtransRouter = Router();

midtransRouter.post('/callback',
  (req, res: Response) => {
    res.status(200).json(req.body);
  }
);

export default midtransRouter;

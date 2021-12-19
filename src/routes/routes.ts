import { Express, Request, Response } from "express";
import { createUserHandler } from "../controller/user.controller";
import validateResource from "../middleware/validateResource";
import requireUser from "../middleware/requireUser";
import { createUserSchema } from "../schema/user.schema";
import { createSessionSchema } from "../schema/session.schema";
import {
  createUserSessionHandler,
  getUserSessionsHandler,
  deleteSessionHandler,
} from "../controller/session.controller";
import {
  getProductSchema,
  createProductSchema,
  updateProductSchema,
  deleteProductSchema,
} from "../schema/product.schema";
import {
  getProductHandler,
  createProductHandler,
  deleteProductHandler,
  updateProductHandler,
} from "../controller/product.controller";
function routes(app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));
  app.post("/api/users", validateResource(createUserSchema), createUserHandler);

  ///SESSIONS
  app.post(
    "/api/sessions",
    validateResource(createSessionSchema),
    createUserSessionHandler
  );
  app.get("/api/sessions", requireUser, getUserSessionsHandler);
  app.delete("/api/sessions", requireUser, deleteSessionHandler);

  ///PRODUCTS
  app.get(
    "/api/products/:productId",
    validateResource(getProductSchema),
    getProductHandler
  );
}

export default routes;

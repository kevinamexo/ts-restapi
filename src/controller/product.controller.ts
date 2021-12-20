import { Request, Response } from "express";
import {
  CreateProductType,
  GetProductType,
  UpdateProductType,
  DeleteProductType,
} from "../schema/product.schema";
import {
  createProduct,
  findProduct,
  findAndUpdateProduct,
  deleteProduct,
} from "../service/product.service";

type f = GetProductType["params"];
type h = UpdateProductType;
export async function createProductHandler(
  req: Request<{}, {}, CreateProductType["body"]>,
  res: Response
) {
  try {
    const userId = res.locals.user._id;
    const body = req.body;
    const product = await createProduct({ ...body, user: userId });
    return res.send(product);
  } catch (e) {
    return res.status(400).json({ success: false, error: e.message });
  }
}
export async function getProductHandler(
  req: Request<GetProductType["params"]>,
  res: Response
) {}
export async function updateProductHandler(
  req: Request<UpdateProductType["params"], any, UpdateProductType["body"]>,
  res: Response
) {
  console.log(req);
}

export async function deleteProductHandler(
  req: Request<DeleteProductType["params"]>,
  res: Response
) {}

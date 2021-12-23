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
  } catch (e: any) {
    return res.status(400).json({ success: false, error: e.message });
  }
}
export async function getProductHandler(
  req: Request<GetProductType["params"]>,
  res: Response
) {
  try {
    const productId = req.params.productId;

    const product = await findProduct({ productId });
    if (!product) {
      return res.send(404).json({
        success: false,
        message: `No product with ID ${productId} foud`,
      });
    }
    return res.status(200).json({ success: true, data: product });
  } catch (e) {
    return res.status(400).json({
      success: "false",
      message: "Error finding product",
    });
  }
}
export async function updateProductHandler(
  req: Request<UpdateProductType["params"], any, UpdateProductType["body"]>,
  res: Response
) {
  try {
    const userId = res.locals.user._id;
    const productId = req.params.productId;
    const update = req.body;

    const product = await findProduct({ productId });

    if (!product) {
      return res.sendStatus(404);
    }

    if (String(product.user) !== userId) {
      return res.status(403).json({
        success: false,
        message: "Only owner of product is allowed to update product",
      });
    }
    const updatedProduct = await findAndUpdateProduct({ productId }, update, {
      new: true,
    }); //new returns modified document

    return res.send(updatedProduct);
  } catch (e: any) {
    res.status(400).json({
      success: false,
      message: "Error updating Finding and Updating product",
    });
  }
}

export async function deleteProductHandler(
  req: Request<DeleteProductType["params"]>,
  res: Response
) {
  try {
    const productId = req.params.productId;
    const userId = res.locals.user._id;

    const product = await findProduct({ productId });
    if (!product) {
      return res.send(404).json({
        success: false,
        message: `No product with ID ${productId} foud`,
      });
    }
    if (String(product.user) !== userId) {
      return res.status(403).json({
        success: false,
        message: "Only owner of product is allowed to delete the product",
      });
    }
    await deleteProduct({ product });

    return res
      .status(200)
      .json({ success: true, message: `Product with id ${productId} deleted` });
  } catch (e: any) {
    return res.status(400).json({
      success: false,
      message: "Error deleting product",
    });
  }
}

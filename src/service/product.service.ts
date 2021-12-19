import ProductModel, { ProductDocument } from "../models/product.model";
import {
  DocumentDefinition,
  FilterQuery,
  UpdateQuery,
  QueryOptions,
} from "mongoose";

export async function createProduct(
  productInput: DocumentDefinition<
    Omit<ProductDocument, "createdAt" | "updatedAt">
  >
) {
  try {
    const product = await ProductModel.create(productInput);
    return product;
  } catch (e: any) {
    console.log(e);
  }
}

export async function findProduct(
  query: FilterQuery<ProductDocument>,
  options: QueryOptions = { lean: true }
) {
  return ProductModel.findOne(query, {}, options);
}

export async function findAndUpdateProduct(
  query: FilterQuery<ProductDocument>,
  update: UpdateQuery<ProductDocument>,
  options: QueryOptions
) {
  return ProductModel.findOneAndUpdate(query, update, options);
}

export async function deleteProduct(query: FilterQuery<ProductDocument>) {
  return ProductModel.deleteOne(query);
}

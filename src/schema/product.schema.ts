import { partialRight } from "lodash";
import { object, string, number, TypeOf } from "zod";

const payload = {
  body: object({
    title: string({ required_error: "Title is required" }),
    description: string({ required_error: "Description is required" }).min(
      120,
      "Description should be at least 100 characters long"
    ),
    price: number({ required_error: "Price is required" }),
    image: string({ required_error: "Image is require" }),
  }),
};

const params = {
  params: object({
    productId: string({
      required_error: "productId is required",
    }),
  }),
};

export const createProductSchema = object({
  ...payload,
});

export const updateProductSchema = object({
  ...payload,
  ...params,
});
export const deleteProductSchema = object({
  ...params,
});

export const getProductSchema = object({
  ...params,
});

export type CreateProductType = TypeOf<typeof createProductSchema>;
export type UpdateProductType = TypeOf<typeof updateProductSchema>;
export type DeleteProductType = TypeOf<typeof deleteProductSchema>;
export type GetProductType = TypeOf<typeof getProductSchema>;

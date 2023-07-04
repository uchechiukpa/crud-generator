import { CreateProductHandler } from "./create-product/create-product.handler";
import { UpdateProductHandler } from "./update-product/update-product.handler";

export const commandHandlers = [CreateProductHandler, UpdateProductHandler];
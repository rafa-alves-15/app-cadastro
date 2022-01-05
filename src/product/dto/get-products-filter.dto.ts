import { ProductStatus } from "../products.model";

export class GetProductsFilterDto {
  status?: ProductStatus;
  search?: string;
}
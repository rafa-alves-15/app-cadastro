import { ProductStatus } from "../products.model";

export class UpdateProductsDto {

  name: string;

  brand: string;

  price: number;
  
  status: ProductStatus;
}
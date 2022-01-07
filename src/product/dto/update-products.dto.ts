import { IsEnum, IsNotEmpty } from "class-validator";
import { ProductStatus } from "../products-status-enum";

export class UpdateProductsDto {

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  brand: string;

  @IsNotEmpty()
  price: string;
  
  @IsEnum(ProductStatus)
  status: ProductStatus;
}
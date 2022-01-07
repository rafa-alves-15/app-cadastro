import { IsEnum, IsNotEmpty, Matches } from "class-validator";
import { ProductStatus } from "../products-status-enum";

export class UpdateProductsDto {

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  brand: string;

  @IsNotEmpty()
  @Matches(/^R\$(\d{1,3}(\.\d{3})*|\d+)(\,\d{2})?$/, {message:'R$ is required'} )
  price: string;
  
  @IsEnum(ProductStatus)
  status: ProductStatus;
}
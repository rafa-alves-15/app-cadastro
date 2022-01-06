import { IsEnum, IsOptional, IsString } from "class-validator";
import { ProductStatus } from "../products.model";

export class GetProductsFilterDto {
  
  @IsOptional()
  @IsEnum(ProductStatus)
  status?: ProductStatus;

  @IsOptional()
  @IsString()
  search?: string;
}
import { IsEnum, IsOptional, IsString } from "class-validator";
import { ProductStatus } from "../products-status-enum";

export class GetProductsFilterDto {
  
  @IsOptional()
  @IsEnum(ProductStatus)
  status?: ProductStatus;

  @IsOptional()
  @IsString()
  search?: string;
}
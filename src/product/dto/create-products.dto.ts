import { IsNotEmpty } from "class-validator";

export class CreateProductsDto {

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  brand: string;

  @IsNotEmpty()
  price: number;
}
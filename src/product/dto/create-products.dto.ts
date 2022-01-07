import { IsNotEmpty, Matches } from "class-validator";

export class CreateProductsDto {

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  brand: string;

  @IsNotEmpty()
  @Matches(/^R\$(\d{1,3}(\.\d{3})*|\d+)(\,\d{2})?$/, {message:'R$ is required'} )
  price: string;
}
import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateProductsDto } from './dto/create-products.dto';
import { Products, ProductStatus } from './products.model';

@Injectable()
export class ProductsService {
  private products: Products[] = [];

  getAllProducts() {
    return this.products;
  }
  createProducts(createProductsDto: CreateProductsDto): Products {
    const { name, brand, price} = createProductsDto

    const product: Products = {
      id: uuid(),
      name,
      brand,
      price,
      status: ProductStatus.AVAILABLE,

    }
    this.products.push(product);
    return product
  }
}

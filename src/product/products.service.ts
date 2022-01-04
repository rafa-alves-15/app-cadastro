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

  getProductsById(id: string): Products {
    return this.products.find((product) => product.id === id)
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

  DeleteProducts(id: string): void {
    this.products = this.products.filter((product) => product.id !== id)
  }

  updateProducts(id: string, name: string, brand: string, price: number, status: ProductStatus) {
    const products = this.getProductsById(id);
    products.name = name;
    products.brand = brand;
    products.price = price;
    products.status = status;
    return products
  }

}

import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateProductsDto } from './dto/create-products.dto';
import { GetProductsFilterDto } from './dto/get-products-filter.dto';
import { Products, ProductStatus } from './products.model';

@Injectable()
export class ProductsService {
  private products: Products[] = [];

  getAllProducts(): Products [] {
    return this.products;
  }

  getProductsWithFilter(filterDto: GetProductsFilterDto): Products[] {
    const {status, search} = filterDto;

    let products = this.getAllProducts();
    
    if (status) {
      products = products.filter((product) => product.status === status)
    }
    
    if (search) {
      products = products.filter((product) => {
        if (product.name.includes(search) || product.brand.includes(search)) {
          return true;
        }
        return false;
      });
    }
    return products;
  }

  getProductsById(id: string): Products {
    const found = this.products.find((product) => product.id === id);

    if (!found) {
      throw new NotFoundException(`Product with ID: "${id}" was not found`);
    }
    return found;
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

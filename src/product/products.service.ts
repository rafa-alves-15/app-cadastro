import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductsDto } from './dto/create-products.dto';
import { GetProductsFilterDto } from './dto/get-products-filter.dto';
import { UpdateProductsDto } from './dto/update-products.dto';
import { Product } from './product.entity';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor (
    @InjectRepository(ProductsRepository)
    private productsRepository: ProductsRepository,
    ) {}

  getProduct(filterDto: GetProductsFilterDto): Promise<Product[]> {
    return this.productsRepository.getProduct(filterDto);
  }

  async getProductsById(id: string): Promise<Product> {
    const found = await this.productsRepository.findOne(id);
      
    if (!found) {
      throw new NotFoundException(`Product with ID: "${id}" was not found`);
        }

    return found;
      }


  async createProducts(createProductsDto: CreateProductsDto): Promise<Product> {

    return this.productsRepository.createProducts(createProductsDto);
  }

  async deleteProducts(id: string): Promise<void> {
    const result = await this.productsRepository.delete(id);
    
    if (result.affected === 0) {
      throw new NotFoundException(`Product with ID: "${id}" was not found`);
    }
  }

  async updateProducts(id: string, updateProductsDto: UpdateProductsDto): Promise<Product> {
    const { name, brand, price, status} = updateProductsDto
    const products = await this.getProductsById(id);
    products.name = name;
    products.brand = brand;
    products.price = price;
    products.status = status;

    await this.productsRepository.save(products);
    
    return products;
  }

}

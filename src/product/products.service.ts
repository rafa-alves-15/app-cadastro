import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { CreateProductsDto } from './dto/create-products.dto';
import { GetProductsFilterDto } from './dto/get-products-filter.dto';
import { UpdateProductsDto } from './dto/update-products.dto';
import { Product } from './product.entity';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductsRepository)
    private productsRepository: ProductsRepository,
  ) { }

  getProduct(filterDto: GetProductsFilterDto, user: User): Promise<Product[]> {
    return this.productsRepository.getProduct(filterDto, user);
  }

  async getProductsById(id: string, user: User): Promise<Product> {
    const found = await this.productsRepository.findOne({ where: { id, user } });

    if (!found) {
      throw new NotFoundException(`Product with ID: "${id}" was not found`);
    }

    return found;
  }


  async createProducts(createProductsDto: CreateProductsDto, user: User): Promise<Product> {
    return this.productsRepository.createProducts(createProductsDto, user);
  }

  async deleteProducts(id: string, user: User): Promise<void> {
    const result = await this.productsRepository.delete({id, user});

    if (result.affected === 0) {
      throw new NotFoundException(`Product with ID: "${id}" was not found`);
    }
  }

  async updateProducts(
    id: string,
    updateProductsDto: UpdateProductsDto,
    user: User,
  ): Promise<Product> {
    const { name, brand, price, status } = updateProductsDto
    const products = await this.getProductsById(id, user);
    products.name = name;
    products.brand = brand;
    products.price = price;
    products.status = status;

    await this.productsRepository.save(products);

    return products;
  }

}

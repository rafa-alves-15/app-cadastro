import { InternalServerErrorException, Logger } from "@nestjs/common";
import { User } from "src/auth/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateProductsDto } from "./dto/create-products.dto";
import { GetProductsFilterDto } from "./dto/get-products-filter.dto";
import { Product } from "./product.entity";
import { ProductStatus } from "./products-status-enum";

@EntityRepository(Product)
export class ProductsRepository extends Repository<Product> {
  private logger = new Logger('ProductsRepository');

  async getProduct(filterDto: GetProductsFilterDto, user: User): Promise<Product[]> {
    const { status, search } = filterDto;

    const query = this.createQueryBuilder('product');
    query.where({ user });

    if (status) {
      query.andWhere('product.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        '(LOWER(product.name) LIKE LOWER(:search) OR LOWER(product.brand) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }

    try {
      const products = await query.getMany();
      return products;
    } catch (error) {
      this.logger.error(
        `Failed to get products for user "${user.username}".
         Filters: "${JSON.stringify(filterDto)}"`
      );
      throw new InternalServerErrorException();
    }
  }

  async createProducts(createProductsDto: CreateProductsDto, user: User): Promise<Product> {
    const { name, brand, price } = createProductsDto;

    const product = this.create({
      name,
      brand,
      price,
      status: ProductStatus.AVAILABLE,
      user,
    });

    await this.save(product);
    return product;
  }
}
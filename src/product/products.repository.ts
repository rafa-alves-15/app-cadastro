import { EntityRepository, Repository } from "typeorm";
import { CreateProductsDto } from "./dto/create-products.dto";
import { GetProductsFilterDto } from "./dto/get-products-filter.dto";
import { Product } from "./product.entity";
import { ProductStatus } from "./products-status-enum";

@EntityRepository(Product)
export class ProductsRepository extends Repository<Product> {

  async getProduct(filterDto: GetProductsFilterDto): Promise<Product[]> {

    const { status, search } = filterDto;

    const query = this.createQueryBuilder('product');

    if (status) {
      query.andWhere('product.status = :status', {status});
    }
    
    if (search) {
      query.andWhere(
        'LOWER(product.name) LIKE LOWER(:search) OR LOWER(product.brand) LIKE LOWER(:search)',
        {search: `%${search}%` },
      );
    }

    const products = await query.getMany();
    return products;
  }

  async createProducts(createProductsDto: CreateProductsDto): Promise < Product > {

        const { name, brand, price } = createProductsDto

    const product = this.create({
          name,
          brand,
          price,
          status: ProductStatus.AVAILABLE,
        });

        await this.save(product);
        return product;
      }
}
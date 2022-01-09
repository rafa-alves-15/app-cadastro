import { Body, Controller, Delete, Get, Logger, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateProductsDto } from './dto/create-products.dto';
import { GetProductsFilterDto } from './dto/get-products-filter.dto';
import { UpdateProductsDto } from './dto/update-products.dto';
import { Product } from './product.entity';
import { ProductsService } from './products.service';

@Controller('products')
@UseGuards(AuthGuard())
export class ProductsController {
  private logger = new Logger('ProductsController');
  constructor(private productsService: ProductsService) { }

  @Get()
  getAllProducts(
    @Query() filterDto: GetProductsFilterDto,
    @GetUser() user: User,
  ): Promise<Product[]> {
    this.logger.verbose(
      `User "${user.username}" retrieving all products. Filters: ${JSON.stringify(
        filterDto,
      )}`,
    );
    return this.productsService.getProduct(filterDto, user);
  }

  @Get('/:id')
  getProductsById(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<Product> {
    return this.productsService.getProductsById(id, user);
  }

  @Post()
  createProducts(
    @Body() createProductsDto: CreateProductsDto,
    @GetUser() user: User,
  ): Promise<Product> {
    this.logger.verbose(
      `User "${user.username}" creating a new product. Data: ${JSON.stringify(
        createProductsDto,
      )}`,
    );
    return this.productsService.createProducts(createProductsDto, user);
  }

  @Delete('/:id')
  DeleteProducts(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<void> {
    return this.productsService.deleteProducts(id, user);
  }

  @Patch('/:id/edit')
  updateProducts(
    @Param('id') id: string,
    @Body() updateProductsDto: UpdateProductsDto,
    @GetUser() user: User,
  ): Promise<Product> {
    return this.productsService.updateProducts(id, updateProductsDto, user);
  }
}


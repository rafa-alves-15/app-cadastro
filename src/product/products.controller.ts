import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateProductsDto } from './dto/create-products.dto';
import { GetProductsFilterDto } from './dto/get-products-filter.dto';
import { UpdateProductsDto } from './dto/update-products.dto';
import { Product } from './product.entity';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

    @Get()
    getAllProducts(@Query() filterDto: GetProductsFilterDto): Promise<Product[]> {
      return this.productsService.getProduct(filterDto);
    }
    
    @Get('/:id')
    getProductsById(@Param('id') id: string): Promise<Product> {
      return this.productsService.getProductsById(id);
    }

    @Post()
    createProducts(@Body() createProductsDto: CreateProductsDto): Promise<Product> {
      return this.productsService.createProducts(createProductsDto);
    }  
    
    @Delete('/:id')
    DeleteProducts(@Param('id') id: string): Promise<void> {
      return this.productsService.deleteProducts(id);
    }

    @Patch('/:id/edit')
    updateProducts(
      @Param('id') id: string,
      @Body() updateProductsDto: UpdateProductsDto,
    ): Promise<Product> {
      return this.productsService.updateProducts(id, updateProductsDto);
    }
  }


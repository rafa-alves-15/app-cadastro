import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateProductsDto } from './dto/create-products.dto';
import { GetProductsFilterDto } from './dto/get-products-filter.dto';
import { Products, ProductStatus } from './products.model';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

    @Get()
    getAllProducts(@Query() filterDto: GetProductsFilterDto): Products[] {
      if(Object.keys(filterDto).length) {
        return this.productsService.getProductsWithFilter(filterDto);
      } else {
        return this.productsService.getAllProducts();
      }

    }

    @Get('/:id')
    getProductsById(@Param('id') id: string): Products {
      return this.productsService.getProductsById(id);
    }

    @Post()
    createProducts(@Body() createProductsDto: CreateProductsDto): Products {
      return this.productsService.createProducts(createProductsDto);
    }  
    
    @Delete('/:id')
    DeleteProducts(@Param('id') id: string): void {
      return this.productsService.DeleteProducts(id);
    }

    @Patch('/:id/edit')
    updateProducts(
      @Param('id') id: string,
      @Body('name') name: string,
      @Body('brand') brand: string,
      @Body('price') price: number,
      @Body('status') status: ProductStatus,
    ): Products {
      return this.productsService.updateProducts(id, name, brand, price, status);
    }
  }


import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateProductsDto } from './dto/create-products.dto';
import { Products } from './products.model';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

    @Get()
    getAllProducts(): Products[] {
      return this.productsService.getAllProducts();
    }
    @Post()
    createProducts(@Body() createProductsDto: CreateProductsDto): Products {
      return this.productsService.createProducts(createProductsDto);
    }    
  }


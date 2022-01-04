import { Module } from '@nestjs/common';
import { ProductsModule } from './product/products.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, ProductsModule],
})
export class AppModule {}

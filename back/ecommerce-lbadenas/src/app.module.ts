import { Module } from '@nestjs/common';
import { Usersmodule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [Usersmodule, ProductsModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProduct } from './DTO/createProduct.dto';
import { UpdateProduct } from './DTO/updateProduct.dto';
import { AuthGuard } from 'src/common/guards/auth/auth.guard';
import { AuthorizationGuard } from 'src/common/guards/authorization/authorization.guard';
import { Roles } from 'src/common/decorator/roles/roles.decorator';

@Controller('products')
@UseGuards(AuthGuard,AuthorizationGuard)
export class ProductsController {
  constructor(private _ProductsService: ProductsService) {}

  @Get()
  @Roles('admin', 'user')
  findAllProducts(): Promise<CreateProduct[]> {
    return this._ProductsService.findAllProducts();
  }

  @Get(':userId/:productId')
  @Roles('admin', 'user')
  findProductById(
    @Param('userId') userId: string,
    @Param('productId') productId: string,
  ): Promise<CreateProduct> {
    return this._ProductsService.findProductById(userId, productId);
  }

  @Post(':userId')
  @Roles('user')
  createProduct(
    @Param('userId') userId: string,
    @Body() productData: CreateProduct,
  ): Promise<CreateProduct> {
    return this._ProductsService.createProduct(userId, productData);
  }

  @Patch(':userId/:productId')
  @Roles('user')
  updateProduct(
    @Param('userId') userId: string,
    @Param('productId') productId: string,
    @Body() product: UpdateProduct,
  ): Promise<CreateProduct> {
    return this._ProductsService.updateProduct(userId, productId, product);
  }

  @Delete(':userId/:productId')
  @Roles('admin', 'user')
  deleteProduct(
    @Param('userId') userId: string,
    @Param('productId') productId: string,
  ) {
      return this._ProductsService.deleteProduct(userId, productId);
  }
}

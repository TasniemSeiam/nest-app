import { UpdateProduct } from './DTO/updateProduct.dto';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './Schema/product.schema';
import { Model } from 'mongoose';
import { CreateProduct } from './DTO/createProduct.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async findAllProducts(): Promise<Product[]> {
    try {
      return await this.productModel.find();
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findProductById(userId: string, productId: string): Promise<Product> {
    try {
      return await this.productModel.findById({ userId, _id: productId });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async updateProduct(
    userId: string,
    productId: string,
    product: UpdateProduct,
  ): Promise<CreateProduct> {
    try {
      const updatedProduct = await this.productModel.findByIdAndUpdate(
        { userId, _id: productId },
        product,
        { new: true },
      );

      return updatedProduct;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async createProduct(
    userId: string,
    productData: CreateProduct,
  ): Promise<CreateProduct> {
    try {
      return await this.productModel.create({ ...productData, userId });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async deleteProduct(userId: string, productId: string): Promise<any> {
    try {
      const deleted = await this.productModel.findByIdAndDelete({
        userId,
        _id: productId,
      });

      return 'deleted Successfully ';
    } catch (error) {
      throw new BadRequestException('something wrong');
    }
  }
}

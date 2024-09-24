import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/users/Schema/user.schema';

@Schema()
export class Product {
  @Prop({ required: true})
  name: string;

  @Prop({ required: true})
  price:number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' ,required:true})
  userId: User;
}

export const productSchema = SchemaFactory.createForClass(Product);

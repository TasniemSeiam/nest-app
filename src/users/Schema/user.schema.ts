import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({default:"user",enum:["user", "admin"]})
  role:string;

}

export const userSchema = SchemaFactory.createForClass(User);

import {
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateProduct {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}

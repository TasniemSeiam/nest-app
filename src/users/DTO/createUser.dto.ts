import { IsEmail, IsEnum, IsOptional, IsString, Length } from 'class-validator';

export class CreateUser {
  @IsString()
  @Length(3, 20, { message: 'name must be between 3,20 characters' })
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  @IsEnum(['user', 'admin'])
  role?: string;

  @IsOptional()
  @IsString()
  id?: string;
}

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './Schema/user.schema';
import { Model } from 'mongoose';
import { CreateUser } from './DTO/createUser.dto';
import { UpdateUser } from './DTO/updateUser.dto';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findAllUsers(): Promise<CreateUser[]> {
    try {
      return await this.userModel.find();
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findUserById(id: string) {
    try {
      return await this.userModel.findById(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
  async createNewUser(userData: CreateUser): Promise<CreateUser> {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(userData.password, salt);
      userData.password = hashedPass;
      return await this.userModel.create(userData);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateUser(id: string, userData: UpdateUser): Promise<CreateUser> {
    try {
      return await this.userModel.findByIdAndUpdate(id, userData, {
        new: true,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deleteUser(id: string): Promise<any> {
    try {
      const deleted = await this.userModel.findByIdAndDelete(id);

      return 'deleted Successfully ';
    } catch (error) {
      throw new BadRequestException('something wrong');
    }
  }
}

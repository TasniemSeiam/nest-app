import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/Schema/user.schema';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private UserModel: Model<User>,private jwtService:JwtService  ) {}

  async login({ email, password }) {
    if (!email || !password)
      throw new BadRequestException('please enter a valid email or password');

    const user = await this.UserModel.findOne({ email });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid user');
    
      const token = this.jwtService.sign({ id: user._id, role: user.role})
      return{token}
    
      
  }
}

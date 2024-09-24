import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from 'src/users/Schema/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{name:User.name,schema:userSchema}])
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}

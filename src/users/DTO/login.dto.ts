import { PickType } from '@nestjs/mapped-types';
import { CreateUser } from './createUser.dto';

export class Login extends PickType(CreateUser, ['email','password']) {}

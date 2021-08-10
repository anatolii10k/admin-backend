import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  findAll(): Promise<User[]> {
    return User.find();
  }
}

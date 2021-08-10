import { Injectable } from '@nestjs/common';
import { Admin } from './admin.entity';
import { CreateAdminDto } from './dto/create-admin.dto';

@Injectable()
export class AdminsService {
  async create(createAdminDto: CreateAdminDto) {
    const user = Admin.create(createAdminDto);
    await user.save();

    delete user.password;
    return user;
  }

  async showById(id: number): Promise<Admin> {
    const user = await this.findById(id);

    delete user.password;
    return user;
  }

  async findById(id: number) {
    return await Admin.findOne(id);
  }

  async findByEmail(email: string) {
    return await Admin.findOne({
      where: {
        email: email,
      },
    });
  }
}

import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { CreateAdminDto } from './dto/create-admin.dto';

@Controller('admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Post()
  create(@Body() createUserDto: CreateAdminDto) {
    return this.adminsService.create(createUserDto);
  }

  @Get(':id')
  show(@Param('id') id: number) {
    return this.adminsService.showById(id);
  }
}

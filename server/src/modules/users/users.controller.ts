import { Controller, Get, Post, Param, Req, Body } from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from './users.service';
import { UserId } from '@shared/kernel';
import { UpdateUserRoleBodyDto } from '@dto/user';
import { CheckPolicies } from '../auth';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  me(@Req() request: Request) {
    return this.usersService.me(request);
  }

  @Get('')
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: UserId) {
    return this.usersService.findOne(id);
  }

  @Post(':id/update-role')
  @CheckPolicies((ab) => ab.can('update', 'User', 'role'))
  updateRole(
    @Param('id') id: UserId,
    @Body() updateRole: UpdateUserRoleBodyDto,
  ) {
    return this.usersService.updateRole(id, updateRole);
  }
}

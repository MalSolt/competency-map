import { LoginUserDto } from '@dto/user';
import { Body, Res, Controller, Post, HttpCode, Get } from '@nestjs/common';
import { Response } from 'express';
import { User } from 'src/domain/entities/user.entity';
import { RequestUser } from '../users/user.decorator';
import { AbilityFactory } from './ability/ability.factory';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private abilityFactory: AbilityFactory,
  ) {}

  @HttpCode(200)
  @Post('login')
  @Public()
  async login(@Body() loginUserDto: LoginUserDto, @Res() response: Response) {
    const token = await this.authService.login(loginUserDto);
    response
      .cookie('access_token', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 14 * 1000, // 2 weeks
      })
      .send();
  }

  @HttpCode(200)
  @Post('logout')
  @Public()
  async logout(@Res() response: Response) {
    response.clearCookie('access_token').send();
  }

  @Get('/rules')
  async getRules(@RequestUser() user: User) {
    return this.abilityFactory.createForUser(user).rules;
  }
}

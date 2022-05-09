import { JwtAuthGuard } from 'src/modules/auth/guards/auth.guard';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/modules/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AbilityFactory } from './ability/ability.factory';
import { AdminAbilityFactory } from './ability/admin-ability.factory';
import { UserAbilityFactory } from './ability/user-ability.factory';
import { MentorAbilityFactory } from './ability/mentor-ability.factory';
import { PoliciesGuard } from './guards/policies.guard';

@Module({
  imports: [
    HttpModule,
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('SECRET'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    JwtAuthGuard,
    AuthService,
    PoliciesGuard,
    JwtStrategy,
    AbilityFactory,
    AdminAbilityFactory,
    UserAbilityFactory,
    MentorAbilityFactory,
  ],
  exports: [AbilityFactory, JwtAuthGuard, PoliciesGuard],
})
@Global()
export class AuthModule {}

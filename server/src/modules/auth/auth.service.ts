import { LoginUserDto } from '@dto/user';
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly httpService: HttpService,
    private readonly jwtService: JwtService,
  ) {}

  private async _loginTT(loginUserDto: LoginUserDto) {
    const response = await this.httpService
      .post('https://timetracker.decart.agency/api/auth/login', loginUserDto)
      .toPromise();
    return response.data;
  }

  async validateUser(ttUserId: number) {
    const user = await this.usersService.findUser(
      {
        where: { ttUserId },
      },
      true,
    );

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }

  async login(loginUserDto: LoginUserDto) {
    const {
      status,
      code,
      message: { auth_token: ttAuthToken, user: ttUserData },
    } = await this._loginTT(loginUserDto);

    if (code !== HttpStatus.OK || status !== 'success') {
      throw new HttpException(
        'User with such credentials not found',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const [first_name, second_name] = (ttUserData.name ?? '').split(' ');

    const user = await this.usersService.findUser(
      {
        where: {
          ttUserId: ttUserData.id,
        },
      },
      true,
    );
    console.log('here2');

    const logo = ttUserData.logo
      ? `https://timetracker.decart.agency${ttUserData.logo}`
      : null;

    const syncUserData = {
      id: user?.id,
      email: ttUserData.email,
      first_name,
      second_name,
      telegram: ttUserData.tg_username,
      logo,
    };

    if (!user) {
      await this.usersService.createUser({
        ...syncUserData,
        ttUserId: ttUserData.id,
      });
    } else {
      await this.usersService.updateUser({
        ...user,
        ...syncUserData,
      });
    }

    return ttAuthToken;
  }
}

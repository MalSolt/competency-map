import { UserId, Role } from "../kernel";

export type UserDto = {
  id: UserId
  email: string
  first_name: string
  second_name: string
  telegram?: string
  logo?: string
}

export type LoginUserDto = {
  email: string;
  password: string;
};

export type ttUserTokenDto = {
  user_id: number
  exp: number
}

export type CreateUserBodyDto = Omit<UserDto, 'id'> & {
  ttUserId: number;
}

export type UpdateUserBodyDto = Omit<Partial<UserDto>, 'id'>;

export type UpdateUserRoleBodyDto = {
  role: Role;
}

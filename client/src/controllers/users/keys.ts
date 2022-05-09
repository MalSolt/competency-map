import { UserDto } from '@dto/user';

export const baseKey = 'users';

export const getUsersListKey = () => [baseKey, 'list'];
export const getUserKeyById = (id: UserDto['id']) => [baseKey, { id }];
export const getMeKey = () => [baseKey, 'me'];

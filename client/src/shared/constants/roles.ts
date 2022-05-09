import { Role } from "@kernel";

export const ROLES_LIST: Role[] = ['admin', 'mentor', 'user'];

export const ROLES: Record<Role, string> = {
  admin: 'Администратор',
  mentor: 'Ментор',
  user: 'Пользователь',
}
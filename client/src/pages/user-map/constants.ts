import { UserCompetencyStatus } from "@dto/userCompetency"

export const USER_COMPETENCY_STATUES: Record<UserCompetencyStatus, string> = {
  'not_learned': 'Не изучена',
  'in_progress': 'Изучается',
  'learned': 'Изучена',
  'confirmed': 'Подтверждена',
}

export const USER_COMPETENCY_STATUES_COLORS: Record<UserCompetencyStatus, string> = {
  'not_learned': 'error.main',
  'in_progress': 'info.light',
  'learned': 'success.light',
  'confirmed': 'success.main',
}

export const USER_COMPETENCY_STATUES_LIST = Object.keys(USER_COMPETENCY_STATUES) as UserCompetencyStatus[];
import { UserId } from './kernel'

type CRUD = 'create' | 'read' | 'update' | 'delete' | 'manage'
export type Abilities =
  | ['read' | 'update' | 'manage', 'User' | { id: UserId }]
  | [CRUD, 'Competency']
  | [CRUD, 'Knowledge']
  | [CRUD, 'Collections']
  | [CRUD, 'Lessons']
  | [CRUD, 'Users']
  | [
      (
        | CRUD
        | 'update-status-not_learned'
        | 'update-status-in_progress'
        | 'update-status-learned'
        | 'update-status-confirmed'
      ),
      'UserCompetency' | { userId: UserId }
    ]
  | [CRUD, 'UserMap' | { userId: UserId }]

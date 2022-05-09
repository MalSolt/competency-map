import { Competency } from 'src/domain/entities/competency.entity';
import { UserCompetencyId } from '@shared/kernel';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { UserCompetencyStatus } from '@dto/userCompetency';

export const tableName = 'user-competencies';

@Entity(tableName)
export class UserCompetency {
  @PrimaryGeneratedColumn()
  id: UserCompetencyId;

  @ManyToOne(() => User, (user) => user.userCompetencies)
  user: User;

  @ManyToOne(() => Competency)
  competency: Competency;

  @Column({
    type: 'enum',
    enum: ['in_progress', 'learned', 'confirmed'],
    default: 'in_progress',
  })
  status: UserCompetencyStatus;
}

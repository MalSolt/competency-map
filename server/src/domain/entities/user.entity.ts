import { Role, UserId } from '@shared/kernel';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { UserCompetency } from './user-competencies.entity';

export const tableName = 'users';

@Entity(tableName)
export class User {
  @PrimaryGeneratedColumn()
  id: UserId;

  @Column({ unique: true })
  ttUserId: number;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  first_name: string;

  @Column({ nullable: true })
  second_name: string;

  @Column({ nullable: true })
  telegram: string;

  @Column({ nullable: true })
  logo: string;

  @Column({ type: 'enum', enum: ['admin', 'mentor', 'user'], default: 'user' })
  role: Role;

  @OneToMany(() => UserCompetency, (userCompetencies) => userCompetencies.user)
  userCompetencies: UserCompetency[];
}

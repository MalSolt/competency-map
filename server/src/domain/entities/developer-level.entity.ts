import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { DeveloperLevelId } from '@shared/kernel';
import { Competency } from './competency.entity';

export const tableName = 'developer-levels';

@Entity(tableName)
export class DeveloperLevel {
  @PrimaryGeneratedColumn()
  id: DeveloperLevelId;

  @Column()
  name: string;

  @OneToMany(() => Competency, (competency) => competency.developerLevel)
  competency: Competency[];
}

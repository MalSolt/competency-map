import { Entity, OneToOne, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Competency } from './competency.entity';
import { CompetencyPositionId } from '@shared/kernel';

export const tableName = 'competency-position';

@Entity(tableName)
export class CompetencyPosition {
  @PrimaryGeneratedColumn()
  id: CompetencyPositionId;

  @Column('float', { default: 0 })
  x: number;

  @Column('float', { default: 0 })
  y: number;

  @OneToOne(() => Competency, (competency) => competency.position)
  competency: Competency;
}

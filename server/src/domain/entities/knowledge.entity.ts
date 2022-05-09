import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { KnowledgeId } from '@shared/kernel';
import { Competency } from './competency.entity';

export const tableName = 'knowledge';

@Entity(tableName)
export class Knowledge {
  @PrimaryGeneratedColumn()
  id: KnowledgeId;

  @Column()
  name: string;

  @ManyToMany(() => Competency)
  competencies: Competency[];
}

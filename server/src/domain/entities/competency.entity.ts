import { Knowledge } from 'src/domain/entities/knowledge.entity';
import { Material } from './material.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { CompetencyId } from '@shared/kernel';
import { DeveloperLevel } from './developer-level.entity';
import { CompetencyPosition } from './competency-position.entity';
import { Image } from './image.entity';

export const tableName = 'competencies';
export const depsTableName = 'competencies_deps';
export const knowledgesDepsTableName = 'competencies_knowledges';

@Entity('competencies')
export class Competency {
  @PrimaryGeneratedColumn()
  id: CompetencyId;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @OneToOne(() => Image)
  @JoinColumn()
  image?: Image;

  @ManyToOne(
    () => DeveloperLevel,
    (developerLevel) => developerLevel.competency,
  )
  developerLevel?: DeveloperLevel;

  @OneToOne(
    () => CompetencyPosition,
    (competencyPosition) => competencyPosition.competency,
  )
  @JoinColumn()
  position?: CompetencyPosition;

  @ManyToMany(() => Competency)
  @JoinTable({
    name: depsTableName,
    joinColumn: {
      name: 'dependentId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'dependencyId',
      referencedColumnName: 'id',
    },
  })
  requirements?: Competency[];

  @OneToMany(() => Material, (material) => material.competency)
  materials?: Material[];

  @ManyToMany(() => Knowledge)
  @JoinTable({
    name: knowledgesDepsTableName,
    joinColumn: {
      name: 'competencyId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'knowledgeId',
      referencedColumnName: 'id',
    },
  })
  knowledges?: Knowledge[];
}

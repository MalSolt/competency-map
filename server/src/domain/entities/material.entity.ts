import { MaterialsCollection } from 'src/domain/entities/materials-collection.entity';
import { Competency } from 'src/domain/entities/competency.entity';
import { MaterialId } from '@shared/kernel';
import {
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  Column,
  OneToOne,
  ManyToOne,
} from 'typeorm';
import { Lesson } from './lesson.entity';

export const tableName = 'materials';

@Entity(tableName)
export class Material {
  @PrimaryGeneratedColumn()
  id: MaterialId;

  @Column()
  order: number;

  @ManyToOne(
    () => MaterialsCollection,
    (materialsCollection) => materialsCollection.materials,
  )
  owner: MaterialsCollection;

  @ManyToOne(() => Competency, (competency) => competency.materials, {})
  competency: Competency;

  @OneToOne(() => Lesson)
  @JoinColumn()
  lesson: Lesson;

  @OneToOne(() => MaterialsCollection)
  @JoinColumn()
  collection: MaterialsCollection;
}

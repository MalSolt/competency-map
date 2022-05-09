import { LessonId } from '@shared/kernel';
import { CustomDescendant } from '@shared/textEditor';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export const tableName = 'lessons';

@Entity(tableName)
export class Lesson {
  @PrimaryGeneratedColumn()
  id: LessonId;

  @Column()
  title: string;

  @Column({ type: 'jsonb', nullable: true })
  content: CustomDescendant[];
}

import { ImageId } from '@shared/kernel';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export const tableName = 'images';

@Entity(tableName)
export class Image {
  @PrimaryGeneratedColumn()
  id: ImageId;

  @Column()
  imageName: string;
}

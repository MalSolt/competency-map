import { MaterialsCollectionId } from '@shared/kernel';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Material } from 'src/domain/entities/material.entity';

export const tableName = 'materials-collection';

@Entity(tableName)
export class MaterialsCollection {
  @PrimaryGeneratedColumn()
  id: MaterialsCollectionId;

  @Column()
  title: string;

  @OneToMany(() => Material, (material) => material.collection)
  materials: Material[];
}

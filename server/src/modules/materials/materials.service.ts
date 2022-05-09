import { FindOneOptions, Repository } from 'typeorm';
import { CreateMaterialDto } from '@dto/material';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MaterialId, CompetencyId } from '@shared/kernel';
import { OwnerMaterialsCollectionId } from '@dto/materialsCollection';
import { Material, tableName } from 'src/domain/entities/material.entity';
import {
  MaterialsCollection,
  tableName as materialsCollectionTableName,
} from 'src/domain/entities/materials-collection.entity';
import { checkNotNullParams } from 'src/shared/checks';
import { LessonsService } from 'src/modules/lessons/lessons.service';
import { CompetenciesService } from 'src/modules/competencies/competencies.service';

@Injectable()
export class MaterialsService {
  constructor(
    @InjectRepository(Material)
    private readonly materialRepository: Repository<Material>,
    @InjectRepository(MaterialsCollection)
    private readonly materialsCollectionRepository: Repository<MaterialsCollection>,
    private readonly competenciesService: CompetenciesService,
    private readonly lessonsSerivce: LessonsService,
  ) {}

  async findMaterial(
    id: MaterialId,
    options?: FindOneOptions<Material>,
  ): Promise<Material> {
    const material = await this.materialRepository.findOne(id, options);

    if (!material) {
      throw new NotFoundException(`Material with Id: ${id} is not found`);
    }

    return material;
  }

  private _prepareLessonsAndCollection(materials: Material[]) {
    const lessonsAndCollections = [];
    materials.forEach((material: Material) => {
      const id = material.id;
      const lesson = material.lesson ?? null;
      const collection = material.collection ?? null;
      if (!lesson && !collection) {
        throw new InternalServerErrorException();
      }

      lessonsAndCollections.push({
        id,
        lesson,
        collection,
        contentType: lesson ? 'lesson' : 'collection',
        title: lesson ? lesson.title : collection.title,
        order: material.order,
      });
    });

    const sortedLessonsAndCollections = lessonsAndCollections.sort(
      (a, b) => a.order - b.order,
    );

    return sortedLessonsAndCollections;
  }

  async create(createMaterialDto: CreateMaterialDto) {
    let lesson = null;
    let collection = null;
    const { ownerCollectionId, contentType, title, competencyId } =
      createMaterialDto;

    checkNotNullParams({ contentType, title, competencyId });

    const competency = await this.competenciesService.findCompetency(
      competencyId,
    );

    let ownerCollection = null;
    if (ownerCollectionId) {
      ownerCollection = await this.materialsCollectionRepository.findOne(
        ownerCollectionId,
      );

      if (!ownerCollection) {
        throw new NotFoundException(
          `Collection owner with Id: ${ownerCollectionId} not found`,
        );
      }
    }

    const types = ['lesson', 'collection'];

    if (!types.includes(contentType)) {
      throw new BadRequestException(
        `Content Type must be one of: ${types.join(', ')}`,
      );
    }

    if (contentType === 'lesson') {
      lesson = await this.lessonsSerivce.create({ title });
    } else if (contentType === 'collection') {
      collection = await this.materialsCollectionRepository.create({ title });

      await this.materialsCollectionRepository.save(collection);
    }

    const allSameOwnerMaterials = await this.materialRepository.count({
      where: { owner: ownerCollection },
    });

    const newMaterial = this.materialRepository.create({
      owner: ownerCollection,
      lesson,
      collection,
      competency,
      order: allSameOwnerMaterials + 1,
    });

    await this.materialRepository.save(newMaterial);

    return { message: 'ok' };
  }

  async remove(id: MaterialId) {
    await this.findMaterial(id);
    return this.materialRepository.delete(id);
  }

  async getMaterials(
    competencyId: CompetencyId,
    ownerCollectionId: OwnerMaterialsCollectionId,
  ) {
    await this.competenciesService.findCompetency(competencyId);

    let ownerCollection = null;

    if (ownerCollectionId) {
      ownerCollection = await this.materialsCollectionRepository.findOne(
        ownerCollectionId,
      );
      if (!ownerCollection) {
        throw new NotFoundException(
          `Collection with Id: ${ownerCollectionId} not found`,
        );
      }
    }

    const materials = await this.materialRepository.find({
      where: {
        owner: ownerCollection,
      },
      relations: ['lesson', 'collection'],
    });

    return this._prepareLessonsAndCollection(materials);
  }

  async updateMaterialsOrders(swapCollection: MaterialId[]) {
    const promises = [];
    swapCollection.forEach((materialId: MaterialId, index) => {
      promises.push(
        this.materialRepository.query(`
          update "${tableName}"
          set "order" = ${index + 1}
          where "id" = ${materialId};
        `),
      );
    });

    await Promise.all(promises);

    return { message: 'ok' };
  }

  async clear() {
    await this.materialRepository.query(`DELETE FROM ${tableName};`);
    return this.materialsCollectionRepository.query(
      `DELETE FROM "${materialsCollectionTableName}"`,
    );
  }
}

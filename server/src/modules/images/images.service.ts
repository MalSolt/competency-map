import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Express } from 'express';
import { Repository } from 'typeorm';
import { CompetencyId } from '@shared/kernel';
import { checkNotNullParams } from 'src/shared/checks';
import { Image, tableName } from 'src/domain/entities/image.entity';
import { CompetenciesService } from 'src/modules/competencies/competencies.service';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
    private readonly competenciesService: CompetenciesService,
  ) {}

  async uploadCompetencyAvatar(
    competencyId: CompetencyId,
    file: Express.Multer.File,
  ) {
    checkNotNullParams({
      competencyId,
      file,
    });

    await this.competenciesService.findCompetency(competencyId);

    const image = await this.imageRepository.create({
      imageName: file.filename,
    });

    await this.imageRepository.save(image);

    await this.competenciesService.update(competencyId, { image });

    return { message: 'ok' };
  }

  async clear() {
    return this.imageRepository.query(`DELETE FROM ${tableName};`);
  }
}

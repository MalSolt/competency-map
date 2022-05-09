import {
  Controller,
  UseInterceptors,
  UploadedFile,
  Post,
  Param,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { CompetencyId } from '@shared/kernel';
import { uploadsStorage } from 'src/shared/uploadsStorage';
import { ImagesService } from './images.service';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}
  @Post('/competency/:id/upload')
  @UseInterceptors(FileInterceptor('file', uploadsStorage))
  uploadCompetencyAvatar(
    @Param('id') competencyId: CompetencyId,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.imagesService.uploadCompetencyAvatar(competencyId, file);
  }
}

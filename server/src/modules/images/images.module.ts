import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, Logger } from '@nestjs/common';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';
import { Image } from 'src/domain/entities/image.entity';
import { CompetenciesModule } from 'src/modules/competencies/competencies.module';
import { ImagesSeeder } from './seeder';

@Module({
  imports: [TypeOrmModule.forFeature([Image]), CompetenciesModule],
  controllers: [ImagesController],
  providers: [ImagesService, ImagesSeeder, Logger],
  exports: [ImagesService, ImagesSeeder],
})
export class ImagesModule {}

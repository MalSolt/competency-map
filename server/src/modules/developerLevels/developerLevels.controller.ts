import { Controller, Get } from '@nestjs/common';
import { DeveloperLevelsService } from './developerLevels.service';
import { DeveloperLevelDto } from '@dto/developerLevel';

@Controller('developerLevels')
export class DeveloperLevelsController {
  constructor(private readonly service: DeveloperLevelsService) {}

  @Get()
  findAll(): Promise<DeveloperLevelDto[]> {
    return this.service.findAll();
  }
}

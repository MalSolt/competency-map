import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import {
  CompetencyDto,
  CreateCompetencyDto,
  UpdateCompetencyDto,
} from '@dto/competency';
import { CompetencyId } from '@shared/kernel';
import { PositionDto } from '@dto/competencyPosition';
import { CompetenciesService } from './competencies.service';

@Controller('competencies')
export class CompetenciesController {
  constructor(private readonly competenciesService: CompetenciesService) {}

  @Post()
  create(
    @Body() createCompetencyDto: CreateCompetencyDto,
  ): Promise<CompetencyDto> {
    return this.competenciesService.create(createCompetencyDto);
  }

  @Get()
  findAll(): Promise<CompetencyDto[]> {
    return this.competenciesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: CompetencyId): Promise<CompetencyDto> {
    return this.competenciesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: CompetencyId,
    @Body() updateCompetencyDto: UpdateCompetencyDto,
  ): Promise<CompetencyDto> {
    return this.competenciesService.update(id, updateCompetencyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: CompetencyId) {
    return this.competenciesService.remove(id);
  }

  @Put(':id/position')
  upsertPosition(
    @Param('id') id: CompetencyId,
    @Body() position: PositionDto,
  ): Promise<PositionDto> {
    return this.competenciesService.upsertPosition(id, position);
  }

  @Delete(':id/position')
  removePosition(@Param('id') id: CompetencyId) {
    return this.competenciesService.removePosition(id);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  CreateKnowledgeDto,
  UpdateKnowledgeDto,
  KnowledgeDto,
} from '@dto/knowledge';
import { KnowledgeId } from '@shared/kernel';
import { KnowledgeService } from './knowledge.service';

@Controller('knowledges')
export class KnowledgeController {
  constructor(private readonly knowledgeService: KnowledgeService) {}

  @Post()
  create(@Body() createKnowledgeDto: CreateKnowledgeDto) {
    return this.knowledgeService.create(createKnowledgeDto);
  }

  @Get()
  findAll(): Promise<KnowledgeDto[]> {
    return this.knowledgeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: KnowledgeId): Promise<KnowledgeDto | undefined> {
    return this.knowledgeService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: KnowledgeId,
    @Body() updateKnowledgeDto: UpdateKnowledgeDto,
  ) {
    return this.knowledgeService.update(id, updateKnowledgeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: KnowledgeId) {
    return this.knowledgeService.remove(id);
  }
}

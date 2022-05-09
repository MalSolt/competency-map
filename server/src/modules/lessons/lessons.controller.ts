import { LessonId } from '@shared/kernel';
import { UpdateLessonDto, UpdateLessonContentDto } from '@dto/lesson';
import { Controller, Get, Param, Patch, Body, Put } from '@nestjs/common';
import { LessonsService } from './lessons.service';

@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Get(':id')
  findOne(@Param('id') id: LessonId) {
    return this.lessonsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: LessonId, @Body() updateLessonDto: UpdateLessonDto) {
    return this.lessonsService.update(id, updateLessonDto);
  }

  @Put(':id/content')
  updateContent(
    @Param('id') id: LessonId,
    @Body() updateLessonContentDto: UpdateLessonContentDto,
  ) {
    return this.lessonsService.updateContent(id, updateLessonContentDto);
  }
}

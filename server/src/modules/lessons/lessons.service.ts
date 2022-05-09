import { LessonId } from '@shared/kernel';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Lesson, tableName } from 'src/domain/entities/lesson.entity';
import {
  UpdateLessonDto,
  UpdateLessonContentDto,
  CreateLessonDto,
} from '@dto/lesson';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonsRepository: Repository<Lesson>,
  ) {}

  async findLesson(
    lessonId: LessonId,
    options?: FindOneOptions<Lesson>,
  ): Promise<Lesson> {
    const lesson = await this.lessonsRepository.findOne(lessonId, options);

    if (!lesson) {
      throw new NotFoundException(`Lesson with Id: ${lessonId} not found`);
    }

    return lesson;
  }

  async findOne(lessonId: LessonId) {
    const lesson = await this.findLesson(lessonId);

    return lesson;
  }

  async create(createLessonDto: CreateLessonDto): Promise<Lesson> {
    const lesson = this.lessonsRepository.create(createLessonDto);

    await this.lessonsRepository.save(lesson);

    return lesson;
  }

  async update(id: LessonId, updateLessonDto: UpdateLessonDto) {
    const lesson = await this.findLesson(id);

    return this.lessonsRepository.save({
      ...lesson,
      ...updateLessonDto,
    });
  }

  async updateContent(
    id: LessonId,
    updateLessonContentDto: UpdateLessonContentDto,
  ) {
    const lesson = await this.findLesson(id);

    return this.lessonsRepository.save({
      ...lesson,
      ...updateLessonContentDto,
    });
  }

  clear() {
    return this.lessonsRepository.query(`DELETE FROM ${tableName};`);
  }
}

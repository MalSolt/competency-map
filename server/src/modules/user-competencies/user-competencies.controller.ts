import { UserId } from '@shared/kernel';
import { UpdateUserCompetencyDto } from '@dto/userCompetency';
import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { UserCompetenciesService } from './user-competencies.service';

@Controller('user-competencies')
export class UserCompetenciesController {
  constructor(
    private readonly userCompetenciesService: UserCompetenciesService,
  ) {}

  @Get(':userId')
  getUserCompetencies(@Param('userId') userId: UserId) {
    return this.userCompetenciesService.getUserCompetencies(userId);
  }

  @Put()
  updateUserCompetencyStatus(
    @Body() updateUserCompetencyDto: UpdateUserCompetencyDto,
  ) {
    return this.userCompetenciesService.updateUserCompetencyStatus(
      updateUserCompetencyDto,
    );
  }
}

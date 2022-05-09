import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateMaterialDto, SwapCollectionDto } from '@dto/material';
import { MaterialId, CompetencyId } from '@shared/kernel';
import { OwnerMaterialsCollectionId } from '@dto/materialsCollection';
import { MaterialsService } from './materials.service';

@Controller('materials')
export class MaterialsController {
  constructor(private readonly materialsService: MaterialsService) {}

  @Get()
  getMaterials(
    @Query('competencyId') id: CompetencyId,
    @Query('ownerCollectionId') ownerId: OwnerMaterialsCollectionId,
  ) {
    ownerId = Number(ownerId) as OwnerMaterialsCollectionId;
    id = Number(id) as CompetencyId;
    return this.materialsService.getMaterials(id, ownerId);
  }

  @HttpCode(201)
  @Post()
  create(@Body() createMaterialDto: CreateMaterialDto) {
    return this.materialsService.create(createMaterialDto);
  }

  @Put('orders')
  updateMaterialsOrders(@Body() swapCollectionDto: SwapCollectionDto) {
    return this.materialsService.updateMaterialsOrders(swapCollectionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: MaterialId) {
    return this.materialsService.remove(id);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PlanEstudioService } from './plan-estudio.service';
import { CreatePlanEstudioDto } from './dto/create-plan-estudio.dto';
import { UpdatePlanEstudioDto } from './dto/update-plan-estudio.dto';

@Controller('plan-estudio')
export class PlanEstudioController {
  constructor(private readonly planEstudioService: PlanEstudioService) {}

  @Post()
  async create(@Body() createPlanEstudioDto: CreatePlanEstudioDto, @Query('crudQuery') crudQuery: string) {
    const created = await this.planEstudioService.create(createPlanEstudioDto, { crudQuery });
    return created;
  }

  @Get()
  async findMany(@Query('crudQuery') crudQuery: string) {
    const matches = await this.planEstudioService.findMany({ crudQuery });
    return matches;
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Query('crudQuery') crudQuery: string) {
    const match = await this.planEstudioService.findOne(id, { crudQuery });
    return match;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePlanEstudioDto: UpdatePlanEstudioDto,
    @Query('crudQuery') crudQuery: string,
  ) {
    const updated = await this.planEstudioService.update(id, updatePlanEstudioDto, { crudQuery });
    return updated;
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Query('crudQuery') crudQuery: string) {
    return this.planEstudioService.remove(id, { crudQuery });
  }
}

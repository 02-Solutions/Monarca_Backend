import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TravelAgenciesService } from './travel-agencies.service';
import { CreateTravelAgencyDto } from './dto/create-travel-agency.dto';
import { UpdateTravelAgencyDto } from './dto/update-travel-agency.dto';

@Controller('travel-agencies')
export class TravelAgenciesController {
  constructor(private readonly travelAgenciesService: TravelAgenciesService) {}

  @Post()
  create(@Body() createTravelAgencyDto: CreateTravelAgencyDto) {
    return this.travelAgenciesService.create(createTravelAgencyDto);
  }

  @Get()
  findAll() {
    return this.travelAgenciesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.travelAgenciesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTravelAgencyDto: UpdateTravelAgencyDto,
  ) {
    return this.travelAgenciesService.update(+id, updateTravelAgencyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.travelAgenciesService.remove(+id);
  }
}

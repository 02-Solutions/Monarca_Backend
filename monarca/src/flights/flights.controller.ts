import { Controller, Get, Post, Param, Patch, Delete, Body } from '@nestjs/common';
import { FlightsService } from './flights.service'; 


@Controller('flights')
export class FlightsController {

    constructor(private readonly flightsService: FlightsService) {}

    @Post()
    create(){
        return this.flightsService.create({}) ;

    }
    
    @Get()
    findAll() {
        return this.flightsService.findAll(); ;
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.flightsService.findOne(id); ;
    }
    
    @Patch(':id')
    update(@Param('id') id: number, @Body() body: any) {
        return this.flightsService.update(id, {}); ;
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.flightsService.remove(id); ;
    }

}

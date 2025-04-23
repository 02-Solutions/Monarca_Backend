import { Controller, 
    Get, 
    Post, 
    Param, 
    Patch, 
    Delete, 
    Body, 
    ParseUUIDPipe} from '@nestjs/common';
import { FlightsService } from './flights.service'; 
import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';


@Controller('flights')
export class FlightsController {

    constructor(private readonly flightsService: FlightsService) {}

    @Post()
    create(@Body() createFlightDto: CreateFlightDto) {
        return this.flightsService.create(createFlightDto);
    }
    
    @Get()
    findAll() {
        return this.flightsService.findAll(); ;
    }

    @Get(':id')
    findOne(@Param('id', new ParseUUIDPipe()) id: string) {
        return this.flightsService.findOne(id); ;
    }
    
    @Patch(':id')
    async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() updateFlightDto: UpdateFlightDto) {
        return this.flightsService.update(id, updateFlightDto); ;
    }

    @Delete(':id')
    remove(@Param('id', new ParseUUIDPipe()) id: string) {
        return this.flightsService.remove(id); ;
    }

}

import { Controller, 
    Get, 
    Post, 
    Param, 
    Patch, 
    Delete, 
    Body, 
    ParseUUIDPipe,
    Res
} from '@nestjs/common';
import { FlightsService } from './flights.service';
import { Response } from 'express'; 
import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';


@Controller('flights')
export class FlightsController {

    constructor(private readonly flightsService: FlightsService) {}

    @Post()
    async create(
        @Body() createFlightDto: CreateFlightDto,
        @Res({passthrough : true}) res: Response)
        {
        console.log('createFlightDto :', createFlightDto);
        const result = this.flightsService.create(createFlightDto);
        res.status(201).send(result);
        return result;
    }
    
    @Get()
    async findAll() {
        return this.flightsService.findAll(); ;
    }

    @Get(':id')
    async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
        return this.flightsService.findOne(id); ;
    }
    
    @Patch(':id')
    async update(
        @Param('id', new ParseUUIDPipe()) id: string, 
        @Body() updateFlightDto: UpdateFlightDto) {
        return this.flightsService.update(id, updateFlightDto); ;
    }

    @Delete(':id')
    async remove(@Param('id', new ParseUUIDPipe()) id: string) {
        return this.flightsService.remove(id); ;
    }

}

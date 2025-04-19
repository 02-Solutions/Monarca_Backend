import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateHotelReservationDto {
    
      @ApiProperty({
        description: 'name of the hotel reservation',
        example: 'Hotel California',
      })
      @IsString()
      name: string;
    
      @ApiProperty({
        description: 'check-in date',
        example: '2023-10-01T14:00:00Z',
      })
      @IsString()
      check_in: Date;
    
      @ApiProperty({
        description: 'check-out date',
        example: '2023-10-07T12:00:00Z',
      })
      @IsString()
      check_out: Date;
    
      @ApiProperty({
        description: 'address of the hotel',
        example: '123 Sunset Boulevard, Los Angeles, CA',
      })
      @IsString()
      address: string;
    
      @ApiProperty({
        description: 'URL of the file associated with the reservation',
        example: 'https://example.com/reservation.pdf',
      })
      @IsString()
      file_url: string;
    
    //falta request destination 

}

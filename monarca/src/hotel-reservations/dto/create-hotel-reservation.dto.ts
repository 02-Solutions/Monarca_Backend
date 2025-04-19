import { ApiProperty } from "@nestjs/swagger";

export class CreateHotelReservationDto {
    
      @ApiProperty({
        description: 'name of the hotel reservation',
        example: 'Hotel California',
      })
      name: string;
    
      @ApiProperty({
        description: 'check-in date',
        example: '2023-10-01T14:00:00Z',
      })
      check_in: Date;
    
      @ApiProperty({
        description: 'check-out date',
        example: '2023-10-07T12:00:00Z',
      })
      check_out: Date;
    
      @ApiProperty({
        description: 'address of the hotel',
        example: '123 Sunset Boulevard, Los Angeles, CA',
      })
      address: string;
    
      @ApiProperty({
        description: 'URL of the file associated with the reservation',
        example: 'https://example.com/reservation.pdf',
      })
      file_url: string;
    
    //falta request destination 

}

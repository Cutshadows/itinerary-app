import { ApiProperty } from '@nestjs/swagger';
import { BaseTicketDto } from './base-ticket.dto';

export class BoatTicketDto extends BaseTicketDto {
  @ApiProperty({
    type: String,
    description: 'Boat number',
    example: 'Ferry 123',
  })
  boatNumber: string;
  @ApiProperty({
    type: String,
    description: 'Ticket class',
    example: 'First Class | Economy | Business Class',
  })
  ticketClass: string;

  @ApiProperty({
    type: String,
    description: 'Cabin number',
    example: '12SA',
  })
  cabinNumber: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { BaseTicketDto } from './base-ticket.dto';

export class AirplaneTicketDto extends BaseTicketDto {
  @ApiProperty({
    type: Number,
    description: 'Boarding gate number',
    example: 19,
  })
  gate: number;
  @ApiProperty({
    type: String,
    description: 'Seat number',
    example: '18B',
  })
  seat?: string;
  @ApiProperty({
    type: String,
    description: 'Self-check-in observation',
    example: 'Check-in at the airport',
  })
  observation?: string;
  @ApiProperty({
    type: String,
    description: 'Flight number',
    example: 'AA123',
  })
  flightNumber: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { BaseTicketDto } from './base-ticket.dto';

export class AirplaneTicketDto extends BaseTicketDto {
  @ApiProperty({
    type: Number,
    description: 'From gate number',
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
    example: 'Self-check-in at the counter',
  })
  observation?: string;
  @ApiProperty({
    type: String,
    description: 'Flight number',
    example: 'AA904',
  })
  flightNumber: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { BaseTicketDto } from './base-ticket.dto';

export class TrainTicketDto extends BaseTicketDto {
  @ApiProperty({
    type: String,
    description: 'Seat number',
    example: '1A',
  })
  seat: string;
  @ApiProperty({
    type: String,
    description: 'Train number',
    example: 'ICE123',
  })
  trainNumber: string;
  @ApiProperty({
    type: String,
    description: 'Platform number',
    example: 'Platform 5',
  })
  platform: string;
}

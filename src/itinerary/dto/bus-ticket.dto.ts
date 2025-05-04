import { ApiProperty } from '@nestjs/swagger';
import { BaseTicketDto } from './base-ticket.dto';

export class BusTicketDto extends BaseTicketDto {
  @ApiProperty({
    type: String,
    description: 'detail of the bus ticket',
    example: 'No seat assigned',
  })
  observation?: string;
}

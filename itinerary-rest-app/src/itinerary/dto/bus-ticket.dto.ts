import { ApiProperty } from '@nestjs/swagger';
import { BaseTicketDto } from './base-ticket.dto';

export class BusTicketDto extends BaseTicketDto {
  @ApiProperty({
    type: String,
    description: 'bus identifier number',
    example: '1234',
  })
  identifier: string;
  @ApiProperty({
    type: String,
    description: 'bus seat number',
    example: '14a',
  })
  seat?: string;
}

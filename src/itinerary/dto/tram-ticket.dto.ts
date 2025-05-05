import { ApiProperty } from '@nestjs/swagger';
import { BaseTicketDto } from './base-ticket.dto';

export class TramTicketDto extends BaseTicketDto {
  @ApiProperty({
    type: String,
    description: 'Tram number',
    example: 'S5',
  })
  tramNumber: string;
}

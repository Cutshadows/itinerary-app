import { ApiProperty } from '@nestjs/swagger';
import { BaseTicketDto } from './base-ticket.dto';

export class TransferLinkDto extends BaseTicketDto {
  @ApiProperty({
    type: String,
    description: 'driver name',
    example: 'john doe',
  })
  driverName: string;
  @ApiProperty({
    type: String,
    description: 'license plate number',
    example: 'ABC1234',
  })
  licensePlate: string;
}

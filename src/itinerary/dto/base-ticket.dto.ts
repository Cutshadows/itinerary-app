import { ApiProperty } from '@nestjs/swagger';

enum TicketType {
  AIRPLANE = 'airplane',
  TRAIN = 'train',
  BUS = 'bus',
  BOAT = 'boat',
  TAXI = 'taxi',
  OTHER = 'other',
}
export class BaseTicketDto {
  @ApiProperty({
    type: String,
    description: 'The origin of the ticket',
    example: 'from St. Anton, Austria',
  })
  from: string;
  @ApiProperty({
    type: String,
    description: 'Destiny of the ticket',
    example: 'to St. Anton, Austria',
  })
  to: string;
  @ApiProperty({
    enum: TicketType,
    enumName: 'TicketType',
    description: 'Destiny of the ticket',
    example: TicketType.AIRPLANE,
  })
  type: TicketType;
}

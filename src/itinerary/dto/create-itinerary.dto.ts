import { ApiProperty } from '@nestjs/swagger';

enum TicketType {
  AIRPLANE = 'airplane',
  TRAIN = 'train',
  BUS = 'bus',
  BOAT = 'boat',
  TAXI = 'taxi',
  OTHER = 'other',
}
export class TicketsDto {
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
  @ApiProperty({
    type: Object,
    description: 'Detail of ticket',
    example: { seat: '1A', gate: 'B12' },
  })
  details?: object;
}

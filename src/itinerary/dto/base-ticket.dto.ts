import { ApiProperty } from '@nestjs/swagger';

export enum TransportType {
  AIRPLANE = 'airplane',
  TRAIN = 'train',
  BUS = 'bus',
  BOAT = 'boat',
  TAXI = 'taxi',
  OTHER = 'other',
  TRAM = 'TRAM',
}
export class BaseTicketDto {
  @ApiProperty({
    type: String,
    description: 'The origin of the ticket',
    example: 'Innsbruck Airport',
  })
  from: string;
  @ApiProperty({
    type: String,
    description: 'Destiny of the ticket',
    example: 'Venice Airport',
  })
  to: string;
  @ApiProperty({
    enum: TransportType,
    enumName: 'TransportType',
    description: 'Airplanne, train, bus, tram, taxi, or other',
    example: TransportType.AIRPLANE,
  })
  type: TransportType;
}

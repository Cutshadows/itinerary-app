import { ApiProperty } from '@nestjs/swagger';

export enum TransportType {
  AIRPLANE = 'airplane',
  TRAIN = 'train',
  TRAM = 'tram',
  BUS = 'bus',
  BOAT = 'boat',
  TAXI = 'taxi',
  TRANFER_LINK = 'implicit-transfer',
  OTHER = 'other',
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
    description: 'Airplanne, train, bus, tram, taxi',
    example: TransportType.AIRPLANE,
  })
  type: TransportType;
  @ApiProperty({
    description: 'boolean value to indicate if the ticket is origin',
    type: Boolean,
    default: false,
  })
  isOrigin?: boolean;
}

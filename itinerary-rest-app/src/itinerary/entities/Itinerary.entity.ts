import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';
import { TicketDto } from '../dto/ticket.dto';

@Entity('itineraries')
export class Itinerary {
  @ObjectIdColumn()
  _id?: ObjectId;

  @Column()
  id: string;

  @Column()
  sorted?: TicketDto[];

  @Column()
  createdAt: Date;
}

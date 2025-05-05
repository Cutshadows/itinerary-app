import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';
import { TicketDto } from '../dto/ticket.dto';

@Entity('itineraries')
export class Itinerary {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  sorted: TicketDto[];

  @Column({ default: new Date() })
  createdAt: Date;
}

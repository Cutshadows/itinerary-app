import { Injectable } from '@nestjs/common';
import { TransportStrategy } from '../interfaces/transport-interface.strategy';
import { TrainTicketDto } from '../dto/train-ticket.dto';

@Injectable()
export class TrainStrategy implements TransportStrategy {
  render(ticket: TrainTicketDto): string {
    return (
      `Board ${ticket.trainNumber}, Platform ${ticket.platform} from ${ticket.from} to ${ticket.to}.\n` +
      `${ticket.seat ? `seat number ${ticket.seat}.\n` : 'No seat assignment'}`
    );
  }
}

import { Injectable } from '@nestjs/common';
import { TransportStrategy } from '../interfaces/transport-interface.strategy';
import { BusTicketDto } from '../dto/bus-ticket.dto';

@Injectable()
export class BusStrategy implements TransportStrategy {
  render(ticket: BusTicketDto): string {
    return (
      `Board ${ticket.identifier} from ${ticket.from} to ${ticket.to}.\n` +
      `${ticket.seat ? `In seat ${ticket.seat}.\n` : 'No seat assignment'}`
    );
  }
}

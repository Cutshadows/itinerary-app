import { Injectable } from '@nestjs/common';
import { TransportStrategy } from '../interfaces/transport-interface.strategy';
import { TramTicketDto } from '../dto/tram-ticket.dto';

@Injectable()
export class TramStrategy implements TransportStrategy {
  render(ticket: TramTicketDto): string {
    return `Board ${ticket.tramNumber}, from ${ticket.from} to ${ticket.to}.`;
  }
}

import { Injectable } from '@nestjs/common';
import { TransportStrategy } from '../interfaces/transport-interface.strategy';
import { TaxiTicketDto } from '../dto/taxi-ticket.dto';

@Injectable()
export class TaxiStrategy implements TransportStrategy {
  render(ticket: TaxiTicketDto): string {
    return `Take taxi from ${ticket.from} to ${ticket.to}.`;
  }
}

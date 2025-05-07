import { Injectable } from '@nestjs/common';
import { TransportStrategy } from '../interfaces/transport-interface.strategy';
import { TaxiTicketDto } from '../dto/taxi-ticket.dto';

@Injectable()
export class TranferLinkStrategy implements TransportStrategy {
  render(ticket: TaxiTicketDto): string {
    return `Take the transfer ${ticket.licensePlate}, from ${ticket.from} to ${ticket.to}.`;
  }
}

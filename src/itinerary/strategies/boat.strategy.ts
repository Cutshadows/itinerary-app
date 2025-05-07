import { Injectable } from '@nestjs/common';
import { TransportStrategy } from '../interfaces/transport-interface.strategy';
import { BoatTicketDto } from '../dto/boat-ticket.dto';

@Injectable()
export class BoatStrategy implements TransportStrategy {
  render(ticket: BoatTicketDto): string {
    return `From ${ticket.from}, board the boat ${ticket.boatNumber} to ${ticket.to}. In the cabin ${ticket.cabinNumber}.`;
  }
}

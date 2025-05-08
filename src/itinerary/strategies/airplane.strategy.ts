import { Injectable } from '@nestjs/common';
import { TransportStrategy } from '../interfaces/transport-interface.strategy';
import { AirplaneTicketDto } from '../dto/airplane-ticket.dto';

@Injectable()
export class AirPlaneStrategy implements TransportStrategy {
  render(ticket: AirplaneTicketDto): string {
    return `From ${ticket.from}, board the flight ${ticket.flightNumber} to ${ticket.to}.From gate ${ticket.gate}, seat ${ticket.seat}. ${ticket.observation}.`;
  }
}

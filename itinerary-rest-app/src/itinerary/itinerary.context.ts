import { Injectable } from '@nestjs/common';
import { TransportStrategy } from './interfaces/transport-interface.strategy';
import { TicketDto } from './dto/ticket.dto';

@Injectable()
export class ItineraryContext {
  private strategy: TransportStrategy;

  setStrategy(strategy: TransportStrategy) {
    this.strategy = strategy;
  }

  render(ticket: TicketDto): string {
    if (!this.strategy) {
      throw new Error('Itinerary strategy not set.');
    }
    return this.strategy.render(ticket);
  }
}

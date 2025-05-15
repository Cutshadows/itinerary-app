import { Injectable } from '@nestjs/common';
import { TransportType } from './dto/base-ticket.dto';
import { ItineraryContext } from './itinerary.context';
import { TicketDto } from './dto/ticket.dto';
import { AirPlaneStrategy } from './strategies/airplane.strategy';
import { BoatStrategy } from './strategies/boat.strategy';
import { BusStrategy } from './strategies/bus.strategy';
import { TrainStrategy } from './strategies/train.strategy';
import { TramStrategy } from './strategies/tram.strategy';
import { TaxiStrategy } from './strategies/taxi.strategy';
import { TranferLinkStrategy } from './strategies/transfer-link.strategy';

@Injectable()
export class TicketRenderFactory {
  constructor(
    private context: ItineraryContext,
    private readonly airplane: AirPlaneStrategy,
    private readonly boat: BoatStrategy,
    private readonly bus: BusStrategy,
    private readonly train: TrainStrategy,
    private readonly tram: TramStrategy,
    private readonly taxi: TaxiStrategy,
    private readonly transferLink: TranferLinkStrategy,
  ) {}

  createTicketRender(ticketType: TransportType) {
    switch (ticketType) {
      case TransportType.AIRPLANE:
        return (ticket: TicketDto): string => {
          this.context.setStrategy(this.airplane);
          return this.context.render(ticket);
        };
      case TransportType.BOAT:
        return (ticket: TicketDto): string => {
          this.context.setStrategy(this.boat);
          return this.context.render(ticket);
        };
      case TransportType.BUS:
        return (ticket: TicketDto): string => {
          this.context.setStrategy(this.bus);
          return this.context.render(ticket);
        };
      case TransportType.TRAIN:
        return (ticket: TicketDto): string => {
          this.context.setStrategy(this.train);
          return this.context.render(ticket);
        };
      case TransportType.TRAM:
        return (ticket: TicketDto): string => {
          this.context.setStrategy(this.tram);
          return this.context.render(ticket);
        };
      case TransportType.TAXI:
        return (ticket: TicketDto): string => {
          this.context.setStrategy(this.taxi);
          return this.context.render(ticket);
        };
      case TransportType.TRANFER_LINK:
        return (ticket: TicketDto): string => {
          this.context.setStrategy(this.transferLink);
          return this.context.render(ticket);
        };
      case TransportType.OTHER:
        return (ticket: TicketDto): string => {
          this.context.setStrategy(this.taxi);
          return this.context.render(ticket);
        };
      default:
        throw new Error('Unknown ticket type');
    }
  }
}

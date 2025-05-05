import { Injectable } from '@nestjs/common';
import { TicketRenderFactory } from './ticket.render.factory';
import { ItineraryContext } from './itinerary.context';
import { TicketDto } from './dto/ticket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Itinerary } from './entities/Itinerary.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ItineraryService {
  constructor(
    @InjectRepository(Itinerary)
    private readonly itineraryRepository: Repository<Itinerary>,
    private readonly ticketRenderFactory: TicketRenderFactory,
    private readonly itineraryContext: ItineraryContext,
  ) {}

  createItinerary(tickets: TicketDto[]) {
    const sortedTickets = this.sortTickets(tickets);
    // const itineraryKey = this.generateItineraryKey(sortedTickets);
    // this.itineraries.set(itineraryKey, sortedTickets);
  }

  sortTickets(tickets: TicketDto[]): Promise<TicketDto[]> {
    const fromMap = new Map<string, TicketDto>();
    const toSet = new Set<string>();

    tickets.forEach((ticket) => {
      fromMap.set(ticket.from, ticket);
      toSet.add(ticket.to);
    });

    let start = tickets.find((ticket) => !toSet.has(ticket.from))?.from;
    if (!start) throw new Error('Invalid ticket chain');

    const sorted: TicketDto[] = [];
    while (fromMap.has(start)) {
      const ticket = fromMap.get(start);
      sorted.push(ticket);
      start = ticket.to;
    }
    return sorted;
  }
}

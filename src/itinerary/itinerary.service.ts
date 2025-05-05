import { Injectable } from '@nestjs/common';
import { TicketRenderFactory } from './ticket.render.factory';
import { ItineraryContext } from './itinerary.context';
import { TicketDto } from './dto/ticket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Itinerary } from './entities/Itinerary.entity';
import { Repository } from 'typeorm';
import { v4 as uuuid } from 'uuid';

@Injectable()
export class ItineraryService {
  constructor(
    @InjectRepository(Itinerary)
    private readonly itineraryRepo: Repository<Itinerary>,
    private readonly ticketRenderFactory: TicketRenderFactory,
    private readonly itineraryContext: ItineraryContext,
  ) {}

  async createItinerary(tickets: TicketDto[]) {
    const sorted = this.sortTickets(tickets);
    const itineraryId = uuuid();

    const itinerary = this.itineraryRepo.create({
      sorted,
    });

    await this.itineraryRepo.save(itinerary);
    return { itineraryId, sorted };
  }

  sortTickets(tickets: TicketDto[]): TicketDto[] {
    const fromMap = new Map<string, TicketDto>();
    const toSet = new Set<string>();

    tickets.forEach((ticket) => {
      fromMap.set(ticket.from, ticket);
      toSet.add(ticket.to);
    });

    let start: TicketDto | undefined = tickets.find((ticket) => {
      return !toSet.has(ticket.from);
    });
    if (!start) {
      return [];
    }
    const sorted: TicketDto[] = [];
    while (start && fromMap.has(start.from)) {
      const ticket = fromMap.get(start.from);
      sorted.push(ticket as TicketDto);
      start = ticket?.to ? fromMap.get(ticket.to) : undefined;
    }
    return sorted;
  }
}

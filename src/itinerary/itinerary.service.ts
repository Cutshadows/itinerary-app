import { Injectable } from '@nestjs/common';
import { TicketRenderFactory } from './ticket.render.factory';
import { ItineraryContext } from './itinerary.context';
import { InjectRepository } from '@nestjs/typeorm';
import { Itinerary } from './entities/Itinerary.entity';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { TicketDto } from './dto/ticket.dto';
import { PriorityQueue } from 'typescript-collections';

@Injectable()
export class ItineraryService {
  getTickets(id?: string) {
    throw new Error('Method not implemented.');
  }
  private graph: Record<string, PriorityQueue<string>> = {};
  private itinerary: string[] = [];
  constructor(
    @InjectRepository(Itinerary)
    private readonly itineraryRepo: Repository<Itinerary>,
    private readonly ticketRenderFactory: TicketRenderFactory,
    private readonly itineraryContext: ItineraryContext,
  ) {}

  async createItinerary(tickets: TicketDto[]): Promise<{
    id: string;
    sorted: any[];
    createdAt: Date;
  }> {
    const sorted = this.orderItinerary(tickets);
    const itineraryId = `itinerary-${uuid().slice(uuid().length - 6, uuid().length - 1)}`;

    const itinerary = this.itineraryRepo.create({
      id: itineraryId,
      sorted,
      createdAt: new Date(),
    });

    await this.itineraryRepo.save(itinerary);

    return {
      id: itineraryId,
      sorted,
      createdAt: itinerary.createdAt,
    };
  }
  private deduplicateTickets(tickets: TicketDto[]): TicketDto[] {
    const uniqueTickets = Array.from(
      new Map(tickets.map((t) => [`${t.from}→${t.to}`, t])).values(),
    );
    return uniqueTickets;
  }

  private buildIndex(tickets: TicketDto[]) {
    const fromMap = new Map<string, TicketDto>();
    const toSet = new Set<string>();
    for (const ticket of tickets) {
      fromMap.set(ticket.from, ticket);
      toSet.add(ticket.to);
    }
    return { fromMap, toSet };
  }

  buildSegments(
    tickets: TicketDto[],
    fromMap: Map<string, TicketDto>,
    toSet: Set<string>,
  ): TicketDto[][] {
    const usedFroms = new Set<string>();
    const segments: TicketDto[][] = [];

    const starts = tickets.filter((t) => t.isOrigin || !toSet.has(t.from));

    const traverse = (start: TicketDto) => {
      const segment: TicketDto[] = [];
      let current = start;
      while (current && !usedFroms.has(current.from)) {
        segment.push(current);
        usedFroms.add(current.from);
        current = fromMap.get(current.to)!;
      }
      return segment;
    };

    for (const start of starts) segments.push(traverse(start));
    for (const ticket of tickets.filter((t) => !usedFroms.has(t.from))) {
      segments.push(traverse(ticket));
    }

    return segments;
  }

  connectSegments(segments: TicketDto[][]): TicketDto[] {
    const routes: TicketDto[] = [...segments.shift()!];

    while (segments.length > 0) {
      const last = routes[routes.length - 1].to;
      const index = segments.findIndex((segment) =>
        sortByHeuristic(last, segment[0].from),
      );

      if (index >= 0) {
        const next = segments.splice(index, 1)[0];
        routes.push({
          from: last,
          to: next[0].from,
          type: 'implicit-transfer',
          observation: 'Transfer inferred based on location similarity',
        } as unknown as TicketDto);
        routes.push(...next);
      } else {
        const disconnected = segments.shift()!;
        if (
          !disconnected[0].from.includes('last') &&
          !disconnected[0].from.includes('destination') &&
          !disconnected[0].to.includes('last') &&
          !disconnected[0].to.includes('destination')
        ) {
          routes.push({
            from: last,
            to: disconnected[0].from,
            type: 'gap',
            observation: 'No direct connection found',
          } as unknown as TicketDto);
          routes.push(...disconnected);
        }
      }
    }

    return routes;
  }

  orderItinerary(tickets: TicketDto[]): TicketDto[] {
    const uniqueTickets = this.deduplicateTickets(tickets);
    const { fromMap, toSet } = this.buildIndex(uniqueTickets);
    const segments = this.buildSegments(uniqueTickets, fromMap, toSet);
    return this.connectSegments(segments);
  }
}

function sortByHeuristic(locationA: string, locationB: string): boolean {
  const normalize = (s: string) =>
    s
      .toLowerCase()
      .replace(/[^a-z\s]/g, '')
      .split(/\s+/)
      .filter((t) => t.length > 3);
  const tokenA = normalize(locationA);
  const tokenB = normalize(locationB);
  return tokenA.some((t) => tokenB.includes(t));
}

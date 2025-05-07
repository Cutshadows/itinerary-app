import { Injectable } from '@nestjs/common';
import { TicketRenderFactory } from './ticket.render.factory';
import { ItineraryContext } from './itinerary.context';
import { InjectRepository } from '@nestjs/typeorm';
import { Itinerary } from './entities/Itinerary.entity';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { TicketDto } from './dto/ticket.dto';

@Injectable()
export class ItineraryService {
  private graph: Record<string, TicketDto> = {};
  private itinerary: TicketDto[] = [];
  constructor(
    @InjectRepository(Itinerary)
    private readonly itineraryRepo: Repository<Itinerary>,
    private readonly ticketRenderFactory: TicketRenderFactory,
    private readonly itineraryContext: ItineraryContext,
  ) {}

  async createItinerary(tickets: TicketDto[]): Promise<{
    id: string;
    sorted: TicketDto[];
    createdAt: Date;
  }> {
    const sorted = orderItinerary(tickets);

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
}

function orderItinerary(tickets: TicketDto[]): TicketDto[] {
  const uniqueTickets = Array.from(
    new Map(tickets.map((t) => [`${t.from}→${t.to}`, t])).values(),
  );
  const fromMap = new Map<string, TicketDto>();
  const toSet = new Set<string>();

  for (const ticket of uniqueTickets) {
    fromMap.set(ticket.from, ticket);
    toSet.add(ticket.to);
  }

  const usedForms = new Set<string>();
  const segments: TicketDto[][] = [];

  const starts = uniqueTickets.filter(
    (ticket) => ticket.isOrigin || !toSet.has(ticket.from),
  );

  for (const start of starts) {
    const segment: TicketDto[] = [];
    let current = start;

    while (current && !usedForms.has(current.from)) {
      segment.push(current);
      usedForms.add(current.from);
      current = fromMap.get(current.to)!;
    }
    segments.push(segment);
  }

  const remaining = uniqueTickets.filter((t) => !usedForms.has(t.from));
  for (const ticket of remaining) {
    const segment: TicketDto[] = [];
    let current = ticket;

    while (current && !usedForms.has(current.from)) {
      segment.push(current);
      usedForms.add(current.from);
      current = fromMap.get(current.to)!;
    }
    segments.push(segment);
  }

  const routes: TicketDto[] = [...segments.shift()!];

  while (segments.length > 0) {
    const last = routes[routes.length - 1].to;

    let bestIndex = -1;
    for (let i = 0; i < segments.length; i++) {
      if (sortByHeuristic(last, segments[i][0].from)) {
        bestIndex = i;
        break;
      }
    }
    if (bestIndex >= 0) {
      const nextSegment = segments.splice(bestIndex, 1)[0];
      routes.push({
        from: last,
        to: nextSegment[0].from,
        type: 'implicit-transfer',
        observation: 'Transfer inferred based on location similarity',
      } as unknown as TicketDto);
      routes.push(...nextSegment);
    } else {
      const diconnected: TicketDto[] = segments.shift()!;
      if (
        !diconnected[0].from.includes('Home') &&
        !diconnected[0].to.includes('Home')
      ) {
        routes.push({
          from: last,
          to: diconnected[0].from,
          type: 'gap',
          observation: 'No direct connection found',
        } as unknown as TicketDto);
        routes.push(...diconnected);
      }
    }
  }

  return routes;
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

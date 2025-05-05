import { Injectable } from '@nestjs/common';
import { TicketRenderFactory } from './ticket.render.factory';
import { ItineraryContext } from './itinerary.context';
import { TicketDto } from './dto/ticket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Itinerary } from './entities/Itinerary.entity';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';

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

  createItinerary(tickets: TicketDto[]): any {
    // { id: string; createdAt: Date }
    // const mappedTicket = await this.mapTicketCoords(tickets);
    // const enhanced = enhanceWithDistance(mappedTicket as any);
    const sddf = this.findItinerary(tickets);
    const sorted = this.sortItinerary(tickets);
    const itineraryId = `itinerary-${uuid().slice(uuid().length - 6, uuid().length - 1)}`;

    const itinerary = this.itineraryRepo.create({
      id: itineraryId,
      //   sorted,
      createdAt: new Date(),
    });

    // await this.itineraryRepo.save(itinerary);
    return {
      id: itineraryId,
      sorted,
      sddf,
      createdAt: itinerary.createdAt,
    };
  }

  sortItinerary(tickets: TicketDto[]): TicketDto[] {
    const fromMap = new Map<
      string,
      TicketDto & {
        coords?: { from: (number | undefined)[]; to: (number | undefined)[] };
      }
    >();
    const toSet = new Set<string>();

    for (const ticket of tickets) {
      fromMap.set(ticket.from, ticket);
      toSet.add(ticket.to);
    }

    // console.log('fromMap', fromMap);

    const start = tickets.find((ticket) => ticket.isOrigin && ticket);

    const sorted: TicketDto[] = [];
    let current = start;

    while (current) {
      sorted.push(current);
      current = findNextTicket(current.to, fromMap);
      //   current = next!;
    }

    return sorted;
  }
  findItinerary(tickets: TicketDto[]): string[] {
    const origin =
      (tickets.map((ticket) => ticket.isOrigin && ticket)[0] as TicketDto) ||
      tickets[0];
    const graph: Record<string, TicketDto[]> = {};
    //   tickets.sort((a, b) => {
    //     return a.to.localeCompare(b.to);
    //   });
    for (const ticket of tickets) {
      graph[ticket.from] = graph[ticket.from] || [];
      graph[ticket.from].push(ticket);
    }
    const ans: string[] = [];
    const depthFirstSearch = (from: TicketDto['from']) => {
      while (graph[from] && graph[from].length) {
        const tos = graph[from].pop()!;
        depthFirstSearch(tos.to);
      }
      ans.push(from);
    };
    depthFirstSearch(origin.from);
    return ans.reverse();
  }
}

function findNextTicket(
  currentTo: string,
  map: Map<string, TicketDto>,
): TicketDto | undefined {
  if (map.has(currentTo)) return map.get(currentTo);

  // Fallback: look for a partial match (e.g., contains "Venezia")
  for (const [from, ticket] of map.entries()) {
    if (from.includes(currentTo) || currentTo.includes(from)) {
      return ticket;
    }
  }

  return undefined;
}

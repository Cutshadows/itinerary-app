import { Injectable } from '@nestjs/common';
import { TicketRenderFactory } from './ticket.render.factory';
import { ItineraryContext } from './itinerary.context';
import { TicketDto } from './dto/ticket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Itinerary } from './entities/Itinerary.entity';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { getCoordinates } from 'src/utils/geocoder.utils';
import { TransportType } from './dto/base-ticket.dto';

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

  async createItinerary(tickets: TicketDto[]): Promise<any> {
    // { id: string; createdAt: Date }
    console.log('tickets', tickets);
    const mappedTicket = await this.mapTicketCoords(tickets);
    const itineraryId = `itinerary-${uuid().slice(uuid().length - 6, uuid().length - 1)}`;

    const itinerary = this.itineraryRepo.create({
      id: itineraryId,
      //   sorted,
      createdAt: new Date(),
    });

    // await this.itineraryRepo.save(itinerary);
    return { id: itineraryId, mappedTicket, createdAt: itinerary.createdAt };
  }

  //   sortTickets(tickets: TicketDto[]): TicketDto[] {
  //   sortTickets(tickets: TicketDto[]) {
  //     tickets.forEach((ticket) => {
  //       if (!this.graph[ticket.from]) {
  //         this.graph[ticket.from] = ticket;
  //       }
  //     });
  //     // const fromMap = new Map<string, TicketDto>();
  //     // const toSet = new Set<string>();
  //     // tickets.forEach((ticket) => {
  //     //   fromMap.set(ticket.from, ticket);
  //     //   toSet.add(ticket.to);
  //     // });
  //     // let start: TicketDto | undefined = tickets.find((ticket) => {
  //     //   return !toSet.has(ticket.from);
  //     // });
  //     // if (!start) {
  //     //   new Error('No starting point found');
  //     // }
  //     // const sorted: TicketDto[] = [];
  //     // while (start && fromMap.has(start.from)) {
  //     //   const ticket = fromMap.get(start.from);
  //     //   sorted.push(ticket as TicketDto);
  //     //   start = ticket?.to ? fromMap.get(ticket.to) : undefined;
  //     // }
  //     // return sorted;
  //   }

  async mapTicketCoords(tickets: TicketDto[]) {
    try {
      const mapped = await Promise.all(
        tickets.map(async (ticket) => {
          if (ticket.type !== TransportType.OTHER) {
            const [fromCoords, toCoords] = await Promise.all([
              getCoordinates(ticket.from),
              getCoordinates(ticket.to),
            ]);
            return {
              ...ticket,
              coords: {
                from: [fromCoords.latitude, fromCoords.longitude],
                to: [toCoords.latitude, toCoords.longitude],
              },
            };
          }
          return ticket;
        }),
      );
      return mapped;
    } catch (error) {
      console.log('Error mapping coordinates:', error);
      throw new Error('Error fetching coordinates');
    }
  }
}

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { ItineraryService } from './itinerary.service';
import { Repository } from 'typeorm';
import { Itinerary } from './entities/Itinerary.entity';
import { TicketDto } from './dto/ticket.dto';
import { v4 as uuid } from 'uuid';
import { TransportType } from './dto/base-ticket.dto';

describe('ItineraryService', () => {
  let service: ItineraryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItineraryService],
    }).compile();

    service = module.get<ItineraryService>(ItineraryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
describe('ItineraryService - createItinerary', () => {
  let service: ItineraryService;
  let itineraryRepo: Repository<Itinerary>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItineraryService,
        {
          provide: Repository,
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ItineraryService>(ItineraryService);
    itineraryRepo = module.get<Repository<Itinerary>>(Repository);
  });

  it('should create and save an itinerary', async () => {
    const tickets: TicketDto[] = [
      { from: 'A', to: 'B', type: TransportType.OTHER, isOrigin: true },
      { from: 'B', to: 'C', type: TransportType.TRAM, isOrigin: false },
    ];
    const sortedTickets = [
      { from: 'A', to: 'B', isOrigin: true, type: TransportType.OTHER },
      { from: 'B', to: 'C', isOrigin: false, type: TransportType.TRAIN },
    ];
    const itineraryId = `itinerary-${uuid().slice(uuid().length - 6, uuid().length - 1)}`;
    const createdAt = new Date();

    jest.spyOn(service, 'orderItinerary').mockReturnValue(sortedTickets);
    jest.spyOn(itineraryRepo, 'create').mockReturnValue({
      id: itineraryId,
      sorted: sortedTickets,
      createdAt,
    } as unknown as Itinerary);
    jest.spyOn(itineraryRepo, 'save').mockResolvedValue(undefined);

    const result = await service.createItinerary(tickets);

    expect(service.orderItinerary).toHaveBeenCalledWith(tickets);
    expect(itineraryRepo.create).toHaveBeenCalledWith({
      id: itineraryId,
      sorted: sortedTickets,
      createdAt: expect.any(Date),
    });
    expect(itineraryRepo.save).toHaveBeenCalledWith({
      id: itineraryId,
      sorted: sortedTickets,
      createdAt: expect.any(Date),
    });
    expect(result).toEqual({
      id: itineraryId,
      sorted: sortedTickets,
      createdAt,
    });
  });
});

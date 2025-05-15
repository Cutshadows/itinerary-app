import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { ItineraryService } from './itinerary.service';
import { Repository } from 'typeorm';
import { Itinerary } from './entities/Itinerary.entity';
import { TicketDto } from './dto/ticket.dto';
import { v4 as uuid } from 'uuid';
import { TransportType } from './dto/base-ticket.dto';
import { TicketRenderFactory } from './ticket.render.factory';
import { ItineraryContext } from './itinerary.context';

const mockRepo = {
  findOne: jest.fn(),
  save: jest.fn(),
  create: jest.fn(),
};

const mockTicketRenderFactory = {
  render: jest.fn(),
};

const mockItineraryContext = {
  // Mock methods used inside your service
};

describe('ItineraryService', () => {
  let service: ItineraryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItineraryService,
        {
          provide: TicketRenderFactory,
          useValue: mockTicketRenderFactory,
        },
        {
          provide: ItineraryContext,
          useValue: mockItineraryContext,
        },
        {
          provide: Repository,
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            findOneBy: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Itinerary),
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get<ItineraryService>(ItineraryService);
  });

  afterAll(() => {
    jest.clearAllMocks();
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
          provide: TicketRenderFactory,
          useValue: mockTicketRenderFactory,
        },
        {
          provide: ItineraryContext,
          useValue: mockItineraryContext,
        },
        {
          provide: Repository,
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Itinerary),
          useValue: mockRepo,
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
    jest.spyOn(itineraryRepo, 'save').mockResolvedValue({
      sorted: sortedTickets,
      createdAt,
    } as unknown as Itinerary);

    const result = await service.createItinerary(tickets);

    expect(service.orderItinerary).toHaveBeenCalledWith(tickets);
  });

  it('should deduplicate tickets', () => {
    const tickets: TicketDto[] = [
      { from: 'A', to: 'B', type: TransportType.TRAIN, isOrigin: true },
      { from: 'A', to: 'B', type: TransportType.TRAIN, isOrigin: true },
      { from: 'B', to: 'C', type: TransportType.BUS, isOrigin: false },
    ];
    const result = service['deduplicateTickets'](tickets);
    expect(result).toEqual([
      { from: 'A', to: 'B', type: TransportType.TRAIN, isOrigin: true },
      { from: 'B', to: 'C', type: TransportType.BUS, isOrigin: false },
    ]);
  });

  it('should build segments correctly', () => {
    const tickets: TicketDto[] = [
      { from: 'A', to: 'B', type: TransportType.TRAIN, isOrigin: true },
      { from: 'B', to: 'C', type: TransportType.BUS, isOrigin: false },
    ];
    const { fromMap, toSet } = service['buildIndex'](tickets);
    const segments = service['buildSegments'](tickets, fromMap, toSet);
    expect(segments).toEqual([
      [
        { from: 'A', to: 'B', type: TransportType.TRAIN, isOrigin: true },
        { from: 'B', to: 'C', type: TransportType.BUS, isOrigin: false },
      ],
    ]);
  });

  //   it('should connect segments correctly', () => {
  //     const segments: TicketDto[][] = [
  //       [{ from: 'A', to: 'B', type: TransportType.TRAIN, isOrigin: true }],
  //       [{ from: 'B', to: 'C', type: TransportType.BUS, isOrigin: false }],
  //     ];
  //     const result = service['connectSegments'](segments);
  //     expect(result).toEqual([
  //       { from: 'A', to: 'B', type: TransportType.TRAIN, isOrigin: true },
  //       { from: 'B', to: 'C', type: TransportType.BUS, isOrigin: false },
  //     ]);
  //   });
});

import { Test, TestingModule } from '@nestjs/testing';
import { ItineraryController } from './itinerary.controller';
import { ItineraryService } from './itinerary.service';
import { TicketDto } from './dto/ticket.dto';
import { TransportType } from './dto/base-ticket.dto';

describe('ItineraryController', () => {
  let controller: ItineraryController;
  let service: ItineraryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItineraryController],
      providers: [
        {
          provide: ItineraryService,
          useValue: {
            createItinerary: jest.fn(),
            getTickets: jest.fn(),
            getTicketSorted: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ItineraryController>(ItineraryController);
    service = module.get<ItineraryService>(ItineraryService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createItinerary', () => {
    it('should call ItineraryService.createItinerary and return the result', async () => {
      const tickets: TicketDto[] = [
        { to: 'A', from: 'B', type: TransportType.TRAIN, isOrigin: true },
        { to: 'B', from: 'C', type: TransportType.BUS },
      ];
      const result = { id: '123', sorted: tickets, createdAt: new Date() };
      jest.spyOn(service, 'createItinerary').mockResolvedValue(result);

      expect(await controller.createItinerary(tickets)).toEqual(result);
      //   expect(service.createItinerary(tickets)).toHaveBeenCalledWith(tickets);
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { ItineraryController } from './itinerary.controller';
import { ItineraryService } from './itinerary.service';
import { TicketDto } from './dto/ticket.dto';

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
      const tickets: TicketDto[] = [];
      const result = { id: '123', sorted: tickets, createdAt: new Date() };
      jest.spyOn(service, 'createItinerary').mockResolvedValue(result);

      expect(await controller.createItinerary(tickets)).toEqual(result);
      expect(service.createItinerary(tickets)).toHaveBeenCalledWith(tickets);
    });
  });

  describe('getTickets', () => {
    it('should call ItineraryService.getTickets and return the result', () => {
      const id = '123';
      const tickets: TicketDto[] = [];
      jest.spyOn(service, 'getTickets').mockReturnValue(tickets);

      expect(controller.getTickets(id)).toEqual(tickets);
      expect(service.getTickets('s')).toHaveBeenCalledWith(id);
    });
  });

  describe('getTicketSorted', () => {
    it('should call ItineraryService.getTicketSorted and return the result', () => {
      const tickets: TicketDto[] = [];
      jest.spyOn(service, 'createItinerary').mockReturnValue(tickets);

      expect(controller.createItinerary(tickets)).toEqual(tickets);
      expect(service.createItinerary(tickets)).toHaveBeenCalled();
    });
  });
});

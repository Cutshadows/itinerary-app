import { ItineraryContext } from './itinerary.context';
import { TransportStrategy } from './interfaces/transport-interface.strategy';
import { TicketDto } from './dto/ticket.dto';
import { TransportType } from './dto/base-ticket.dto';

describe('ItineraryContext', () => {
  let itineraryContext: ItineraryContext;
  let mockStrategy: TransportStrategy;

  beforeEach(() => {
    itineraryContext = new ItineraryContext();
    mockStrategy = {
      render: jest.fn(),
    };
  });

  it('should throw an error if render is called without setting a strategy', () => {
    const ticket: TicketDto = {
      from: 'A',
      to: 'B',
      type: TransportType.BUS,
      licensePlate: 'AB123',
    };

    expect(() => itineraryContext.render(ticket)).toThrowError(
      'Itinerary strategy not set.',
    );
  });

  it('should call the render method of the strategy when a strategy is set', () => {
    const ticket: TicketDto = {
      from: 'A',
      to: 'B',
      type: TransportType.TRAIN,
      trainNumber: 'AB123',
    };
    const mockRenderResult = 'Rendered Ticket';
    mockStrategy.render = jest.fn().mockReturnValue(mockRenderResult);

    itineraryContext.setStrategy(mockStrategy);
    const result = itineraryContext.render(ticket);

    expect(mockStrategy.render).toHaveBeenCalledWith(ticket);
    expect(result).toBe(mockRenderResult);
  });

  it('should allow setting a new strategy and use it for rendering', () => {
    const ticket: TicketDto = {
      from: 'A',
      to: 'B',
      type: TransportType.TRAIN,
      trainNumber: 'AB123',
    };
    const newMockStrategy: TransportStrategy = {
      render: jest.fn().mockReturnValue('New Rendered Ticket'),
    };

    itineraryContext.setStrategy(mockStrategy);
    itineraryContext.setStrategy(newMockStrategy);
    const result = itineraryContext.render(ticket);

    expect(newMockStrategy.render).toHaveBeenCalledWith(ticket);
    expect(result).toBe('New Rendered Ticket');
  });
});

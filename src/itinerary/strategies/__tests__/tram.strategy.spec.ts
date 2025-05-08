import { TransportType } from '../../../itinerary/dto/base-ticket.dto';
import { TramTicketDto } from '../../../itinerary/dto/tram-ticket.dto';
import { TramStrategy } from '../tram.strategy';

describe('TramStrategy', () => {
  let strategy: TramStrategy;

  beforeEach(() => {
    strategy = new TramStrategy();
  });

  it('should return tram tickets', () => {
    const tramTicket = {
      from: 'A',
      to: 'B',
      tramNumber: 'AB123',
      type: TransportType.TRAM,
    } as unknown as TramTicketDto;
    const tickets = strategy.render(tramTicket);
    expect(tickets).toEqual('Board AB123, from A to B.');
  });
});

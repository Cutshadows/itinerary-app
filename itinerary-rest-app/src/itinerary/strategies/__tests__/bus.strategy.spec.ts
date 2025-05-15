import { TransportType } from '../../../itinerary/dto/base-ticket.dto';
import { BusTicketDto } from '../../../itinerary/dto/bus-ticket.dto';
import { BusStrategy } from '../bus.strategy';

describe('BusStrategy', () => {
  let strategy: BusStrategy;

  beforeEach(() => {
    strategy = new BusStrategy();
  });

  it('should return bus tickets', () => {
    const busTicket = {
      from: 'A',
      to: 'B',
      seat: 'G1',
      identifier: 'AB123',
      type: TransportType.BUS,
    } as unknown as BusTicketDto;
    const tickets = strategy.render(busTicket);
    expect(tickets).toEqual('Board AB123 from A to B. In seat G1.');
  });
});

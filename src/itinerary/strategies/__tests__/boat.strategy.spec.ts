import { TransportType } from '../../../itinerary/dto/base-ticket.dto';
import { BoatStrategy } from '../boat.strategy';
import { BoatTicketDto } from 'src/itinerary/dto/boat-ticket.dto';

describe('BoatStrategy', () => {
  let strategy: BoatStrategy;

  beforeEach(() => {
    strategy = new BoatStrategy();
  });

  it('should return airplane tickets', () => {
    const boatTicket = {
      from: 'A',
      to: 'B',
      boatNumber: 'AB123',
      type: TransportType.BOAT,
      ticketClass: 'First Class',
      cabinNumber: 'G1',
    } as unknown as BoatTicketDto;
    const tickets = strategy.render(boatTicket);
    expect(tickets).toEqual(
      'From A, board the boat AB123 to B. In the cabin G1.',
    );
  });
});

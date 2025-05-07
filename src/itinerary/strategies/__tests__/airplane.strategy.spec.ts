import { TransportType } from '../../../itinerary/dto/base-ticket.dto';
import { AirPlaneStrategy } from '../airplane.strategy';

describe('AirPlaneStrategy', () => {
  let strategy: AirPlaneStrategy;

  beforeEach(() => {
    strategy = new AirPlaneStrategy();
  });

  it('should return airplane tickets', () => {
    const boatTicket = {
      from: 'A',
      to: 'B',
      flightNumber: 'AB123',
      seat: 'G1',
      gate: 10,
      observation: 'No observation',
      type: TransportType.AIRPLANE,
    };
    const tickets = strategy.render(boatTicket);
    expect(tickets).toEqual(
      'From A, board the flight AB123 to B.From gate 10, seat G1. No observation.',
    );
  });
});

import { AirPlaneStrategy } from '../airplane.strategy';

describe('AirPlaneStrategy', () => {
  let strategy: AirPlaneStrategy;

  beforeEach(() => {
    strategy = new AirPlaneStrategy();
  });

  it('should return airplane tickets', () => {
    const tickets = strategy.getTickets();
    expect(tickets).toEqual(['Boat Ticket #1', 'Boat Ticket #2']);
  });
});

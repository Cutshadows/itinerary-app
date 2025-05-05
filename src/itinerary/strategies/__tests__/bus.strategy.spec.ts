import { BusStrategy } from '../bus.strategy';

describe('BusStrategy', () => {
  let strategy: BusStrategy;

  beforeEach(() => {
    strategy = new BusStrategy();
  });

  it('should return bus tickets', () => {
    const tickets = strategy.getTickets();
    expect(tickets).toEqual(['Boat Ticket #1', 'Boat Ticket #2']);
  });
});

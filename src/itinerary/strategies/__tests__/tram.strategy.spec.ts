import { TramStrategy } from '../tram.strategy';

describe('TramStrategy', () => {
  let strategy: TramStrategy;

  beforeEach(() => {
    strategy = new TramStrategy();
  });

  it('should return boat tickets', () => {
    const tickets = strategy.getTickets();
    expect(tickets).toEqual(['Boat Ticket #1', 'Boat Ticket #2']);
  });
});

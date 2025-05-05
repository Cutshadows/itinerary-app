import { TaxiStrategy } from '../taxi.strategy';

describe('TaxiStrategy', () => {
  let strategy: TaxiStrategy;

  beforeEach(() => {
    strategy = new TaxiStrategy();
  });

  it('should return boat tickets', () => {
    // const tickets = strategy.getTickets();
    // expect(tickets).toEqual(['Boat Ticket #1', 'Boat Ticket #2']);
  });
});

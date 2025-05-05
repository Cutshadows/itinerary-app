import { TrainStrategy } from '../train.strategy';

describe('BoatStrategy', () => {
  let strategy: TrainStrategy;

  beforeEach(() => {
    strategy = new TrainStrategy();
  });

  it('should return train ticket', () => {
    const tickets = strategy.getTickets();
    expect(tickets).toEqual(['Boat Ticket #1', 'Boat Ticket #2']);
  });
});

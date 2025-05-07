import { TrainTicketDto } from 'src/itinerary/dto/train-ticket.dto';
import { TransportType } from '../../../itinerary/dto/base-ticket.dto';
import { TrainStrategy } from '../train.strategy';

describe('TrainStrategy', () => {
  let strategy: TrainStrategy;

  beforeEach(() => {
    strategy = new TrainStrategy();
  });

  it('should return train ticket', () => {
    const trainTicket = {
      from: 'A',
      to: 'B',
      seat: 'G1',
      trainNumber: 'AB123',
      platform: 10,
      observation: 'No observation',
      type: TransportType.AIRPLANE,
    } as unknown as TrainTicketDto;
    const tickets = strategy.render(trainTicket);
    expect(tickets).toEqual(
      'Board AB123, Platform 10 from A to B.seat number G1.',
    );
  });
});

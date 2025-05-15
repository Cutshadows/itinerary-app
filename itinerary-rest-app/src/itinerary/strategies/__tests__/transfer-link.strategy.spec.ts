import { TransferLinkDto } from 'src/itinerary/dto/transfer-link.dto';
import { TransportType } from '../../../itinerary/dto/base-ticket.dto';
import { TranferLinkStrategy } from '../transfer-link.strategy';

describe('TransferLink', () => {
  let strategy: TranferLinkStrategy;

  beforeEach(() => {
    strategy = new TranferLinkStrategy();
  });

  it('should return transferLink tickets', () => {
    const transferLinkTicket = {
      from: 'A',
      to: 'B',
      type: TransportType.TRANFER_LINK,
      licensePlate: 'AB123',
      departureTime: new Date(),
      arrivalTime: new Date(),
    } as unknown as TransferLinkDto;
    const tickets = strategy.render(transferLinkTicket);
    expect(tickets).toEqual('Take the transfer AB123, from A to B.');
  });
});

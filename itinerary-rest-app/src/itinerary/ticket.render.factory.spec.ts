import { Test, TestingModule } from '@nestjs/testing';
import { TicketRenderFactory } from './ticket.render.factory';
import { ItineraryContext } from './itinerary.context';
import { AirPlaneStrategy } from './strategies/airplane.strategy';
import { BoatStrategy } from './strategies/boat.strategy';
import { BusStrategy } from './strategies/bus.strategy';
import { TrainStrategy } from './strategies/train.strategy';
import { TramStrategy } from './strategies/tram.strategy';
import { TaxiStrategy } from './strategies/taxi.strategy';
import { TranferLinkStrategy } from './strategies/transfer-link.strategy';
import { TransportType } from './dto/base-ticket.dto';
import { TicketDto } from './dto/ticket.dto';

describe('TicketRenderFactory', () => {
  let factory: TicketRenderFactory;
  let context: ItineraryContext;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TicketRenderFactory,
        ItineraryContext,
        AirPlaneStrategy,
        BoatStrategy,
        BusStrategy,
        TrainStrategy,
        TramStrategy,
        TaxiStrategy,
        TranferLinkStrategy,
      ],
    }).compile();

    factory = module.get<TicketRenderFactory>(TicketRenderFactory);
    context = module.get<ItineraryContext>(ItineraryContext);
  });

  it('should create airplane ticket render', () => {
    const ticket: TicketDto = {
      flightNumber: 'asd',
      type: TransportType.AIRPLANE,
      to: 'A',
      from: 'B',
    };
    const render = factory.createTicketRender(TransportType.AIRPLANE);
    jest.spyOn(context, 'setStrategy');
    jest.spyOn(context, 'render').mockReturnValue('Airplane Ticket Rendered');

    const result = render(ticket);

    expect(context.setStrategy).toHaveBeenCalledWith(
      expect.any(AirPlaneStrategy),
    );
    expect(context.render).toHaveBeenCalledWith(ticket);
    expect(result).toBe('Airplane Ticket Rendered');
  });

  it('should create boat ticket render', () => {
    const ticket: TicketDto = {
      boatNumber: 'as23',
      to: 'A',
      from: 'B',
      type: TransportType.BOAT,
    };
    const render = factory.createTicketRender(TransportType.BOAT);
    jest.spyOn(context, 'setStrategy');
    jest.spyOn(context, 'render').mockReturnValue('Boat Ticket Rendered');

    const result = render(ticket);

    expect(context.setStrategy).toHaveBeenCalledWith(expect.any(BoatStrategy));
    expect(context.render).toHaveBeenCalledWith(ticket);
    expect(result).toBe('Boat Ticket Rendered');
  });

  it('should throw an error for unknown ticket type', () => {
    expect(() =>
      factory.createTicketRender('UNKNOWN' as TransportType),
    ).toThrowError('Unknown ticket type');
  });

  it('should create bus ticket render', () => {
    const ticket: TicketDto = { to: 'A', from: 'B', type: TransportType.BUS };
    const render = factory.createTicketRender(TransportType.BUS);
    jest.spyOn(context, 'setStrategy');
    jest.spyOn(context, 'render').mockReturnValue('Bus Ticket Rendered');

    const result = render(ticket);

    expect(context.setStrategy).toHaveBeenCalledWith(expect.any(BusStrategy));
    expect(context.render).toHaveBeenCalledWith(ticket);
    expect(result).toBe('Bus Ticket Rendered');
  });

  it('should create train ticket render', () => {
    const ticket: TicketDto = {
      trainNumber: 'asd',
      platform: '12',
      to: 'A',
      from: 'B',
      type: TransportType.TRAIN,
    };
    const render = factory.createTicketRender(TransportType.TRAIN);
    jest.spyOn(context, 'setStrategy');
    jest.spyOn(context, 'render').mockReturnValue('Train Ticket Rendered');

    const result = render(ticket);

    expect(context.setStrategy).toHaveBeenCalledWith(expect.any(TrainStrategy));
    expect(context.render).toHaveBeenCalledWith(ticket);
    expect(result).toBe('Train Ticket Rendered');
  });

  it('should create tram ticket render', () => {
    const ticket: TicketDto = {
      tramNumber: '12',
      to: 'A',
      from: 'B',
      type: TransportType.TRAM,
    };
    const render = factory.createTicketRender(TransportType.TRAM);
    jest.spyOn(context, 'setStrategy');
    jest.spyOn(context, 'render').mockReturnValue('Tram Ticket Rendered');

    const result = render(ticket);

    expect(context.setStrategy).toHaveBeenCalledWith(expect.any(TramStrategy));
    expect(context.render).toHaveBeenCalledWith(ticket);
    expect(result).toBe('Tram Ticket Rendered');
  });

  it('should create taxi ticket render', () => {
    const ticket: TicketDto = {
      licensePlate: 'asd',
      driverName: 'Juan',
      type: TransportType.TAXI,
      to: 'A',
      from: 'B',
    };
    const render = factory.createTicketRender(TransportType.TAXI);
    jest.spyOn(context, 'setStrategy');
    jest.spyOn(context, 'render').mockReturnValue('Taxi Ticket Rendered');

    const result = render(ticket);

    expect(context.setStrategy).toHaveBeenCalledWith(expect.any(TaxiStrategy));
    expect(context.render).toHaveBeenCalledWith(ticket);
    expect(result).toBe('Taxi Ticket Rendered');
  });

  it('should create transfer link ticket render', () => {
    const ticket: TicketDto = {
      driverName: 'Joan',
      licensePlate: 'dasd',
      to: 'A',
      from: 'B',
      type: TransportType.TRANFER_LINK,
    };
    const render = factory.createTicketRender(TransportType.TRANFER_LINK);
    jest.spyOn(context, 'setStrategy');
    jest
      .spyOn(context, 'render')
      .mockReturnValue('Transfer Link Ticket Rendered');

    const result = render(ticket);

    expect(context.setStrategy).toHaveBeenCalledWith(
      expect.any(TranferLinkStrategy),
    );
    expect(context.render).toHaveBeenCalledWith(ticket);
    expect(result).toBe('Transfer Link Ticket Rendered');
  });
});

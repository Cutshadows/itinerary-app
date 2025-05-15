import {
  IAirplaneTicket,
  IBaseTicket,
  IBoatTicket,
  IBusTicket,
  ITaxiTicket,
  ITrainTicket,
  ITramTicket,
  ITransferLink,
} from '../interfaces/ticket.interface';

export type Ticket =
  | IBaseTicket
  | IAirplaneTicket
  | ITrainTicket
  | ITramTicket
  | ITaxiTicket
  | IBusTicket
  | ITransferLink
  | IBoatTicket;

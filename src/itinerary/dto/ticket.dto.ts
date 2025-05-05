import { AirplaneTicketDto } from './airplane-ticket.dto';
import { BoatTicketDto } from './boat-ticket.dto';
import { BusTicketDto } from './bus-ticket.dto';
import { TaxiTicketDto } from './taxi-ticket.dto';
import { TrainTicketDto } from './train-ticket.dto';
import { TramTicketDto } from './tram-ticket.dto';

export type TicketDto =
  | AirplaneTicketDto
  | TrainTicketDto
  | TramTicketDto
  | BoatTicketDto
  | TaxiTicketDto
  | BusTicketDto;

import { AirplaneTicketDto } from './airplane-ticket.dto';
import { BaseTicketDto } from './base-ticket.dto';
import { BoatTicketDto } from './boat-ticket.dto';
import { BusTicketDto } from './bus-ticket.dto';
import { TaxiTicketDto } from './taxi-ticket.dto';
import { TrainTicketDto } from './train-ticket.dto';
import { TramTicketDto } from './tram-ticket.dto';
import { TransferLinkDto } from './transfer-link.dto';

export type TicketDto =
  | BaseTicketDto
  | AirplaneTicketDto
  | TrainTicketDto
  | TramTicketDto
  | BoatTicketDto
  | TaxiTicketDto
  | TransferLinkDto
  | BusTicketDto;

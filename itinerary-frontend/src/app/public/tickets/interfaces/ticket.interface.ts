export enum TransportType {
  AIRPLANE = 'airplane',
  TRAIN = 'train',
  TRAM = 'tram',
  BUS = 'bus',
  BOAT = 'boat',
  TAXI = 'taxi',
  TRANFER_LINK = 'implicit-transfer',
  OTHER = 'other',
}
export interface IBaseTicket {
  from: string;
  to: string;
  type: TransportType;
  isOrigin?: boolean;
}

export interface IAirplaneTicket extends IBaseTicket {
  gate: number;
  seat?: string;
  observation?: string;
  flightNumber: string;
}

export interface ITrainTicket extends IBaseTicket {
  seat: string;
  trainNumber: string;
  platform: string;
}
export interface ITramTicket extends IBaseTicket {
  tramNumber: string;
}

export interface IBoatTicket extends IBaseTicket {
  boatNumber: string;
  ticketClass: string;
  cabinNumber: string;
}

export interface ITaxiTicket extends IBaseTicket {
  driverName: string;
  licensePlate: string;
}
export interface ITransferLink extends IBaseTicket {
  driverName: string;
  licensePlate: string;
}
export interface IBusTicket extends IBaseTicket {
  identifier: string;
  seat?: string;
}

export interface TicketDto extends IBaseTicket {
  id?: string;
}

import { TicketDto } from '../dto/ticket.dto';

export interface TransportStrategy {
  render(ticket: TicketDto): string;
}

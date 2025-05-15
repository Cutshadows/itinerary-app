import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TicketDto } from '../../public/tickets/interfaces/ticket.interface';
import { Observable } from 'rxjs';
import { Itinerary } from '../../public/itinerary/types/itinerary.type';

@Injectable({
  providedIn: 'root',
})
export class ItineraryService {
  constructor(private http: HttpClient) {}
  getSortedTickets(id: string): Observable<Itinerary> {
    return this.http.get<Itinerary>(`/itinerary/${id}`);
  }
}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ItineraryService } from '../../core/services/itinerary.service';
import { Itinerary } from './types/itinerary.type';

@Component({
  selector: 'app-itinerary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './itinerary.component.html',
  styleUrl: './itinerary.component.scss',
})
export class ItineraryComponent implements OnInit {
  itinerary: Itinerary | undefined = undefined;
  isLoading: boolean = true;

  constructor(private _service: ItineraryService) {}
  ngOnInit(): void {
    const ticketId = '5ad1b';
    this._service.getSortedTickets(`itinerary-${ticketId}`).subscribe({
      next: (itinerary: Itinerary) => {
        this.itinerary = itinerary;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
      },
    });
  }
  addTask() {
    console.log('Task added');
  }

  removeTask(id: number) {}
}

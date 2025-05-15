import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TicketsComponent } from './public/tickets/tickets.component';
import { ItineraryComponent } from './public/itinerary/itinerary.component';
import { TabsComponent } from './public/tabs/tabs.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule, TabsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'itinerary';
  currentComponent: 'itinerary' | 'tickets' = 'tickets';
}

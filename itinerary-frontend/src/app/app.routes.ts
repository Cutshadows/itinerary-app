import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Itinerary',
    pathMatch: 'full',

    loadComponent: () =>
      import('./public/itinerary/itinerary.component').then(
        (m) => m.ItineraryComponent
      ),
  },
];

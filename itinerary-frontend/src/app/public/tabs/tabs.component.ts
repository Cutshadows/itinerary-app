import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { DynamicHostDirective } from '../../core/directive/dynamic-host.directive';
import { ItineraryComponent } from '../itinerary/itinerary.component';
import { TicketsComponent } from '../tickets/tickets.component';

@Component({
  selector: 'app-tabs',
  standalone: true,
  template: ` <ng-template #dynamicHost></ng-template>`,
})
export class TabsComponent implements AfterViewInit, OnChanges {
  @Input('componentType') componentType!: string;

  title = 'itinerary';

  @ViewChild('dynamicHost', { read: ViewContainerRef, static: true })
  viewContainerRef!: ViewContainerRef;

  ngAfterViewInit(): void {
    this.viewContainerRef.clear();
    this.viewContainerRef.createComponent(TicketsComponent);
  }

  ngOnChanges(): void {
    this.viewContainerRef.clear();
    if (this.componentType === 'itinerary') {
      this.viewContainerRef.createComponent(ItineraryComponent);
    } else if (this.componentType === 'tickets') {
      this.viewContainerRef.createComponent(TicketsComponent);
    }
  }
}

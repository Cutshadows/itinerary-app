import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Ticket } from './types/ticket.type';
import { TransportType } from './interfaces/ticket.interface';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.scss',
})
export class TicketsComponent implements OnInit {
  @Input() tickets: Ticket[] = [];
  private formBuilder = inject(FormBuilder);
  transportTypes: string[] = Array.from(Object.keys(TransportType));

  form: FormGroup;

  baseTicketForm = this.formBuilder.group({
    from: ['', Validators.required],
    to: ['', Validators.required],
    type: ['', Validators.required],
    isOrigin: false,
  });

  constructor() {
    this.form = this.formBuilder.group({
      tickets: this.formBuilder.array([this.createTicketForm()]),
    });
  }
  ngOnInit(): void {
    this.tickets.forEach((ticket) => {
      this.ticketForms.push(this.createTicketForm());
    });
  }

  createTicketForm(): FormGroup {
    return this.baseTicketForm;
  }
  addTicketForm() {
    this.ticketForms.push(this.createTicketForm());
  }

  removeTicket(index: number): void {
    // this.tickets.(index);
  }

  get ticketForms() {
    return this.form.get('tickets') as FormArray;
  }

  onSubmit() {}
}

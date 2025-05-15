import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
	selector: 'app-confirm-dialog',
	standalone: true,
	imports: [CommonModule],
	template: `
		<h1 mat-dialog-title>Confirm User Creation</h1>
		<div mat-dialog-content>
			<p>
				The user with email "{{ data.email }}" does not exist. Do you
				want to create it?
			</p>
		</div>
		<div mat-dialog-actions>
			<button mat-button (click)="onCancel()">Cancel</button>
			<button mat-button (click)="onConfirm()">Confirm</button>
		</div>
	`,
})
export class ConfirmDialogComponent {
	@Input() email = '';
	@Output() confirm = new EventEmitter<void>();
	@Output() cancel = new EventEmitter<void>();
	constructor(
		public dialogRef: MatDialogRef<ConfirmDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: { email: string }
	) {}

	onCancel(): void {
		this.dialogRef.close(false);
	}

	onConfirm(): void {
		this.dialogRef.close(true);
	}
}

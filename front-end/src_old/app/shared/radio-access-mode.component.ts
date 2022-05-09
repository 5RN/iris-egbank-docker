import {Component, Output, EventEmitter} from '@angular/core';

/**
 * @title Radios with ngModel
 */
@Component({
  selector: 'mode-of-access-radio',
  template: `
    <label class="radio-label" id="radio-group-label">
        My preferred form of access is:
    </label>
    <mat-radio-group
        aria-labelledby="radio-group-label"
        class="radio-group"
        [(ngModel)]="accessModeOption"
        (change)="sendMessage()">
    <mat-radio-button class="radio-button"
      *ngFor="let option of accessModeOptions"
      [value]="option">
        {{option}}
    </mat-radio-button>
    </mat-radio-group>
`
//<div>Your access choice is: {{accessModeOption}}</div>
//`
})
export class ModeOfAccessRadioButtonComponent {
  accessModeOption: string;
  accessModeOptions: string[] = ['Receive copies of record by post', 'Other - please specify'];

  @Output() messageEvent = new EventEmitter<string>();

  constructor() { }

  sendMessage() {
    this.messageEvent.emit(this.accessModeOption)
  }
}

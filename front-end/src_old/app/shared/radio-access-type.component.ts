import {Component, Output, EventEmitter} from '@angular/core';

/**
 * @title Radios with ngModel
 */
@Component({
  selector: 'type-of-access-radio',
  template: `
    <label class="radio-label" id="radio-group-label">
        In accordance with Section 12 of the FOI Act, I request access to records which
        are:
    </label>
    <mat-radio-group
        aria-labelledby="radio-group-label"
        class="radio-group"
        [(ngModel)]="selectedOption"
        (chage)="sendMessage($event)">
    <mat-radio-button class="radio-button"
      *ngFor="let accessOption of accessOptions"
      [value]="accessOption">
        {{accessOption}}
    </mat-radio-button>
    </mat-radio-group>
`
//<div>Your access choice is: {{selectedOption}}</div>
//`
})
export class TypeOfAccessRadioButtonComponent {
  selectedOption: string;
  accessOptions: string[] = ['Personal', 'Non-personal'];
  @Output() messageEvent = new EventEmitter<string>();

  constructor() { }

  sendMessage(e) {
    this.messageEvent.emit(this.selectedOption)
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DoJE FOI Service';
  displayUIMessage = new Boolean(false);

  displayMessge() {
    this.displayUIMessage = true;
  }

  hideMessge() {
    this.displayUIMessage = false;
  }
}

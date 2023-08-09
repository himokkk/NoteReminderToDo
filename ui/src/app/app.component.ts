import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ui';
  selectedOption: number = 1;

  selectOption(option: number) {
    this.selectedOption = option;
  }
}

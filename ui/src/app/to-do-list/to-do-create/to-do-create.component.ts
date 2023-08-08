import {Component, EventEmitter, Output} from '@angular/core';
import ToDo from "../models/todo";

@Component({
  selector: 'app-to-do-create',
  templateUrl: './to-do-create.component.html',
  styleUrls: ['./to-do-create.component.css']
})
export class ToDoCreateComponent {
  @Output("performCreateToDo") performCreateToDo: EventEmitter<string> = new EventEmitter();

  text: string = "";
  createToDo() {
      this.performCreateToDo.emit(this.text);
  }
}

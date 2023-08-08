import {Component, EventEmitter, Input, Output} from '@angular/core';
import ToDo from "../models/todo";

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})
export class ToDoComponent {
  @Input("toDo") toDo: ToDo | null = null;
  @Output("updateIsDone") updateIsDone: EventEmitter<ToDo> = new EventEmitter();
  @Output("deleteToDo") deleteToDo: EventEmitter<ToDo> = new EventEmitter();

  toggleIsDone() {
    if (!this.toDo) {
      throw new Error('cannot toggle complete on null');
    }
    this.updateIsDone.emit({
      ...this.toDo,
      isDone: !this.toDo.isDone,
    });
  }

  deleteToDoButton() {
    if (!this.toDo) {
      throw new Error('cannot delete on null');
    }
    this.deleteToDo.emit({
      ...this.toDo,
    });
  }

}

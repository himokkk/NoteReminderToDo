import { Component } from '@angular/core';
import {ToDoService} from "./service/to-do.service";
import ToDo from "./models/todo";

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css']
})
export class ToDoListComponent {
    constructor(private readonly toDoService: ToDoService ) { }

  toDoList: Promise<ToDo[]> = this.toDoService.toDos;
  completedToDos: Promise<ToDo[]> = this.toDoService.completedToDos;
  inCompletedToDos: Promise<ToDo[]> = this.toDoService.notCompletedToDos;

  onlyCompleted: boolean = false;

  changeFilter() {
    this.onlyCompleted = !this.onlyCompleted;
  }

  performCreateToDo(text: string) {
    this.toDoService.createToDo(text);
    this.toDoList = this.toDoService.toDos;
  }

  performUpdateToDo(toDo: ToDo) {
    this.toDoService.updateToDo(toDo);
  }

  performDeleteToDo(toDo: ToDo) {
    this.toDoService.deleteToDo(toDo);
  }
}

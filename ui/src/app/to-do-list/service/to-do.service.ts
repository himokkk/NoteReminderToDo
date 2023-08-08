import {Injectable, OnDestroy} from '@angular/core';
import {firstValueFrom, Observable, Subscription} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../enviroments/enviroment";
import ToDo from "../models/todo";

@Injectable({
  providedIn: 'root'
})
export class ToDoService implements OnDestroy {
  private subscription: Subscription | null = null;
  private toDoList: ToDo[] = [];
  private completedToDoList: ToDo[] = [];
  private inCompletedToDoList: ToDo[] = [];

  // TODO replace with a get request
  toDos: Promise<ToDo[]> = Promise.resolve(this.toDoList);
  completedToDos: Promise<ToDo[]> = Promise.resolve(this.completedToDoList)
  notCompletedToDos: Promise<ToDo[]> = Promise.resolve(this.inCompletedToDoList)

  constructor(private readonly http: HttpClient) {
    this.loadToDos();
  }

  ngOnDestroy() {
    if(this.subscription)
      this.subscription.unsubscribe();
  }

  loadToDos() {
    this.subscription = this.getToDoList().subscribe((toDo: ToDo[]) => {
      toDo.forEach((toDo: ToDo)=> {
        this.toDoList.push(toDo);
        if(toDo.isDone) this.completedToDoList.push(toDo)
        else this.inCompletedToDoList.push(toDo)
      });
    });
  }

  getToDoList(): Observable<ToDo[]> {
    return this.http.get<ToDo[]>(`${environment.apiUrl}todo`)
  }

  async createToDo(text: string): Promise<ToDo> {
    const body = {"text": text}
    const response: ToDo = await firstValueFrom(this.http.post<ToDo>(
      `${environment.apiUrl}todo`, body));

    this.toDoList.push(response);
    this.inCompletedToDoList.push(response);
    return response;
  }

  async updateToDo(updatedToDo: ToDo): Promise<ToDo> {
    const foundToDo: ToDo | undefined = this.toDoList.find((toDo: ToDo): boolean => toDo.id === updatedToDo.id);
    if (!foundToDo) {
      throw new Error('toDo not found');
    }

    if(foundToDo.isDone) {
      this.completedToDoList.splice(this.completedToDoList.indexOf(foundToDo), 1)
      this.inCompletedToDoList.push(foundToDo)
    }
    else {
      this.inCompletedToDoList.splice(this.inCompletedToDoList.indexOf(foundToDo), 1)
      this.completedToDoList.push(foundToDo)
    }
    const response: ToDo = await firstValueFrom(this.http.patch<ToDo>(
      `${environment.apiUrl}todo/${updatedToDo.id}`, updatedToDo))

    Object.assign(foundToDo, response);
    return response;
  }

  async deleteToDo(deletedToDo: ToDo): Promise<void> {
    const foundToDo: ToDo | undefined = this.toDoList.find((toDo: ToDo): boolean => toDo.id === deletedToDo.id);
    if (!foundToDo) {
      throw new Error('toDo not found');
    }

    if(foundToDo.isDone)
      this.completedToDoList.splice(this.completedToDoList.indexOf(foundToDo), 1);
    else
      this.inCompletedToDoList.splice(this.inCompletedToDoList.indexOf(foundToDo), 1);

    const response: any = await firstValueFrom(this.http.delete<ToDo[]>(
      `${environment.apiUrl}todo/${deletedToDo.id}`))

    if (response === null)
      this.toDoList.splice(this.toDoList.indexOf(foundToDo), 1)
  }
}

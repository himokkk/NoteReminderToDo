import { Injectable } from '@angular/core';
import {firstValueFrom, Observable, Subscription} from "rxjs";
import {HttpClient} from "@angular/common/http";
import Note from "../models/note";
import {environment} from "../../../enviroments/enviroment";

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private subscription: Subscription | null = null;
  private noteList: Note[] = [];

  // NOTE replace with a get request
  notes: Promise<Note[]> = Promise.resolve(this.noteList);

  constructor(private readonly http: HttpClient) {
    this.loadNotes();
  }

  ngOnDestroy() {
    if(this.subscription)
      this.subscription.unsubscribe();
  }

  loadNotes() {
    this.subscription = this.getNotes().subscribe((note: Note[]) => {
      note.forEach((note: Note)=> {
        this.noteList.push(note);
      });
    });
  }

  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(`${environment.apiUrl}note`)
  }

  async createNote(text: string): Promise<Note> {
    const body = {"text": text}
    const response: Note = await firstValueFrom(this.http.post<Note>(
      `${environment.apiUrl}note`, body));

    this.noteList.push(response);
    return response;
  }

  async updateNote(updatedNote: Note): Promise<Note> {
    const foundNote: Note | undefined = this.noteList.find((note: Note): boolean => note.id === updatedNote.id);
    if (!foundNote) {
      throw new Error('note not found');
    }

    const response: Note = await firstValueFrom(this.http.put<Note>(
      `${environment.apiUrl}note/${updatedNote.id}`, updatedNote))

    Object.assign(foundNote, response);
    return response;
  }

  async deleteNote(deletedNote: Note): Promise<void> {
    const foundNote: Note | undefined = this.noteList.find((note: Note): boolean => note.id === deletedNote.id);
    if (!foundNote) {
      throw new Error('note not found');
    }

    const response: any = await firstValueFrom(this.http.delete<Note[]>(
      `${environment.apiUrl}note/${deletedNote.id}`))

    if (response === null)
      this.noteList.splice(this.noteList.indexOf(foundNote), 1)
  }
}

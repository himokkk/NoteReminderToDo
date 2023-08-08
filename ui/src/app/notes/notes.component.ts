import { Component } from '@angular/core';
import {NotesService} from "./service/notes.service";
import Note from "./models/note";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent {
  noteList: Promise<Note[]> = this.notesService.notes;

  constructor(private readonly notesService: NotesService) { }

  createNote(text: string) {
    this.notesService.createNote(text);
  }

  deleteNote(note: Note) {
    this.notesService.deleteNote(note);
  }

  updateNote(note: Note) {
    this.notesService.updateNote(note);
  }
}

import {Component, EventEmitter, Input, Output} from '@angular/core';
import Note from "../models/note";

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent {
  @Input("note") note: Note | null = null;
  @Output("deleteNote") deleteNote: EventEmitter<Note> = new EventEmitter();
  @Output("updateNote") updateNote: EventEmitter<Note> = new EventEmitter();

  editMode: boolean = false;
  editedText: string = "";

  performDeleteNote() {
    if (!this.note) {
      throw new Error('cannot delete on null');
    }
    this.deleteNote.emit({
      ...this.note,
    });
  }

  performUpdateNote() {
    if (!this.note) {
      throw new Error('cannot update on null');
    }
    this.note.text = this.editedText;
    this.updateNote.emit({
      ...this.note,
    });
    this.editMode = false;
  }

  cancelEdit() {
    this.editedText = this.note!.text;
    this.editMode = false;
  }
}

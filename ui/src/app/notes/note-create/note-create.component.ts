import {Component, EventEmitter, Input, Output} from '@angular/core';
import Note from "../models/note";

@Component({
  selector: 'app-note-create',
  templateUrl: './note-create.component.html',
  styleUrls: ['./note-create.component.css']
})
export class NoteCreateComponent {
  @Output("createNote") createNote: EventEmitter<string> = new EventEmitter();

  text: string = "";
  performCreateNote() {
    this.createNote.emit(this.text);
  }
}

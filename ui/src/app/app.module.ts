import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToDoListComponent } from './to-do-list/to-do-list.component';
import { ReminderComponent } from './reminder/reminder.component';
import { NotesComponent } from './notes/notes.component';
import { ToDoComponent } from "./to-do-list/to-do/to-do.component";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import { ToDoCreateComponent } from './to-do-list/to-do-create/to-do-create.component';
import { NoteComponent } from './notes/note/note.component';
import { NoteCreateComponent } from './notes/note-create/note-create.component';

@NgModule({
    declarations: [
        AppComponent,
        ToDoListComponent,
        ReminderComponent,
        NotesComponent,
        ToDoComponent,
        ToDoCreateComponent,
        NoteComponent,
        NoteCreateComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

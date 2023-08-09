import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToDoListComponent } from './to-do-list/to-do-list.component';
import { NotesComponent } from './notes/notes.component';
import { ToDoComponent } from "./to-do-list/to-do/to-do.component";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ToDoCreateComponent } from './to-do-list/to-do-create/to-do-create.component';
import { NoteComponent } from './notes/note/note.component';
import { NoteCreateComponent } from './notes/note-create/note-create.component';
import { RemindersComponent } from './reminders/reminders.component';
import {ReminderComponent} from "./reminders/reminder/reminder.component";
import { ReminderCreateComponent } from './reminders/reminder-create/reminder-create.component';

@NgModule({
  declarations: [
    AppComponent,
    ToDoListComponent,
    ReminderComponent,
    NotesComponent,
    ToDoComponent,
    ToDoCreateComponent,
    NoteComponent,
    NoteCreateComponent,
    RemindersComponent,
    ReminderComponent,
    ReminderCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import Reminder from "../models/reminder";

@Component({
  selector: 'app-reminder-create',
  templateUrl: './reminder-create.component.html',
  styleUrls: ['./reminder-create.component.css']
})
export class ReminderCreateComponent {
  @Output("createReminder") createReminder: EventEmitter<Reminder> = new EventEmitter();
  reminderForm: FormGroup;
  minDate: string;
  text: string = "";

  constructor(private formBuilder: FormBuilder) {
    const today: Date = new Date();
    this.minDate = today.toISOString().split('T')[0];

    this.reminderForm = this.formBuilder.group({
      text: ['', Validators.required],
      time: ['', Validators.required],
      date: ['', Validators.required]
    });
  }

  submitForm() {
    if (!this.reminderForm.valid) {
      throw new Error('invalid form');
    }
    const textControl = this.reminderForm.get('text');
    const dateControl = this.reminderForm.get('date');
    const timeControl = this.reminderForm.get('time');
    if (!this.reminderForm.valid || !textControl || !dateControl || !timeControl) {
      throw new Error('fill correctly all fields to create reminder');
    }

    const newReminder: Reminder = {
      text: textControl.value,
      reminderTime: [
        ...dateControl.value.split("-").map((part: string) => parseInt(part)),
        ...timeControl.value.split(":").map((part: string) => parseInt(part))
      ]
    };

    this.createReminder.emit(newReminder);
  }
}

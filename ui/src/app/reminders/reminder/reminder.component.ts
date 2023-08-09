import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import Reminder from "../models/reminder";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {formatHourMinute, formatYearMonthDay, formatYearMonthDayHourMinute} from "../../functions/formatDate";

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.css']
})
export class ReminderComponent implements OnChanges {
  @Input("reminder") reminder: Reminder | null = null;
  @Output("updateReminder") updateReminder: EventEmitter<Reminder> = new EventEmitter();
  @Output("deleteReminder") deleteReminder: EventEmitter<Reminder> = new EventEmitter();

  reminderForm: FormGroup;
  editMode: boolean = false;
  editedText: string = "";
  minDate: string;
  activeReminder: boolean = true;

  constructor(private formBuilder: FormBuilder) {
    const today: Date = new Date();
    this.minDate = today.toISOString().split('T')[0];

    this.reminderForm = this.formBuilder.group({
      text: ['', Validators.required],
      time: ['', Validators.required],
      date: ['', Validators.required]
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.hasOwnProperty("reminder")) {
      this.checkReminder();
    }
  }

  checkReminder = () => {
    if (!this.reminder) {
      throw new Error('cannot work on null');
    }

    const deltaTime = this.calculateTimeDifference();
    if(deltaTime < 0 || !this.activeReminder) {
      this.activeReminder = false;
      return;
    }
    if (deltaTime < 2500) {
      alert('Reminder:' + this.reminder.text);
      this.activeReminder = false;
    } else {
      setTimeout(this.checkReminder, 1000); // Check every second
    }
  };



  calculateTimeDifference() {
    if (!this.reminder) {
      throw new Error('cannot update on null');
    }
    const [year, month, day, hour, minute] = this.reminder.reminderTime;

    const currentTime = new Date().getTime();
    const reminderTime = new Date(year, month - 1, day, hour, minute).getTime();
    return reminderTime - currentTime;
  }

  performDelete() {
    if (!this.reminder) {
      throw new Error('cannot update on null');
    }
    this.activeReminder = false;
    this.deleteReminder.emit(this.reminder);
  }

  performUpdate() {
    if (!this.reminder) {
      throw new Error('cannot update on null');
    }
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
      id: this.reminder.id,
      text: textControl.value,
      reminderTime: [
        ...dateControl.value.split("-").map((part: string) => parseInt(part)),
        ...timeControl.value.split(":").map((part: string) => parseInt(part))
      ]
    };
    if(!this.activeReminder) {
      this.checkReminder();
      this.activeReminder = true;
    }
    this.updateReminder.emit({
      ...newReminder,
    });
    this.editMode = false;
  }

  enterEdit() {
    if (!this.reminder) {
      throw new Error('cannot update on null');
    }

    this.editedText = this.reminder.text;
    this.reminderForm.get('text')!.setValue(this.reminder.text);

    const [year, month, day, hour, minute] = this.reminder.reminderTime;
    this.reminderForm.get('date')!.setValue(formatYearMonthDay(year, month, day));
    this.reminderForm.get('time')!.setValue(formatHourMinute(hour, minute));

    this.editMode = true;
  }

  cancelEdit() {
    this.editedText = this.reminder!.text;
    this.editMode = false;
  }

  protected readonly formatYearMonthDayHourMinute = formatYearMonthDayHourMinute;
}

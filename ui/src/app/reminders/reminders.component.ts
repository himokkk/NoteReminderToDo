import { Component } from '@angular/core';
import {ReminderService} from "./service/reminder.service";
import Reminder from "./models/reminder";

@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.component.html',
  styleUrls: ['./reminders.component.css']
})
export class RemindersComponent {
  constructor(private readonly reminderService: ReminderService) { }

  reminders: Promise<Reminder[]> = this.reminderService.reminders;

  createReminder(reminder: Reminder) {
    this.reminderService.createReminder(reminder);
  }

  updateReminder(reminder: Reminder) {
    this.reminderService.updateReminder(reminder);
  }

  deleteReminder(reminder: Reminder) {
    this.reminderService.deleteReminder(reminder);
  }
}

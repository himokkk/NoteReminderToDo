import { Injectable } from '@angular/core';
import {firstValueFrom, Observable, Subscription} from "rxjs";

import {HttpClient} from "@angular/common/http";
import {environment} from "../../../enviroments/enviroment";
import Reminder from "../models/reminder";
import {ReminderCreateComponent} from "../reminder-create/reminder-create.component";

@Injectable({
  providedIn: 'root'
})
export class ReminderService {
  private subscription: Subscription | null = null;
  private reminderList: Reminder[] = [];
  private completedReminderList: Reminder[] = [];
  private inCompletedReminderList: Reminder[] = [];

  // REMINDER replace with a get request
  reminders: Promise<Reminder[]> = Promise.resolve(this.reminderList);
  completedReminders: Promise<Reminder[]> = Promise.resolve(this.completedReminderList)
  notCompletedReminders: Promise<Reminder[]> = Promise.resolve(this.inCompletedReminderList)

  constructor(private readonly http: HttpClient) {
    this.loadReminders();
  }

  ngOnDestroy() {
    if(this.subscription)
      this.subscription.unsubscribe();
  }

  loadReminders() {
    this.subscription = this.getReminderList().subscribe((reminder: Reminder[]) => {
      reminder.forEach((reminder: Reminder)=> {
        this.reminderList.push(reminder);
        // if(reminder.isDone) this.completedReminderList.push(reminder)
        // else this.inCompletedReminderList.push(reminder)
      });
    });
  }

  getReminderList(): Observable<Reminder[]> {
    return this.http.get<Reminder[]>(`${environment.apiUrl}reminder`)
  }

  async createReminder(reminder: Reminder): Promise<Reminder> {
    const response: Reminder = await firstValueFrom(this.http.post<Reminder>(
      `${environment.apiUrl}reminder`, reminder));

    this.reminderList.push(response);
    this.inCompletedReminderList.push(response);
    return response;
  }

  async updateReminder(updatedReminder: Reminder): Promise<Reminder> {
    const foundReminder: Reminder | undefined = this.reminderList.find((reminder: Reminder): boolean => reminder.id === updatedReminder.id);
    if (!foundReminder) {
      throw new Error('reminder not found');
    }

    // if(foundReminder.isDone) {
    //   this.completedReminderList.splice(this.completedReminderList.indexOf(foundReminder), 1)
    //   this.inCompletedReminderList.push(foundReminder)
    // }
    // else {
    //   this.inCompletedReminderList.splice(this.inCompletedReminderList.indexOf(foundReminder), 1)
    //   this.completedReminderList.push(foundReminder)
    // }

    const response: Reminder = await firstValueFrom(this.http.put<Reminder>(
      `${environment.apiUrl}reminder/${updatedReminder.id}`, updatedReminder))

    Object.assign(foundReminder, response);
    return response;
  }

  async deleteReminder(deletedReminder: Reminder): Promise<void> {
    const foundReminder: Reminder | undefined = this.reminderList.find((reminder: Reminder): boolean => reminder.id === deletedReminder.id);
    if (!foundReminder) {
      throw new Error('reminder not found');
    }

    // if(foundReminder.isDone)
    //   this.completedReminderList.splice(this.completedReminderList.indexOf(foundReminder), 1);
    // else
    //   this.inCompletedReminderList.splice(this.inCompletedReminderList.indexOf(foundReminder), 1);

    const response: any = await firstValueFrom(this.http.delete<Reminder[]>(
      `${environment.apiUrl}reminder/${deletedReminder.id}`))

    if (response === null)
      this.reminderList.splice(this.reminderList.indexOf(foundReminder), 1)
  }
}

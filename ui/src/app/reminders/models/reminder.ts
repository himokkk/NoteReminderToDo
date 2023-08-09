export default interface Reminder {
  id?: number;
  text: string;
  reminderTime: number[];
  creationDate?: Date;
  lastUpdateDate?: Date;
}

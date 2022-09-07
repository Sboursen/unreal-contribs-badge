export type DayOfWeekType = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export interface IContributionDay {
  getCommitCount: () => number;
  getDayOfWeek: () => DayOfWeekType;
  getDate: () => number;
  getMonth: () => number;
  getYear: () => number;
}
export default class ContributionDay implements IContributionDay {
  private commitCount: number
  private date: Date

  constructor(commitCount: number, stringDate: string) {
    this.commitCount = commitCount;
    this.date = new Date(stringDate);
  }

  public getCommitCount = () => this.commitCount;
  public getDayOfWeek = () => this.date.getDay() as DayOfWeekType;
  public getDate = () => this.date.getDate();
  public getMonth = () => this.date.getMonth();
  public getYear = () => this.date.getFullYear();
}

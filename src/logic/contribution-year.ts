import type { IContributionDay } from './contribution-day';
import ContributionWeek from './contribution-week';
import ContributionDay from './contribution-day';
export const DayInSeconds = 60 * 60 * 24;
export const DayInMilliseconds = 60 * 60 * 24 * 1000;
export const WEEK_IN_DAYS = 7;
export const YEAR_IN_WEEKS = 52;

export default class ContributionCard {
  private contributionArray: Array<ContributionWeek>;
  private year: number;

  constructor(contributions: Array<ContributionWeek>, year: number) {
    this.contributionArray = [...contributions];
    this.year = year;
  }

  public getContributionCard = () => this.contributionArray;

  public static readonly getEmptyContributionCard = (year: number) => {
    const firstDayOfYear = new Date(`${year}-01-01`);
    const firstDayOfWeek = new Date(
      firstDayOfYear.getMilliseconds() -
        firstDayOfYear.getDay() * DayInSeconds * 1000,
    );
    let weekArr: Array<IContributionDay> = [];
    const yearArr: Array<ContributionWeek> = [];

    let date: Date = firstDayOfWeek;
    for (let week = 0; week <= YEAR_IN_WEEKS; week++) {
      for (let weekDay = 0; weekDay < 7; weekDay++) {
        const day = ContributionDay.getEmptyContributionDay(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
        );
        weekArr.push(day);
        date = new Date(date.getMilliseconds() + DayInMilliseconds);
      }
      const contribWeek = new ContributionWeek(weekArr, week);
      yearArr.push(contribWeek);
      weekArr = [];
    }

    const contribYear = new ContributionCard(yearArr, year);
    return contribYear;
  };


}

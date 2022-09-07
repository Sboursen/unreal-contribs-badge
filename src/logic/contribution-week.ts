import type { IContributionDay } from './contribution-day';

export default class ContributionWeek {
  private contributionArray: IContributionDay[];
  private weekNumber: number;

  constructor(
    contributionArray: Array<IContributionDay>,
    weekNumber: number
  ) {
    this.weekNumber = weekNumber;
    this.contributionArray = [...contributionArray]
  }

  private validateContributionArray(contributionArray: Array<IContributionDay>): boolean {
    if (contributionArray.length !== 7) return false;
    let days = [0, 1, 2, 3, 4, 5, 6];

    for ( let i = 0; i < days.length; i++) {
      const contributionDay = contributionArray[i];
      if (contributionDay.getDayOfWeek() !== days[i]) return false;
    }

    return true;
  }

  public getContributionArray = (): IContributionDay[] => this.contributionArray;
  public getWeekNumber = (): number => this.weekNumber;
}

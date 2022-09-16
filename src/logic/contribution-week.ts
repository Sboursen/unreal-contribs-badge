export type ContributionDay = { date: Date; commitCount: number };

export default class ContributionWeek {
  private contributionWeekArray: Array<ContributionDay>;
  private currentMonth: number;

  constructor(
    contributionWeekArray: Array<ContributionDay>,
  ) {
    if (this.validContributionWeekArray(contributionWeekArray)) {
      this.contributionWeekArray = [...contributionWeekArray];
      this.currentMonth = contributionWeekArray[3].date.getMonth();
    } else {
      throw Error("The contribution array is not valid");
    }
  }

  private validContributionWeekArray(
    contributionWeekArray: Array<ContributionDay>,
  ): boolean {
    if (contributionWeekArray.length !== 7) return false;
    let days = [0, 1, 2, 3, 4, 5, 6];

    for (let i = 0; i < days.length; i++) {
      const contributionDay = contributionWeekArray[i];
      if (contributionDay.date.getDay() !== days[i]) return false;
    }
    return true;
  }

  public getCurrentMonth = () => this.currentMonth;
  public getData = () => this.contributionWeekArray;
}

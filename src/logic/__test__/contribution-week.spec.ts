import type { ContributionDay } from '../contribution-week';
import ContributionWeek from '../contribution-week';
const DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;

describe('ContributionWeek', () => {
  it('should create a contribution week instance given a valid array', () => {
    const sunday = new Date('2022-09-11');
    const contributionArray: Array<ContributionDay> = new Array(7)
      .fill(0)
      .map((_: number, index: number) => {
        const date = new Date(sunday.getTime() + DAY_IN_MILLISECONDS * index);
        const commitCount: number = 0;
        return { date, commitCount };
      });

    const contribWeek = new ContributionWeek(contributionArray);

    expect(contribWeek).toBeInstanceOf(ContributionWeek);
  });

  it('should throw an error give non valid array', () => {
    const sunday = new Date('2022-09-10');
    const contributionArray: Array<ContributionDay> = new Array(7)
      .fill(0)
      .map((_: number, index: number) => {
        const date = new Date(sunday.getTime() + DAY_IN_MILLISECONDS * index);
        const commitCount: number = 0;
        return { date, commitCount };
      });

    expect(() => {
      new ContributionWeek(contributionArray);
    }).toThrow();
  });

  it('should correctly calculate the month to which the week belongs to', () => {
    const sunday = new Date('2022-09-11');
    const contributionArray: Array<ContributionDay> = new Array(7)
      .fill(0)
      .map((_: number, index: number) => {
        const date = new Date(sunday.getTime() + DAY_IN_MILLISECONDS * index);
        const commitCount: number = 0;
        return { date, commitCount };
      });

    const contribWeek = new ContributionWeek(contributionArray);

    expect(contribWeek.getCurrentMonth()).toBe(8);
  });
});

import createDataCard from '../data-card-adapter';
import type { CreateDataCardType } from '../data-card-adapter';
import ContributionWeek from '../../logic/contribution-week';

describe('createDataCard', () => {
  it('should return an array of contribution weeks with real data if the response is valid', () => {
    const { user, year } = {
      user: {
        createdAt: '2019-06-12T08:56:11Z',
        isHireable: true,
        contributionsCollection: {
          contributionCalendar: {
            totalContributions: 358,
            weeks: [
              {
                contributionDays: [
                  {
                    contributionCount: 0,
                    date: '2022-01-01',
                    weekday: 6,
                  },
                ],
              },
              {
                contributionDays: [
                  {
                    contributionCount: 0,
                    date: '2022-01-02',
                    weekday: 0,
                  },
                  {
                    contributionCount: 0,
                    date: '2022-01-03',
                    weekday: 1,
                  },
                  {
                    contributionCount: 15,
                    date: '2022-01-04',
                    weekday: 2,
                  },
                  {
                    contributionCount: 22,
                    date: '2022-01-05',
                    weekday: 3,
                  },
                  {
                    contributionCount: 26,
                    date: '2022-01-06',
                    weekday: 4,
                  },
                  {
                    contributionCount: 0,
                    date: '2022-01-07',
                    weekday: 5,
                  },
                  {
                    contributionCount: 0,
                    date: '2022-01-08',
                    weekday: 6,
                  },
                ],
              },
              {
                contributionDays: [
                  {
                    contributionCount: 0,
                    date: '2022-01-09',
                    weekday: 0,
                  },
                  {
                    contributionCount: 6,
                    date: '2022-01-10',
                    weekday: 1,
                  },
                  {
                    contributionCount: 30,
                    date: '2022-01-11',
                    weekday: 2,
                  },
                  {
                    contributionCount: 17,
                    date: '2022-01-12',
                    weekday: 3,
                  },
                  {
                    contributionCount: 15,
                    date: '2022-01-13',
                    weekday: 4,
                  },
                  {
                    contributionCount: 9,
                    date: '2022-01-14',
                    weekday: 5,
                  },
                  {
                    contributionCount: 4,
                    date: '2022-01-15',
                    weekday: 6,
                  },
                ],
              },
              {
                contributionDays: [
                  {
                    contributionCount: 0,
                    date: '2022-01-16',
                    weekday: 0,
                  },
                  {
                    contributionCount: 15,
                    date: '2022-01-17',
                    weekday: 1,
                  },
                  {
                    contributionCount: 11,
                    date: '2022-01-18',
                    weekday: 2,
                  },
                  {
                    contributionCount: 17,
                    date: '2022-01-19',
                    weekday: 3,
                  },
                  {
                    contributionCount: 8,
                    date: '2022-01-20',
                    weekday: 4,
                  },
                  {
                    contributionCount: 4,
                    date: '2022-01-21',
                    weekday: 5,
                  },
                  {
                    contributionCount: 0,
                    date: '2022-01-22',
                    weekday: 6,
                  },
                ],
              },
              {
                contributionDays: [
                  {
                    contributionCount: 10,
                    date: '2022-01-23',
                    weekday: 0,
                  },
                  {
                    contributionCount: 22,
                    date: '2022-01-24',
                    weekday: 1,
                  },
                  {
                    contributionCount: 15,
                    date: '2022-01-25',
                    weekday: 2,
                  },
                  {
                    contributionCount: 17,
                    date: '2022-01-26',
                    weekday: 3,
                  },
                  {
                    contributionCount: 7,
                    date: '2022-01-27',
                    weekday: 4,
                  },
                  {
                    contributionCount: 8,
                    date: '2022-01-28',
                    weekday: 5,
                  },
                  {
                    contributionCount: 3,
                    date: '2022-01-29',
                    weekday: 6,
                  },
                ],
              },
              {
                contributionDays: [
                  {
                    contributionCount: 0,
                    date: '2022-01-30',
                    weekday: 0,
                  },
                  {
                    contributionCount: 16,
                    date: '2022-01-31',
                    weekday: 1,
                  },
                  {
                    contributionCount: 8,
                    date: '2022-02-01',
                    weekday: 2,
                  },
                  {
                    contributionCount: 12,
                    date: '2022-02-02',
                    weekday: 3,
                  },
                  {
                    contributionCount: 34,
                    date: '2022-02-03',
                    weekday: 4,
                  },
                  {
                    contributionCount: 7,
                    date: '2022-02-04',
                    weekday: 5,
                  },
                ],
              },
            ],
          },
        },
      },
      year: 2022,
    };

    const dataCard = createDataCard({ user, year });

    expect(dataCard[0]).toBeInstanceOf(ContributionWeek);
  });

  it('should return an array of contribution weeks with empty data if the response is not valid', () => {
    const response = {
      user: null,
      year: 2022,
    };

    const dataCard = createDataCard(response);

    expect(dataCard[0]).toBeInstanceOf(ContributionWeek);
  });
});

import type {
  getUserContributionsResponseType,
  ValidUserContributionsType,
} from '../data/github';
import ContributionWeek, { ContributionDay } from '../logic/contribution-week';

export const DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;
const YearInWeeks = 53;
const WeekInDays = 7;

export type CreateDataCardType = (
  response: getUserContributionsResponseType,
) => Array<ContributionWeek>;

const createDataCard: CreateDataCardType = ({ user, year }) => {
  if (user !== null) return createFullDataCard({ user, year });

  return createEmptyDataCard(year);
};

const createEmptyDataCard = (year: number): Array<ContributionWeek> => {
  const YearInWeeks = 53;
  const WeekInDays = 7;
  const happyNewYear = new Date(`${year}-01-01`);
  const firstDay = new Date(
    happyNewYear.getTime() - happyNewYear.getDay() * DAY_IN_MILLISECONDS,
  );

  const cardData: Array<ContributionWeek> = [];

  for (let week = 0; week < YearInWeeks; week++) {
    let weekArr: Array<ContributionDay> = [];
    for (let day = 0; day < WeekInDays; day++) {
      const date = new Date(
        firstDay.getTime() +
          week * WeekInDays * DAY_IN_MILLISECONDS +
          day * DAY_IN_MILLISECONDS,
      );
      const commitCount = 0;
      const contribution: ContributionDay = {
        date,
        commitCount,
      };
      weekArr.push(contribution);
    }
    const contributionWeek = new ContributionWeek(weekArr);
    cardData.push(contributionWeek);
  }

  return cardData;
};

const createFullDataCard = ({
  user,
  year,
}: ValidUserContributionsType): Array<ContributionWeek> => {
  const { weeks: data } = user.contributionsCollection.contributionCalendar;
  const firstContributionDay = data[0].contributionDays[0];
  const cardData: Array<ContributionWeek> = [];
  let incompleteFirstWeek = false;


  if (firstContributionDay.weekday !== 0) {
    const weekArr: Array<ContributionDay> = [];
    const firstDay = new Date(firstContributionDay.date);
    for (let i = 0; i < firstContributionDay.weekday; i++) {
      const date = new Date(
        firstDay.getTime() -
          (firstContributionDay.weekday - i) * DAY_IN_MILLISECONDS,
      );
      const commitCount = 0;
      const contribution: ContributionDay = {
        date,
        commitCount,
      };
      weekArr.push(contribution);
    }

    for (let contributionDay of data[0].contributionDays) {
      const date = new Date(contributionDay.date);
      const commitCount = contributionDay.contributionCount;
      const contribution: ContributionDay = {
        date,
        commitCount,
      };
      weekArr.push(contribution);
    }
    const contributionWeek = new ContributionWeek(weekArr);
    cardData.push(contributionWeek);
    incompleteFirstWeek = true;
  }

  for (let i = 0; i < data.length; i++) {
    let weekData = data[i];
    if (incompleteFirstWeek) {
      incompleteFirstWeek = false;
      continue;
    }

    let weekArr: Array<ContributionDay> = [];

    for (let contributionDay of weekData.contributionDays) {
      const date = new Date(contributionDay.date);
      const commitCount = contributionDay.contributionCount;
      const contribution: ContributionDay = {
        date,
        commitCount,
      };
      weekArr.push(contribution);
    }

    if (i === data.length - 1 && weekArr.length < WeekInDays) {
      const lastRegisteredDate = weekArr.at(-1)!.date;
      for (let j = 1; j <= WeekInDays - weekArr.length; j++) {
        const date = new Date(
          lastRegisteredDate.getTime() + j * DAY_IN_MILLISECONDS,
        );
        const commitCount = 0;
        const contribution: ContributionDay = {
          date,
          commitCount,
        };
        weekArr.push(contribution);
      }
    }

    const contributionWeek = new ContributionWeek(weekArr);
    cardData.push(contributionWeek);
  }

  console.log(
    '----------------------------------------------------------------',
  );
  console.log(
    cardData.map((data) =>
      data.getData().map((data) => data.date.toUTCString()),
    ),
  );

  return cardData;
};

export default createDataCard;

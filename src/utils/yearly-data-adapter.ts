import type { getUserContributionsResponseType } from '../data/github';
import ContributionCard from '../logic/contribution-year';
import ContributionDay from '../logic/contribution-day';
import { ValidUserContributionsType } from '../data/github';

type adaptCardDataType = (
  response: getUserContributionsResponseType,
) => ContributionCard;

const adaptCardData: adaptCardDataType = (response) => {
  const year = 2022;
  if (response?.user) {
    return ContributionCard.getEmptyContributionCard(year);
  }
  const contribCard = new ContributionCard([], year);
  return contribCard;
};

export default adaptCardData;

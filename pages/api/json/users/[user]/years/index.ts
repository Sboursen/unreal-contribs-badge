import type { NextApiRequest, NextApiResponse } from 'next';
import getUserContributions from '../../../../../../src/data/github';
import ContributionWeek from '../../../../../../src/logic/contribution-week';
import createDataCard from '../../../../../../src/utils/data-card-adapter';
import { today } from '../../index';

type Response =
  | string
  | {
      message: string;
    };
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>,
) {
  if (req.method === 'GET') {
    let { user } = req.query;
    if (typeof user !== 'string') user = 'Sboursen';
    getJsonData(user, today.getFullYear()).then((body) => {
      res.status(200);
      res.setHeader('Content-Type', 'application/json');
      res.send(body);
    });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
const getJsonData = async (
  userHandle: string = 'Sboursen',
  year: number = 2022,
): Promise<string> => {
  const apiData = await getUserContributions(userHandle, year);
  const dataCard = createDataCard(apiData);
  return JSON.stringify(dataCard);
};

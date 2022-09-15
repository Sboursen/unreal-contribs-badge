import type { NextApiRequest, NextApiResponse } from 'next';
import getUserContributions from '../../../../src/data/github';
import ContributionWeek from '../../../../src/logic/contribution-week';
import createDataCard from '../../../../src/utils/data-card-adapter';
export const today = new Date(Date.now());

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
    console.log('hello');
    getJsonData().then((body) => {
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
  year: number = today.getFullYear(),
): Promise<string> => {
  const apiData = await getUserContributions(userHandle, year);
  const dataCard = createDataCard(apiData);
  return JSON.stringify(dataCard);
};

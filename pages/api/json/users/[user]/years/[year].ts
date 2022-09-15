import type { NextApiRequest, NextApiResponse } from 'next';
import { today } from '../..';
import getUserContributions from '../../../../../../src/data/github';
import ContributionWeek from '../../../../../../src/logic/contribution-week';
import createDataCard from '../../../../../../src/utils/data-card-adapter';
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
    let {user, stringYear} = req.query;
    if (typeof user !== "string") user = "Sboursen";
    let year = Number(stringYear);
    if( year > today.getFullYear() || year < 2000 ) year = today.getFullYear()

    getJsonData(user, year).then((body) => {
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

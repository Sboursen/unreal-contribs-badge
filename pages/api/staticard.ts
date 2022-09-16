// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import createCard from '../../src/card/card';

type Data =
  | string
  | {
      message: string;
    };
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method === 'GET') {
    const body = createCard(200, 200);
    res.status(200);
    res.setHeader('Content-Type', 'image/svg+xml');
    res.send(body);
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import createCard from '../../components/card/card';


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>,
) {
  if (req.method === 'GET') {
    const body = createCard(200, 200)
    res.status(200);
    res.setHeader('Content-Type', 'image/svg+xml');
    res.send(body);
  }
}

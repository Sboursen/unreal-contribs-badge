import type { NextApiRequest, NextApiResponse } from 'next';
import Card2d from '../../../../src/card/card2d';
import ReactDOMServer from 'react-dom/server';

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
    const body = ReactDOMServer.renderToString(
      Card2d(700, 700, 'Sboursen', 2022),
    );
    res.status(200);
    res.setHeader('Content-Type', 'image/svg+xml');
    res.send(body);
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

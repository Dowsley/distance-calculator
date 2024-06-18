import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req.query;
  const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${query}&format=json`);
  const data = await response.json();
  res.status(200).json(data);
}

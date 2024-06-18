import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const history = await prisma.distanceQuery.findMany();
      res.status(200).json(history);
    } catch (error) {
      console.error('Error fetching history:', error);
      res.status(500).json({ message: 'Error fetching history' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { sourceAddress, destinationAddress, distance } = req.body;
    const newQuery = await prisma.distanceQuery.create({
      data: {
        sourceAddress,
        destinationAddress,
        distance,
      },
    });
    res.status(200).json(newQuery);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

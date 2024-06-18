import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const geodesic = (coords1: [number, number], coords2: [number, number]): number => {
  const toRad = (value: number): number => value * Math.PI / 180;
  const lat1 = toRad(coords1[0]);
  const lon1 = toRad(coords1[1]);
  const lat2 = toRad(coords2[0]);
  const lon2 = toRad(coords2[1]);
  const R = 6371; // km
  const dLat = lat2 - lat1;
  const dLon = lon2 - lon1;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { sourceCoords, destinationCoords } = req.body;

    try {
      if (!sourceCoords || !destinationCoords) {
        throw new Error('Invalid coordinates');
      }

      const sourceCoordsTuple: [number, number] = [sourceCoords.lat, sourceCoords.lon];
      const destinationCoordsTuple: [number, number] = [destinationCoords.lat, destinationCoords.lon];
      const distance = geodesic(sourceCoordsTuple, destinationCoordsTuple);

      const newQuery = await prisma.distanceQuery.create({
        data: {
          sourceAddress: `${sourceCoords.lat}, ${sourceCoords.lon}`,
          destinationAddress: `${destinationCoords.lat}, ${destinationCoords.lon}`,
          distance,
        },
      });

      res.status(200).json(newQuery);
    } catch (error) {
      res.status(500).json({ message: 'Error calculating distance' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

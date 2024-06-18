import React, { useState, useEffect } from 'react';
import { Box, Button, Text } from '@chakra-ui/react';
import AddressInput from '../components/AddressInput';

export default function Home() {
  const [sourceCoords, setSourceCoords] = useState<{ lat: number, lon: number } | null>(null);
  const [destinationCoords, setDestinationCoords] = useState<{ lat: number, lon: number } | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [history, setHistory] = useState<{ sourceAddress: string, destinationAddress: string, distance: number }[]>([]);

  const fetchHistory = async () => {
    try {
      const historyResponse = await fetch('/api/getHistory');
      const historyData = await historyResponse.json();
      setHistory(historyData);
    } catch (error) {
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const calculateDistance = async () => {
    if (!sourceCoords || !destinationCoords) {
      console.error('Source or destination coordinates are missing');
      return;
    }

    try {
      const response = await fetch('/api/calculateDistance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sourceCoords,
          destinationCoords,
        }),
      });

      const data = await response.json();
      if (data.distance) {
        setDistance(data.distance);
        fetchHistory(); // Fetch history again to update the list
      } else {
        console.error('Error in response data:', data);
      }
    } catch (error) {
      console.error('Error calculating distance:', error); // Debugging: log error
    }
  };

  return (
    <Box p={4}>
      <AddressInput label="Source Address" setCoords={(lat, lon) => setSourceCoords({ lat, lon })} />
      <AddressInput label="Destination Address" setCoords={(lat, lon) => setDestinationCoords({ lat, lon })} />
      <Button onClick={calculateDistance} colorScheme="teal">Calculate Distance</Button>
      {distance !== null && <Text>The distance is {distance.toFixed(2)} km.</Text>}
      <Box mt={4}>
        <Text>History:</Text>
        {history.map((entry, index) => (
          <Text key={index}>{entry.sourceAddress} to {entry.destinationAddress}: {entry.distance.toFixed(2)} km</Text>
        ))}
      </Box>
    </Box>
  );
}

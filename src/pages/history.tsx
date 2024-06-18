import React, { useEffect, useState } from 'react';
import { Box, Heading, Text, VStack, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';

export default function History() {
  const [history, setHistory] = useState<{ sourceAddress: string, destinationAddress: string, distance: number }[]>([]);
  const router = useRouter();

  const fetchHistory = async () => {
    try {
      const historyResponse = await fetch('/api/getHistory');
      const historyData = await historyResponse.json();
      setHistory(historyData);
    } catch (error) {
      console.error('Error fetching history:', error);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <Box maxW="600px" mx="auto" p={4}>
      <Heading mb={6} textAlign="center">Distance Calculation History</Heading>
      <Button mb={4} colorScheme="teal" onClick={() => router.push('/')}>Back to Home</Button>
      <VStack spacing={4} align="stretch">
        {history.length > 0 ? (
          history.map((entry, index) => (
            <Box key={index} p={4} borderWidth="1px" borderRadius="lg" mb={2}>
              <Text>{entry.sourceAddress} to {entry.destinationAddress}: {entry.distance.toFixed(2)} km</Text>
            </Box>
          ))
        ) : (
          <Text>No history available.</Text>
        )}
      </VStack>
    </Box>
  );
}

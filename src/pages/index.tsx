import React, { useState, useEffect } from 'react';
import { Box, Button, Text, Heading, VStack, Flex, IconButton } from '@chakra-ui/react';
import AddressInput from '../components/AddressInput';
import { useRouter } from 'next/router';

export default function Home() {
  const [sourceCoords, setSourceCoords] = useState<{ lat: number, lon: number } | null>(null);
  const [destinationCoords, setDestinationCoords] = useState<{ lat: number, lon: number } | null>(null);
  const [sourceLabel, setSourceLabel] = useState('');
  const [destinationLabel, setDestinationLabel] = useState('');
  const [distance, setDistance] = useState<number | null>(null);
  const router = useRouter();

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
      } else {
        console.error('Error in response data:', data);
      }
    } catch (error) {
      console.error('Error calculating distance:', error);
    }
  };

  return (
    <Flex
      height="100vh"
      justifyContent="center"
      alignItems="center"
      bg="rgba(0, 0, 0, 0.5)"
    >
      <Box maxW="600px" width="100%" mx={4} p={4} bg="white" borderRadius="lg" boxShadow="lg">
        <Flex justify="space-between" align="center" mb={6}>
          <Heading textAlign="center" flex="1">Distance Calculator</Heading>
          <Button onClick={() => router.push('/history')} colorScheme="teal" ml={4}>
            View History
          </Button>
        </Flex>
        <VStack spacing={4} align="stretch">
          <AddressInput
            label="Source Address"
            setCoords={(lat, lon) => setSourceCoords({ lat, lon })}
          />
          <AddressInput
            label="Destination Address"
            setCoords={(lat, lon) => setDestinationCoords({ lat, lon })}
          />
          <Button onClick={calculateDistance} colorScheme="teal" size="lg">
            Calculate Distance
          </Button>
          {distance !== null && (
            <Box mt={4} p={4} borderWidth="1px" borderRadius="lg" bg="teal.50">
              <Text fontSize="xl">The distance is {distance.toFixed(2)} km.</Text>
            </Box>
          )}
        </VStack>
      </Box>
    </Flex>
  );
}

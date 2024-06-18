import React, { useEffect, useState } from 'react';
import { Box, Heading, Text, VStack, Button, Flex, Icon } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FaArrowRight } from 'react-icons/fa';
import Head from "next/head";

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
    <>
      <Head>
        <title>Distance Calculator History</title>
      </Head>
      <Box maxW="600px" mx="auto" p={4}>
        <Heading mb={6} textAlign="center">Distance Calculation History</Heading>
        <Button mb={4} colorScheme="teal" onClick={() => router.push('/')}>Back to Home</Button>
        <VStack spacing={4} align="stretch">
          {history.length > 0 ? (
            history.map((entry, index) => (
              <Box key={index} p={4} borderWidth="1px" borderRadius="lg" mb={2}>
                <Flex align="center" mb={2}>
                  <Box flex="1" mr={2}>
                    <Text fontWeight="bold">From:</Text>
                    <Text>{entry.sourceAddress}</Text>
                  </Box>
                  <Icon as={FaArrowRight} w={6} h={6} />
                  <Box flex="1" ml={2}>
                    <Text fontWeight="bold">To:</Text>
                    <Text>{entry.destinationAddress}</Text>
                  </Box>
                </Flex>
                <Text textAlign="center" mt={2}>Distance: {entry.distance.toFixed(2)} km</Text>
              </Box>
            ))
          ) : (
            <Text>No history available.</Text>
          )}
        </VStack>
      </Box>
    </>
  );
}

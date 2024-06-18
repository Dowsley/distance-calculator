import React, { useState, useEffect, useCallback } from 'react';
import { Box, Input, List, ListItem, Spinner, FormControl, FormLabel } from '@chakra-ui/react';
import debounce from 'lodash/debounce';

interface AddressInputProps {
  label: string;
  setCoords: (lat: number, lon: number, label: string) => void;
}

function AddressInput({ label, setCoords }: AddressInputProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{ lat: string, lon: string, display_name: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCoords, setSelectedCoords] = useState<{ lat: number, lon: number } | null>(null);
  const [preventFetch, setPreventFetch] = useState(false);

  const fetchResults = useCallback(debounce(async (query: string) => {
    if (query.length > 2) {
      setLoading(true);
      const response = await fetch(`/api/search?query=${query}`);
      const data = await response.json();
      setResults(data.slice(0, 10));
      setLoading(false);
    }
  }, 500), []);

  useEffect(() => {
    if (!preventFetch) {
      fetchResults(query);
    }
  }, [query, fetchResults, preventFetch]);

  useEffect(() => {
    if (results.length > 0 && selectedCoords === null) {
      const firstResult = results[0];
      const coords = { lat: parseFloat(firstResult.lat), lon: parseFloat(firstResult.lon) };
      setSelectedCoords(coords);
      setCoords(coords.lat, coords.lon, firstResult.display_name);
    }
  }, [results, setCoords, selectedCoords]);

  const handleSelect = (index: number) => {
    const selectedOption = results[index];
    const coords = { lat: parseFloat(selectedOption.lat), lon: parseFloat(selectedOption.lon) };
    setSelectedCoords(coords);
    setCoords(coords.lat, coords.lon, selectedOption.display_name);
    setQuery(selectedOption.display_name);
    setResults([]);
    setPreventFetch(true);
    setTimeout(() => setPreventFetch(false), 4000);
  };

  return (
    <>
      <FormControl mb={4}>
        <FormLabel>{label}</FormLabel>
        <Input
          placeholder={`Enter ${label}`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          mb={2}
        />
        {loading && <Spinner size="sm" />}
        {!loading && results.length > 0 && (
          <List spacing={2} mt={2} border="1px solid #ccc" borderRadius="md" boxShadow="md" bg="white" zIndex="10" position="absolute" width="100%">
            {results.map((result, index) => (
              <ListItem
                key={index}
                p={2}
                cursor="pointer"
                onClick={() => handleSelect(index)}
                _hover={{ bg: 'gray.100' }}
              >
                {result.display_name}
              </ListItem>
            ))}
          </List>
        )}
      </FormControl>
    </>
  );
}

export default AddressInput;

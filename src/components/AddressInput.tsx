import React, { useState, useEffect, useCallback } from 'react';
import { Box, Input, Select, Spinner, FormControl, FormLabel } from '@chakra-ui/react';
import debounce from 'lodash/debounce';

interface AddressInputProps {
  label: string;
  setCoords: (lat: number, lon: number) => void;
}

function AddressInput({ label, setCoords }: AddressInputProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{ lat: string, lon: string, display_name: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCoords, setSelectedCoords] = useState<{ lat: number, lon: number } | null>(null);

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
    fetchResults(query);
  }, [query, fetchResults]);

  useEffect(() => {
    if (results.length > 0 && selectedCoords === null) {
      const firstResult = results[0];
      const coords = { lat: parseFloat(firstResult.lat), lon: parseFloat(firstResult.lon) };
      setSelectedCoords(coords);
      setCoords(coords.lat, coords.lon);
    }
  }, [results, setCoords, selectedCoords]);

  return (
    <FormControl mb={4}>
      <FormLabel>{label}</FormLabel>
      <Input
        placeholder={`Enter ${label}`}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        mb={2}
      />
      {loading ? (
        <Spinner size="sm" />
      ) : (
        <Select
          onChange={(e) => {
            const selectedIndex = e.target.selectedIndex;
            const selectedOption = results[selectedIndex];
            const coords = { lat: parseFloat(selectedOption.lat), lon: parseFloat(selectedOption.lon) };
            setSelectedCoords(coords);
            setCoords(coords.lat, coords.lon);
          }}
        >
          {results.map((result, index) => (
            <option key={index} value={result.display_name}>
              {result.display_name}
            </option>
          ))}
        </Select>
      )}
    </FormControl>
  );
}

export default AddressInput;

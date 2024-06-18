import React, { useState, useEffect, useCallback } from 'react';
import { Box, Input, Select, Spinner } from '@chakra-ui/react';
import debounce from 'lodash/debounce';

interface AddressInputProps {
  label: string;
  setCoords: (lat: number, lon: number) => void;
}

function AddressInput({ label, setCoords }: AddressInputProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{ lat: string, lon: string, display_name: string }[]>([]);
  const [selectedCoords, setSelectedCoords] = useState<{ lat: string, lon: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchResults = useCallback(debounce(async (query: string) => {
  setLoading(true);
  const response = await fetch(`/api/search?query=${query}`);
  const data = await response.json();
  setResults(data.slice(0, 10));
  setLoading(false);
  }, 500), []);

  useEffect(() => {
    if (results.length > 0) {
      const firstResult = results[0];
      setSelectedCoords({ lat: firstResult.lat, lon: firstResult.lon });
      setCoords(parseFloat(firstResult.lat), parseFloat(firstResult.lon));
    }
  }, [results, setCoords, label]);

  useEffect(() => {
    fetchResults(query);
  }, [query, fetchResults]);

  return (
    <Box>
      <Input
        placeholder={label}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {loading ? (
        <Spinner size="sm" />
      ) : (
        <Select
          onChange={(e) => {
            const selectedIndex = e.target.selectedIndex;
            const selectedOption = results[selectedIndex];
            setSelectedCoords({ lat: selectedOption.lat, lon: selectedOption.lon });
            setCoords(parseFloat(selectedOption.lat), parseFloat(selectedOption.lon));
          }}
        >
          {results.map((result, index) => (
            <option key={index} value={result.display_name}>
              {result.display_name}
            </option>
          ))}
        </Select>
      )}
    </Box>
  );
}

export default AddressInput;

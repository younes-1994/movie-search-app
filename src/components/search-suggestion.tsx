//TODO: ADD MORE DATA TO HISTORY
"use client";

import { useState, useCallback, useEffect } from "react";
import clsx from "clsx";

type Props = {
  value: string;
  debouncedValue: string;
  data: object | string;
  onclick: (suggestion: string) => void;
  className: string;
};

const SearchSuggestion: React.FC<Props> = ({ value, debouncedValue, data, onclick, className }) => {
  const [searchHistory, setSearchHistory] = useState<string[]>([]); // Store previous search terms
  const [suggestions, setSuggestions] = useState<string[]>([]); // Filtered suggestions

  useEffect(() => {
    // Filter the suggestions based on the search term
    const filteredSuggestions = searchHistory.filter((term) =>
      term.toLowerCase().includes(value.toLowerCase()),
    );
    setSuggestions(filteredSuggestions);
  }, [value]);

  const handleSuggestion = useCallback(
    (suggestion: string) => {
      setSuggestions([]);
      onclick(suggestion);
    },
    [onclick],
  );

  useEffect(() => {
    // Save the search term when a movie is found
    if (data) {
      if (debouncedValue && !searchHistory.includes(debouncedValue)) {
        setSearchHistory([...searchHistory, debouncedValue]); // Save the search term
      }
      setSuggestions([]); // Clear suggestions after search
    }
  }, [data, debouncedValue, searchHistory]);

  if (suggestions.length > 0)
    return (
      <ul className={clsx("mt-2 bg-white border border-gray-300 rounded-xl shadow", className)}>
        {suggestions.map((suggestion, index) => (
          <li
            key={index}
            className="px-4 py-2 cursor-pointer hover:bg-gray-200"
            onClick={() => handleSuggestion(suggestion)}
          >
            {suggestion}
          </li>
        ))}
      </ul>
    );
};
SearchSuggestion.displayName = "SearchSuggestion";

export { SearchSuggestion };

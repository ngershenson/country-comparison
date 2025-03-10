import React, { useState } from 'react'
import Autosuggest from 'react-autosuggest/dist/Autosuggest'

export default function FilterBar({ countryNames, setFilter }) {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const getSuggestions = (inputValue) => {
    const input = inputValue.trim().toLowerCase();
    return input.length == 0
      ? []
      : countryNames.filter((country) => country.toLowerCase().includes(input));
  };

  const onChange = (event, { newValue }) => {
    setValue(newValue);
    setFilter(newValue);
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onSuggestionSelected = (event, { suggestion, method = 'enter' }) => {
    setFilteredCountries((countries) => [suggestion, ...countries]);
    setValue('');
  };
  
  const inputProps = {
    placeholder: 'Search for a country',
    value,
    onChange: onChange
  };


  return (
    <div>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        onSuggestionSelected={onSuggestionSelected}
        getSuggestionValue={(suggestion) => suggestion}
        renderSuggestion={(suggestion) => <div>{suggestion}</div>}
        inputProps={inputProps}
      />
    </div>
  )
}

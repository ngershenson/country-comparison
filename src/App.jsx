import { useState, useEffect } from 'react'
import { BASE_URL, FETCH_ALL, FETCH_INDEPENDENT } from '../CONSTANTS'
import ComparisonPanel from './componenets/ComparisonPanel'
import FilterBar from './componenets/FilterBar';
import './App.css'

function App() {
  const [countryData, setCountryData] = useState([]);
  const [independentMode, setIndependentMode] = useState(true);
  const [selectedCountryIds, setSelectedCountryIds] = useState([]);

  useEffect(() => {
    fetch(BASE_URL + (independentMode ? FETCH_INDEPENDENT : FETCH_ALL))
      .then((response) => response.json())
      .then((data) => {
        setCountryData(data);
      })
      .catch((error) => console.error("Error fetching countries", error));
  }, [independentMode]);

  const handleSelectCountry = (id) => {
    if (!selectedCountryIds.includes(id)) {
      setSelectedCountryIds((ids) => [id, ...ids])
    }
  }

  const handleRemoveCountry = (id) => {
    setSelectedCountryIds(ids => ids.filter(prevId => prevId !== id))
  }

  return (
    <>
      <h1>Country Comparison</h1>
      <div className='filter-header'>
        <FilterBar countryData={countryData} handleSelectCountry={handleSelectCountry} />
        <span>
          <input type='checkbox' id='independent' checked={independentMode} onChange={() => setIndependentMode((mode) => !mode)} />
          <label htmlFor='independent'>Independent countries only</label>
        </span>
      </div>
      <ComparisonPanel countryData={countryData} selectedCountryIds={selectedCountryIds} handleRemoveCountry={handleRemoveCountry} />

      {/* <h2>We are looking at {countryData.length} different countries</h2>
      <ul>
        {countryData.sort((a, b) => a.name.common.localeCompare(b.name.common)).map((country) => (
          <li key={country.cca3} className="checkbox-list">
            <input id={country.cca3} type="checkbox" onChange={() => {
              if (!selectedCountryIds.includes(country.cca3)) {
                setSelectedCountryIds((ids) => [country.cca3, ...ids])
              } else {
                setSelectedCountryIds((ids) => ids.filter(id => id !== country.cca3))
              }
            }} />
            <label htmlFor={country.cca3}>
              {country.name.common}
            </label>
          </li>
        ))}
      </ul> */}
    </>
  )
}

export default App

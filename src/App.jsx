import { useState, useEffect } from 'react'
import { BASE_URL, FETCH_ALL, FETCH_INDEPENDENT } from '../CONSTANTS'
import FilterBar from './componenets/FilterBar'
import ComparisonPanel from './componenets/ComparisonPanel'
import './App.css'

function App() {
  const [countryData, setCountryData] = useState([]);
  const [independentMode, setIndependentMode] = useState(true);
  const [filter, setFilter] = useState([]);
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
  return (
    <>
      {/* <h1>Global Stats Explorer</h1>
      <FilterBar countryNames={countryNames} setFilter={setFilter}/> */}

      <h2>Country Comparison</h2>
      <ComparisonPanel countryData={countryData} selectedCountryIds={selectedCountryIds} />

      <h2>We are looking at {countryData.length} different countries</h2>
      <div>
        <input type='checkbox' id='independent' checked={independentMode} onChange={() => setIndependentMode((mode) => !mode)} />
        <label htmlFor='independent'>Independent countries only</label>
      </div>
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
      </ul>
    </>
  )
}

export default App

import { useState, useEffect } from 'react'
import { BASE_URL, FETCH_ALL, FETCH_INDEPENDENT } from '../CONSTANTS'
import FilterBar from './componenets/FilterBar'
import ComparisonPanel from './componenets/ComparisonPanel'
import CountryCard from './componenets/CountryCard'
// import $ from 'jquery';
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

  const countryNames = countryData.map(c => c.name.common)

  return (
    <>
      {/* <h1>Global Stats Explorer</h1>
      <FilterBar countryNames={countryNames} setFilter={setFilter}/>

      <ComparisonPanel data={allCountryData} selectedCountryIds={selectedCountryIds}/>
      <h2>Country Comparison</h2> */}
      <h2>Selected Countries are</h2>
        {selectedCountryIds.map(id => (
          <CountryCard data={countryData.filter(c => c.cca3 === id)[0]}/>
        ))}
      <h2>We are looking at {countryData.length} different countries</h2>
      <div>
        <input type='checkbox' id='independent' checked={independentMode} onChange={() => setIndependentMode((mode) => !mode)} />
        <label htmlFor='independent'>Independent countries only</label>
      </div>
      <ul>
        {countryData.sort((a, b) => a.name.common.localeCompare(b.name.common)).map((country) => (
          <li key={country.cca3} className="checkbox-list">
            <input id={country} type="checkbox" onChange={() => setSelectedCountryIds((ids) => [country.cca3, ...ids])} />
            <label htmlFor={country}>
              {country.name.common}
            </label>
          </li>
        ))}
      </ul>
    </>
  )
}

export default App

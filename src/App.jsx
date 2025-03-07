import { useState, useEffect } from 'react'
import { BASE_URL } from '../CONSTANTS'
import $ from 'jquery';
import './App.css'

function App() {
  const [countryNames, setCountryNames] = useState([]);
  const [allCountryData, setAllCountryData] = useState({});
  const [independentMode, setIndependentMode] = useState(true);

  useEffect(() => {
    let fetchString = BASE_URL;
    if (independentMode) {
      fetchString += '/independent?status=true';
    } else {
      fetchString += '/all';
    }
    fetch(fetchString)
      .then((response) => response.json())
      .then((data) => {
        setCountryNames(data.map((country) => country.name.common))
        setAllCountryData(data);
      })
  }, [independentMode]);

  return (
    <>
      <h1>Country Comparison</h1>
      <div>
        <input type='checkbox' id='independent' checked={independentMode} onChange={() => setIndependentMode((mode) => !mode)} />
        <label htmlFor='independent'>Independent countries only</label>
      </div>
      <h2>We are looking at {allCountryData.length} different countries</h2>
      <ul>
        {countryNames.sort().map((country, index) => (
          <li key={index}>{country}</li>
        ))}
      </ul>
    </>
  )
}

export default App

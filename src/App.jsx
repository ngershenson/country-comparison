import { useState, useEffect } from 'react'
import './App.css'
import { BASE_URL } from '../CONSTANTS'
import 'jquery';

function App() {
  const [countries, setCountries] = useState([]);
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
        setCountries(data.map((country) => country.name.common))
        setAllCountryData(data);
      })
  }, [independentMode]);

  return (
    <>
      <header>
        <title>Country Comparison</title>
      </header>
        <h1>Country Comparison</h1>
        <span>
          <input type='checkbox' id='independent' checked={independentMode} onChange={() => setIndependentMode((mode) => !mode)} />
          <label htmlFor='independent'>Independent countries only</label>
        </span>
        <h2>We are looking at {countries.length} different countries</h2>
        <ul>
          {countries.sort().map((country, index) => (
            <li key={index}>{country}</li>
          ))}
        </ul>
    </>
  )
}

export default App

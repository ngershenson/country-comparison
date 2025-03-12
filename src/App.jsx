import { useState, useEffect } from 'react'
import { BASE_URL, FETCH_ALL, FETCH_INDEPENDENT } from '../CONSTANTS'
import ComparisonPanel from './componenets/ComparisonPanel'
import FilterBar from './componenets/FilterBar';
import QuizPanel from './componenets/QuizPanel';
import './App.css'

function App() {
  const [countryData, setCountryData] = useState([]);
  const [independentMode, setIndependentMode] = useState(true);
  const [selectedCountryIds, setSelectedCountryIds] = useState([]);
  const [activeQuiz, setActiveQuiz] = useState(false);

  useEffect(() => {
    fetch(BASE_URL + (independentMode ? FETCH_INDEPENDENT : FETCH_ALL))
      .then((response) => response.json())
      .then((data) => {
        setCountryData(data.sort((a, b) => a.name.common.localeCompare(b.name.common)));
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
      {activeQuiz || <ComparisonPanel countryData={countryData} selectedCountryIds={selectedCountryIds} handleRemoveCountry={handleRemoveCountry} />}
      <QuizPanel activeQuiz={activeQuiz} setActiveQuiz={setActiveQuiz} />
    </>
  )
}

export default App

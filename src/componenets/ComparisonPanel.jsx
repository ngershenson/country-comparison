import React from 'react'
import CountryCard from './CountryCard'

export default function ComparisonPanel({ countryData, selectedCountryIds, handleRemoveCountry }) {

  return (
    <div className="comparison-panel">
      <h2>Selected Countries are</h2>
      <div className='country-card-container'>
        {selectedCountryIds.length === 0
          && <p>Please Select Countries to View Comparison</p>}
        {selectedCountryIds.map(id => (

          <div key={id}>
            <CountryCard data={countryData.filter(c => c.cca3 === id)[0]} handleRemoveCountry={handleRemoveCountry} />
          </div>
        ))}
      </div>
    </div>
  )
}

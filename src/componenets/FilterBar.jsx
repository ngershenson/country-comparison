import React from 'react'
import { Typeahead } from 'react-bootstrap-typeahead'
import 'react-bootstrap-typeahead/css/Typeahead.css'

export default function FilterBar({ countryData, handleSelectCountry }) {
  const options = countryData.map(country => ({
    id: country.cca3,
    label: country.name.common
  }))

  const onChange = (selected) => {
    if (selected && selected.length > 0) {
      handleSelectCountry(selected[0].id)
    }
  }

  return (
    <div className='filter-bar'>
      <Typeahead
        id="country-typeahead"
        options={options}
        placeholder="Seaerch for a country..."
        onChange={onChange}
        highlightOnlyResult={true}
      />
    </div>
  )
}

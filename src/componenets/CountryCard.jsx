import React from 'react'

export default function CountryCard({ data }) {
    return (
        <div className="country-card">
            <h3>{data.name.common} {data.flag}</h3>
            <p>Capital: {data.capital?.[0]}</p>
            <p>Population: {data.population.toLocaleString()}</p>
            <p>Region: {data.subregion}</p>
        </div>
    )
}

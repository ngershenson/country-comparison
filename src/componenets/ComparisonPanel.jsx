import React from 'react'

export default function ComparisonPanel({ data, selectedCountryIds }) {
    useEffect(() => {
        $('.comparison-panel').fadeIn(500);
    }, [filteredCountries]);

    const selectedCountries = filteredCountries.filter(country =>
        selectedCountryIds.includes(country.cca3)
    )

    return (
        <div className="comparison-panel" style={{ display: 'none' }}>
            <h2>Comparison Panel</h2>
            {filteredCountries.map(country => (
                <div key={country.cca3}>
                    <h3>{country.name.common}</h3>
                    <p>Capital: {country.capital?.[0]}</p>
                    <p>Population: {country.population.toLocaleString()}</p>
                </div>
            ))}
        </div>
    )
}

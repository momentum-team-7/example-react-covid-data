import { useState, useEffect } from 'react'

import 'tachyons'
import CountryList from './components/CountryList'
import CountryData from './components/CountryData'
import { getCountryList } from './api'

function App() {
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    getCountryList().then((countries) => setCountries(countries))
  }, [])

  console.log('RENDERING:', countries)

  return (
    <div className="App mw8 center mv3 ph3 sans-serif">
      <h1 className="pa2 bg-orange white">COVID-19 Data Explorer</h1>
      {selectedCountry ? (
        <CountryData
          country={selectedCountry}
          handleGoBack={() => setSelectedCountry(null)}
        />
      ) : (
        <CountryList
          countries={countries}
          setSelectedCountry={setSelectedCountry}
        />
      )}
    </div>
  )
}

export default App

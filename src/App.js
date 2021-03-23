import { useState, useEffect } from 'react'
import axios from 'axios'
import lodash from 'lodash'
import 'tachyons'
import CountryList from './components/CountryList'
import CountryData from './components/CountryData'

function App() {
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    axios.get('https://api.covid19api.com/countries').then((response) => {
      const sortedCountries = lodash.sortBy(response.data, ['Country'])
      setCountries(sortedCountries)
    })
  }, [])

  console.log('RENDERING:', countries)

  return (
    <div className="App mw8 center mv3 ph3 sans-serif">
      <h1 className="pa2 bg-orange white">COVID-19 Data Explorer</h1>
      {selectedCountry ? (
        <CountryData country={selectedCountry} />
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

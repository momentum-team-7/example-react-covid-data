import { useState, useEffect } from 'react'
import axios from 'axios'
import lodash from 'lodash'
import 'tachyons'
import CountryList from './components/CountryList'

function App() {
  const [countries, setCountries] = useState([])

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
      <CountryList countries={countries} />
    </div>
  )
}

export default App

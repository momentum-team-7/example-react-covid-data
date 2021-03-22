import { useState, useEffect } from 'react'
import axios from 'axios'
import lodash from 'lodash'

function App() {
  const [countries, setCountries] = useState([])

  useEffect(() => {
    console.log('useEffect runs', countries)
    axios.get('https://api.covid19api.com/countries').then((response) => {
      const sortedCountries = lodash.sortBy(response.data, ['Country'])
      setCountries(sortedCountries)
    })
  }, [])

  console.log('RENDERING:', countries)

  return (
    <div className="App">
      <h1>Countries</h1>
      <ul>
        {countries.map((country) => (
          <li key={country.Slug}>{country.Country}</li>
        ))}
      </ul>
    </div>
  )
}

export default App

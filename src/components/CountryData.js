import React, { useState, useEffect } from 'react'
import axios from 'axios'
import format from 'date-fns/format'

export default function CountryData({ country }) {
  const [countryData, setCountryData] = useState([])

  useEffect(() => {
    axios
      .get(`https://api.covid19api.com/live/country/${country.Slug}`)
      .then((response) => {
        const data = response.data.map((dataByDay) => ({
          id: dataByDay.ID,
          date: new Date(dataByDay.Date),
          confirmed: dataByDay.Confirmed,
          active: dataByDay.Active,
          recovered: dataByDay.Recovered,
          deaths: dataByDay.Deaths,
        }))
        setCountryData(data)
      })
  }, [country])

  return (
    <div>
      <h2>{country.Country}</h2>

      <ul>
        {countryData.map((dataByDay) => (
          <li key={dataByDay.id}>
            {format(dataByDay.date, 'LLL d, yyyy')}
            <dl>
              <dt>Confirmed</dt>
              <dd>{dataByDay.confirmed}</dd>
              <dt>Active</dt>
              <dd>{dataByDay.active}</dd>
              <dt>Recovered</dt>
              <dd>{dataByDay.recovered}</dd>
              <dt>Deaths</dt>
              <dd>{dataByDay.deaths}</dd>
            </dl>
          </li>
        ))}
      </ul>
    </div>
  )
}

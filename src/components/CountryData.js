import axios from 'axios'
import format from 'date-fns/format'
import React, { useEffect, useState } from 'react'
import { VictoryChart, VictoryLine, VictoryTheme } from 'victory'
import StatBox from './StatBox'

export default function CountryData({ country, handleGoBack }) {
  const [countryData, setCountryData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios
      .get(`https://api.covid19api.com/dayone/country/${country.Slug}`)
      .then((response) => {
        let data = generateDataWithUniqueDates(response.data)
        let lastConfirmed = 0
        data = data.map((dataByDay) => {
          const response = {
            id: dataByDay.ID,
            date: new Date(dataByDay.Date),
            new: Math.max(0, dataByDay.Confirmed - lastConfirmed),
            confirmed: dataByDay.Confirmed,
            active: dataByDay.Active,
            recovered: dataByDay.Recovered,
            deaths: dataByDay.Deaths,
          }
          lastConfirmed = dataByDay.Confirmed
          return response
        })
        setCountryData(data)
        setLoading(false)
      })
  }, [country])

  let dateOfFirstCase, currentCases
  if (countryData[0]) {
    dateOfFirstCase = countryData[0].date
    currentCases = countryData[countryData.length - 1]
  }

  return (
    <div>
      <h2>
        {country.Country}
        <div className="dib ml2 f5">
          <button
            className="pa0 bw0 bg-white blue pointer underline-hover"
            onClick={handleGoBack}
          >
            Back to all countries
          </button>
        </div>
      </h2>

      {countryData.length === 0 ? (
        loading ? (
          <div className="orange f2 lh-title">... Loading</div>
        ) : (
          <div>No data for this country.</div>
        )
      ) : (
        <>
          <div className="flex mv4 justify-around">
            <StatBox
              label="First case"
              stat={format(dateOfFirstCase, 'LLL d, yyyy')}
            />
            <StatBox
              label="Current cases"
              stat={currentCases.active.toLocaleString()}
            />
            <StatBox
              label="Recovered cases"
              stat={currentCases.recovered.toLocaleString()}
            />
          </div>

          <h3>New cases by day</h3>

          <VictoryChart
            scale={{ x: 'time', y: 'linear' }}
            theme={VictoryTheme.material}
            width={800}
            height={400}
            padding={{ top: 20, left: 50, right: 50, bottom: 50 }}
          >
            <VictoryLine
              x="date"
              y="new"
              data={countryData}
              interpolation="natural"
              style={{
                data: { stroke: '#333666' },
              }}
            />
          </VictoryChart>

          <table className="w-100" cellSpacing="0">
            <thead>
              <tr className="stripe-dark bn">
                <th className="fw6 tl pb3 pr3 bg-white">Date</th>
                <th className="fw6 tl pb3 pr3 bg-white">New cases</th>
                <th className="fw6 tl pb3 pr3 bg-white">Active cases</th>
                <th className="fw6 tl pb3 pr3 bg-white">Recovered cases</th>
                <th className="fw6 tl pb3 pr3 bg-white">Total deaths</th>
              </tr>
            </thead>
            <tbody>
              {countryData.map((dataByDay) => (
                <tr className="stripe-dark f6" key={dataByDay.id}>
                  <td className="pv3 pr3">
                    {format(dataByDay.date, 'LLL d, yyyy')}
                  </td>
                  <td className="pv3 pr3">{dataByDay.new.toLocaleString()}</td>
                  <td className="pv3 pr3">
                    {dataByDay.active.toLocaleString()}
                  </td>
                  <td className="pv3 pr3">
                    {dataByDay.recovered.toLocaleString()}
                  </td>
                  <td className="pv3 pr3">
                    {dataByDay.deaths.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  )
}

function generateDataWithUniqueDates(originalData) {
  /*
  We may have multiple records for the same day b/c some data
  is broken up by province/state. To rectify that, we make an
  object of unique dates and the total count for that date, and
  then transform that back into an array of objects.
  Example starting data:
  [
    {Country: "Australia", CountryCode: "AU", Province: "Victoria", City: "", CityCode: "", Lat: "-37.81",…}
    {Country: "Australia", CountryCode: "AU", Province: "New South Wales", City: "", CityCode: "",…} ]
  ]
  */
  const casesByDay = {}

  // Collect the unique dates with cases.
  for (const record of originalData) {
    if (!casesByDay[record.Date]) {
      casesByDay[record.Date] = {
        ID: record.ID,
        Confirmed: 0,
        Active: 0,
        Recovered: 0,
        Deaths: 0,
      }
    }
    casesByDay[record.Date].Confirmed += record.Confirmed
    casesByDay[record.Date].Active += record.Active
    casesByDay[record.Date].Recovered += record.Recovered
    casesByDay[record.Date].Deaths += record.Deaths
  }

  // Transform back into an array of objects.
  const stats = []
  for (const date of Object.keys(casesByDay)) {
    stats.push({ Date: date, ...casesByDay[date] })
  }

  return stats
}

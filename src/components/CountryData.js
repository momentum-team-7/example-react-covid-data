import format from 'date-fns/format'
import React, { useEffect, useState } from 'react'
import { getCountryData } from '../api'
import ButtonLink from './ButtonLink'
import NewCasesByDayChart from './NewCasesByDayChart'
import StatBox from './StatBox'

function formatPercentage(percentage, digits = 2) {
  const factor = 10 ** digits
  return `${(Math.round(percentage * factor) / factor).toLocaleString()}%`
}

function CountryData({ country, handleGoBack }) {
  const [loading, setLoading] = useState(true)
  const [countryData, setCountryData] = useState([])

  useEffect(() => {
    getCountryData(country).then((data) => {
      setCountryData(data)
      setLoading(false)
    })
  }, [country])

  return (
    <div>
      <h2>
        {country.name}
        <div className="dib ml2 f5">
          <ButtonLink onClick={handleGoBack} text="Back to all countries" />
        </div>
      </h2>

      {loading ? (
        <div>...</div>
      ) : (
        <>
          <div className="flex mv4 justify-around">
            <StatBox
              label="Confirmed cases"
              stat={countryData.latest_data.confirmed.toLocaleString()}
            />
            <StatBox
              label="Recovered cases"
              stat={countryData.latest_data.recovered.toLocaleString()}
            />
            <StatBox
              label="Recovery rate"
              stat={formatPercentage(
                countryData.latest_data.calculated.recovery_rate
              )}
            />
            <StatBox
              label="Death rate"
              stat={formatPercentage(
                countryData.latest_data.calculated.death_rate
              )}
            />
          </div>

          <h3>New confirmed cases by day</h3>

          <NewCasesByDayChart timeline={countryData.timeline} />

          <table className="w-100" cellSpacing="0">
            <thead>
              <tr className="stripe-dark bn">
                <th className="fw6 tl pb3 pr3 bg-white">Date</th>
                <th className="fw6 tl pb3 pr3 bg-white">New cases</th>
                <th className="fw6 tl pb3 pr3 bg-white">Active cases</th>
                <th className="fw6 tl pb3 pr3 bg-white">Recovered cases</th>
                <th className="fw6 tl pb3 pr3 bg-white">New deaths</th>
                <th className="fw6 tl pb3 pr3 bg-white">Total deaths</th>
              </tr>
            </thead>
            <tbody>
              {countryData.timeline.map((dataByDay) => (
                <tr className="stripe-dark f6" key={dataByDay.updated_at}>
                  <td className="pv3 pr3">
                    {format(dataByDay.date, 'LLL d, yyyy')}
                  </td>
                  <td className="pv3 pr3">
                    {dataByDay.new_confirmed.toLocaleString()}
                  </td>
                  <td className="pv3 pr3">
                    {dataByDay.active.toLocaleString()}
                  </td>
                  <td className="pv3 pr3">
                    {dataByDay.recovered.toLocaleString()}
                  </td>
                  <td className="pv3 pr3">
                    {dataByDay.new_deaths.toLocaleString()}
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

export default CountryData

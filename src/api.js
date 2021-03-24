import axios from 'axios'

export function getCountryList() {
  return axios
    .get('https://corona-api.com/countries')
    .then((response) => response.data.data)
}

export function getCountryData(country) {
  return axios
    .get(`https://corona-api.com/countries/${country.code}`)
    .then((response) => {
      const data = response.data.data
      data.timeline = data.timeline
        .filter((d) => !d.is_in_progress)
        .map((dataByDay) => ({
          ...dataByDay,
          date: new Date(dataByDay.date),
        }))
      return data
    })
}

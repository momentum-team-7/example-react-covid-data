export default function CountryList({ countries, setSelectedCountry }) {
  return (
    <div>
      <h2>List of countries</h2>
      <ul className="list pl0">
        {countries.map((country) => (
          <li className="mb2 mr3 dib" key={country.Slug}>
            <button
              className="pa0 bw0 bg-white blue pointer underline-hover"
              onClick={() => setSelectedCountry(country)}
            >
              {country.Country}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

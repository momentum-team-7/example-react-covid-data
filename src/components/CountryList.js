export default function CountryList({ countries }) {
  return (
    <div>
      <h2>List of countries</h2>
      <ul className="list pl0">
        {countries.map((country) => (
          <li className="mb2 mr3 dib" key={country.Slug}>
            {country.Country}
          </li>
        ))}
      </ul>
    </div>
  )
}

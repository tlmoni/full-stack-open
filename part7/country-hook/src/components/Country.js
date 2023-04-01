const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (country.length === 0) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country[0].name.common} </h3>
      <div>capital {country[0].capital} </div>
      <div>population {country[0].population}</div>
      <img src={country[0].flags.png} height="100" alt={`flag of ${country[0].name.common}`}/>
    </div>
  )
}

export default Country
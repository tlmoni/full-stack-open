import React, { useState, useEffect } from "react"

import weatherService from "../services/weatherService"

const Country = ({ country }) => {
  const [weather, setWeather] = useState([])

  useEffect(() => {
    const params = {
      apiKey: process.env.REACT_APP_API_KEY,
      capital: country.capital
    }
    weatherService
      .getWeather(params)
      .then(weatherData =>
        setWeather([weatherData])
      )
      .catch(error =>
        console.log(error)
      )
  }, [])

  if (weather.length > 0) {
    return (
      <div>
        <h1>{country.name.common}</h1>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area}</p>
        <strong>Languages:</strong>
        <ul>
          {Object.entries(country.languages).map(language => <li key={language[0]}>{language[1]}</li>)}
        </ul>
        <img src={country.flag} alt="Country flag"></img>
        <h2>Weather in {country.capital}</h2>
        <p>Temperature: {weather.main.temp}° Celcius</p>
        <img src={`http://openweathermap.org/img/wn/${weather.weather.icon}.png`} alt="Weather icon"></img>
        <p>Wind: {weather.wind.speed} m/s</p>
      </div>
    )
  }

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <h3>Languages:</h3>
      <ul>
        {Object.entries(country.languages).map(language => <li key={language[0]}>{language[1]}</li>)}
      </ul>
      <img src={country.flags.png} alt="Country flag"></img>
    </div>
  )
}

export default Country
import axios from "axios"

const baseUrl = "https://api.openweathermap.org/data/2.5/weather"

const getWeather = (params) => {
  const request = axios.get(`${baseUrl}?q=${params.capital}&appid=${params.apiKey}&units=metric`)
  return request.then(response => response.data)
}

export default { getWeather }
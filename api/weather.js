import axios from 'axios'
import { apikey } from '../constants'

const forecastEndpoint = parmas =>
  `https://api.weatherapi.com/v1/forecast.json?key=${apikey}&q=${parmas.city}&days=${parmas.day}&aqi=no&alerts=no`

const locationEndpoint = parmas =>
  `https://api.weatherapi.com/v1/search.json?key=${apikey}&q=${parmas.city}`

const apicall = async endpoint => {
  const option = {
    method: 'GET',
    url: endpoint
  }
  try {
    const responce = await axios.request(option)
    return responce.data
  } catch (error) {
    console.log('error :', error)
    return null
  }
}

export const fetchWeatherForcast = parmas => {
  return apicall(forecastEndpoint(parmas))
}
export const fetchLocation = parmas => {
  return apicall(locationEndpoint(parmas))
}

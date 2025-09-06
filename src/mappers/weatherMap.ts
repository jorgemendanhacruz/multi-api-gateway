import IWeatherDTO from "../dto/IWeatherDTO";
import { Weather } from "../domain/weather";
import { Mapper } from '../core/infra/Mapper';
import IWeatherPersistence from "../datachema/IWeatherPersistence";


export class WeatherMap extends Mapper<Weather> {

  public static async toDomain(raw: any): Promise<Weather> {
    const weatherOrError = Weather.create(raw);

    weatherOrError.isFailure ? console.log(weatherOrError.error) : '';

    return weatherOrError.isSuccess ? weatherOrError.getValue() : null;
  }

  public static toDTO(weather: Weather): IWeatherDTO {
    return {
      city: weather.city,
      country: weather.country,
      lat: weather.lat,
      lon: weather.lon,
      sunrise: weather.sunrise,
      sunset: weather.sunset,
      temperature: weather.temperature,
      feelsLikeTemperature: weather.feelsLikeTemperature,
      description: weather.description,
      timestamp: weather.timestamp,
    } as IWeatherDTO;
  }

   public static toPersistence(weather: Weather): IWeatherPersistence {
    return {
      city: weather.city,
      country: weather.country,
      lat: weather.lat.toString(),
      lon: weather.lon.toString(),
      sunrise: weather.sunrise.toString(),
      sunset: weather.sunset.toString(),
      temperature: weather.temperature.toString(),
      feelsLikeTemperature: weather.feelsLikeTemperature.toString(),
      description: weather.description,
      timestamp: weather.timestamp.toString(),
    } as IWeatherPersistence;
  }
}
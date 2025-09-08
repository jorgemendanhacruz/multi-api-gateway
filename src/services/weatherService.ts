import { Service, Inject } from 'typedi';
import { Result } from '../core/logic/Result';
import IWeatherDTO from '../dto/IWeatherDTO';
import IWeatherService from './IServices/IWeatherService';
import IWeatherRepo from '../repos/IRepos/IWeatherRepo';
import { WeatherMap } from '../mappers/weatherMap';
import nodeGeocoder from 'node-geocoder';
import config from '../config/config';
import { Logger } from 'winston';
import WeatherApiClient from '../externalAPIs/weatherApiClient';

@Service()
export default class WeatherService implements IWeatherService {

  private readonly geocoder: any;

  constructor(
    @Inject(config.repos.weather.name) private weatherRepo: IWeatherRepo,
  ) {
    this.geocoder = nodeGeocoder({
      provider: 'openstreetmap',
    });
  }

  public async getAllWeathers(): Promise<Result<IWeatherDTO[]>> {
    try {
      const weathers = await this.weatherRepo.getAll();
      return Result.ok(weathers.map(WeatherMap.toDTO));
    } catch (error) {
      return Result.fail('Failed to fetch weathers');
    }
  }

  public async getWeather(city: string): Promise<Result<IWeatherDTO>> {
    //Search for the city on REDIS
    const weather = await this.weatherRepo.getByCity(city);

    if (!weather) {
      const res = await this.geocoder.geocode(city);
      const lat = res[0].latitude;
      const lon = res[0].longitude;
      const country = res[0].country;

      //call open weather API
      const weatherApiClient = new WeatherApiClient();
      const weatherData = await weatherApiClient.getWeather(lat.toString(), lon.toString());



      // store weather


      // get weather

    }

    //Exists?? -> Return the weather for the given city.
    return Result.ok(WeatherMap.toDTO(weather));
  }

  async createWeather(weatherDto: IWeatherDTO): Promise<Result<IWeatherDTO>> {
    const weather = await WeatherMap.toDomain(weatherDto);
    const createdWeather = await this.weatherRepo.create(weather);
    return Result.ok(WeatherMap.toDTO(createdWeather));
  }

  async updateWeather(
    city: string,
    weatherDto: Partial<IWeatherDTO>,
  ): Promise<Result<IWeatherDTO>> {
    const weather = await WeatherMap.toDomain(weatherDto);
    const updatedWeather = await this.weatherRepo.update(city, weather);

    if (!updatedWeather) {
      return Result.fail('Weather not found');
    }

    return Result.ok(WeatherMap.toDTO(updatedWeather));
  }
}

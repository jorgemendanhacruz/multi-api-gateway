import { Service, Inject } from 'typedi';
import { Result } from '../core/logic/Result';
import IWeatherDTO from '../dto/IWeatherDTO';
import IWeatherService from './IServices/IWeatherService';
import IWeatherRepo from '../repos/IRepos/IWeatherRepo';
import { WeatherMap } from '../mappers/weatherMap';
import config from "../config/config";

@Service()
export default class WeatherService implements IWeatherService {

  constructor(
    @Inject(config.repos.weather.name) private weatherRepo: IWeatherRepo
  ) { }

  public async getAllWeathers(): Promise<Result<IWeatherDTO[]>> {
    const weathers = await this.weatherRepo.getAll();
    return Result.ok(weathers.map(WeatherMap.toDTO));
  }

  public async getWeather(city: string): Promise<Result<IWeatherDTO>> {

    //Search for the city on REDIS
    const weather = await this.weatherRepo.getByCity(city);

    //Doesn't exist?? -> Get coordinates with GeoCoder; Call OpenWeatherAPI to get the weather
    if (!weather) {
      return Result.fail('Weather not found');
    }

    //Exists?? -> Return the weather for the given city.
    return Result.ok(WeatherMap.toDTO(weather));
  }

  async createWeather(weatherDto: IWeatherDTO): Promise<Result<IWeatherDTO>> {
    const weather = await WeatherMap.toDomain(weatherDto);
    const createdWeather = await this.weatherRepo.create(weather);
    return Result.ok(WeatherMap.toDTO(createdWeather));
  }

  async updateWeather(city: string, weatherDto: Partial<IWeatherDTO>): Promise<Result<IWeatherDTO>> {
    const weather = await WeatherMap.toDomain(weatherDto);
    const updatedWeather = await this.weatherRepo.update(city, weather);

    if (!updatedWeather) {
      return Result.fail('Weather not found');
    }

    return Result.ok(WeatherMap.toDTO(updatedWeather));
  }
}
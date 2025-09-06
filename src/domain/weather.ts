import { ValueObject } from "../core/domain/ValueObject";
import { Guard } from '../core/logic/Guard';
import { Result } from "../core/logic/Result";



interface WeatherProps {
    city: string;
    country: string;
    lat: number;
    lon: number;
    sunrise: number;
    sunset: number;
    temperature: number;
    feelsLikeTemperature: number;
    description: string;
    timestamp: number;
}

export class Weather extends ValueObject<WeatherProps> {

    get city(): string{
        return this.city;
    }

    get country(): string{
        return this.country;
    }

    get lat(): number{
        return this.lat;
    }

    get lon(): number{
        return this.lon;
    }

    get sunrise(): number{
        return this.sunrise;
    }

    get sunset(): number{
        return this.sunset;
    }

    get temperature(): number{
        return this.temperature;
    }

    get feelsLikeTemperature(): number{
        return this.feelsLikeTemperature;
    }

    get description(): string{
        return this.description;
    }

    get timestamp(): number{
        return this.timestamp;
    }

    
    private constructor (props: WeatherProps){
        super(props);
    }
    

    public static create(props: WeatherProps): Result<Weather>{

        const guardedProps = [
            {argument: props.city, argumentName: 'city'},
            {argument: props.country, argumentName: 'country'},
            {argument: props.lat, argumentName: 'lat'},
            {argument: props.lon, argumentName: 'lon'},
            {argument: props.sunrise, argumentName: 'sunrise'},
            {argument: props.sunset, argumentName: 'sunset'},
            {argument: props.temperature, argumentName: 'temperature'},
            {argument: props.feelsLikeTemperature, argumentName: 'feelsLikeTemperature'},
            {argument: props.description, argumentName: 'description'},
            {argument: props.timestamp, argumentName: 'timestamp'},
        ]
        
        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

        if(!guardResult.succeeded){
            return Result.fail<Weather>(guardResult.message);
        }

        props.city = props.city.toUpperCase();
        return Result.ok<Weather>(new Weather(props));
    }
}
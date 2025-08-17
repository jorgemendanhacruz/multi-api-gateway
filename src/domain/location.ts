import { ValueObject } from '../core/domain/ValueObject';
import { Guard } from '../core/logic/Guard';
import { Result } from '../core/logic/Result';

interface LocationProps {
    zip: number;
    name: string;
    lat: number;
    lon: number;
    country: string;
}

export class Location extends ValueObject<LocationProps> {
    get zip(): number {
        return this.props.zip;
    }

    get name(): string {
        return this.props.name;
    }

    get lat(): number {
        return this.props.lat;
    }

    get lon(): number {
        return this.props.lon;
    }

    get country(): string {
        return this.props.country;
    }

    private constructor(props: LocationProps) {
        super(props);
    }

    public static create(props: LocationProps): Result<Location> {

        const guardedProps = [
            { argument: props.zip, argumentName: 'zip' },
            { argument: props.name, argumentName: 'name' },
            { argument: props.lat, argumentName: 'lat' },
            { argument: props.lon, argumentName: 'lon' },
            { argument: props.country, argumentName: 'country' }
        ];

        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

        if (!guardResult.succeeded) {
            return Result.fail<Location>(guardResult.message);
        }
        else {
            return Result.ok<Location>(new Location(props));
        }
    }
}

import { Mapper } from "../core/infra/Mapper";
import ILocationDTO from "../dto/ILocationDTO";
import { Location } from "../domain/location";


export class LocationMap implements Mapper<Location, ILocationDTO> {

    toDTO(location: Location): ILocationDTO {
        return {
            zip: location.zip.toString(),
            name: location.name,
            lat: location.lat.toString(),
            lon: location.lon.toString(),
            country: location.country,
        } as ILocationDTO;
    }

    toDomain(dto: any): Location {
        const locationOrError = Location.create(dto);

        locationOrError.isFailure ? console.log(locationOrError.error) : '';

        return locationOrError.isSuccess ? locationOrError.getValue() : null;
    }

    toPersistence(location: Location): any {
        throw new Error("Not implemented");
    }
}
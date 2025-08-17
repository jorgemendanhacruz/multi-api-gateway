
export interface Mapper<T, DTO> {
  toDomain (raw: any): T;
  toDTO (t: T): DTO;
  toPersistence (t: T): any;
}
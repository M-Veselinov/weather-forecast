/**
 * Created by Mario on 4.8.2017 г..
 */
export class Coordinate {

  lon: number;
  lat: number;

  public deserialize(input:any): Coordinate{
    this.lon = input.lon;
    this.lat = input.lat;
    return this;
  }
}

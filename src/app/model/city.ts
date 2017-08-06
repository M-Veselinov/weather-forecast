/**
 * Created by Mario on 4.8.2017 г..
 */

import {Coordinate} from "./coordinate";

export class City {

  id: number;
  name: string;
  country: string;
  coord: Coordinate;

  deserialize(input:any) {
    this.id = input.id;
    this.name = input.name;
    this.country = input.country;
    this.coord = new Coordinate().deserialize(input.coord);

    return this;
  }

  static deserializeArr(input:any) {
    let arr:City[] = [];
    for (let city of input) {
      let c:City = new City().deserialize(city);
      arr.push(c);
    }
    return arr;
  }

}

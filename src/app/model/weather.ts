/**
 * Created by Mario on 5.8.2017 г..
 */
export class Weather {

  main: string;
  description: string;
  icon: string;

  deserialize(i:any) {
    let input = i[0];
    this.main = input.main;
    this.description = input.description;
    this.icon = input.id;
    return this;
  }

}

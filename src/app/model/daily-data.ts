import {Weather} from "./weather";
/**
 * Created by Mario on 5.8.2017 г..
 */

const WEEKDAYS=new Array(7);
  WEEKDAYS[0]="Monday";
  WEEKDAYS[1]="Tuesday";
  WEEKDAYS[2]="Wednesday";
  WEEKDAYS[3]="Thursday";
  WEEKDAYS[4]="Friday";
  WEEKDAYS[5]="Saturday";
  WEEKDAYS[6]="Sunday";

export class DailyData {
  date: Date;
  mainTemp: number;
  maxTemp: number;
  minTemp: number;
  weather: Weather;

  public deserialize(input:any): DailyData {
    this.date = new Date(input.dt_txt);
    this.mainTemp = input.main.temp;
    this.maxTemp = input.main.temp_max;
    this.minTemp = input.main.temp_min;
    this.weather = new Weather().deserialize(input.weather);
    return this;
  }

  // Format date day to appropriate string for display on page.
  public getDayAsString(isToday: boolean): string {
    if (isToday) {
      return 'Today';
    } else {
      return this.date.toString().split(' ')[0];
    }
  }
}

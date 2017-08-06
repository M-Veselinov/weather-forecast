import {City} from "./city";
import {DailyData} from "./daily-data";
/**
 * Created by Mario on 5.8.2017 г..
 */
export class Forecast {

  city: City;
  todayData: DailyData;
  dailyData: DailyData[] = [];

  // Modifies given info object min/max temp values.
  private findMinMaxTemp(input:any, info:any) {
    let tempDay = new Date(info.dt_txt).getDay();
    let minTemp = 200;
    let maxTemp = 0;
    for (let i of input.list) {
      let tempDay2 = new Date(i.dt_txt);
      if (tempDay2.getDay() == tempDay) {
        if (minTemp > i.main.temp_min) {
          minTemp = i.main.temp_min;
        }
        if (maxTemp < i.main.temp_max) {
          maxTemp = i.main.temp_max;
        }
      }
    }
    info.main.temp_min = minTemp;
    info.main.temp_max = maxTemp;
  }

  deserialize(input:any) {
    this.city = new City().deserialize(input.city);
    let curDay = new Date().getDay();
    for (let info of input.list) {
      if (info == input.list[0]) {
        this.findMinMaxTemp(input, info);
        this.todayData = new DailyData().deserialize(info);
      }
      let tempDay = new Date(info.dt_txt).getDay();
      if (curDay != tempDay) {
        this.findMinMaxTemp(input, info);
        this.dailyData.push(new DailyData().deserialize(info));
        curDay = tempDay;
      }
    }
    return this;
  }

}

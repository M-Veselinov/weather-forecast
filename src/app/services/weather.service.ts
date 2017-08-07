/**
 * Created by Mario on 3.8.2017 г..
 */
import {Http, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {City} from "../model/city";
import {Forecast} from "../model/forecast";
import {Injectable} from "@angular/core";

@Injectable()
export class WeatherService {

  private weatherUrl = 'https://api.openweathermap.org/data/2.5/forecast';
  private cities: City[] = [];
  private icons: any[] = [];

  constructor(private http: Http) {
    this.getCities().then(cities => this.cities = cities);
    this.getIcons().then(icons => this.icons = icons);
  }

  public getCities(): Promise<Array<City>> {
    return this.http.get('assets/city.list.json')
      .toPromise()
      .then(response => City.deserializeArr(response.json()))
      .catch(this.handleError);
  }

  public getIcons(): Promise<Array<any>> {
    return this.http.get('assets/icon.list.json')
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  public getIconById(id: string): any {
    let iconId;
    for (let key in this.icons) {
      let value = this.icons[key];
      if (key == id) {
        iconId = 'wi wi-day-' + value.icon;
      }
    }
    return  iconId;
  }

  public getCityByName(name:string): City {
    return this.cities.find(city => city.name === name);
  }

  public getLocation() {
      return this.http.get('http://ipinfo.io')
        .toPromise()
        .then(response => response.json())
        .catch(this.handleError);
  }

  getWeather(params: URLSearchParams): Promise<Forecast> {
    params.set('units', 'metric');
    params.set('APPID', '06dd8d85cd918db0f43788692a652e9a');
    return this.http.get(this.weatherUrl, {
      search: params
    }).toPromise()
      .then(response => new Forecast().deserialize(response.json()))
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}

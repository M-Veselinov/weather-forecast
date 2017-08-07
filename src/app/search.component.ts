/**
 * Created by Mario on 3.8.2017 г..
 */

import { Component, ViewEncapsulation } from '@angular/core';
import { WeatherService } from "./services/weather.service";
import { Forecast } from "./model/forecast";
import { URLSearchParams } from "@angular/http";
import { CompleterService, CompleterData } from 'ng2-completer';
import './services/autocomplete.service';

@Component({
  selector: "search-component",
  encapsulation : ViewEncapsulation.None,
  styleUrls: [ './css/search-component.css' ],
  templateUrl: "./search-component.html"
})
export class SearchComponent {
  public appUrl = 'https://github.com/M-Veselinov/weather-forecast';

  name: string;
  forecast: Forecast;
  dataService: any = [];
  tempData: any = [];
  showContent: boolean = false;
  sideBarActive: boolean = false;

  constructor(private weatherService: WeatherService,
                private completerService: CompleterService) {
    setTimeout(()=>this.showContent=true, 0);
  }

  /* Autocomplete related methods */
  displaySuggestions = (predictions, status) => {
    if (status != google.maps.places.PlacesServiceStatus.OK) {
      return;
    }
    this.tempData = this.completerService.local(predictions, 'description', 'description');
    if (this.dataService != this.tempData) {
      setTimeout(()=>this.dataService=this.tempData, 200);
    }
  };

  requestDropdownData(name): void {
    this.name = name;
    if (this.name) {
      let service = new google.maps.places.AutocompleteService();
      service.getPlacePredictions({ input: this.name, types: [ '(cities)' ] }, this.displaySuggestions);
    }
  }

  /* Weather related methods */

  searchWeatherByName(): void {
    let params: URLSearchParams = new URLSearchParams();
    if (this.name) {
      let parsedName = this.name.split(',')[0];
      // Capitalize name string
      let capitalized = parsedName.charAt(0).toUpperCase() + parsedName.slice(1);
      let city = this.weatherService.getCityByName(capitalized);
      if (city) {
        params.set('id', city.id + '');
        this.weatherService.getWeather(params).then(forecast => this.forecast = forecast);
      }
    }
  }

  searchWeatherByLocation(input:any): void {
    let locArr = input.loc.split(',');
    let latitude = locArr[0];
    let longitude = locArr[1];

    let params: URLSearchParams = new URLSearchParams();
    if (latitude && longitude) {
      params.set('lat', latitude);
      params.set('lon', longitude);
      this.weatherService.getWeather(params).then(forecast => this.forecast = forecast);
    }
  }

  locate(): void {
    this.weatherService.getLocation().then(data => this.searchWeatherByLocation(data));
  }

}

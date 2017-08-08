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
  // Url to be shared using the share icons
  public appUrl = 'https://github.com/M-Veselinov/weather-forecast';

  name: string;
  forecast: Forecast;
  dataService: any = [];
  showContent: boolean = false;
  sideBarActive: boolean = false;

  constructor(private weatherService: WeatherService,
                private completerService: CompleterService) {
    setTimeout(()=>this.showContent=true, 0);
  }

  /* Autocomplete related methods */
  /**
   * Handles response from google autocomplete api
   * @param {Array} predictions array with prediction objects
   * @param {String} status of the request
   */
  displaySuggestions = (predictions: any[], status:string) => {
    if (status != google.maps.places.PlacesServiceStatus.OK) {
      return;
    }
    this.dataService = this.completerService.local(predictions, 'description', 'description');
  };

  /**
   * Method to request autocomplete data from google api,
   * invoked when search input value is changed
   * @param {String} name current value of the input field
   */
  requestDropdownData(name: string): void {
    this.name = name;
    if (this.name) {
      let service = new google.maps.places.AutocompleteService();
      service.getPlacePredictions({ input: this.name, types: [ '(cities)' ] }, this.displaySuggestions);
    }
  }

  /* Weather related methods */

  /**
   * Method used to get weather forecast by city name.
   */
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

  /**
   * Get weather forecast by given location (longitude, latitude)
   * @param {Object} input
   */
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

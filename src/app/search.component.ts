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
  template: `
    <div class="wrapp">
      <div *ngIf="!showContent" class="row">
        <div class="col-md-2 col-md-offset-5 center">
          umbrellapp
        </div>
      </div>
      <div *ngIf="showContent" class="center-block center-form">
        <div class="label">type a location: </div>
        <div class="input-cont">
          <ng2-completer inputClass="search-input" placeholder="type here.." [ngModel]="name" [datasource]="dataService" (ngModelChange)="requestDropdownData($event)" [minSearchLength]="0"></ng2-completer>
          <div class="search-btn" (click)="searchWeatherByName()"><i class="fa fa-search" aria-hidden="true"></i></div>
        </div>
        <div class="label">or give us your location</div>
        <div class="location-cont">
            <div class="location-btn" (click)="locate()">access location</div>
            <div class="icon-cont"><i class="fa fa-location-arrow" aria-hidden="true"></i></div>
        </div>
      </div>
        <!---->
          <!--<button ceiboShare  [facebook]="{u: appUrl}">Facebook</button>-->
          <!--<button ceiboShare  [googlePlus]="{url:appUrl}">Google Plus</button>-->
          <!--<button ceiboShare  [twitter]="{url:appUrl, text:'Checkout this awesome weather app', hashtags:'angular2, social, weather'}">Twitter</button>-->
        <!--</div>-->
      <div *ngIf="forecast">
        <div class="today-cont">
          <div>{{forecast.todayData.getDayAsString(true)}}</div>
          <div>{{forecast.city.name}}</div>
          <div>{{forecast.todayData.maxTemp}}</div>
          <div>{{forecast.todayData.minTemp}}</div>
        </div>
        <div class="days-cont">
          <div *ngFor="let info of forecast.dailyData" class="day">
              <div>{{info.getDayAsString(false)}}</div>
              <div>{{info.maxTemp}}</div>
              <div>{{info.minTemp}}</div>
          </div>
        </div>
      </div>
      <p *ngIf="forecast">{{forecast.mainTemp}}</p>
    </div>
  `
})
export class SearchComponent {
  public appUrl = 'https://github.com/M-Veselinov/SpringPractice';

  name: string;
  forecast: Forecast;
  dataService: CompleterData;
  showContent: boolean = false;
  constructor(private weatherService: WeatherService,
                private completerService: CompleterService) {
    setTimeout(()=>this.showContent=true, 1000);
  }

  /* Autocomplete related methods */
  displaySuggestions = (predictions, status) => {
    if (status != google.maps.places.PlacesServiceStatus.OK) {
      return;
    }
    this.dataService = this.completerService.local(predictions, 'description', 'description');
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

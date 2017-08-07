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
    <div class="wrapp" [ngClass]="{'forecastWrap': forecast }">
      <div *ngIf="!showContent" class="row">
        <div class="col-md-2 col-md-offset-5 center">
          umbrellapp
        </div>
      </div>
      <div class="center-block center-form" *ngIf="!forecast && showContent">
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
      <div *ngIf="forecast" class="today-cont center-block center-form">
        <div class="desc-cont green-cont">{{forecast.todayData.getDayAsString(true).toUpperCase()}}</div>
        <div class="desc-cont">{{forecast.city.name}}</div>
        <img class="weather-icon" src={{forecast.todayData.weather.icon}}>
        <div class="max-temp-cont green-cont">{{forecast.todayData.maxTemp}} &#8451;</div>
        <div class="min-temp-cont">{{forecast.todayData.minTemp}} &#8451;</div>
      </div>
      <div *ngIf="forecast" class="days-cont">
        <div [ngClass]="{'first-day': i==0 }" *ngFor="let info of forecast.dailyData;let i = index" class="day">
            <div class="day-desc">{{info.getDayAsString(false)}}</div>
            <img class="day-weather-icon" src={{info.weather.icon}}>
            <div class="day-max">{{info.maxTemp}} &#8451;</div>
            <div class="day-min">{{info.minTemp}} &#8451;</div>
        </div>
      </div>
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
    setTimeout(()=>this.showContent=true, 0);
  }

  /* Autocomplete related methods */
  displaySuggestions = (predictions, status) => {
    if (status != google.maps.places.PlacesServiceStatus.OK) {
      alert(status);
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

/**
 * Created by Mario on 3.8.2017 г..
 */

import {Component, OnInit} from '@angular/core';
import {Hero} from "./model/hero";
import {WeatherService} from "./services/weather.service";

@Component({
  selector: 'my-dashboard',
  styleUrls: [ './dashboard-component.css' ],
  templateUrl: './dashboard-component.html'
})

export class DashboardComponent implements OnInit{

  heroes: Hero[] = [];

  constructor (private weatherService: WeatherService) {
  }

  ngOnInit(): void {
    //this.heroService.getHeroes()
      //.then(heroes => this.heroes = heroes.slice(1, 5));
  }
}


// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import {Hero} from './model/hero';
// // import {HeroService} from "./services/weather.service";
//
// @Component({
//   selector: 'my-heroes',
//   styleUrls: [ './heroes-component.css' ],
//   templateUrl: './heroes-component.html'
// })
// export class HeroesComponent implements OnInit {
//   heroes: Hero[] = [];
//   selectedHero: Hero;
//
//   constructor(
//           private router: Router) {
//   }
//
//   ngOnInit(): void {
//     this.getHeroes();
//   }
//
//   onSelect (hero: Hero): void {
//     this.selectedHero = hero;
//   }
//
//   // getHeroes(): void {
//   //   this.heroService.getHeroesSlowly().then(heroes => this.heroes = heroes);
//   // }
//
//   gotoDetail(): void {
//     this.router.navigate(['/detail', this.selectedHero.id]);
//   }
//
// }
// Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
// Components
import { SearchComponent }  from './search.component';
import { CeiboShare } from 'ng2-social-share';
// Services
import { WeatherService } from "./services/weather.service";
import { Ng2CompleterModule } from "ng2-completer";

@NgModule({
  imports:      [
    BrowserModule,
    FormsModule,
    HttpModule,
    Ng2CompleterModule
  ],
  declarations: [
    SearchComponent,
    CeiboShare
  ],
  bootstrap:    [ SearchComponent ],
  providers: [
    WeatherService
  ]
})
export class AppModule { }


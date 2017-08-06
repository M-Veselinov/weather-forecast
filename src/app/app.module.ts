// Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from "./app-routing.module";
// Components
import { SearchComponent }  from './search.component';
import { DashboardComponent } from './dashboard.component';
import { CeiboShare } from 'ng2-social-share';
// Services
import { WeatherService } from "./services/weather.service";
import { Ng2CompleterModule } from "ng2-completer";

@NgModule({
  imports:      [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    Ng2CompleterModule
  ],
  declarations: [
    SearchComponent,
    CeiboShare,
    DashboardComponent
  ],
  bootstrap:    [ SearchComponent ],
  providers: [
    WeatherService
  ]
})
export class AppModule { }


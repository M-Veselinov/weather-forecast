/**
 * Created by Mario on 4.8.2017 г..
 */
import { NgModule }             from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { DashboardComponent }   from './dashboard.component';

const routes: Routes = [
  // { path: '', redirectTo: '/', pathMatch: 'full' },
  // { path: 'dashboard',  component: DashboardComponent },
  // { path: 'detail/:id', component: HeroDetailComponent },
  // { path: 'heroes',     component: HeroesComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

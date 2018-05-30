import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { HeroDetailComponent } from './heroes/hero-detail/hero-detail.component';
import { HeroesComponent } from './heroes/heroes.component';
import { ListOfCountriesComponent } from './country/list-of-countries/list-of-countries.component';
import { HeroListComponent } from './heroes/hero-list/hero-list.component';
import {CountryMainComponent} from './country/country-main/country-main.component';
import { SpacingResponsiveComponent } from './spacing-responsive/spacing-responsive.component';
import { WidthsResponsiveComponent } from './widths-responsive/widths-responsive.component';
import { LayoutResponsiveComponent } from './layout-responsive/layout-responsive.component';


const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'heroes', component: HeroListComponent },
  { path: 'country', component: CountryMainComponent },
  { path: 'spacing', component: SpacingResponsiveComponent },
  { path: 'width', component: WidthsResponsiveComponent },
  { path: 'layout', component: LayoutResponsiveComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

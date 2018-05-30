import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule, InMemoryDbService } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard.component';
import { HeroSearchComponent } from './heroes/hero-search/hero-search.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './heroes/hero-detail/hero-detail.component';
import { HeroService } from './heroes/hero-service/hero.service';
import { ListOfCountriesComponent } from './country/list-of-countries/list-of-countries.component';
import { CountryService } from './country/country-service/country.service';
import { HeroListComponent } from './heroes/hero-list/hero-list.component';
import { CountryAddComponent } from './country/country-add/country-add.component';
import { SharedUtils } from './shared/utils';
import { CountrySearchComponent } from './country/country-search/country-search.component';
import { UtilitesComponent } from './shared/utilites/utilites.component';
import { CountryMainComponent } from './country/country-main/country-main.component';
import { SharedSpinnerComponent } from './shared/shared-spinner/shared-spinner.component';
import { CountryEditComponent } from './country/country-edit/country-edit.component';
import { SharedModalComponent } from './country/shared/shared-modal/shared-modal.component';



@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      dataEncapsulation: false,
      delay: 300,
      passThruUnknownUrl: true
    })
    
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    HeroSearchComponent,
    HeroesComponent,
    HeroDetailComponent,
    ListOfCountriesComponent,
    HeroListComponent,
    CountryAddComponent,
    CountrySearchComponent,
    UtilitesComponent,
    CountryMainComponent,
    SharedSpinnerComponent,
    CountryEditComponent,
    SharedModalComponent
   ],

  providers: [HeroService, CountryService, SharedUtils],
  bootstrap: [AppComponent]
})
export class AppModule { }

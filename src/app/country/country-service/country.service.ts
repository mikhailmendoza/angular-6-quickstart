import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError as observableThrowError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CountryModel } from '../country-model/country';
import { MockDataCountryList } from '../mock-data/country-list';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private countryUrl = 'app/country'; // URL to web api
  mockData = MockDataCountryList;
  constructor(private http: HttpClient) { }


  getCountries(): Observable<CountryModel[]> {
    return of(this.mockData);
  }

 
  private handleError(res: HttpErrorResponse | any) {
    console.error(res.error || res.body.error);
    return observableThrowError(res.error || 'Server error');
  }


}
export class CountrySearchCritera {
  sortColumn: string;
  sortDirection: string;
}

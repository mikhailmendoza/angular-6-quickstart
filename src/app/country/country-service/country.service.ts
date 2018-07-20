import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError as observableThrowError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CountryModel } from '../country-model/country';
import { MockDataCountryList } from '../mock-data/country-list';
import * as _ from 'lodash';


@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private countryUrl = 'app/countries'; // URL to web api
  constructor(private http: HttpClient) { }

  getCountries() {
    return this.http
      .get<CountryModel[]>(this.countryUrl)
      .pipe(map(data => data), catchError(this.handleError));
  }

  saveCountries(countryList, addedValue): Observable<CountryModel[]> {
    if (!_.find(countryList, { name: addedValue.name })) {
      countryList.push(addedValue);
    }
    return of(countryList);
  }

  deleteCountries(listOfCountries, recordToDelete): Observable<CountryModel[]> {
    listOfCountries = _.reject(listOfCountries, recordToDelete);

    return of(listOfCountries);
  }

  updateCountries(countryList, originalValue, newValue): Observable<CountryModel[]> {
    const updateObj = _.find(countryList, originalValue)
    if (updateObj) {
      updateObj.name = newValue.name;
      updateObj.capital = newValue.capital;
    }
    return of(countryList);
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

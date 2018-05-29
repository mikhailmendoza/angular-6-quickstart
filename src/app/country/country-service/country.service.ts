import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError as observableThrowError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CountryModel } from '../country-model/country';
import { MockDataCountryList } from '../mock-data/country-list';
import * as _ from "lodash";


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

  deleteCountries(listOfCountries, recordToDelete): Observable<CountryModel[]> {
    listOfCountries = _.reject(listOfCountries, recordToDelete);
    return of(listOfCountries);
  }

  // deleteCountries(recordToDelete) {
  //   const headers = new Headers();
  //   headers.append('Content-Type', 'application/json');
  //   const url = `${this.countryUrl}/${recordToDelete.name}`;
  //   return this.http.delete<CountryModel>(url).pipe(catchError(this.handleError));
  // }


  private handleError(res: HttpErrorResponse | any) {
    console.error(res.error || res.body.error);
    return observableThrowError(res.error || 'Server error');
  }


}
export class CountrySearchCritera {
  sortColumn: string;
  sortDirection: string;
}

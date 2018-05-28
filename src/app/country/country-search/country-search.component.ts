import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { CountryModel } from '../country-model/country';
import { SharedUtils } from '../../shared/utils';
import * as _ from "lodash";

@Component({
  selector: 'my-country-search',
  templateUrl: './country-search.component.html',
  styleUrls: ['./country-search.component.css']
})
export class CountrySearchComponent implements OnInit, OnChanges {
  @Input() countryList: CountryModel[];
  @Input() tempCountryList: any;
  @Output() searchResult = new EventEmitter();
  search: String;
  filterBy: string = 'country';
  filterObj: any;
  constructor(private sharedUtils: SharedUtils) { }

  ngOnChanges() {

  }
  ngOnInit() {
  }

  globalSearchFunction():any {
    if (!this.sharedUtils.isStringNullOrEmpty(this.search)) {
      if (this.filterBy === 'country') {
        this.filterObj = this.searchByCountry();
      }
      else {
        this.filterObj = this.searchByCapital();
      }
    } else {
      this.filterObj = this.tempCountryList;
    }
    return this.filterObj;
  }

  filterMode() {
    this.filterObj=this.globalSearchFunction();
    this.searchResult.emit(this.filterObj)
  }

  searchByCountry(): any {
    this.filterObj = this.tempCountryList.filter(country => country.name.toUpperCase() === this.search.toUpperCase());
    if (_.isEmpty(this.filterObj)) {
      this.filterObj = this.tempCountryList.filter(country => _.includes(country.name.toUpperCase(), this.search.toUpperCase()));
    }
    return this.filterObj;
  }

  searchByCapital(): any {
    this.filterObj = this.tempCountryList.filter(country => country.capital.toUpperCase() === this.search.toUpperCase());
    if (_.isEmpty(this.filterObj)) {
      this.filterObj = this.tempCountryList.filter(country => _.includes(country.capital.toUpperCase(), this.search.toUpperCase()));
    }
    return this.filterObj;
  }

}

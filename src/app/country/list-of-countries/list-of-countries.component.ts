import { Component, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { MockDataCountryList } from '../mock-data/country-list';
import * as _ from "lodash";
import { CountryModel } from '../country-model/country';
import { CountryService } from '../country-service/country.service';
import { filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SharedUtils } from '../../shared/utils';

import {
  animate,
  keyframes,
  query,
  stagger,
  style,
  transition,
  trigger
} from '@angular/animations';

@Component({
  selector: 'my-list-of-countries',
  templateUrl: './list-of-countries.component.html',
  styleUrls: ['./list-of-countries.component.css'],
  animations: [
    trigger('dialog', [
      transition('void => *', [
        style({ transform: 'scale3d(.3, .3, .3)' }),
        animate(1000)
      ]),
      transition('* => void', [
        animate(1000, style({ transform: 'scale3d(.0, .0, .0)' }))
      ])
    ])
  ]
})

export class ListOfCountriesComponent implements OnInit, OnChanges {
  countryList: CountryModel[] = [];
  tempCountryList: CountryModel[] = [];
  error: any;
  addCountry = false;
  countryModel: CountryModel = new CountryModel;
  mdlSampleIsOpen = false;
  columnName: string;
  sortDirectionName: string = 'asc';
  sortDirectionCapital: string = 'asc';
  sortByName = false;
  sortByCapital = true;
  filterBy: string = 'country';
  name: string;
 

  constructor(private countryService: CountryService , private  sharedUtils : SharedUtils) {}

  ngOnChanges(changes: SimpleChanges) {
    if (!_.isEmpty(changes.countryList.currentValue)) {
      this.countryList = changes.countryList.currentValue;
    } else {
      this.initializeData();
    }
  }

  ngOnInit() {
    this.initializeData();
  }

  initializeData(): void {
    if (_.isEmpty(this.countryList)) {
      this.getCountryList();
    }
    this.countryList = _.sortBy(this.countryList, 'name');
    this.tempCountryList = this.countryList;
  }

  getCountryList(): void {
    this.countryService.getCountries().subscribe(
      countryList => (this.countryList = countryList),
      error => (this.error = error)
    )
  }

  addRecord(value) {
    this.countryList.push(value);
    this.exitModal();
  }

  addCountryCapital() {
    this.mdlSampleIsOpen = true;
    this.addCountry = (this.addCountry) ? false : true;
  }

  exitModal() {
    this.mdlSampleIsOpen = false;
    this.addCountry = false;
  }

  globalSearchFunction() {
    let filterObj: any;
    this.countryList = [];
    if (!this.sharedUtils.isStringNullOrEmpty(this.name)) {
      if (this.filterBy === 'country') {
       filterObj = this.searchByCountry();
      }
      else {
        filterObj = this.searchByCapital();
      }
      this.countryList = filterObj;
    } else {
      this.countryList = this.tempCountryList;
    }
  }

  filterMode(){
    this.globalSearchFunction();
  }

  searchByCountry() : any{
   let filterObj = this.tempCountryList.filter(country => country.name.toUpperCase() === this.name.toUpperCase());
    if (_.isEmpty(filterObj)) {
      filterObj = this.tempCountryList.filter(country => _.includes(country.name.toUpperCase(), this.name.toUpperCase()));
    }
    return filterObj;
  }

  searchByCapital(): any{
    let filterObj = this.tempCountryList.filter(country => country.capital.toUpperCase() === this.name.toUpperCase());
    if (_.isEmpty(filterObj)) {
      filterObj = this.tempCountryList.filter(country => _.includes(country.capital.toUpperCase(), this.name.toUpperCase()));
    }
    return filterObj;
  }

  sortCountryByName(event) {
    event.stopPropagation();
    this.columnHeaderSortIconLogic('name', this.sortDirectionName);
    this.sortLogic(this.sortDirectionName, 'name');
    this.sortDirectionName = (this.sortDirectionName === 'asc') ? 'desc' : 'asc';
  }

  sortCountryByCapital() {
    this.columnHeaderSortIconLogic('capital', this.sortDirectionCapital);
    this.sortLogic(this.sortDirectionCapital, 'capital');
    this.sortDirectionCapital = (this.sortDirectionCapital === 'asc') ? 'desc' : 'asc';
  }

  columnHeaderSortIconLogic(columnName, sortOrder) {
    if (columnName === 'name') {
      this.sortByName = false;
      this.sortByCapital = true;
    } else {
      this.sortByName = true;
      this.sortByCapital = false;
    }
  }

  sortLogic(sortOrder, columnName) {
    if (sortOrder === 'asc') {
      this.countryList = _.sortBy(this.countryList, columnName);
    } else {
      this.countryList = _.sortBy(this.countryList, columnName).reverse();
    }
  }
}


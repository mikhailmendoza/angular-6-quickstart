import { Component, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { MockDataCountryList } from '../mock-data/country-list';
import * as _ from "lodash";
import { CountryModel } from '../country-model/country';
import { CountryService } from '../country-service/country.service';
import { filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
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
  searchCountry = false;
  countryModel: CountryModel = new CountryModel;
  mdlSampleIsOpen = false;
  columnName: string;
  sortDirectionName: string = 'asc';
  sortDirectionCapital: string = 'asc';
  sortByName = false;
  sortByCapital = true;


  constructor(private countryService: CountryService) {

  }



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
    this.countryService
      .getCountries()
      .subscribe(
        countryList => (this.countryList = countryList),
        error => (this.error = error)
      )
  }

  addRecord(value) {
    let element = document.querySelectorAll('input');
    this.countryList.push(value);
    this.addCountry = false;
    this.searchCountry = false;
    this.mdlSampleIsOpen = false;
  }

  addCountryCapital() {
    this.mdlSampleIsOpen = true;
    this.addCountry = (this.addCountry) ? false : true;
  }

  searchCountryList() {
    this.searchCountry = (this.searchCountry) ? false : true;
  }

  exitModal() {
    this.mdlSampleIsOpen = false;
    this.addCountry = false;
  }


  globalSearchFunction(value){
    let filterObj: any;
    if (value && value !== '') {
      filterObj = this.tempCountryList.filter(country => country.name.toUpperCase()=== value.toUpperCase());
      if(_.isEmpty(filterObj)){
        filterObj = this.tempCountryList.filter(country => country.capital.toUpperCase()=== value.toUpperCase());
      }
      if(_.isEmpty(filterObj)){
        filterObj = this.tempCountryList.filter(country => _.includes(country.name.toUpperCase(), value.toUpperCase()));
      }
      if(_.isEmpty(filterObj)){
        filterObj = this.tempCountryList.filter(country => _.includes(country.capital.toUpperCase(), value.toUpperCase()));
        }
      this.countryList = [];
      this.countryList = filterObj;
    } else {
      this.countryList = this.tempCountryList;
    }
  }

  sortCountryByName() {
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


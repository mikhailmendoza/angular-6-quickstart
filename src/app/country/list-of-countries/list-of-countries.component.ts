import { Component, OnInit, SimpleChanges, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { CountryModel } from '../country-model/country';
import * as _ from "lodash";



@Component({
  selector: 'my-list-of-countries',
  templateUrl: './list-of-countries.component.html',
  styleUrls: ['./list-of-countries.component.css'],
})

export class ListOfCountriesComponent implements  OnChanges {
  @Input() countryList: CountryModel[];
  @Input() tempCountryList: CountryModel[];
  @Output()selectRecord  : EventEmitter<any> = new EventEmitter();


  sortDirectionName: string = 'asc';
  sortDirectionCapital: string = 'asc';
  sortByName = false;
  sortByCapital = true;

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
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
 
  selectData(value){
    this.selectRecord.emit(value);

  }
}


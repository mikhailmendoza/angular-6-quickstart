import { Component, OnInit, SimpleChanges, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { CountryModel } from '../country-model/country';
import * as _ from 'lodash';

@Component({
  selector: 'my-list-of-countries',
  templateUrl: './list-of-countries.component.html',
  styleUrls: ['./list-of-countries.component.css',
    '../../shared/styles/layout-responsive.component.css',
    '../../shared/styles/spacing-responsive.component.css',
    '../../shared/styles/width-responsive.component.css',
    '../../shared/styles/font-design.component.css'],
})

export class ListOfCountriesComponent implements OnChanges {
  @Input() countryList: CountryModel[];
  @Input() tempCountryList: CountryModel[];
  @Output() selectRecord: EventEmitter<any> = new EventEmitter();
  listOfCountries: CountryModel[];


  sortDirectionName: String = 'asc';
  sortDirectionCapital: String = 'asc';
  sortByName = false;
  sortByCapital = true;

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    this.listOfCountries = this.countryList;
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
    // Testing 2
    if (columnName === 'capital') {
      this.sortByName = true;
      this.sortByCapital = false;
    } else {
      this.sortByName = false;
      this.sortByCapital = true;
    }
  }

  sortLogic(sortOrder, columnName) {
    // TESTING
    if (sortOrder === 'desc') {
      this.countryList = _.sortBy(this.countryList, columnName);
    } else {
      this.countryList = _.sortBy(this.countryList, columnName).reverse();
    }
  }

  selectData(countryModel: CountryModel) {
    this.selectRecord.emit(countryModel);

  }
}

